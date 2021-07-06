<template>
  <LazyPayment />
</template>

<script>
import Vue from "vue";
import { mapState, mapActions, mapGetters } from "vuex";
import getGtmData from "../plugins/gtm";

export default Vue.extend({
  name: "PaymentDetail",
  onIdle() {
    this.$router
      .push({
        path: `/hotel/${this.hotelID}`,
        query: this.hotelDetailRouteParams
      })
      .catch(() => {});
  },
  computed: {
    ...mapState({
      fullPathHotelDetail: state => state.hotel.data.fullPathHotelDetail,
      hotelID: state => state.hotel.data.hotelID,
      bookingData: state => state.booking.bookingData,
      roomSelected: state => state.hotelDetail.selectedRoom
    }),
    ...mapGetters({
      roomListWithChildren: "booking/roomListWithChildren",
      totalPrice: "hotelDetail/totalPriceWithoutTax",
      adults: "booking/numberAdults",
      children: "booking/numberChildren",
      fullLang: "appHeader/fullLanguage",
      roomSelectedParams: "booking/roomSelectedParams",
      hotelDetailRouteParams: "booking/hotelDetailRouteParams"
    })
  },
  watch: {
    fullLang(lang) {
      this.getHotelDetail({ hotelID: this.hotelID, fullLang: lang });
      this.getRoomSelected(this.roomSelectedParam(lang));
    }
  },
  created() {
    if (!this.roomSelected.length) {
      if (this.fullPathHotelDetail) {
        this.$router.push(this.fullPathHotelDetail);
      } else {
        this.$router.push("/");
      }
    }
  },
  mounted() {
    this.scrollToTop();
    getGtmData({
      triggerType: "Page Load",
      locale: "en-US",
      pageCategory: "PaymentDetailPage"
    });
  },
  methods: {
    ...mapActions({
      getHotelDetail: "hotelDetail/getHotelDetail",
      getRoomSelected: "hotelDetail/getRoomSelected"
    }),

    scrollToTop() {
      window.scrollTo({
        top: 0,
        left: 0
      });
    },

    roomSelectedParam(lang) {
      return {
        hotelID: this.hotelID,
        queryString: {
          checkin_date: this.bookingData.checkIn,
          checkout_date: this.bookingData.checkOut,
          children: this.children,
          mode: "standard",
          adults: this.adults,
          total_price_without_tax: this.totalPrice,
          rooms: this.roomSelectedParams
        },
        fullLang: lang
      };
    }
  }
});
</script>
