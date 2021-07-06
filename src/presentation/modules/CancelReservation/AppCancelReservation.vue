<template>
  <div id="cancel-reservation-page" class="cancel-reservation page">
    <h1>{{ getLang.cancelReservation }}</h1>
    <div class="cancel-reservation__section">
      <app-select-hotel
        ref="selectHotel"
        :placeholder-text="'Select Hotel'"
        :validations="$v.currentHotelId"
        :data="hotelList"
        @changeHotelId="changeHotelId"
        @on:input="inputHotel"
      />
      <InputCustom
        v-for="(inputValue, inputIdx) in inputValues"
        :key="inputIdx"
        :label="inputValue.label"
        :icon="inputValue.icon"
        :type="inputValue.type"
        :placeholder="inputValue.placeholder"
        :value="inputValue.value"
        :input-name="inputValue.name"
        :validations="$v.inputValues[inputValue.name].value"
        @input="input"
      >
        <span
          v-if="
            $v.inputValues[inputValue.name].value.$dirty &&
              !checkIsExits($v.inputValues[inputValue.name].value.required) &&
              !$v.inputValues[inputValue.name].value.required
          "
          class="app-input__validation"
          >{{ getLang.required }}</span
        >
        <span
          v-else-if="
            $v.inputValues[inputValue.name].value.$dirty &&
              !checkIsExits($v.inputValues[inputValue.name].value.email) &&
              !$v.inputValues[inputValue.name].value.email
          "
          class="app-input__validation"
          >{{ getLang.validEmail }}</span
        >
      </InputCustom>
      <app-button
        :button-text="getLang.submit"
        button-type="primary"
        button-width="100%"
        :validated="loginValid ? true : false"
        @onclick="submitCancelReservation"
      />
      <div v-if="errorMessage" class="text-danger text-center mb-2">
        {{ errorMessage }}
      </div>
      <div v-if="successMessage" class="text-success text-center mb-2">
        {{ successMessage }}
      </div>
      <MyStayPopup
        ref="confirmDelete"
        :modal-class="`modal-delete`"
        :is-close-icon="true"
      >
        <div class="cancel-reservation-modal">
          <AppLoader v-if="isReservationLoading" />
          <div v-else>
            <div
              v-if="reservationsData.status === 'done'"
              class="cancel-booking-content form"
            >
              <div class="cancel-booking-content__title">
                <h5>{{ getLang.cancelYourBooking }}</h5>
                <p>{{ getLang.sureToCancelBooking }}?</p>
              </div>
              <div class="cancel-booking-content__room-fee mb-3">
                <div
                  v-for="(reservation, index) in reservationsData.rooms"
                  :key="index"
                  class="cancel-booking-content__room-fee__fee"
                >
                  <div class="row">
                    <div class="col-md-6 col-8">
                      {{ lang === "en-US" || lang === "en" ? "Room" : "" }}
                      {{ index + 1 }} {{ getLang.feeForRoom }}:
                    </div>
                    <div class="col-md-6 col-4">
                      {{ reservation.cancellation.fee | currency("YEN") }}
                    </div>
                  </div>
                  <div class="cancellation">
                    <span
                      @click="$_openCancelPolicy(reservation.room_plan_code)"
                    >
                      {{ getLang.cancellationPolicy }}
                    </span>
                  </div>
                </div>
                <div class="cancel-booking-content__room-fee__total-fee row">
                  <div class="col-md-6 col-8">
                    {{ getLang.totalCancellationFee }}:
                  </div>
                  <div class="col-md-6 col-4">
                    {{ reservationsData.cancellation.fee | currency("YEN") }}
                  </div>
                </div>
              </div>
              <p>{{ getLang.provideReasonCancel }}.</p>
              <b-form-group>
                <b-form-radio-group
                  v-model="selectedCancel.reason"
                  :options="options"
                  size="lg"
                  plain
                  stacked
                  name="plain-stacked"
                />
              </b-form-group>
              <b-form-textarea
                v-if="selectedCancel.reason === 'other'"
                id="textarea-small"
                v-model="selectedCancel.detail"
                size="sm"
                :placeholder="getLang.provideDetail"
                rows="5"
                class="mb-4"
              />
              <div class="cancel-booking-content__button mt-3">
                <button class="button m-btn m-btn__white" @click="$_cancel">
                  {{ getLang.cancel }}
                </button>
                <button class="button m-btn m-btn__yellow" @click="$_confirm">
                  <b-spinner v-if="isReservationLoading" small />
                  {{ getLang.cancelReservations }}
                </button>
              </div>
            </div>
            <div v-else-if="reservationsData.status === 'cancelled'">
              <div style="text-align: center;">
                <b>{{ reservationsData.message.title }}</b>
              </div>
            </div>
            <div v-else class="reservation-content">
              Your booking not found.
            </div>
          </div>
        </div>
      </MyStayPopup>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line node/no-deprecated-api
