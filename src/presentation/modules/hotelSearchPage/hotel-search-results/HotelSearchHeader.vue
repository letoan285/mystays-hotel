<template>
  <div>
    <div
      ref="hotel-search-header"
      class="hotel-search-header"
      :class="{ sticky: viewType === 'Map View' }"
    >
      <div class="container">
        <div
          class="hotel-search-header__map hotel-search-header--block"
          @click="$_showMapView"
        >
          <span
            :class="
              `${
                viewType === 'Map View' ? 'icon-Icon-List' : 'icon-Icon-Map-Pin'
              }`
            "
          />
          <span>{{
            viewType === "Map View" ? getLang.listView : getLang.mapView
          }}</span>
        </div>
        <div
          class="hotel-search-header__sort hotel-search-header--block"
          @click="$_showSortBy"
        >
          <span class="icon-Icon-Sort" />
          <span>{{ getLang.sortBy }}</span>
        </div>
        <div
          class="hotel-search-header__filter hotel-search-header--block"
          @click="$_showFilter"
        >
          <span class="icon-Icon-Filter" />
          <span>{{ getLang.filter }}</span>
        </div>
      </div>
    </div>
    <div
      class="hotel-search-header"
      :class="{ sticky: isSticky }"
      v-if="isSticky"
    >
      <div class="container">
        <div
          class="hotel-search-header__map hotel-search-header--block"
          @click="$_showMapView"
        >
          <span
            :class="
              `${
                viewType === 'Map View' ? 'icon-Icon-List' : 'icon-Icon-Map-Pin'
              }`
            "
          />
          <span>{{
            viewType === "Map View" ? getLang.listView : getLang.mapView
          }}</span>
        </div>
        <div
          class="hotel-search-header__sort hotel-search-header--block"
          @click="$_showSortBy"
        >
          <span class="icon-Icon-Sort" />
          <span>{{ getLang.sortBy }}</span>
        </div>
        <div
          class="hotel-search-header__filter hotel-search-header--block"
          @click="$_showFilter"
        >
          <span class="icon-Icon-Filter" />
          <span>{{ getLang.filter }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapActions, mapState, mapGetters } from "vuex";

export default Vue.extend({
  name: "HotelSearchHeader",
  data() {
    return {
      newViewType: "",
      searchBarOffsetTop: 0,
      isSticky: false
    };
  },
  computed: {
    ...mapState({
      viewType: state => state.searchHotel.viewType,
      isHotelLoading: state => state.hotel.isHotelLoading,
      isPriceLoading: state => state.hotel.isPriceLoading
    }),

    ...mapGetters({
      hotelFilter: "hotel/hotelFilter"
    }),

    getLang() {
      return {
        mapView: this.$t("searchhotel.map_view"),
        listView: this.$t("searchhotel.list_view"),
        sortBy: this.$t("searchhotel.sort_by"),
        filter: this.$t("hoteldetail.filter")
      };
    }
  },
  mounted() {
    this.searchBarOffsetTop = this.$refs["hotel-search-header"].offsetTop;
    window.addEventListener("scroll", this.$_onScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.$_onScroll);
  },
  methods: {
    ...mapActions({
      showMapView: "searchHotel/showMapViewOverlay",
      showSortBy: "searchHotel/showSortByOverlay",
      showFilter: "searchHotel/showFilterOverlay",
      changeViewType: "searchHotel/changeViewType"
    }),
    $_onScroll() {
      this.isSticky =
        window.pageYOffset > this.searchBarOffsetTop &&
        this.hotelFilter.length > 1;
    },

    $_showMapView() {
      this.newViewType = this.viewType;
      if (this.newViewType === "List View") {
        this.newViewType = "Map View";
      } else {
        this.newViewType = "List View";
      }
      if (!this.isHotelLoading) {
        this.changeViewType(this.newViewType);
      }
    },
    $_showSortBy() {
      if (!this.isHotelLoading) {
        this.showSortBy();
      }
    },
    $_showFilter() {
      if (!this.isHotelLoading) {
        this.showFilter();
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.hotel-search-header {
  margin-bottom: 16px;
  border-radius: 3px;
  .container {
    display: flex;
    align-items: center;
    width: 100%;
  }

  @include min-sm {
    display: none;
  }

  &__sort {
    border-left: 1px solid $border-color-gray-2;
    border-right: 1px solid $border-color-gray-2;
  }

  &--block {
    display: flex;
    align-items: center;
    justify-content: center;
    width: calc(100% / 3);
    padding: 3px 0;
    background: $text-color-blue-2;
    span {
      color: white;
      font-size: 13px;
      &:last-child {
        font-size: 12px;
        font-weight: bold;
        margin: 8px;
      }
    }
  }
}

.sticky {
  padding: 2px 0;
  margin-bottom: 16px;
  border-radius: 3px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 1000;
  border-radius: 0px;
  background: $text-color-blue-2;
}
</style>
