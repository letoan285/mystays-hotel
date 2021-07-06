<template>
  <div class="footer">
    <div class="container">
      <div class="app-footer">
        <div class="app-footer__infomation">
          <NuxtLink to="/">
            <img
              class="app-footer__infomation__img"
              :src="require('@/assets/images/Logo.svg')"
              alt=""
            />
          </NuxtLink>
          <p class="app-footer__infomation__text">
            © 2020 MyStays Hotel Management Co., Ltd.
          </p>
        </div>
        <div class="app-footer__links">
          <NuxtLink
            v-if="
              isShowCancelReservation ||
                getRouter.path == '/hotels-list' ||
                getRouter.path == '/'
            "
            to="/cancel"
            event
            :class="colorGray"
            @click.native.prevent="showCancelReservation"
          >
            <span class="icon-Icon-Undo" />
            {{ getLang.cancelReservation }}
          </NuxtLink>
          <NuxtLink to="/" :class="colorGray">
            {{ getLang.privacyPolicyText }}
          </NuxtLink>
        </div>
        <MyStayPopup
          ref="cancelReservationModal"
          :modal-class="`as`"
          :size="'lg'"
          :is-close-icon="true"
        >
          <div class="cancel-reservation-container">
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
              :disabled="!!(inputValue.name == 'hotelId')"
              @input="input"
            >
              <span
                v-if="
                  $v.inputValues[inputValue.name].value.$dirty &&
                    !checkIsExits(
                      $v.inputValues[inputValue.name].value.required
                    ) &&
                    !$v.inputValues[inputValue.name].value.required
                "
                class="app-input__validation"
                >{{ getLang.required }}</span
              >
              <span
                v-else-if="
                  $v.inputValues[inputValue.name].value.$dirty &&
                    !checkIsExits(
                      $v.inputValues[inputValue.name].value.email
                    ) &&
                    !$v.inputValues[inputValue.name].value.email
                "
                class="app-input__validation"
                >{{ getLang.validEmail }}</span
              >
            </InputCustom>
            <app-button
              :class="'float-right'"
              :button-text="getLang.submit"
              :validated="loginValid"
              button-type="primary"
              button-width="25%"
              @onclick="submitCancelReservation"
            />
          </div>
        </MyStayPopup>
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
                <div style="text-align: center">
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
  </div>
</template>

