<template>
  <div class="payment-detail__info">
    <div class="payment-detail__info__title" v-show="paymentMethod.isOnsite">
      <h5>
        {{ getLang.payQuestion }}
      </h5>
    </div>
    <PaymentDetailPayOnline />
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "PaymentDetailInfo",
  props: {
    isAuthened: {
      type: Boolean
    }
  },
  data() {
    return {
      agreeWithCondition: [
        {
          value: true,
          text: ""
        }
      ],
      agreeStatus: []
    };
  },
  computed: {
    ...mapState({
      isLogin: state => state.users.data.isLogin
    }),
    ...mapGetters({
      paymentMethod: "paymentDetail/paymentMethod"
    }),
    getLang() {
      return {
        payQuestion: this.$t("payment_info.pay_question"),
        agree: this.$t("payment_info.agree"),
        bookingCondition: this.$t("payment_info.booking_condition"),
        termsAndPolicy: this.$t("payment_info.terms_and_policy")
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.payment-detail {
  &__info {
    width: 100%;

    @include min-md {
      width: 656px;
    }

    h5 {
      display: none;
      margin-top: 40px;
      padding-bottom: 30px;
      border-bottom: 1px solid $border-color-gray-2;

      @include min-sm {
        display: block;
      }
    }

    .login-and-payment {
      margin-top: 20px;

      @include min-sm {
        display: none;
      }
    }

    &__agree {
      margin-top: 20px;
      padding: 15px;
      background: $bg-color-gray-10;
      border-radius: 3px;

      a {
        display: inline;
        color: $text-color-blue-2;
        font-size: 14px;
        text-decoration: underline;
      }

      label {
        color: $text-color-blue;
      }
    }
  }
}
</style>
