<template>
  <div class="search-box">
    <SearchBoxTitle
      :title="getTextString.where_in_japan"
      :placeholder="getTextString.search_hotels_destinations"
      @on:focus="focus"
      @on:input="handleSearchHotel"
    />
    <dropdown-transition>
      <div v-if="isShowLocation" class="search-box__bottom">
        <SearchBoxResult
          :search-box-data="data"
          @on:selectHotel="selectHotel"
          @on:selectDistrict="selectHotel"
        />
      </div>
    </dropdown-transition>
  </div>
</template>
<script>
import Vue from "vue";
import { mapActions, mapState, mapGetters } from "vuex";
import { getWindowInfo } from "../../../utils/common";
import SearchBoxTitle from "./SearchBox/SearchBoxTitle.vue";
import SearchBoxResult from "./SearchBox/SearchBoxResult.vue";
import DropdownTransition from "../dropdown-transition/DropdownTransition.vue";

export default Vue.extend({
  name: "SearchBox",
  components: {
    DropdownTransition,
    SearchBoxTitle,
    SearchBoxResult
  },
  data() {
    return {
      data: {
        nearMe: [],
        recent: [],
        districtListFilter: [],
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
  created() {},
  computed: {
    ...mapState({
      hotelList: state => state.hotel.data.hotelList,
      hotelNearMe: state => state.hotel.data.hotel_nearme,
      hotelFilter: state => state.hotel.data.hotelFilter,
      locationError: state => state.booking.bookingError.location,
      isShowLocation: state => state.booking.bookingState.location,
      cityList: state => state.hotel.data.cityList,
      districtList: state => state.hotel.data.districtListFilter,
      hotelID: state => state.booking.bookingData.hotelID,
      searchType: state => state.booking.bookingData.searchType
    }),
    ...mapGetters({
      hotelDisplayList: "hotel/hotelsDisplayList",
      citySearch: "hotel/citySearch"
    }),
    getTextString() {
      return {
        where_in_japan: this.$t("booking.where_in_japan"),
        search_hotels_destinations: this.$t(
          "booking.search_hotels_destinations"
        )
      };
    }
  },
  watch: {
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
      this.data.nearMe = newValue;
    },
    hotelID(id) {
      if (id && this.searchType === "hotel") {
        this.getTiersList(id);
      } else {
        this.clearTiersList();
      }
    }
  },
  mounted() {
    if (this.hotelID && this.searchType === "hotel") {
      this.getTiersList(this.hotelID);
    } else {
      this.clearTiersList();
    }

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
  },
  methods: {
    // MODULE ACTIONS
    ...mapActions({
      selectHotels: "hotel/selectHotel",
      selectAllHotelsAction: "hotel/selectAllHotels",
      filterHotelList: "hotel/filterHotelList",
      showLocation: "booking/showLocation",
      showChecking: "booking/showChecking",
      getLocation: "booking/getLocation",
      handleSearchResult: "hotel/saveRecentSearch",
      handleSearchType: "booking/searchType",
      closeAll: "booking/closeAll",
      getTiersList: "hotel/getTiersList",
      clearTiersList: "hotel/clearTiersList",
      toggleHeaderSearchBox: "appAuthen/toggleHeaderSearchBox"
    }),
    focus() {
      const window = getWindowInfo();

      if (window.isMobile) this.toggleHeaderSearchBox(true);
      else this.showLocation();
    },
    selectAllHotels() {
      this.selectAllHotelsAction(this.hotelGetterList);
    },
    selectHotel(data) {
      this.handleSearchType(data.type);
      this.handleSearchResult(data.hotel);
      this.getLocation({
        name:
          (data.hotel && data.hotel.name) || data.cityName || data.districtName,
        hotelID: data.hotel && data.hotel.triplaHotelId
      });
      this.showChecking();
    },
    handleSearchHotel(data) {
      this.data.searchText = data.searchText;
      this.filterHotelList({
        searchParam: { keyword: data.searchText, isFilter: true }
      });

      if (this.citySearch) {
        this.data.hotelListByCity = this.citySearch.hotelCount;
        this.data.showArea.isShow = true;
      }
    },
    clearSearchText() {
      this.$refs.input.focus();
      this.searchText = "";
      this.getLocation("");
      this.handleSearchHotel();
    }
  }
});
</script>
<style lang="scss" scoped>
.search-box {
  width: 100%;
  margin-bottom: 20px;
  position: relative;
  @include min-md {
    width: 287px;
    margin-bottom: 0;
  }
  &__bottom {
    position: absolute;
    width: 100vw;
    top: 90px;
    left: -20px;
    z-index: 10;
    @include min-md {
      width: 950px;
      height: auto;
      top: calc(100% + 28px);
      bottom: -10px;
      left: -37px;
      padding: 0 35px;
      &::after {
        content: "";
        width: 14px;
        height: 14px;
        top: -7px;
        left: calc(287px / 2 + 30px);
        position: absolute;
        border-top: 1px solid $border-color-light-gray;
        border-left: 1px solid $border-color-light-gray;
        background-color: $bg-color-white;
        transform: rotate(45deg);
      }
    }
  }
}
</style>
