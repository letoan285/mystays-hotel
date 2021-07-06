<template>
  <div class="payment">
    <HotelNavigationBar
      :is-selected-hotel="isSelectedHotel"
      :is-login="isAuthened"
      :current-step="currentStep"
      :is-show-back-to-search-result="isShowBackToSearchResult"
    />
    <CompareBooking />
    <section
      class="payment-detail"
      :class="{ 'is-update-booking': isUpdateBooking }"
    >
      <div class="container">
        <h1>{{ getLang.payment }}</h1>
        <div class="payment-detail-section">
          <PaymentDetailInfo :is-authened="isAuthened" />
          <PaymentDetailPayment :is-authened="isAuthened" />
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapState } from "vuex";

export default Vue.extend({
  name: "Payment",
  data() {
    return {
      isAuthened: false,
      isSelectedHotel: true,
      currentStep: 5,
      isShowBackToSearchResult: true
    };
  },
  computed: {
    ...mapState({
      isUpdateBooking: (state: any) => state.hotelDetail.isUpdateBooking
    }),
    getLang() {
      return {
        guest: this.$t("payment_info.guest"),
        payment: this.$t("payment_info.payment")
      };
    }
  },
  mounted() {
    this.showCancelReservation(false);
  },
  methods: {
    ...mapActions({
      showCancelReservation: "appAuthen/showCancelReservation"
    })
  }
});
</script>

<style lang="scss" scoped>
.payment {
  min-height: 80vh;
  background: white;
}
.is-update-booking {
  padding-top: 20px;
}

.payment-detail {
  background: $white;
  padding-top: 30px;
  @include min-xl {
    padding-top: 75px;
    padding-bottom: 100px;
  }
  h1 {
    font-size: 30px;
    color: $text-color-blue;
    font-weight: bold;
    margin-bottom: 20px;
    width: 100%;
    @include min-md {
      width: 656px;
      margin: 0 auto 20px auto;
    }
    @include min-xl {
      width: auto;
      margin: 0 0 20px 0;
    }
  }
  p,
  label {
    font-size: 14px;
    color: $text-color-blue;
    line-height: 17px;
    margin-bottom: 0;
    &.is-bold {
      font-weight: bold;
    }
  }
  a {
    font-size: 20px;
    color: $bg-color-blue;
    font-weight: bold;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    @include min-sm {
      display: none;
    }
    [class^="icon-"],
    [class*=" icon-"] {
      margin-right: 15px;
    }
  }
  &-section {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    @include min-xl {
      flex-direction: row;
      align-items: flex-start;
    }
  }
}
</style>
