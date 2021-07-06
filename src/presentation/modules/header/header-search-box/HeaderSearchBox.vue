<template>
  <AppDropDownSearchBox
    :dropdown-is-open="isShowSearchBox"
    @toggleSearchBox="$_toggleSearchBox"
  >
    <template v-slot:dropdown__box>
      <div class="header-search-box">
        <div class="header-search-box__container">
          <div class="container">
            <div class="header-search-box__container__top">
              <span class="icon-Icon-Search" />
              <input
                ref="search"
                v-model="data.searchText"
                type="text"
                :placeholder="`${getTextString.search_placeholder}`"
                @input="handleSearchHotel($event)"
              />
              <span class="icon-Icon-Close" @click="clearSearchText()" />
            </div>
            <SearchBoxResult
              :search-box-data="data"
              @on:selectHotel="selectHotel"
              @on:selectDistrict="selectHotel"
            />
          </div>
        </div>
      </div>
    </template>
  </AppDropDownSearchBox>
</template>
<script>
import Vue from "vue";
import { mapActions, mapState, mapGetters } from "vuex";
import SearchBoxResult from "../../../components/booking/SearchBox/SearchBoxResult.vue";
import AppDropDownSearchBox from "../../../components/app-dropdown-search-box/AppDropDownSearchBox.vue";

