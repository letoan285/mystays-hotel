<template>
  <div class="home-page">
    <div class="app-container">
      <AppHeader />
      <Booking />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapActions, mapState, mapGetters } from "vuex";
import { STATIC_HOTEL_ID } from "../shared/constants";
import { pageTitle } from "../shared/constants/pageTitle";
import getGtmData from "../plugins/gtm";

export default Vue.extend({
  name: "HomePage",
  computed: {
    ...mapState({
      hotelFilter: state => state.hotel.data.hotelFilter,
      access_token: state => state.customer.auth.data.access_token
    }),
    ...mapGetters({
      myLocation: "general/myLocation",
      fullLang: "appHeader/fullLanguage"
    })
  },
  created() {
    if (!this.hotelFilter.length) {
      this.filterHotelList({
        searchParam: {
          keyword: ""
        }
      });
    }

    this.closeAll();
    this.clearHotelDetail();
  },
  mounted() {
    getGtmData({
      triggerType: "Page Load",
      locale: "en-US",
      pageCategory: "HomePage"
    });

    this.saveFullPath("");
    this.showCancelReservation(true);

    const fullPath = decodeURIComponent(this.$route.fullPath);
    const isResetPassword = fullPath.split("reset_password_token=")[1];

    if (isResetPassword) {
      this.toggleLogin({ isLoginOpen: true });
      this.getRessetPasswordToken(isResetPassword);
      this.goToRessetPasswordConfirm();
    }
  },
  methods: {
    ...mapActions({
      closeAll: "booking/closeAll",
      saveFullPath: "hotel/saveFullPath",
      setLocation: "general/setLocation",
      getLocation: "general/getLocation",
      getHotelsList: "hotel/getHotelList",
      toggleLogin: "appAuthen/toggleLogin",
      getDeviceInfo: "general/getDeviceInfo",
      filterHotelList: "hotel/filterHotelList",
      clearHotelDetail: "hotelDetail/clearHotelDetail",
      getMemberConfimation: "users/getMemberConfimation",
      getRessetPasswordToken: "users/getRessetPasswordToken",
      showCancelReservation: "appAuthen/showCancelReservation",
      goToRessetPasswordConfirm: "appAuthen/goToRessetPasswordConfirm"
    })
  },
  head() {
    return {
      title: pageTitle.homePage,
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
.home-page {
  flex: 1;
  width: 100%;
  display: flex;

  .app-container {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
}
</style>
