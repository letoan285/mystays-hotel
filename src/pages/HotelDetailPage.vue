<template>
  <div class="hotel-detail">
    <HotelNavigationBar
      :is-selected-hotel="isSelectedHotel"
      :current-step="currentStep"
      :is-show-back-to-search-result="isShowBackToSearchResult"
      @on:Apply="$_onApply"
    />
    <HotelDetailPageTopView />
    <LazyHotelDetailRoomsAndPlans />
    <HotelDetailFindUs />
    <LazyHotelDetailReviews />
    <HotelDetailTotalCount />
    <div
      class="hotel-detail__overlay"
      v-if="
        bookingState.checking ||
          bookingState.roomSelect ||
          bookingState.promoCode
      "
      @click="$_closeAll"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapState, mapGetters } from "vuex";
import getGtmData from "../plugins/gtm";
export default Vue.extend({
  name: "HotelDetail",
  data() {
    return {
      isSelectedHotel: false,
      currentStep: 2,
      isShowBackToSearchResult: true,
      isChangeLanguage: false,
      isBookingDataChange: false,
      isOpenBooking: false
    };
  },
  computed: {
    ...mapState({
      bookingState: (state: any) => state.booking.bookingState,
      checkin: (state: any) => state.booking.bookingData?.checkIn,
      checkout: (state: any) => state.booking.bookingData?.checkOut,
      roomListFromBookingData: (state: any) =>
        state.booking.bookingData?.roomList,
      promoCode: (state: any) => state.booking.bookingData?.promoCode,
      hotelDetail: (state: any) => state.hotelDetail?.hotelDetail?.data,
      roomIndex: (state: any) => state.hotelDetail?.roomIndex,
      tiersSettings: (state: any) => state.hotel.data.tiersSettings,
      isUseDay: (state: any) => state.hotelDetail.isUseDay,
      isAvailable: (state: any) => state.hotelDetail.isAvailable,
      searchKeyword: (state: any) => state.booking.bookingData.location,
      roomFilterModel: (state: any) => state.hotelDetail.roomFilterModel
    }),
    ...mapGetters({
      roomList: "booking/roomList",
      getCheckinDate: "booking/getCheckinDate",
      getCheckoutDate: "booking/getCheckoutDate",
      isSelectedAge: "booking/isSelectedAge",
      roomListWithChildren: "booking/roomListWithChildren",
      hasChildren: "booking/hasChildren",
      isKidsTierSupport: "hotel/isKidsTierSupport",
      roomListAPI: "hotelDetail/roomList",
      token: "customer/auth/token",
      lang: "appHeader/language",
      fullLang: "appHeader/fullLanguage",
      tiers: "hotel/tiers",
      hotelReviews: "hotelDetail/hotelReviews",
      numberAdults: "booking/numberAdults",
      numberChildren: "booking/numberChildren",
      filtersList: "hotelDetail/filtersList"
    }),

    langForGetHotelDetail() {
      let lang = this.fullLang;
      if (this.fullLang === "en-US") {
        lang = "en";
      }

      return lang;
    },

    bookingData(): object {
      return {
        roomList: this.roomListFromBookingData,
        checkIn: this.checkin,
        checkOut: this.checkout,
        promoCode: this.promoCode
      };
    },

    roomListWithoutChildren(): Array<any> {
      const roomListWithoutChildren = this.roomList.map((room: any) => {
        room.children = 0;
        return room;
      });

      return roomListWithoutChildren;
    },

    showRoomList(): any {
      return {
        isSelectedAge: this.isSelectedAge,
        hasChildren: this.hasChildren,
        isKidsTierSupport: this.isKidsTierSupport
      };
    },

    clientSession(): any {
      return this.token.session_token;
    },

    pathUrl(): any {
      return this.$route.fullPath;
    },

    bookingUseDay(): any {
      return {
        isUseDay: this.isUseDay,
        isAvailable: this.isAvailable
      };
    }
  },

  watch: {
    bookingData: {
      handler() {
        if (this.isOpenBooking) {
          this.isBookingDataChange = true;
        }
      },
      deep: true
    },

    filtersList(model) {
      // if (this.roomFilterModel.status) {
      //   if (this.isKidsTierSupport) {
      //     this.searchRoomWithChildren(this.roomIndex);
      //   } else {
      //     this.searchRoomWithoutChildren(0);
      //   }
      // }
    },

    bookingState(bookingState) {
      if (
        bookingState.roomSelect ||
        bookingState.promoCode ||
        bookingState.checking
      ) {
        this.isOpenBooking = true;
      }
    },

    isUseDay(isUseDay) {
      this.saveGtmData({
        event: "showOnlyAvailableFilter",
        language: this.fullLang,
        pageCategory: "HotelDetailPage",
        enabledDisabled: isUseDay ? "Enabled" : "Disabled",
        triggerType: "event"
      });
    },

    checkout(checkout) {
      this.saveGtmData({
        event: "bookNowHome",
        checkInDate: this.checkin,
        checkOutDate: checkout,
        productCoupon: this.promoCode,
        language: this.fullLang,
        pageCategory: "HotelDetailPage",
        searchTerm: this.searchKeyword,
        numberOfAdult: this.numberAdults,
        numberOfChildren: this.numberChildren,
        numberOfRooms: this.roomListFromBookingData.length,
        triggerType: "event"
      });
    },

    roomListFromBookingData: {
      handler() {
        this.saveGtmData({
          event: "bookNowHome",
          checkInDate: this.checkin,
          checkOutDate: this.checkout,
          productCoupon: this.promoCode,
          language: this.fullLang,
          pageCategory: "HotelDetailPage",
          searchTerm: this.searchKeyword,
          numberOfAdult: this.numberAdults,
          numberOfChildren: this.numberChildren,
          numberOfRooms: this.roomListFromBookingData.length,
          triggerType: "event"
        });
      },
      deep: true
    },

    bookingUseDay() {
      this.searchRoomAndPlan(this.roomIndex);
    },

    roomIndex(roomIdx) {
      if (roomIdx && this.roomListWithChildren[roomIdx]) {
        this.findRoom();
        this.searchRoomAndPlan(roomIdx);
      }
    },
    showRoomList(roomState) {
      if (
        roomState.hasChildren &&
        roomState.isKidsTierSupport &&
        !roomState.isSelectedAge
      ) {
        this.showRoomSelect();
      }
    },

    tiersSettings(tiers) {
      const hotelID = this.$route.params.hotelID;
      const fullPath = this.$route.fullPath;
      this.saveFullPathHotelDetail({ fullPath, hotelID });
      this.clearRoomSelected();
      this.saveRoomIndex(0);
      if (tiers?.kids_setting) {
        this.searchRoomAndPlan(0);
      }
    },

    token: {
      handler(token) {
        const hotelID = Number(this.$route.params.hotelID);
        if (token.session_token && token.access_token) {
          this.getTiersList(hotelID);
          this.getHotelDetail({ hotelID, fullLang: this.fullLang });
          this.getHotelReviews({ hotelID, countryCode: this.fullLang });
          this.getHotelDetailV2({
            TargetLanguage: this.langForGetHotelDetail,
            HotelID: hotelID,
            IsClearCache: false,
            fullLang: this.fullLang
          });
        } else if (this.$nuxt.isOffline) {
          this.getTiersList(hotelID);
          this.getHotelDetail({ hotelID, fullLang: this.fullLang });
          this.getHotelReviews({ hotelID, countryCode: this.fullLang });
        }
      },
      deep: true
    },

    pathUrl(fullPath) {
      const hotelID = this.$route.params.hotelID;
      this.saveFullPathHotelDetail({ fullPath, hotelID });
    },

    fullLang(lang) {
      if (lang && this.isChangeLanguage) {
        const hotelID = this.$route.params.hotelID;
        this.saveRoomIndex(0);
        this.searchRoomAndPlan(0);
        this.getHotelDetail({ hotelID, fullLang: this.fullLang });
        this.getHotelReviews({ hotelID, countryCode: this.fullLang });
        this.getHotelDetailV2({
          TargetLanguage: this.langForGetHotelDetail,
          HotelID: hotelID,
          IsClearCache: false,
          fullLang: this.fullLang
        });
      }
    }
  },
  created() {
    const fullPath = this.$route.fullPath;
    const hotelID = this.$route.params.hotelID;
    const query = this.$route.query;
    this.closeAll();
    this.updateBooking(query, hotelID);
    this.saveFullPathHotelDetail({ fullPath, hotelID });
    this.callAPI(hotelID);
    this.saveRoomAndPlanCode(query);
    this.changeTab({
      currentTab: "room",
      currentId: ""
    });
  },
  mounted() {
    const hotelID = this.$route.params.hotelID;
    getGtmData({
      triggerType: "Page Load",
      locale: "en-US",
      pageCategory: "HotelDetailPage"
    });
    this.scrollToTop();
    this.showCancelReservation(true);
    this.saveRoomIndex(0);
    this.showRoomSelectComponent();
    this.clearRoomSelected();
    this.getBookingId(hotelID);
    this.onFindRoom();
    this.onReceiveEvent();
  },
  destroyed() {
    this.closeAll();
    this.a_toggleSidebar(false);
  },
  methods: {
    ...mapActions({
      handlegetHotelPlans: "hotel/getHotelPlans",
      closeAll: "booking/closeAll",
      showCancelReservation: "appAuthen/showCancelReservation",
      searchRoom: "hotelDetail/searchRoom",
      getHotelDetail: "hotelDetail/getHotelDetail",
      getRoomTypes: "hotel/getRoomTypes",
      saveRoomIndex: "hotelDetail/saveRoomIndex",
      clearRoomSelected: "hotelDetail/clearRoomSelected",
      saveRoomPlanCode: "hotelDetail/saveRoomPlanCode",
      saveFullPathHotelDetail: "hotel/saveFullPathHotelDetail",
      getTiersList: "hotel/getTiersList",
      showRoomSelect: "booking/showRoomSelect",
      getHotelReviews: "hotelDetail/getHotelReviews",
      updateBookingStatus: "hotelDetail/updateBookingStatus",
      getReservations: "booking/getReservations",
      getBookingId: "booking/getBookingId",
      saveGtmData: "general/saveGtmData",
      clearHotelDetail: "hotelDetail/clearHotelDetail",
      changeTab: "hotelDetail/changeTab",
      a_toggleSidebar: "hotelDetail/a_toggleSidebar",
      getHotelDetailV2: "hotelDetail/getHotelDetailV2"
    }),

    showRoomSelectComponent() {
      if (
        this.tiers?.kids_setting &&
        this.isKidsTierSupport &&
        !this.isSelectedAge
      ) {
        this.showRoomSelect();
      }
    },

    saveRoomAndPlanCode(query: any) {
      const roomPlanCode = {
        roomCode: query.roomCode,
        planCode: query.planCode
      };
      this.saveRoomPlanCode(roomPlanCode);
    },

    scrollToTop() {
      window.scrollTo({
        top: 0,
        left: 0
      });
    },

    onFindRoom() {
      const query = this.$route.query;
      if (query.bypass_token && query.email && query.reservationID) {
        this.$nextTick(() => {
          this.findRoom();
        });
      }
    },

    onReceiveEvent() {
      this.$nuxt.$on("onChangeLanguage", () => {
        this.isChangeLanguage = true;
      });

      this.$nuxt.$on("calendar-mobile-click-done", () => {
        this.$_closeAll();
      });
    },

    updateBooking(query: any, hotelID: number) {
      if (query.bypass_token && query.email && query.reservationID) {
        this.updateBookingStatus(true);
        const params = {
          hotelID,
          reservationID: query.reservationID,
          byPassToken: query.bypass_token,
          email: query.email,
          lang: this.lang
        };
        this.getReservations(params);
        // this.findRoom();
      } else {
        this.updateBookingStatus(false);
      }
    },

    callAPI(hotelID: number) {
      if (process.browser) {
        const lang = localStorage.getItem("lang")
          ? localStorage.getItem("lang")?.slice(0, 2)
          : "en";
        if (this.clientSession) {
          if (this.lang === lang) {
            this.getHotelDetail({
              hotelID,
              fullLang: this.fullLang
            });
            this.getHotelReviews({
              hotelID,
              countryCode: this.fullLang
            });
            this.getHotelDetailV2({
              TargetLanguage: this.langForGetHotelDetail,
              HotelID: hotelID,
              IsClearCache: false,
              fullLang: this.fullLang
            });
            if (this.tiers?.kids_setting?.kids_type) {
              this.searchRoomAndPlan(0);
            } else {
              this.getTiersList(hotelID);
            }
          }
        }
      }
    },

    findRoom() {
      const roomAndPlan: any = document.querySelector("#plantab");
      if (roomAndPlan) {
        roomAndPlan.click();
      }
    },

    buildParams(type: string, roomIndex: number) {
      const hotelID = this.$route.params && this.$route.params.hotelID;
      const params = {
        queryString: {
          checkin_date: this.checkin,
          checkout_date: this.isUseDay ? this.checkin : this.checkout,
          type,
          rooms: this.isKidsTierSupport
            ? [this.roomListWithChildren[roomIndex]]
            : [this.roomListWithoutChildren[roomIndex]],
          order: "recommended",
          is_including_occupaid: !this.isAvailable,
          is_day_use: this.isUseDay,
          coupon_code: this.promoCode,
          room_search_filters: this.filtersList
        },
        hotel_id: hotelID,
        type: "plants",
        fullLang: this.fullLang
      };

      return params;
    },

    $_onApply() {
      if (this.isBookingDataChange) {
        this.clearRoomSelected();
        this.saveRoomIndex(0);
        this.searchRoomAndPlan(0);
        this.isBookingDataChange = false;
      } else {
        this.isBookingDataChange = false;
        this.closeAll();
      }
    },

    $_closeAll() {
      if (this.isBookingDataChange) {
        this.searchRoomAndPlan(0);
        if (this.isKidsTierSupport) {
          if (this.isSelectedAge) {
            this.closeAll();
          } else {
            this.$nuxt.$emit("onCloseOverlay");
          }
        } else {
          this.closeAll();
        }
        this.isBookingDataChange = false;
      } else {
        this.isBookingDataChange = false;
        if (this.isKidsTierSupport) {
          if (this.isSelectedAge) {
            this.closeAll();
          } else {
            this.$nuxt.$emit("onCloseOverlay");
          }
        } else {
          this.closeAll();
        }
      }
    },

    searchRoomAndPlan(roomIdx: number) {
      if (this.checkin && this.checkout) {
        this.searchRoom(this.buildParams("rooms", roomIdx));
        this.searchRoom(this.buildParams("plan", roomIdx));
      }
    }
  },

  head(): any {
    return {
      title: this.hotelDetail?.name,
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Mystays Hotel"
        }
      ],
      // script: [
      //   {
      //     src: "https://tripla.jp/sdk/javascript/tripla.min.js",
      //     async: true,
      //     "data-triplabot-code": this.hotelDetail?.triplabot_code,
      //     crossorigin: "anonymous"
      //   }
      // ]
    };
  }
});
</script>

<style lang="scss" scoped>
.hotel-detail {
  background: #ffffff;
  // scroll-behavior: smooth;
  &__overlay {
    position: fixed;
    left: 0;
    top: 0;
    opacity: 0.95;
    width: 100%;
    z-index: 11;
    height: 100%;
    background: #232e48;
    @include min-sm {
      background: #232e48;
    }
  }
}
</style>