export default Vue.extend({
  name: "HeaderSearchBox",
  components: {
    AppDropDownSearchBox,
    SearchBoxResult
  },
  props: {
    isShowSearchBox: Boolean
  },
  data() {
    return {
      data: {
        nearMe: [],
        recent: [],
        displayListHotel: {
          defaultList: [],
          IfHaveRecentSearch: []
        },
        searchText: "",
        debounce: "",
        showArea: { isShow: false, name: "Tokyo" },
        hotelListByCity: 0
      }
    };
  },
  computed: {
    ...mapState({
      isMobile: state => state.general.data.isMobile,
      hotelList: state => state.hotel.data.hotelList,
      hotelFilter: state => state.hotel.data.hotelFilter,
      isShowLocation: state => state.booking.bookingState.location,
      location: state => state.booking.bookingData.location,
      cityList: state => state.hotel.data.cityList,
      hotelNearMe: state => state.hotel.data.hotel_nearme,
      bookingData: state => state.booking.bookingData
    }),
    ...mapGetters({
      hotelGetterList: "hotel/hotelsGetterList",
      hotelDisplayList: "hotel/hotelsDisplayList",
      citySearch: "hotel/citySearch",
      lang: "appHeader/fullLanguage",
      roomList: "booking/roomList"
    }),
    getTextString() {
      return {
        my_reservations: this.$t("headers.my_reservations"),
        hotels_list: this.$t("headers.hotels_list"),
        top_results: this.$t("headers.top_results"),
        see_more_nearby: this.$t("headers.see_more_nearby"),
        properties: this.$t("headers.properties"),
        near_me: this.$t("headers.near_me"),
        recent_searches: this.$t("headers.recent_searches"),
        see_all: this.$t("headers.see_all"),
        hotel: this.$t("headers.hotel"),
        search_placeholder: this.$t("headers.search_placeholder"),
        destinations: this.$t("headers.destinations")
      };
    }
  },
  watch: {
    isShowSearchBox(newVal) {
      if (!newVal) {
        this.$scrollBody.enable();
      } else {
        this.focusInput();
        this.$scrollBody.disable();
      }
    },
    hotelDisplayList(newValue) {
      const recentSearch = localStorage.getItem("recent_search");
      if (!recentSearch) {
        this.data.displayListHotel.IfHaveRecentSearch = newValue.slice(5);
        this.data.displayListHotel.defaultList = newValue.slice(0, 5);
      } else {
        this.data.displayListHotel.defaultList = newValue.slice(0, 5);
      }
    },
    hotelNearMe(newValue) {
      const nearMeHotelList = [];
      newValue.forEach(element => {
        nearMeHotelList.push({
          name: element.name,
          address: element.prefecture
        });
      });
      this.data.nearMe = nearMeHotelList;
    },

    lang() {
      this.data.searchText = "";
    }
  },
  mounted() {
    if (this.hotelNearMe && this.hotelNearMe.length > 0) {
      this.hotelNearMe.map(element => {
        this.data.nearMe.push({
          name: element.name,
          address: element.prefecture
        });
      });
    }
    const recentSearch = localStorage.getItem("recent_search");
    if (recentSearch) {
      const recents = JSON.parse(recentSearch);
      this.data.recent = recents;
    }
    this.data.searchText = this.location;
  },
  methods: {
    ...mapActions({
      selectHotels: "hotel/selectHotel",
      getLocation: "booking/getLocation",
      showLocation: "booking/showLocation",
      showChecking: "booking/showChecking",
      setSearchKeyword: "booking/setSearchKeyword",
      filterHotelList: "hotel/filterHotelList",
      selectAllHotelsAction: "hotel/selectAllHotels",
      handleSearchType: "booking/searchType",
      saveHotelID: "booking/saveHotelID"
    }),
    selectHotel(data) {
      // this.data.searchText = ''
      this.$emit("hideSearchBox");
      this.setSearchKeyword(
        (data.hotel && data.hotel.name) || data.cityName || data.districtName
      );

      const searchCityData = {
        location: this.bookingData.location,
        checkIndate: this.bookingData.checkIn,
        checkOutdate: this.bookingData.checkOut,
        language: this.lang,
        coupon_code: this.bookingData.promoCode,
        rooms: JSON.stringify(this.bookingData.roomList)
      };

      const searchHotelData = {
        checkIndate: this.bookingData.checkIn,
        checkOutdate: this.bookingData.checkOut,
        language: this.lang,
        coupon_code: this.bookingData.promoCode,
        rooms: JSON.stringify(this.bookingData.roomList)
      };

      this.data.searchText = this.location;

      if (this.isMobile && this.$route.path === "/") {
        this.handleSearchType(data.type);
        if (data.type === "hotel") {
          const hotelID = data.hotel.triplaHotelId;
          this.saveHotelID(hotelID);
        }
        this.showChecking();
      } else {
        this.handleSearchType(data.type);
        if (this.$route.path !== this.$pageRoute.hotelsList) {
          let next_redirect_route = "";
          if (data.type === "hotel") {
            const hotelID = data.hotel.triplaHotelId;
            if (hotelID) {
              next_redirect_route = `/hotel/${hotelID}`;
              this.saveHotelID(hotelID);
            }
          } else {
            next_redirect_route = this.$pageRoute.hotelsList;
            this.saveHotelID("");
          }
          this.$router.push({
            path: `${next_redirect_route}`,
            query: data.type === "hotel" ? searchHotelData : searchCityData
          });
        }
      }
    },
    selectAllHotels() {
      this.selectAllHotelsAction(this.hotelGetterList);
    },

    handleSearchHotel(_data) {
      this.$_onKeyUp();
      if (this.citySearch) {
        this.data.hotelListByCity = this.citySearch.hotelCount;
        this.data.showArea.isShow = true;
      }
      this.filterHotelList({
        searchParam: {
          keyword: this.data.searchText,
          isFilter: false
        }
      });
    },

    focusInput() {
      setTimeout(() => {
        this.$refs.search.focus();
      }, 100);
    },

    $_onKeyUp() {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.timeout = setTimeout(() => {
        this.setSearchKeyword(this.data.searchText);
      }, 500);
    },

    $_toggleSearchBox() {
      this.$emit("hideSearchBox");
      this.filterHotelList({
        searchParam: {
          keyword: this.location,
          isFilter: true
        }
      });
    },

    clearSearchText() {
      this.data.searchText = "";
      this.$emit("hideSearchBox");
      this.setSearchKeyword("");
      this.filterHotelList({
        searchParam: {
          keyword: this.data.searchText,
          isFilter: true
        }
      });
    }
  }
});
</script>
<style lang="scss" scoped>
.header-search-box {
  &__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    background: $white;
    z-index: 2000;
    padding: 20px 0;
    background: #fff;

    &__top {
      display: flex;
      align-items: center;
      width: 100%;
      position: relative;
      border-radius: 3px;
      padding: 0px 15px;
      background: $bg-color-gray-5;
      margin-bottom: 15px;

      input {
        width: 100%;
        height: 40px;
        background: $bg-color-gray-5;
        color: $text-color-gray-11;
        border: none;
        font-weight: bold;
        padding: 15px;
        font-size: 15px;
        &:focus {
          outline: none;
        }
        @include min-sm {
          height: 50px;
          padding: 15px 30px;
          font-size: 20px;
        }
      }
      span {
        color: #000;
        font-size: 15px;
        cursor: pointer;
        @include min-sm {
          font-size: 18px;
        }
      }
    }
  }

  .search-box-result {
    .search-box__bottom__container {
      padding: 0;
      height: 60vh;
    }
    .city-list-container {
      .city-box {
        display: flex;
        width: 100%;
        font-weight: 600;
        font-size: 15px;
        margin: 15px 0;
        @include min-sm {
          width: 50%;
        }
      }
    }
  }
}
</style>
