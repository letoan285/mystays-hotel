<template>
  <div class="payment-detail__payment">
    <div class="payment-detail__payment call-out">
      <p class="is-bold">
        {{ getLang.questions }}
      </p>
      <div class="call-out__tel">
        <span class="icon-Icon-Phone" />
        {{ getLang.call }} 1-800-123-1234
      </div>
    </div>
    <GuestDetailPaymentInfo v-if="!isMobile" />
    <div class="payment-detail__payment login">
      <LoginBlock v-if="!isLogin" :is-authened="isAuthened" />
      <TotalPrcie />
    </div>
    <div
      class="payment-detail__payment__button"
      :class="{ 'is-fixed': isFixed }"
    >
      <b-button
        class="button m-btn m-btn__yellow"
        :disabled="isLoading || isUpdateLoading"
        @click="$_handlePayment"
      >
        <b-spinner v-if="isLoading || isUpdateLoading" small />
        {{ isUpdateBooking ? "Confirm Updates" : getLang.checkout }}
      </b-button>
    </div>
    <MyStayPopup
      ref="reservationsError"
      :modal-class="'reservations-error'"
      size="lg"
      :centered="true"
      :is-close-icon="true"
    >
      <div class="reservations-error-content">
        {{ reservationsError }}
      </div>
    </MyStayPopup>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapActions, mapGetters } from "vuex";