import { isNullOrUndefined } from "util";
import { mapActions, mapState, mapGetters } from "vuex";
import { FormLabel } from "../../../shared/constants/index";
import {
  requiredValidation,
  emailValidation
} from "../../../shared/helper/vuelidate-validator";

export default {
  name: "AppCancelReservation",
  data() {
    return {
      isLoading: false,
      isCancelFail: false,
      inputValues: {
        bookingId: {
          name: "bookingId",
          value: "",
          type: "text",
          label: FormLabel.booking_id,
          required: true
        },
        emailInput: {
          name: "emailInput",
          value: "",
          type: "email",
          label: FormLabel.email,
          required: true
        }
      },
      options: [],
      selectedCancel: {
        reason: "",
        detail: ""
      },
      currentHotelId: "0",
      hotelId: "0",
      errorMessage: undefined,
      successMessage: undefined
    };
  },
  validations: {
    currentHotelId: requiredValidation,
    inputValues: {
      emailInput: {
        value: emailValidation
      },
      bookingId: {
        value: requiredValidation
      }
    }
  },
  computed: {
    ...mapState({
      access_token: state => state.customer.auth.data.access_token,
      hotelList: state => state.hotel.data.hotelList,
      cancelReservationMessage: state => state.booking.cancelReservationMessage,
      isReservationLoading: state => state.booking.isReservationLoading,
      successReservationMessage: state =>
        state.booking.successCancelReservationMessage
    }),
    ...mapGetters({
      reservationsData: "booking/reservationsData",
      reservationID: "booking/bookingID",
      lang: "appHeader/language",
      fullLang: "appHeader/fullLanguage",
      cancellationPolicies: "hotelDetail/cancellationPolicies"
    }),
    reservationParams() {
      const params = {
        hotelID: this.hotelId,
        reservationID: this.inputValues.bookingId.value,
        byPassToken: "",
        email: this.inputValues.emailInput.value,
        fullLang: this.fullLang
      };

      return params;
    },
    isFormValidated() {
      return !!(!this.$v.$invalid && this.currentHotelId);
    },
    loginValid() {
      return (
        (this.$v.$dirty && this.$v.$invalid) ||
        this.errorMessage ||
        this.successMessage
      );
    },
    cancelOption() {
      return [
        { text: this.getLang.tripCancelled, value: "tripCancel" },
        { text: this.getLang.roomIsCheaper, value: "roomCheaper" },
        {
          text: this.getLang.travelChanged,
          value: "travellersChanged"
        },
        { text: this.getLang.anotherhHotel, value: "onotherHotel" },
        { text: this.getLang.other, value: "other" }
      ];
    },
    getLang() {
      return {
        cancelReservation: this.$t("cancelreservation.cancel_reservation"),
        submit: this.$t("cancelreservation.submit"),
        lastName: this.$t("forms.last_name"),
        firstName: this.$t("forms.first_name"),
        kanjiLastName: this.$t("forms.kanji_last_name"),
        kanjiFirstName: this.$t("forms.kanji_first_name"),
        phone: this.$t("forms.phone"),
        email: this.$t("forms.email"),
        addComment: this.$t("forms.add_comment"),
        required: this.$t("forms.required"),
        validPhone: this.$t("forms.valid_phone"),
        validEmail: this.$t("forms.valid_email"),
        comments: this.$t("forms.comments"),
        password: this.$t("forms.password"),
        rePassword: this.$t("forms.re_enter_password"),
        cardName: this.$t("forms.card_name"),
        cardNumber: this.$t("forms.card_number"),
        cardSecurity: this.$t("forms.card_security"),
        bookingID: this.$t("forms.booking_id"),
        title: this.$t("login_signup.title"),
        findOut: this.$t("login_signup.find_out"),
        forgotPassword: this.$t("login_signup.forgot_password"),
        login: this.$t("login_signup.login"),
        toSignup: this.$t("login_signup.to_signup"),
        summaryOfChange: this.$t("summary.summary_of_change"),
        promoCode: this.$t("booking.promo_code"),
        sureToDelete: this.$t("summary.sure_delete_room"),
        cancel: this.$t("summary.cancel"),
        confirm: this.$t("summary.confirm"),
        confirm_cancel: this.$t("cancelreservation.confirm_cancel"),
        cancelYourBooking: this.$t("confirmbooking.cancel_your_booking"),
        sureToCancelBooking: this.$t("confirmbooking.sure_to_cancel_booking"),
        provideReasonCancel: this.$t("confirmbooking.provide_reason_cancel"),
        totalCancellationFee: this.$t("confirmbooking.total_cancellation_fee"),
        tripCancelled: this.$t("confirmbooking.trip_cancelled"),
        roomIsCheaper: this.$t("confirmbooking.room_is_chipper"),
        travelChanged: this.$t("confirmbooking.travel_changed"),
        anotherhHotel: this.$t("confirmbooking.another_hotel"),
        other: this.$t("confirmbooking.other"),
        provideDetail: this.$t("confirmbooking.provide_with_detail"),
        cancellationPolicy: this.$t("hoteldetail.cancellation_policy"),
        cancelReservations: this.$t("headers.cancel_reservation"),
        feeForRoom: this.$t("confirmbooking.fee_for_room"),
        guestName: this.$t("confirmbooking.guest_name")
      };
    }
  },
  watch: {
    access_token(newAccess_token) {
      if (newAccess_token) {
        const location = localStorage.getItem("location");
        if (!this.hotelList.length) {
          this.getHotelList(location);
        }
      }
    },
    cancelReservationMessage(newErrorMessage) {
      this.errorMessage = newErrorMessage;
    },
    successReservationMessage(newMessage) {
      this.successMessage = newMessage;
    },
    cancelOption(newOption) {
      this.options = newOption;
    }
  },
  mounted() {
    this.options = this.cancelOption;
  },
  methods: {
    // MODULE ACTIONS
    ...mapActions({
      cancelReservations: "booking/cancelReservations",
      getReservations: "booking/getReservations",
      getHotelList: "hotel/getHotelList"
    }),
    $_deleteSelectedRoom(_roomIdx) {
      this.$refs.confirmDelete.showModal();
    },
    $_cancel() {
      this.$refs.confirmDelete.hideModal();
    },

    $_confirm() {
      const params = {
        fullLang: this.fullLang,
        hotelID: this.currentHotelId,
        reservationID: this.inputValues.bookingId.value,
        email: this.inputValues.emailInput.value
      };
      this.cancelReservations(params);
      this.$refs.confirmDelete.hideModal();
    },

    changeHotelId(hotelId) {
      this.hotelId = hotelId;
    },
    checkIsExits(param) {
      return isNullOrUndefined(param);
    },
    submitCancelReservation() {
      if (this.$nuxt.isOnline) {
        this.$v.$touch();
        if (!this.$v.$invalid) {
          this.$refs.confirmDelete.showModal();
          this.getReservations(this.reservationParams);
        }
      } else {
        alert("You are Offline");
      }
    },
    inputHotel(hotel) {
      this.$v.currentHotelId.$touch();
      if (hotel === "Art Hotel Ishigakijima") {
        this.currentHotelId = 975;
      }
    },
    input(target) {
      const obj = this.inputValues[target.name];
      this.inputValues = {
        ...this.inputValues,
        [target.name]: {
          ...obj,
          value: target.value
        }
      };
      this.$v.inputValues[target.name].value.$touch();
    }
  }
};
</script>

<!-- Add 'scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.cancel-reservation-modal {
  min-height: 100px;
}

.reservation-content {
  text-align: center;
  font-weight: 600;
  font-size: 18px;
}

.cancel-reservation {
  h1 {
    margin-bottom: 40px;
    font-size: 25px;

    @include min-sm {
      font-size: 30pxapp-select-hotel;
    }
  }

  &__section {
    text-align: left;
    margin: 0 auto;

    @include min-sm {
      width: 40%;
    }

    button {
      width: 100%;
      padding: 15px;
    }
  }
}
.confirm-delete {
  text-align: center;
  padding: 20px 20px 10px 20px;

  &__title {
    margin-bottom: 30px;
  }

  &__button {
    display: flex;
    justify-content: space-between;
    button {
      padding: 10px 0;
      width: 48%;

      padding: 10px 0;
      width: 48%;
    }
  }
}

.cancel-booking-content__button {
  button {
    padding: 10px 0;
    width: 48%;

    padding: 10px 0;
    width: 48%;
  }
}
</style>
