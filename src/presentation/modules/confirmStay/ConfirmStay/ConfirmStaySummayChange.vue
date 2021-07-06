<template>
  <section class="stay-summary-change">
    <div class="stay-summary-change__title">
      <h4>{{ getLanguage.summaryCharges }}</h4>
    </div>
    <div class="stay-summary-change__content">
      <div
        v-show="reservationsData.coupon_promotion"
        class="stay-summary-change__content__save"
      >
        <span>
          You saved 10% with ‘{{
            reservationsData.coupon_promotion &&
              reservationsData.coupon_promotion.coupon_code
          }}’
        </span>
        <span>{{
          -reservationsData.coupon_discount_amount | currency("YEN")
        }}</span>
      </div>
      <div class="stay-summary-change__content__collapse">
        <AppCollapse
          v-for="(item, index) in summaryCharges"
          :key="index"
          :room-detail-info="item"
          :room-i-d="`${index}`"
        />
      </div>
      <AppCollapse
        :room-detail-info="getTax"
        :room-i-d="`tax`"
        :fw-bold="true"
      />
      <!-- <div class="stay-summary-change__content__total">
        <span>{{ getLanguage.yourTotal }}</span>
        <span>{{ totalPrice | currency("YEN") }}</span>
      </div>-->
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapGetters } from "vuex";

export default Vue.extend({
  name: "ConfirmStaySummayChange",
  data() {
    return {
      promoCode: ""
    };
  },
  computed: {
    ...mapState({
      tax: (state: any) => state.hotelDetail.tax,
      promotionCode: (state: any) => state.booking.bookingData.promoCode
    }),
    ...mapGetters({
      tax: "hotelDetail/taxFromAPI",
      totalPrice: "hotelDetail/totalPrice",
      promoCodeSave: "hotelDetail/couponDiscount",
      reservationsData: "booking/reservationsData"
    }),
    // eslint-disable-next-line vue/return-in-computed-property
    getTax(): any {
      const taxName = [
        this.$t("summary.tax"),
        this.$t("summary.hotel_fee"),
        this.$t("summary.onsen_fee")
      ];
      if (this.tax) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.tax.title = this.$t("summary.tax_and_fee_change");
        this.tax.detail.forEach((t: any, taxID: any) => {
          t.time = taxName[taxID];
        });
        return this.tax;
      }
    },
    getLanguage(): any {
      return {
        summaryCharges: this.$t("summary.summary_of_charges"),
        yourTotal: this.$t("summary.your_total"),
        night: this.$t("customhtmlcalendar.night"),
        child: this.$t("booking.child"),
        children: this.$t("booking.children"),
        adult: this.$t("booking.adult"),
        adults: this.$t("booking.adults")
      };
    },

    summaryCharges(): any {
      const roomDetail = this.reservationsData?.rooms?.map((room: any) => {
        const roomRate = room.room_rates?.map((rate: any, rateIdx: number) => {
          return {
            price: rate.day_total_rate,
            time: `${this.getLanguage.night} ${rateIdx + 1}`
          };
        });

        const totalPrice = roomRate
          .map((room: any) => room.price)
          .reduce((a: any, b: any) => a + b);
        const roomDetailInfo = {
          title: `${room.room_type_name} , ${room.room_plan_name} `,
          totalPrice,
          detail: roomRate,
          numberAdults: room.adults,
          numberChildren: room.children
        };

        return roomDetailInfo;
      });

      return roomDetail;
    }
  },
  mounted() {
    this.promoCode = this.promotionCode;
  }
});
</script>

<style lang="scss" scoped>
.stay-summary-change {
  margin-bottom: 40px;
  @include min-sm {
    padding: 27px 30px 30px 30px;
    border: 1px solid $border-color-gray-2;
    border-radius: 4px;
    margin-bottom: 30px;
  }
  &__title {
    margin-bottom: 10px;
    h4 {
      font-size: 18px;
      font-weight: 600;
    }
  }

  &__content {
    &__save {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      color: $text-color-pink-2;
      border-bottom: 1px solid $border-color-gray-2;
      padding: 10px 0 13px;

      span {
        // text-transform: uppercase;
        font-weight: 600;
        &:last-child {
          @include min-sm {
            margin-right: 24px;
          }
        }
      }
    }

    &__total {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      padding: 13px 20px 0 0;
      font-weight: bold;
      @include min-sm {
        padding-right: 24px;
      }
    }
  }
}
</style>