export default Vue.extend({
  name: "PaymentDetailPayment",
  props: {
    isAuthened: Boolean
  },
  data() {
    return {
      isReservations: false,
      isFixed: false
    };
  },
  computed: {
    ...mapState({
      isLogin: (state: any) => state.users.data.isLogin,
      isMobile: (state: any) => state.general.data.isMobile,
      guestData: (state: any) => state.guestDetail.guest,
      bookingData: (state: any) => state.booking.bookingData,
      isLoading: (state: any) => state.booking.paymentState.isLoading,
      cardToken: (state: any) => state.paymentDetail.paymentState.token,
      paymentMethodSelected: (state: any) =>
        state.paymentDetail.paymentMethodSelected,
      isFormValidated: (state: any) => state.paymentDetail.isFormValidated,
      hotelId: (state: any) => state.hotel.data.hotelID,
      reservationData: (state: any) => state.booking.reservationData,
      isUpdateBooking: (state: any) => state.hotelDetail.isUpdateBooking,
      isUpdateLoading: (state: any) => state.booking.isUpdateLoading,
      reservationError: (state: any) => state.booking.reservationError
    }),
    ...mapGetters({
      numberAdults: "booking/numberAdults",
      numberChildren: "booking/numberChildren",
      roomData: "booking/roomData",
      isBillingInformationValidated:
        "paymentDetail/isBillingInformationValidated"
    }),
    getLang(): any {
      return {
        questions: this.$t("payment_detail.questions"),
        call: this.$t("payment_detail.call"),
        checkout: this.$t("payment_info.checkout"),
        holdReservation: this.$t("payment_detail.hold_reservation")
      };
    },
    getParamsReservations(): any {
      const payment = this.paymentMethodSelected.payOnline
        ? { type: "credit_card", card_token: this.cardToken.token }
        : { type: "on_site" };
      const payload = {
        hotelId: this.hotelId,
        queryParam: {
          adults: this.numberAdults,
          children: this.numberChildren,
          checkin_date: this.bookingData.checkIn,
          checkout_date: this.bookingData.checkOut,
          guest: this.guestData[0],
          payment,
          rooms: this.roomData,
          spending_point: 0,
          extra_items: [],
          additional_questions: [],
          coupon_code: this.bookingData.promoCode
        }
      };
      return payload;
    },

    getParamsUpdateBooking(): any {
      const params = {
        hotelID: this.hotelId,
        reservationID: this.reservationData.reservation_number,
        email: this.reservationData.email,
        byPassToken: this.reservationData.bypass_token,
        body: {
          ...this.getParamsReservations.queryParam
        }
      };

      return params;
    },

    reservationsError(): any {
      const error = this.reservationError?.error?.message[0]?.title;

      return error;
    }
  },
  watch: {
    cardToken: {
      handler(newValue) {
        if (newValue) {
          if (this.isUpdateBooking) {
            this.updateReservations(this.getParamsUpdateBooking);
          } else {
            this.createReservations(this.getParamsReservations);
          }
        }
      },
      deep: true
    },
    reservationData: {
      handler(newValue) {
        if (newValue.reservation_number && this.isReservations) {
          this.clearRoomSelected();
          const q = {
            email: newValue.guest.email,
            bypass_token: newValue.bypass_token,
            hotel_id: this.hotelId
          };
          this.$router.push({
            path: `confirm-booking/${newValue.reservation_number}`,
            query: q
          });
        }
      },
      deep: true
    },

    reservationError(error) {
      if (error) {
        (this as any).$refs.reservationsError.showModal();
      }
    }
  },
  mounted() {
    this.getDataPayment("");
    window.addEventListener("scroll", this.$_onScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.$_onScroll);
  },
  methods: {
    ...mapActions({
      triggerPayment: "paymentDetail/triggerPayment",
      createReservations: "booking/createReservations",
      getDataPayment: "paymentDetail/getDataPayment",
      updateReservations: "booking/updateReservations",
      clearRoomSelected: "hotelDetail/clearRoomSelected"
    }),
    $_handlePayment() {
      this.isReservations = true;
      if (this.paymentMethodSelected.payOnline) {
        this.triggerPayment();
      } else if (this.isUpdateBooking) {
        this.updateReservations(this.getParamsUpdateBooking);
      } else {
        this.createReservations(this.getParamsReservations);
      }
    },

    $_onScroll() {
      const paymentOffsetTop: any = document.querySelector(".payment-total");
      if (
        window.pageYOffset + window.innerHeight >=
        paymentOffsetTop.offsetTop +
          paymentOffsetTop.getBoundingClientRect().height +
          102
      ) {
        this.isFixed = true;
      } else {
        this.isFixed = false;
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.payment-detail__payment {
  width: 100%;
  margin-bottom: 10px;
  @include min-sm {
    width: 388px;
    display: block;
    margin: 30px auto;

    @include min-xl {
      margin: 0;
    }
  }
  &.call-out {
    display: none;
    @include min-sm {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;

      p {
        margin-right: 10px;
      }

      .call-out {
        &__tel {
          white-space: nowrap;
          font-size: 13px;
          color: $text-color-blue-2;
          font-weight: bold;

          [class^="icon-"],
          [class*=" icon-"] {
            margin-right: 5px;
            font-size: 15px;
          }
        }
      }
    }
  }

  &.total {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid $border-color-gray-2;
    background: $bg-color-yellow-2;
    padding: 15px 20px;
    border-radius: 2px;

    .total {
      &__left {
        h5 {
          color: $text-color-blue;
          margin-bottom: 5px;
        }

        a {
          display: block;
          font-size: 12px;
          color: $text-color-blue-2;
          margin: 0;
        }
      }

      &__right {
        display: flex;
        align-items: center;
        font-size: 18px;
        font-weight: bold;

        [class^="icon-"],
        [class*=" icon-"] {
          margin-left: 10px;
          font-size: 15px;
        }
      }
    }
  }

  &.login {
    margin-top: 20px;
  }

  &__button {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 15px;
    z-index: 5;
    background: white;

    @include min-sm {
      position: static;
      padding: 0;
    }

    .button {
      width: 100%;
      padding: 15px;
      margin-bottom: 7px;
      position: relative;
      &:disabled {
        cursor: not-allowed;
      }
      [class^="icon-"],
      [class*=" icon-"] {
        position: absolute;
        top: 50%;
        left: 20px;
        transform: translateY(-50%);
        font-size: 20px;
      }
    }
  }

  .is-fixed {
    position: static;
    padding: 0;
  }
}

.reservations-error-content {
  color: red;
  padding: 20px 10px;
}
</style>
