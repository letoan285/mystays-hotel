<template>
  <div class="hotels-list">
    <HotelSearchNavigationBar v-if="!isMobile" @on:Apply="$_onApply" />
    <HotelNavigationBar
      v-if="isMobile"
      :is-selected-hotel="isSelectedHotel"
      :current-step="currentStep"
      :is-show-back-to-search-result="isShowBackToSearchResult"
    />
    <HotelSearchTopView />
    <HotelSearchInput />
    <HotelSearchHeader />
    <transition name="fade" mode="out-in">
      <keep-alive>
        <component :is="switchViewType.component" />
      </keep-alive>
    </transition>
    <HotelSearchOverlay
      v-if="
        overlayState.showMap ||
        overlayState.showSortBy ||
        overlayState.showFilter
      "
    />
    <CalendarLoader class="app-loader" v-if="isMapLoading && isMobile" />
    <div
      v-if="
        bookingState.checking ||
        bookingState.roomSelect ||
        bookingState.promoCode
      "
      class="hotels-list__overlay"
      @click="closeBookingPopup"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import moment from "moment";
import { mapActions, mapState, mapGetters } from "vuex";
import HotelSearchContent from "../presentation/modules/hotelSearchPage/hotel-search-content/HotelSearchContent.vue";
import HotelSearchMapView from "../presentation/modules/hotelSearchPage/hotel-search-content/HotelSearchMapView.vue";
import getGtmData from "../plugins/gtm";

