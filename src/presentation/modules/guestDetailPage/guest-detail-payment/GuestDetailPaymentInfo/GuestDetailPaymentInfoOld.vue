<template>
  <div class="guest-detail-payment info">
    <h5>{{ getLang.summary }}</h5>
    <div class="guest-detail-payment__collapse">
      <AppCollapse
        v-for="(room, index) in roomSelected"
        :key="index"
        :room-detail-info="room"
        :room-i-d="`room__${index}`"
        :guest-detail="`guestDetail`"
      />
    </div>
    <div v-show="promoCodeSave" class="guest-detail-payment__promo-code">
      <span>You saved 10% with ‘{{ promoCode }}’</span>
      <span>{{ promoCodeSave | currency("YEN") }}</span>
    </div>
    <AppCollapse :room-detail-info="tax" :room-i-d="`tax`" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapGetters } from "vuex";

export default Vue.extend({
  name: "GuestDetailPaymentInfoOld",
  props: {
    isMobile: {
      type: Boolean
    }
  },
  data() {
    return {
      isMobileMode: this.isMobile
    };
  },
  computed: {
    ...mapState({
      isLogin: (state: any) => state.users.data.isLogin,
      promoCode: (state: any) => state.booking.bookingData.promoCode
    }),
    ...mapGetters({
      tax: "hotelDetail/tax",
      promoCodeSave: "hotelDetail/couponDiscount",
      roomSelected: "hotelDetail/roomSelected"
    }),

    getLang(): any {
      return {
        summary: this.$t("payment_detail.summary")
      };
    }
  }
});
</script>

<style lang="scss" scoped>
.guest-detail-payment {
  border: 1px solid $border-color-gray-2;
  border-radius: 2px;
  padding: 34px;

  h5 {
    color: $text-color-blue;
    margin-bottom: 20px;
  }

  &__promo-code {
    font-size: 13px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 13px 24px 13px 0;
    border-bottom: 1px solid $border-color-gray-2;
    span {
      color: #f5455a;
      // text-transform: uppercase;
      font-weight: 600;
      &:last-child {
        font-size: 14px;
        font-weight: bold;
      }
    }
  }
}
</style>
