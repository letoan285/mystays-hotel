<template>
  <div class="hotel-filter">
    <div class="hotel-filter__price-range">
      <HotelFilterPriceRange @on:ChangeSlider="$_getPriceRange" />
    </div>
    <div class="hotel-filter__sort-by">
      <HotelFilterSortBy @sortBy="$_onSortBy" />
    </div>
    <div class="hotel-filter__prefecture">
      <HotelFilterPrefecture @on:sendDistrict="$_onSaveDistrict" />
    </div>
    <div class="hotel-filter__popular-filter">
      <HotelFilterPopularFilter
        v-if="popularFilters.length"
        :popular-filters="popularFilters"
        :popular-filter-list="popularFilterList"
        @changePopularFilterList="$_getPopularFilterList"
      />
    </div>
    <div class="hotel-filter__trip-type">
      <HotelFilterTripType
        v-if="tripTypes.length"
        :trip-types="tripTypes"
        :trip-type-list="tripTypeList"
        @changeTripType="$_getTripTypeList"
      />
    </div>
    <div class="hotel-filter__footer">
      <button class="m-btn m-btn__white" @click="$_onReset">
        {{ $t("searchhotel.reset") }}
      </button>
      <button class="m-btn m-btn__blue" @click="$_onFilterHotel">
        {{ $t("searchhotel.done") }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapGetters, mapState } from "vuex";
import HotelFilterPriceRange from "./HotelFilter/HotelFilterPriceRange.vue";
import HotelFilterSortBy from "./HotelFilter/HotelFilterSortBy.vue";
import HotelFilterPopularFilter from "./HotelFilter/HotelFilterPopularFilter.vue";
import HotelFilterTripType from "./HotelFilter/HotelFilterTripType.vue";
export default Vue.extend({
  name: "HotelFilter",
  components: {
    HotelFilterPriceRange,
    HotelFilterSortBy,
    HotelFilterPopularFilter,
    HotelFilterTripType
  },
  props: {},
  data() {
    return {
      sortBy: "",
      tripTypeList: [],
      popularFilterList: [],
      price: [],
      prefecture: ""
    };
  },
  computed: {
    ...mapGetters({
      tripTypes: "hotel/tripTypeList",
      popularFilters: "hotel/popularFilterList"
    }),
    ...mapState({
      filterModel: (state: any) => state.hotel.data.filterModel
    })
  },
  mounted() {
    this.sortBy = this.filterModel.sortBy;
    this.tripTypeList = this.filterModel.tripType;
    this.popularFilterList = this.filterModel.popularFilterList;
  },
  methods: {
    ...mapActions({
      saveModelFilter: "hotel/saveModelFilter",
      openFilterSection: "searchHotel/openFilterSection",
      resetFilterModel: "hotel/resetFilterModel",
      setSearchKeyword: "booking/setSearchKeyword"
    }),
    $_getPriceRange(value: any) {
      this.price = value;
    },

    $_onSortBy(sortBy: any) {
      this.sortBy = sortBy;
    },

    $_getTripTypeList(tripTypeList: any) {
      this.tripTypeList = tripTypeList;
    },

    $_getPopularFilterList(popularFilterList: any) {
      this.popularFilterList = popularFilterList;
    },

    $_onSaveDistrict(prefecture: string) {
      this.prefecture = prefecture;
    },

    $_onFilterHotel() {
      const filterModel = {
        price: {
          minPrice: this.price[0],
          maxPrice: this.price[1]
        },
        sortBy: this.sortBy,
        popularFilter: this.popularFilterList,
        tripType: this.tripTypeList,
        prefecture: this.prefecture,
        isFilter: true
      };

      this.setSearchKeyword(this.prefecture);

      this.openFilterSection(false);
      this.saveModelFilter(filterModel);
      (this as any).$scrollBody.enable();
    },

    $_onReset() {
      this.resetFilterModel();
      this.sortBy = this.filterModel.sortBy;
    }
  }
});
</script>

<style lang="scss" scoped>
.hotel-filter {
  border: 1px solid $border-color-gray-2;

  &__footer {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    button {
      padding: 10px 0;
      width: 46%;
    }
  }
}
</style>
