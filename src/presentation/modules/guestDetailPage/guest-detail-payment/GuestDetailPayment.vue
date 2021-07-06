<template>
  <div class="guest-detail__payment">
    <div class="guest-detail__payment call-out">
      <p class="is-bold">
        {{ getLang.questions }}
      </p>
      <div class="call-out__tel">
        <span class="icon-Icon-Phone" />
        {{ getLang.call }} 1-800-123-1234
      </div>
    </div>
    <GuestDetailPaymentInfo />
    <div v-show="!isLogin" class="guest-detail__payment login">
      <LoginBlock />
      <TotalPrcie />
    </div>
    <div class="guest-detail__payment__policy">
      <GuestDetailPolicy
        :is-click-payment="isClickPayment"
        @onCheckedPolicy="onCheckedPolicy"
      />
    </div>
    <button
      class="guest-detail__payment button m-btn m-btn__yellow"
      @click="$_handleGoToPayment"
    >
      {{ getLang.continueToPayment }}
    </button>
    <!-- <button class="guest-detail__payment button m-btn m-btn__white">
      <span class="icon-Icon-Timer" />
      {{getLang.holdReservation}}
    </button> -->
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapState, mapGetters } from "vuex";

export interface IPaymentType {
  type: string;
}

export interface IPaymentInfo extends IPaymentType {
  planName: string;
  guest: number;
  nightPrices: Array<number>;
}

export interface IDiscount extends IPaymentType {
  discountText: string;
  discountPrice: number;
}

export interface ITaxes extends IPaymentType {
  taxesText: string;
  taxes: number;
  hotelFee: number;
  onsenFee: number;
}

export default Vue.extend({
  name: "GuestDetailPayment",
  props: {
    isAuthened: Boolean
  },
  data() {
    return {
      isCheckedPolicy: false,
      isClickPayment: false
    };
  },
  computed: {
    ...mapState({
      isLogin: (state: any) => state.users.data.isLogin,
      selectedRoom: (state: any) => state.hotelDetail.selectedRoom,
      roomSelectedFromAPI: (state: any) =>
        state.hotelDetail.roomSelectedFromAPI,
      hotelID: (state: any) => state.hotel.hotelID
    }),

    ...mapGetters({
      isFormInvalid: "guestDetail/isFormInValid",
      isMakingForSomeoneFormInValid:
        "guestDetail/isMakingForSomeoneFormInValid",
      fullLang: "appHeader/fullLanguage",
      roomDetailFromAPI: "hotelDetail/roomDetailFromAPI",
      totalPrice: "hotelDetail/totalPrice",
      totalNight: "booking/totalNight",
      roomList: "booking/roomList",
      numberChildren: "booking/numberChildren",
      numberAdults: "booking/numberAdults",
      hotelSelected: "hotel/hotelSelected"
    }),

    getLang(): object {
      return {
        questions: this.$t("payment_detail.questions"),
        call: this.$t("payment_detail.call"),
        continueToPayment: this.$t("payment_detail.continue_payment"),
        holdReservation: this.$t("payment_detail.hold_reservation")
      };
    }
  },
  methods: {
    ...mapActions({
      triggerSubmitButton: "guestDetail/triggerSubmitButton",
      saveAdditionallData: "guestDetail/saveAdditionallData"
    }),
    $_handleGoToPayment(): void {
      this.triggerSubmitButton();
      this.isClickPayment = true;
      if (!this.isFormInvalid && !this.isMakingForSomeoneFormInValid && this.isCheckedPolicy) {
        this.$nuxt.$emit("saveExtrasParams");
        this.$router.push((this as any).$pageRoute.payment);

        const additionalData = {
          triggerType: "Event",
          event: "additionalQuestions",
          language: this.fullLang,
          pageCategory: "GuestDetailPage",
          hotelID: this.hotelID,
          roomID: this.roomDetailFromAPI[0]?.roomID,
          planID: this.roomDetailFromAPI[0]?.roomPlanCode
        };
        this.saveAdditionallData(additionalData);
      }
    },

    onCheckedPolicy(isChecked: boolean) {
      this.isCheckedPolicy = isChecked;
    }
  }
});
</script>

<style lang="scss" scoped>
.guest-detail__payment {
  display: none;
  &__policy {
    font-size: 14px;
    display: flex;
    align-items: flex-start;
    cursor: pointer;

    a {
      font-size: 14px;
      cursor: pointer;
      color: #007bff;
      display: inline-flex;
      margin-bottom: 0;
      font-weight: normal;

      &:hover {
        text-decoration: underline;
      }
    }

    .label {
      margin-top: -5px;
    }

    .checkbox-error {
      color: #ec1000;
    }

    .checbox-success {
      color: #00805b;
    }
  }
  @include min-sm {
    width: 388px;
    display: block;
    margin: 30px auto;
    @include min-xl {
      margin: 0;
    }
  }
  &.call-out {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    p {
      margin-right: 10px;
      margin-bottom: 0;
      font-size: 14px;
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
  &.total {
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
  .button {
    width: 100%;
    padding: 15px;
    margin-top: 20px;
    position: relative;
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
</style>