<script>
import { isNullOrUndefined } from "util";
import { mapState, mapActions, mapGetters } from "vuex";
import { FormLabel } from "../../../shared/constants/index";
import {
  requiredValidation,
  emailValidation
} from "../../../shared/helper/vuelidate-validator";
export default {
  name: "AppFooter",
  data() {
    return {
      inputValues: {
        bookingId: {
          name: "bookingId",
          value: "",
          type: "text",
          label: FormLabel.booking_id
        },
        emailInput: {
          name: "emailInput",
          value: "",
          type: "email",
          label: FormLabel.email
        }
      },
      selectedCancel: {
        reason: "",
        detail: ""
      },
      options: [],
      currentHotelId: "0",
      hotelId: "0",
      errorMessage: undefined,
      successMessage: undefined,
      colorGray: "ml-sm-3",
      colorGreen: "ml-sm-3 green"
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
      isShowCancelReservation: state => state.appAuthen.isShowCancelReservation,
      isReservationLoading: state => state.booking.isReservationLoading,
      hotelList: state => state.hotel.data.hotelList,
      bookingData: state => state.footer.data.bookingData,
      hotelDetail: state => state.hotelDetail.hotelDetail.data
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
    loginValid() {
      return this.$v.$dirty && this.$v.$invalid;
    },
    getLang() {
      return {
        privacyPolicyText: this.$t("headers.private_policy"),
        sitemapText: this.$t("headers.sitemap"),
        cancelReservation: this.$t("headers.cancel_reservation"),
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
        cancelReservations: this.$t("headers.cancel_reservation"),
        cancelYourBooking: this.$t("confirmbooking.cancel_your_booking"),
        sureToCancelBooking: this.$t("confirmbooking.sure_to_cancel_booking"),
        totalCancellationFee: this.$t("confirmbooking.total_cancellation_fee"),
        tripCancelled: this.$t("confirmbooking.trip_cancelled"),
        roomIsCheaper: this.$t("confirmbooking.room_is_chipper"),
        travelChanged: this.$t("confirmbooking.travel_changed"),
        anotherhHotel: this.$t("confirmbooking.another_hotel"),
        other: this.$t("confirmbooking.other"),
        provideDetail: this.$t("confirmbooking.provide_with_detail"),
        cancellationPolicy: this.$t("hoteldetail.cancellation_policy"),
        feeForRoom: this.$t("confirmbooking.fee_for_room"),
        guestName: this.$t("confirmbooking.guest_name"),
        provideReasonCancel: this.$t("confirmbooking.provide_reason_cancel")
      };
    },
    getRouter() {
      return this.$router.currentRoute;
    }
  },
  watch: {
    bookingData() {},
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
    this.inputValues.bookingId.value = this.bookingData.bookingId;
  },
  methods: {
    ...mapActions({
      cancelReservations: "booking/cancelReservations",
      getReservations: "booking/getReservations",
      getHotelList: "hotel/getHotelList"
    }),
    checkIsExits(param) {
      return isNullOrUndefined(param);
    },
    $_confirm() {
      this.cancelReservations(this.reservationParams);
      this.$refs.confirmDelete.hideModal();
    },
    $_cancel() {
      this.$refs.confirmDelete.hideModal();
    },

    showCancelReservation() {
      const currenPath = this.$router.currentRoute.path;
      if (
        currenPath === "/hotels-list" ||
        currenPath === "/" ||
        currenPath === "/my-profile"
      ) {
        this.$router.push("/cancel");
      } else if (currenPath === "/cancel") {
      } else if (currenPath === "/confirm-booking") {
        this.$refs.cancelReservationModal.showModal();
        setTimeout(() => {
          this.$refs.selectHotel.currentHotel = this.hotelDetail.name;
          this.currentHotelId = this.hotelDetail.name;
          this.inputValues.bookingId.value = this.bookingData.bookingId;
        }, 100);
      } else {
        this.$refs.cancelReservationModal.showModal();
        setTimeout(() => {
          this.$refs.selectHotel.currentHotel = this.hotelDetail.name;
          this.currentHotelId = this.hotelDetail.name;
          this.inputValues.bookingId.value = "";
        }, 100);
      }
    },
    submitCancelReservation() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$refs.confirmDelete.showModal();
        this.$refs.cancelReservationModal.hideModal();
        this.getReservations(this.reservationParams);
        // this.cancelReservations(params)
      }
    },
    changeHotelId(hotelId) {
      this.hotelId = hotelId;
    },
    inputHotel(hotel) {
      this.$v.currentHotelId.$touch();
      this.currentHotelId = hotel;
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.footer {
  background: $bg-color-nav;

  .app-footer {
    width: 100%;
    padding: 20px 0;
    display: flex;
    flex-direction: column;

    &__infomation {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;

      &__img {
        text-align: center;
        margin-bottom: 20px;

        @include min-md {
          margin: 0 20px 0 0;
        }
      }

      &__text {
        color: $white;
        margin-bottom: 20px;

        @include min-md {
          margin-bottom: 0;
        }
      }

      @include min-md {
        flex-direction: row;
      }
    }

    &__links {
      @include min-sm {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
      }

      @include min-xl {
        width: 40%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }

      a {
        flex-basis: 45%;
        text-align: center;
        margin-bottom: 10px;
        display: block;

        @include min-md {
          margin-bottom: 0;
        }

        @include min-sm {
          flex-basis: auto;
        }

        [class^="icon-"],
        [class*=" icon-"] {
          margin-right: 10px;
        }
      }
    }

    @include min-md {
      flex-direction: row;
      justify-content: space-between;
    }
  }
}

.cancel-reservation-container {
  &__title {
    text-align: center;
    margin: 15px;
  }
}
.float-right {
  font-weight: bold;
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
.ml-sm-3 {
  color: #fff;
  &.green {
    color: green;
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
