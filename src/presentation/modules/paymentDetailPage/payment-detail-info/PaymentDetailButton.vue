<template>
  <div class="payment-detail__button">
    <button class="button m-btn m-btn__yellow" @click="$_handlePayment">
      {{ getLang.checkoutMobile }}
    </button>
  </div>
</template>

<script>
export default {
  name: "PaymentDetailButton",
  computed: {
    getLang() {
      return {
        checkoutMobile: this.$t("payment_info.checkout_mobile"),
      };
    },
  },
  methods: {
    $_handlePayment() {
      this.$router.push("/confirm-booking");
    },
  },
};
</script>

<style lang="scss" scoped>
.payment-detail {
  &__button {
    margin-top: 15px;
    padding: 17px 15px;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(0, 0, 0, 0.1) 100%
    );

    @include min-sm {
      display: none;
    }

    button {
      width: 100%;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;

      [class^="icon-"],
      [class*=" icon-"] {
        font-size: 17px;
        margin: 0 20px 0 -10px;
      }
    }
  }
}
</style>
