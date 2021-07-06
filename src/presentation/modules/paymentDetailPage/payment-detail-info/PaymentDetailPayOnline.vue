<template>
  <div class="payment-online">
    <div class="payment-detail__info pay-online" @click="isPayOnline">
      <div v-show="!isBillingSection" class="pay-online__section">
        <input id="pay-online-radio" name="payment" type="radio" />
        <label for="pay-online-radio" />
        <div class="pay-online__section__text">
          <h6>{{ getLang.payOnline }}</h6>
          <p>{{ getLang.payOnlineText }}</p>
        </div>
        <button class="button m-btn m-btn__white">
          <span class="icon-Icon-Credit-Card" />
          {{ getLang.addCredit }}
        </button>
      </div>
      <div v-show="isBillingSection">
        <PayOnlineBilling />
      </div>
    </div>
    <div
      v-show="paymentMethodFromStore.isOnsite"
      class="payment-detail__info pay-online"
      @click="isPayLater"
    >
      <div class="pay-online__section">
        <input
          id="pay-later-radio"
          ref="payLaterRadio"
          name="payment"
          type="radio"
        />
        <label for="pay-later-radio" />
        <div class="pay-online__section__text">
          <h6>{{ getLang.payLater }}</h6>
          <p>{{ getLang.payLaterText }}</p>
        </div>
        <button class="button m-btn m-btn__blue">
          {{ getLang.flexPlan }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { paymentType } from "../../../../shared/constants/index";

export default {
  name: "PaymentDetailPayOnline",
  props: {},
  data() {
    return {
      isBillingSection: false,
      paymentMethod: "",
      payLater: {},
    };
  },
  computed: {
    ...mapGetters({
      paymentMethodFromStore: "paymentDetail/paymentMethod",
    }),
    getLang() {
      return {
        payOnline: this.$t("payment_info.pay_online"),
        payOnlineText: this.$t("payment_info.pay_online_text"),
        addCredit: this.$t("payment_info.add_credit"),
        payLater: this.$t("payment_info.pay_later"),
        payLaterText: this.$t("payment_info.pay_later_text"),
        flexPlan: this.$t("payment_info.flex_plan"),
      };
    },
  },
  mounted() {
    if (!this.paymentMethodFromStore.isOnsite) {
      this.isPayOnline();
      this.changePaymentMethodStatus("payOnline");
    }
  },
  methods: {
    ...mapActions({
      changePaymentMethodStatus: "paymentDetail/changePaymentMethodStatus",
    }),
    isPayOnline() {
      this.isBillingSection = true;
      if (this.$refs.payLaterRadio) {
        this.$refs.payLaterRadio.checked = false;
      }
      this.paymentMethod = paymentType.PayOnline;
      this.changePaymentMethodStatus("payOnline");
    },
    isPayLater() {
      this.isBillingSection = false;
      this.$refs.payLaterRadio.checked = true;
      this.paymentMethod = paymentType.PayLater;
      this.changePaymentMethodStatus("payLate");
    },
  },
};
</script>

<style lang="scss" scoped>
.payment-detail__info.pay-online {
  padding: 35px 0;
  cursor: pointer;
  border-bottom: 1px solid $border-color-gray-2;
  input[type="radio"] {
    flex: 0 1 50px;
  }

  button {
    flex: 1 1 100%;
    height: 50px;
    margin-top: 20px;

    @include min-sm {
      flex: 0 1 270px;
      margin-top: 0;
    }
  }

  .pay-online {
    &__section {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;

      &__text {
        flex: 1;
        margin-right: 0;
        font-size: 14px;

        @include min-sm {
          margin-right: 15px;
        }

        h6 {
          font-weight: bold;
        }
      }
    }
  }
}
</style>
