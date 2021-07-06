<template>
  <div class="search-box-result">
    <div
      class="search-box-result__loading"
      v-if="isGetAllHotelLoading || isGetLocationLoading"
    >
      <CalendarLoader />
    </div>
    <div v-if="searchBoxData.searchText" class="search-box__bottom__container">
      <SearchBoxResultItem
        :title="getTextString.top_results"
        :text-see-all="
          `${getTextString.see_all} ${hotelGetterList.length} hotels`
        "
        :is-show-see-all="hotelGetterList.length > 5"
        :data="searchBoxData.displayListHotel.defaultList"
        @on:click="$_selectHotel"
        @on:clickSeeAllBtn="$_selectHotel"
      >
        <div
          v-if="searchBoxData.showArea.isShow && (citySearch || districtList)"
          class="place"
          @click="$_selectHotel(citySearch || districtList, 'city')"
        >
          <div class="place__address">
            {{ citySearch.name || districtList.name }}
          </div>
          <div class="place__properties">
            <strong>
              {{ searchBoxData.hotelListByCity }}
              {{ getTextString.properties }}
            </strong>
          </div>
        </div>
      </SearchBoxResultItem>
      <SearchBoxResultItem
        v-if="searchBoxData.displayListHotel.IfHaveRecentSearch.length > 0"
        :title="''"
        :text-see-all="getTextString.see_more_nearby"
        :data="searchBoxData.displayListHotel.IfHaveRecentSearch"
        @on:click="$_selectHotel"
        @on:clickSeeAllBtn="$_selectHotel()"
      />
      <SearchBoxResultItem
        v-if="isNearMe && hotelNearMe.length > 0"
        :title="getTextString.near_me"
        :text-see-all="getTextString.see_more_nearby"
        :data="hotelNearMe"
        @on:click="$_selectHotel"
        @on:clickSeeAllBtn="$_selectHotel()"
      />
      <SearchBoxResultItem
        v-if="searchBoxData.recent.length > 0"
        :title="getTextString.recent_searches"
        :text-see-all="getTextString.see_all"
        :data="searchBoxData.recent"
        @on:click="$_selectHotel"
        @on:clickSeeAllBtn="$_selectHotel()"
      />
    </div>
    <div v-if="!searchBoxData.searchText" class="search-box__bottom__container">
      <SearchBoxResultDefault
        :title="getTextString.destinations"
        :data="cityList"
        @on:selectCity="$_selectDistrict"
        @on:selectDistrict="$_selectDistrict"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import SearchBoxResultItem from "./SearchBoxResultItem";
import SearchBoxResultDefault from "./SearchBoxResultDefault.vue";
import CalendarLoader from "@/presentation/components/app-loaders/CalendarLoader";
export default {
  components: {
    SearchBoxResultItem,
    SearchBoxResultDefault,
    CalendarLoader
  },
  props: {
    searchBoxData: {
      type: Object,
      require: true
    }
  },
  computed: {
    ...mapState({
      cityList: state => state.hotel.data.cityList,
      hotelFilter: state => state.hotel.data.hotelFilter,
      isGetAllHotelLoading: state => state.hotel.isGetAllHotelLoading,
      isGetLocationLoading: state => state.general.data.isGetLocationLoading,
      hotelNearMe: state => state.hotel.data.hotel_nearme
    }),
    ...mapGetters({
      citySearch: "hotel/citySearch",
      hotelGetterList: "hotel/hotelsGetterList",
      hotelDisplayList: "hotel/hotelsDisplayList",
      districtList: "hotel/districtListFilterGetter",
      isNearMe: "general/isNearMe"
    }),
    getTextString() {
      return {
        hotel: this.$t("booking.hotel"),
        see_all: this.$t("booking.see_all"),
        near_me: this.$t("booking.near_me"),
        properties: this.$t("booking.properties"),
        top_results: this.$t("booking.top_results"),
        destinations: this.$t("headers.destinations"),
        recent_searches: this.$t("booking.recent_searches"),
        see_more_nearby: this.$t("booking.see_more_nearby")
      };
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
      setSearchKeyword: "booking/setSearchKeyword"
    }),
    $_selectHotel(hotel, type = "hotel") {
      this.$emit("on:selectHotel", { hotel, type });
      this.filterHotelList({
        searchParam: {
          keyword: hotel.name,
          isFilter: true
        }
      });
    },
    $_selectDistrict(hotel) {
      this.$emit("on:selectHotel", { ...hotel, type: hotel.type });
      this.filterHotelList({
        searchParam: {
          keyword: hotel.type === "city" ? hotel.cityName : hotel.districtName,
          isFilter: true
        }
      });
    }
  }
};
</script>

<style lang="scss">
.search-box-result {
  width: 100%;
  color: #000;
  position: relative;
  .search-box__bottom__container {
    display: flex;
    width: 100%;
    height: 500px;
    padding: 20px;
    overflow: auto;
    flex-direction: column;
    background-color: $bg-color-white;
    @include scrollbar;

    @include min-sm {
      flex-direction: row;
    }
  }

  &__loading {
    position: absolute;
    width: 100%;
    height: 100%;
    background: white;
    left: 0;
    @include min-sm {
      top: 0;
      left: 0;
    }
  }
}
</style>
