<template>
  <section class="confirm-stay-page">
    <AppHeader />
    <HotelNavigationBarStep :current-step="currentStep" />
    <LazyConfirmStay />
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapGetters, mapState } from "vuex";
import getGtmData from "../plugins/gtm";

export default Vue.extend({
  name: "ConfirmStayPage",
  data() {
    return {
      isSelectedHotel: true,
      currentStep: 6,
      isScroll: true,
      isShowBackToSearchResult: true,
      isChangeLanguage: false
    };
  },
  computed: {
    ...mapState({
      hotelID: (state: any) => state.hotel.data.hotelID
    }),
    ...mapGetters({
      reservationsData: "booking/reservationsData",
      userData: "users/userData",
      lang: "appHeader/language",
      fullLang: "appHeader/fullLanguage",
      token: "customer/auth/token"
    }),

    reservationQuestionParams(): any {
      return {
        hotelID: this.hotelID,
        reservationID: this.reservationsData?.reservation_number,
        byPassToken: this.reservationsData?.bypass_token,
        email: this.reservationsData?.email,
        fullLang: this.fullLang,
        q: {
          label_filters: [
            { labels: ["place_confirmation_screen"] },
            { labels: ["place_booking_process"] }
          ]
        }
      };
    },

    langForGetHotelDetail() {
      let lang = this.fullLang;
      if (this.fullLang === "en-US") {
        lang = "en";
      }

      return lang;
    },

    clientSession(): any {
      return this.token.session_token;
    }
  },
  watch: {
    token: {
      handler(token) {
        if (token.session_token && token.access_token) {
          this.getReservations(this.reservationParams());
          this.getSettingReservations(this.reservationParams());
          this.getHotelDetail({
            hotelID: this.$route.query.hotel_id,
            fullLang: this.fullLang
          });

          this.getHotelDetailV2({
            TargetLanguage: this.langForGetHotelDetail,
            HotelID: this.$route.query.hotel_id,
            IsClearCache: false,
            fullLang: this.fullLang
          });
        }
      },
      deep: true
    },
    fullLang(newLang) {
      if (this.isChangeLanguage) {
        this.getReservations(this.reservationParams());
        this.getHotelDetail({
          hotelID: this.$route.query.hotel_id,
          fullLang: newLang
        });

        this.getHotelDetailV2({
          TargetLanguage: this.langForGetHotelDetail,
          HotelID: this.$route.query.hotel_id,
          IsClearCache: false,
          fullLang: newLang
        });
      }
    },

    reservationQuestionParams(params: any) {
      if (params.reservationID) {
        this.getReservationQuestion(this.reservationQuestionParams);
      }
    }
  },
  created() {
    if (process.browser) {
      if (this.clientSession) {
        if (this.lang) {
          this.getReservations(this.reservationParams());
          this.getHotelDetail({
            hotelID: this.$route.query.hotel_id,
            fullLang: this.fullLang
          });

          this.getHotelDetailV2({
            TargetLanguage: this.langForGetHotelDetail,
            HotelID: this.$route.query.hotel_id,
            IsClearCache: false,
            fullLang: this.fullLang
          });
        }
        this.getSettingReservations(this.reservationParams());
      }
    }

    this.saveUrlParamsReservations(this.reservationParams());
    this.saveHotelID(this.$route.query.hotel_id);
  },
  mounted() {
    this.scrollToTop();
    this.showCancelReservation(true);
    this.updateBookingStatus(false);
    // get GTM Data
    getGtmData({
      triggerType: "Page Load",
      locale: "en-US",
      pageCategory: "ConfirmStayPage"
    });

    this.$nuxt.$on("onChangeLanguage", () => {
      this.isChangeLanguage = true;
    });
  },
  methods: {
    ...mapActions({
      showCancelReservation: "appAuthen/showCancelReservation",
      getSettingReservations: "booking/getSettingReservations",
      updateBookingStatus: "hotelDetail/updateBookingStatus",
      getReservations: "booking/getReservations",
      getHotelDetail: "hotelDetail/getHotelDetail",
      saveUrlParamsReservations: "booking/saveUrlParamsReservations",
      saveHotelID: "hotel/saveHotelID",
      getHotelDetailV2: "hotelDetail/getHotelDetailV2",
      getReservationQuestion: "confirmBooking/getReservationQuestion"
    }),

    scrollToTop() {
      window.scrollTo({
        top: 0,
        left: 0
      });
    },

    reservationParams(): any {
      const route = this.$route;
      const params = {
        hotelID: route.query.hotel_id,
        reservationID: route.params.reservationID,
        byPassToken: route.query.bypass_token,
        email: route.query.email,
        fullLang: this.fullLang
      };

      return params;
    }
  },

  head() {
    return {
      title: "Hotel Confirm Stay",
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
.confirm-stay-page {
  background: #ffffff;
  min-height: 100vh;
}
</style>