export default Vue.extend({
  name: "SearchHotel",
  data() {
    return {
      isSelectedHotel: false,
      currentStep: 1,
      isShowBackToSearchResult: false,
      viewSection: {
        listView: {
          name: "HotelSearchContent",
          component: HotelSearchContent,
        },
        mapView: {
          name: "HotelSearchMapView",
          component: HotelSearchMapView,
        },
      },
      isOpenBooking: false,
      isBookingDataChange: false,
      isMapLoading: false,
    };
  },
  computed: {
    ...mapState({
      isMobile: (state: any) => state.general.data.isMobile,
      overlayState: (state: any) => state.searchHotel.filterState,
      bookingState: (state: any) => state.booking.bookingState,
      bookingData: (state: any) => state.booking.bookingData,
      viewType: (state: any) => state.searchHotel.viewType,
      searchText: (state: any) => state.booking.bookingData.location,
      cityList: (state: any) => state.hotel.data.cityList
    }),

    ...mapGetters({
      ListHotelID: "hotel/listHotelID",
      lang: "appHeader/fullLanguage",
      token: "customer/auth/token",
    }),

    switchViewType(): any {
      return this.viewType === "Map View"
        ? this.viewSection.mapView
        : this.viewSection.listView;
    },

    pathUrl(): any {
      return this.$route.fullPath;
    },
  },
  watch: {
    token: {
      handler(token) {
        if (token.access_token && token.session_token) {
          this.handleGetHotelPrice(this.getTriplaHotelPriceParams());
        }
      },
      deep: true,
    },

    bookingData: {
      handler() {
        if (this.isOpenBooking) {
          this.isBookingDataChange = true;
        }
      },
      deep: true,
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

    pathUrl(fullPath) {
      this.saveFullPath(fullPath);
    },

    cityList() {
      this.$_handleSearchHotel(false);
    },

    lang() {
      this.changeViewType("List View");
      if (this.token.session_token) {
        this.handleGetHotelPrice(this.getTriplaHotelPriceParams());
      }
    },
  },
  created() {
    this.clearTiersList();
    this.clearHotelDetail();
    const data = this.$route.query;
    const path = this.$route.path;

    const hotelName = path.replace("/hotels-", "");

    if (hotelName && hotelName !== "list") {
      const hotelNameCapitalize = hotelName.charAt(0).toUpperCase() + hotelName.slice(1);
      this.setSearchKeyword(hotelNameCapitalize);
    }

    this.getDataFromUrl(data);
    this.$_handleSearchHotel(true);
  },
  mounted() {
    getGtmData({
      triggerType: "Page Load",
      locale: "en-US",
      pageCategory: "SearchHotelPage",
    });
    const fullPath = this.$route.fullPath;
    this.saveFullPath(fullPath);
    if (this.token.session_token) {
      this.handleGetHotelPrice(this.getTriplaHotelPriceParams());
    }

    this.$nuxt.$on("onLoadingGoogleMap", (isLoading: boolean) => {
      this.isMapLoading = isLoading;
    });
  },
  destroyed() {
    this.changeViewType("List View");
  },
  methods: {
    ...mapActions({
      closeAll: "booking/closeAll",
      getDataFromUrl: "booking/getDataFromUrl",
      filterHotelList: "hotel/filterHotelList",
      changeViewType: "searchHotel/changeViewType",
      handleGetHotelPrice: "hotel/getHotelPrice",
      saveFullPath: "hotel/saveFullPath",
      clearHotelDetail: "hotelDetail/clearHotelDetail",
      clearTiersList: "hotel/clearTiersList",
      savePrefectureValue: "hotel/savePrefectureValue",
      setSearchKeyword: "booking/setSearchKeyword",
    }),
    $_handleSearchHotel(isLoading: boolean) {
      this.savePrefectureValue("")
      this.filterHotelList({
        searchParam: {
          keyword: this.searchText ? this.searchText : "",
          isFilter: true,
          isLoading
        },
        getPriceParams: this.buildParams(),
      });
    },

    closeBookingPopup() {
      this.closeAll();
      if (this.isBookingDataChange) {
        if (this.buildParams().Hotels.length) {
          this.handleGetHotelPrice(this.getTriplaHotelPriceParams());
        }
        this.isBookingDataChange = false;
      }
    },

    $_onApply() {
      this.closeAll();
      if (this.isBookingDataChange) {
        if (this.buildParams().Hotels.length) {
          this.handleGetHotelPrice(this.getTriplaHotelPriceParams());
        }
        this.isBookingDataChange = false;
      }
    },

    buildParams() {
      const dateFormat = "YYYYMMDD";
      const roomList = this.bookingData?.roomList?.map((room: any) => {
        const childrenList = room.children.childrenList.map((child: any) => {
          return child.age;
        });
        const noOfGuests =
          room.adults.number + room.children.childrenList.length;
        return {
          Adult: room.adults.number,
          NoOfGuests: noOfGuests,
          ChildAges: childrenList,
        };
      });
      const params = {
        CheckinDate: moment(this.bookingData.checkIn).format(dateFormat),
        CheckoutDate: moment(this.bookingData.checkOut).format(dateFormat),
        Rooms: roomList,
        Hotels: this.ListHotelID,
      };
      return params;
    },

    getTriplaHotelPriceParams() {
      const roomList = this.bookingData?.roomList;

      const roomMapper = roomList?.map((room: any) => {
        return {
          checkin_date: this.bookingData.checkIn,
          checkout_date: this.bookingData.checkOut,
          adults: room.adults.number,
          children: room.children.childrenList.length,
          kids_age_range: [],
        };
      });

      return {
        roomMapper,
        lang: this.lang,
        isMaxOfLowestPriceNext30Days: false,
        isIncludeLowestPrice: true,
      };
    },
  },
  head(): any {
    return {
      title: "Hotels List",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Mystays Hotel",
        },
      ],
    };
  },
});
</script>

<style lang="scss" scoped>
.hotels-list {
  background: #f3f3f3;
  padding-bottom: 50px;
  flex: 1;
  &__overlay {
    position: fixed;
    left: 0;
    top: 0;
    opacity: 0.95;
    width: 100%;
    z-index: 1;
    height: 100%;
    background: #232e48;
    @include min-sm {
      background: #232e48;
    }
  }

  .app-loader {
    z-index: 100;
    background: white;
  }
}
</style>
