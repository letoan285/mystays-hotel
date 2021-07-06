<template>
  <div class="hotel-detail-rooms-and-plans__filter">
    <div
      class="hotel-detail-rooms-and-plans__filter-type d-inline-flex"
      :class="'current-filter--' + currentFilter.currentTab"
    >
      <a
        id="filter-by-room"
        @click="$_onChangeFilter(filterTypes.filterByRoom)"
      >
        {{ getLanguage.byRoom }}
      </a>
      <a
        id="filter-by-plan"
        @click="$_onChangeFilter(filterTypes.filterByPlan)"
      >
        {{ getLanguage.byPlan }}
      </a>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
const FilterType = {
  filterByRoom: "room",
  filterByPlan: "plan"
};

export default {
  name: "HotelDetailRoomsAndPlansFilter",
  data() {
    return {
      filterTypes: FilterType
    };
  },
  computed: {
    ...mapGetters({
      currentFilter: "hotelDetail/currentTab",
      lang: "appHeader/fullLanguage"
    }),

    getLanguage() {
      return {
        byRoom: this.$t("hoteldetail.by_room"),
        byPlan: this.$t("hoteldetail.by_plan")
      };
    }
  },
  methods: {
    ...mapActions({
      changeFilter: "hotelDetail/changeTab",
      saveGtmData: "general/saveGtmData"
    }),

    $_onChangeFilter(filterType) {
      this.changeFilter({ currentTab: filterType, currentId: "" });
      this.saveGtmData({
        event: "roomsPlansTab",
        language: this.lang,
        pageCategory: "HotelDetailPage",
        roomsPlansTab: filterType,
        triggerType: "event"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.hotel-detail-rooms-and-plans__filter {
  &-type {
    border: 1px solid $border-color-gray-4;
    border-radius: 5px;
    cursor: pointer;
    overflow: hidden;
    color: $text-color-blue-2;

    a {
      margin: 0;
      padding: 9px 13px;
      min-width: 90px;
      font-size: 12px;
      text-align: center;
      color: $text-color-blue-2;
    }

    &.current-filter--room {
      #filter-by-room {
        background: $bg-color-blue-2;
        color: $white;
      }
    }

    &.current-filter--plan {
      #filter-by-plan {
        background: $bg-color-blue-2;
        color: $white;
      }
    }
  }
}
</style>
