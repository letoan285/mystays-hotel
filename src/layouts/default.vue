<template>
  <div class="main-layout">
    <PageLoader v-show="isLoadingApp && $nuxt.isOnline" />
    <!-- <HeaderComponent /> -->
    <HeaderNavTop @changeLanguage="changeLanguage" v-if="isShowHeaderTop" />
    <HeaderSearchBox
      :is-show-search-box="isShowSearchBox"
      @hideSearchBox="hideSearchBox"
    />

    <!-- Login/ Signup Section -->
    <HeaderNavLogin class="login-sidebar" />
    <HeaderNavSignup class="signup-sidebar" />

    <!-- Main Section -->
    <nuxt />

    <!-- Footer Section -->
    <AppFooter />

    <!-- Alert client status -->
    <b-alert
      v-model="$nuxt.isOffline"
      class="position-fixed fixed-bottom m-0 rounded-0"
      style="z-index: 2000"
      variant="warning"
      dismissible
    >
      You are Offline!
    </b-alert>
  </div>
</template>

<script>
import moment from "moment";
import { mapActions, mapState, mapGetters } from "vuex";
import Utilities from "../shared/helper/utilities";
import Cookies from "js-cookie";

export default {
  data() {
    return {
      isReady: false
    };
  },
  scrollToTop: true,
  computed: {
    ...mapState({
      language: state => state.general.data.locale.messages,
      isConfirmationSuccess: state => state.users.data.isConfirmationSuccess,
      bookingState: state => state.booking.bookingState,
      bookingData: state => state.booking.bookingData,
      access_token: state => state.customer.auth.data.access_token,
      skeleton: state => state.general.data.skeleton,
      page_loading: state => state.general.data.page_loading,
      hotelFilter: state => state.hotel.data.hotelFilter,
      isShowSearchBox: state => state.appAuthen.isShowSearchBox,
      isHotelDetailV2Loading: state => state.hotelDetail.isHotelDetailV2Loading,
      isLogin: state => state.users.data.isLogin
    }),

    ...mapGetters({
      lang: "appHeader/language",
      fullLang: "appHeader/fullLanguage",
      myLocation: "general/myLocation",
      userLocation: "general/userLocation"
    }),

    isOnline() {
      return this.$nuxt.isOnline;
    },

    isLoadingApp() {
      return !this.isReady || this.isHotelDetailV2Loading;
    },

    callHotelAreas() {
      return {
        access_token: this.access_token,
        myLocation: this.myLocation,
        userLocation: this.userLocation
      };
    },

    isShowHeaderTop() {
      const path = this.$route.path;
      return (
        path !== this.$pageRoute.hotelReview &&
        path !== this.$pageRoute.guestDetail &&
        path !== this.$pageRoute.payment
      );
    }
  },
  watch: {
    myLocation(myLocation) {
      if (
        myLocation &&
        (myLocation.country === "VN" || myLocation.country === "JP")
      ) {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            position => {
              const location = {
                lat: position.coords.latitude,
                long: position.coords.longitude
              };
              this.setLocation(location);
            },
            () => {
              this.setLocation({
                lat: null,
                long: null
              });
            }
          );
        } else {
          console.log("Geolocation is not supported by this browser.");
        }
      } else {
        // not in Japan (or Vietname)
      }

      if (
        myLocation &&
        !(myLocation.country === "VN" || myLocation.country === "JP")
      ) {
        const location = {
          lat: null,
          long: null
        };
        this.getHotelsList(JSON.stringify(location));
      }
    },

    isOnline(isOnline) {
      if (isOnline) {
        location.reload(true);
      } else {
        this.$scrollBody.enable();
      }
    },

    isLoadingApp(isLoading) {
      if (isLoading) {
        this.$scrollBody.disable();
      } else {
        this.$scrollBody.enable();
      }
    },

    callHotelAreas: {
      handler(data) {
        if (data.access_token && data.myLocation && data.userLocation) {
          this.getHotelsList(JSON.stringify(this.userLocation));
        }

        if (data.access_token && !(data.myLocation || data.userLocation)) {
          const location = {
            lat: null,
            long: null
          };
          this.getHotelsList(JSON.stringify(location));
        }

        if (data.access_token && data.myLocation && !data.myLocation.country) {
          const location = {
            lat: null,
            long: null
          };
          this.getHotelsList(JSON.stringify(location));
        }
      }
    },

    access_token(newVal) {
      this.isReady = true;
      if (newVal) {
        this.getLocale("en-US");
        this.getLocation();
      }
    },

    language(newValue) {
      for (const lang in newValue) {
        this.$i18n.setLocaleMessage(lang, newValue[lang]);
      }
      const data = this.$route.query;
      this.getDataFromUrl(data);
    },

    bookingState(bookingState) {
      const homePageRoute = this.$pageRoute.homePage;
      if (
        (bookingState.checking ||
          bookingState.roomSelect ||
          bookingState.promoCode) &&
        this.$route.path !== homePageRoute
      ) {
        this.$scrollBody.disable();
      } else if (this.isReady && !this.isHotelDetailV2Loading) {
        this.$scrollBody.enable();
      }
    },

    bookingData: {
      handler(newData) {
        const path = this.$route.path;
        const paramsHotel = {
          checkIndate: newData.checkIn,
          checkOutdate: newData.checkOut,
          language: this.fullLang,
          coupon_code: newData.promoCode,
          rooms: JSON.stringify(newData.roomList)
        };
        const paramsSearchHotel = {
          location: newData.location,
          checkIndate: newData.checkIn,
          checkOutdate: newData.checkOut,
          language: this.fullLang,
          coupon_code: newData.promoCode,
          rooms: JSON.stringify(newData.roomList)
        };
        if (
          path.includes(`${this.$pageRoute.hotelDetail}/`) ||
          path === this.$pageRoute.hotelsList
        ) {
          this.$router
            .push({
              path,
              query:
                path === this.$pageRoute.hotelsList
                  ? paramsSearchHotel
                  : paramsHotel
            })
            .catch(() => {});
        }
      },
      deep: true
    },

    fullLang(lang) {
      this.resetGuestData();
      for (const lang in this.language) {
        this.$i18n.setLocaleMessage(lang, this.language[lang]);
      }
      const path = this.$route.path;
      const paramsHotel = {
        checkIndate: this.bookingData.checkIn,
        checkOutdate: this.bookingData.checkOut,
        language: lang,
        coupon_code: this.bookingData.promoCode,
        rooms: JSON.stringify(this.bookingData.roomList)
      };
      const paramsSearchHotel = {
        location: "",
        checkIndate: this.bookingData.checkIn,
        checkOutdate: this.bookingData.checkOut,
        language: lang,
        coupon_code: this.bookingData.promoCode,
        rooms: JSON.stringify(this.bookingData.roomList)
      };
      if (
        path.includes(`${this.$pageRoute.hotelDetail}/`) ||
        path === this.$pageRoute.hotelsList
      ) {
        this.$router
          .push({
            path,
            query: path.includes(`${this.$pageRoute.hotelDetail}/`)
              ? paramsHotel
              : paramsSearchHotel
          })
          .catch(() => {});
      }

      this.saveFullPath();
    }
  },
  created() {
    this.initApplication();
    this.getUserInfo();
    this.onRouteToConfirmBooking();
    this.getUrlData();
    if (process.browser) {
      this.getToken();
    }
  },
  mounted() {
    if (this.$nuxt.isOffline) {
      this.$scrollBody.enable();
      this.getHotelsList(JSON.stringify(this.userLocation));
    }
    this.checkUpdate();
    this.setLocaleMess();
    this.getSetLocale();
    this.onResize();
    window.addEventListener("resize", this.onResize);
  },
  methods: {
    ...mapActions({
      initApplication: "general/initApplication",
      getAccessToken: "customer/auth/getAccessToken",
      getClientSessionToken: "customer/auth/getClientSessionToken",
      getLocale: "general/getLocale",
      getLocaleForCalendar: "appHeader/changeLanguage",
      getDeviceInfo: "general/getDeviceInfo",
      getUserDetail: "users/getUserDetail",
      getDataFromUrl: "booking/getDataFromUrl",
      authenticationSession: "users/getAuthenticationSession",
      changeLanguages: "appHeader/changeLanguage",
      getHotelsList: "hotel/getHotelList",
      saveFullPath: "hotel/saveFullPath",
      toggleHeaderSearchBox: "appAuthen/toggleHeaderSearchBox",
      getLocation: "general/getLocation",
      setLocation: "general/setLocation",
      resetGuestData: "guestDetail/resetGuestData"
    }),

    getUserInfo() {
      if (Cookies.get("Authorization")) {
        this.getUserDetail();
      }
    },

    setLocaleMess() {
      if (this.language.en) {
        for (const lang in this.language) {
          this.$i18n.setLocaleMessage(lang, this.language[lang]);
        }
      }
    },

    onResize() {
      if (window.innerWidth < 768) {
        this.getDeviceInfo(true);
      } else {
        this.getDeviceInfo(false);
      }
    },

    getSetLocale() {
      const queryString = this.$route.query;
      let lang = localStorage.getItem("lang");
      if (lang === "en-US") {
        lang = "en";
      }
      // check current lange
      const Uti = Utilities;
      const queryStringLanguage = queryString.language;
      if (queryStringLanguage) {
        const currentLanguageByQueryString = Uti.getLocale(queryStringLanguage);
        moment.locale(currentLanguageByQueryString.code);
      } else if (lang) {
        this.$i18n.locale = lang;
        moment.locale(lang);
        this.getLocaleForCalendar({
          langText: lang.slice(0, 2),
          fullLang: lang
        });
      } else {
        // searchValue
      }
    },

    getUrlData() {
      const data = this.$route.query;
      this.getDataFromUrl(data);
      if (data.language) {
        this.$i18n.locale = data.language;
        this.changeLanguages({
          langText: data.language.slice(0, 2),
          fullLang: data.language
        });
        if (process.browser) {
          localStorage.setItem("lang", data.language);
        }
      } else if (process.browser) {
        const lang = localStorage.getItem("lang") || "en-US";
        this.changeLanguages({
          langText: lang.slice(0, 2),
          fullLang: lang
        });
      }
    },

    onRouteToConfirmBooking() {
      const hash = decodeURIComponent(this.$route && this.$route.fullPath);
      if (hash.includes("bypass_token") && hash.includes("confirmation")) {
        const confirmBookingQuery = hash.split("/confirmation/")[1];
        this.$router.push(
          `${this.$pageRoute.comfirmBooking}/${confirmBookingQuery}`
        );
      }
    },

    changeLanguage(lang) {
      moment.locale(lang.code);
      this.$i18n.locale = lang.code;
      localStorage.setItem("lang", lang.code);
      const langText = lang.code.slice(0, 2);
      this.changeLanguages({
        langText,
        fullLang: lang.code
      });

      const location = localStorage.getItem("location");
      this.getHotelsList(location);
    },
    toast(toaster, append = false, isSuccess) {
      this.counter++;
      this.$bvToast.toast(isSuccess ? "Successfully!" : "Something wrong", {
        title: isSuccess ? "Success" : "Error",
        toaster,
        solid: true,
        appendToast: append,
        variant: isSuccess ? "primary" : "danger"
      });
    },
    getToken() {
      this.getAccessToken();
      this.getClientSessionToken();
      setTimeout(() => {
        return this.getToken();
      }, 30 * 60 * 1000);
    },
    hideSearchBox() {
      this.toggleHeaderSearchBox(false);
    },
    async checkUpdate() {
      const workbox = await window.$workbox;
      if (workbox) {
        workbox.addEventListener("installed", event => {
          if (event.isUpdate) {
            // whatever you want to do to let the user know there's an update available
            const cf = confirm("Do you want to update ?");
            if (cf) {
              console.log("Update App");
            } else {
              console.log("Dont Update App");
            }
          }
        });
      }
    }
  },
  head() {
    return {
      htmlAttrs: {
        lang: this.$i18n.locale
      },

      title:
        "MYSTAYS Hotels & Resorts | Your Hotel in Japan| Official Booking Website",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Mystay Hotel"
        }
      ]
    };
  }
};
</script>

<style lang="scss">
@import "../assets/scss/global.scss";
</style>
