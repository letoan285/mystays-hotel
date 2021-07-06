<template>
  <div class="hotel-review">
    <HotelNavigationBar
      :is-selected-hotel="isSelectedHotel"
      :current-step="currentStep"
      :is-show-back-to-search-result="isShowBackToSearchResult"
    />
    <CompareBooking />
    <LazyHotelReviewStay />
  </div>
</template>

<script>
import Vue from "vue";
import { mapActions, mapState, mapGetters } from "vuex";
import getGtmData from "../plugins/gtm";
import { pageTitle } from "../shared/constants/pageTitle";

export default Vue.extend({
  name: "HotelReview",
  data() {
    return {
      isSelectedHotel: true,
      currentStep: 3,
      isShowBackToSearchResult: true
    };
  },
  onIdle() {
    this.$router
      .push({
        path: `/hotel/${this.hotelID}`,
        query: this.hotelDetailRouteParams
      })
      .catch(() => {});
  },
  onActive() {},
  computed: {
    ...mapState({
      hotelID: state => state.hotel.data.hotelID,
      bookingData: state => state.booking.bookingData,
      isUpdateBooking: state => state.hotelDetail.isUpdateBooking,
      fullPathHotelDetail: state => state.hotel.data.fullPathHotelDetail,
      roomParamsForGetRoomSelected: state =>
        state.booking.roomParamsForGetRoomSelected
    }),
    ...mapGetters({
      lang: "appHeader/language",
      fullLang: "appHeader/fullLanguage",
      roomDetails: "hotelDetail/roomDetails",
      hotelDetail: "hotelDetail/hotelDetail",
      roomSelectedParams: "booking/roomSelectedParams",
      totalPriceWithoutTax: "hotelDetail/totalPriceWithoutTax",
      hotelDetailRouteParams: "booking/hotelDetailRouteParams",
      numberAdultsInRoomSelected: "booking/numberAdultsInRoomSelected",
      numberChildrenInRoomSelected: "booking/numberChildrenInRoomSelected"
    }),

    // eslint-disable-next-line vue/return-in-computed-property
    roomPlanCode() {
      if (this.roomDetails?.length) {
        return this.roomDetails[0]?.roomPlanCode;
      }
    },

    hotelIDandPlanCode() {
      return {
        hotelID: this.hotelID
      };
    }
  },
  watch: {
    hotelIDandPlanCode: {
      handler(hotel) {
        const params = {
          hotelID: hotel.hotelID,
          queryString: {
            room_plan_codes: this.roomPlanCode
          },
          fullLang: this.fullLang
        };
        this.getCancellationPolicies(params);
      },
      deep: true
    },

    roomDetails: {
      handler(rooms) {
        if (!this.isUpdateBooking && rooms.length) {
          this.getRoomSelected(this.buildParams(this.fullLang));
        }
      },
      deep: true
    },

    fullLang(lang) {
      const params = {
        hotelID: this.hotelID,
        queryString: {
          room_plan_codes: this.roomPlanCode
        },
        fullLang: lang
      };
      if (this.roomPlanCode) {
        this.getCancellationPolicies(params);
        if (!this.isUpdateBooking) {
          this.getRoomSelected(this.buildParams(lang));
        }
      }
      this.getHotelDetail({ hotelID: this.hotelID, fullLang: lang });
    }
  },
  created() {
    if (!this.roomDetails.length) {
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
      pageCategory: "HotelReviewPage"
    });
    this.showCancelReservation(false);
    const params = {
      hotelID: this.hotelID,
      queryString: {
        room_plan_codes: this.roomPlanCode
      },
      fullLang: this.fullLang
    };

    if (!this.hotelDetail.name) {
      this.getHotelDetail({ hotelID: this.hotelID, fullLang: this.fullLang });
    }

    if (this.roomDetails.length) {
      this.getRoomSelected(this.buildParams(this.fullLang));
    }

    if (this.roomPlanCode) {
      this.getCancellationPolicies(params);
    }
  },
  methods: {
    ...mapActions({
      showCancelReservation: "appAuthen/showCancelReservation",
      getCancellationPolicies: "hotelDetail/getCancellationPolicies",
      getRoomSelected: "hotelDetail/getRoomSelected",
      getHotelDetail: "hotelDetail/getHotelDetail"
    }),

    scrollToTop() {
      window.scrollTo({
        top: 0,
        left: 0
      });
    },

    buildParams(lang) {
      return {
        hotelID: this.hotelID,
        queryString: {
          checkin_date: this.bookingData.checkIn,
          checkout_date: this.bookingData.checkOut,
          children: this.numberChildrenInRoomSelected,
          mode: "standard",
          adults: this.numberAdultsInRoomSelected,
          total_price_without_tax: this.totalPriceWithoutTax,
          rooms: this.roomSelectedParams,
          coupon_code: this.bookingData.promoCode
        },
        fullLang: lang
      };
    }
  },
  head() {
    return {
      title: pageTitle.hotelReview,
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Mystays Hotel"
        }
      ]
    };
  }
});
</script>

<style lang="scss" scoped>
.hotel-review {
  background: #ffffff;
  min-height: 100vh;
}
</style>
