<template>
  <div class="hotel-detail-rooms-and-plans-top d-flex">
    <div class="hotel-detail-rooms-and-plans-top__title">
      <h2>
        {{ roomsAndPlansText }}
      </h2>
      <!-- <h2 v-else>No Room and Plan</h2> -->
    </div>
    <!-- <div
      v-click-outside="hide"
      class="hotel-detail-rooms-and-plans-top__filter-button"
    >
      <div class="filter-button" @click="$_openSortPopUp">
        <span class="icon-Icon-Sort" />
        <span>{{ getLang.sortBy }}</span>
      </div>
      <div v-if="isShowSortPopUp" class="sort-by-popup">
        <ul>
          <li
            v-for="(sortBy, index) in sortByList"
            :key="index"
            :class="{ active: currentSort === sortBy.value }"
            @click="$_selectSortValue(sortBy.value)"
          >
            {{ sortBy.name }}
          </li>
        </ul>
      </div>
    </div> -->
    <div class="hotel-detail-rooms-and-plans-top__filters">
      <div
        v-click-outside="hide"
        class="hotel-detail-rooms-and-plans-top__filter-button"
      >
        <div class="filter-button" @click="$_openSortPopUp">
          <span class="icon-Icon-Sort" />
          <span>{{ getLang.sortBy }}</span>
        </div>
        <div v-if="isShowSortPopUp" class="sort-by-popup">
          <ul>
            <li
              v-for="(sortBy, index) in sortByList"
              :key="index"
              :class="{ active: currentSort === sortBy.value }"
              @click="$_selectSortValue(sortBy.value)"
            >
              {{ sortBy.name }}
            </li>
          </ul>
        </div>
      </div>
      <HotelDetailRoomsAndPlansFilter @changeFilter="onChangeFilter()" />
      <RoomsAndPlansFilterSection />
    </div>
  </div>
</template>

<script>
import ClickOutside from "vue-click-outside";
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  directives: {
    ClickOutside
  },
  props: {
    roomsLength: {
      type: Number,
      default: () => 0
    }
  },
  data() {
    return {
      currentSort: "",
      isShowSortPopUp: ""
    };
  },
  computed: {
    ...mapGetters({
      plansList: "hotelDetail/planLeftFilter",
      roomList: "hotelDetail/roomLeftFilter",
      lang: "appHeader/language"
    }),
    ...mapState({
      sortByValue: state => state.hotelDetail.sortBy
    }),

    sortByList() {
      return [
        { name: this.getLang.recommended, value: "recommended" },
        { name: this.getLang.lowestToHighest, value: "lowestToHighest" },
        { name: this.getLang.highestToLowest, value: "highestToLowest" }
      ];
    },

    roomsAndPlansText() {
      if (this.roomList.length || this.plansList.length) {
        return `${this.roomList.length} ${
          this.roomList.length > 1 ? this.getLang.rooms : this.getLang.room
        } 
        & ${this.plansList.length} ${
          this.plansList.length > 1 ? this.getLang.plans : this.getLang.plan
        }`;
      }

      return "";
    },
    getLang() {
      return {
        room: this.$t("booking.room"),
        rooms: this.$t("booking.rooms"),
        plan: this.$t("hoteldetail.plan"),
        plans: this.$t("hoteldetail.plans"),
        sortBy: this.$t("searchhotel.sort_by"),
        lowestToHighest: this.$t("searchhotel.lowest_to_highest"),
        highestToLowest: this.$t("searchhotel.highest_to_lowest"),
        recommended: this.$t("hoteldetail.recommended")
      };
    }
  },
  watch: {
    sortByValue(value) {
      this.currentSort = value;
    }
  },
  mounted() {
    this.currentSort = this.sortByValue;
  },
  methods: {
    ...mapActions({
      saveSortRoomBy: "hotelDetail/saveSortRoomBy",
      saveGtmData: "general/saveGtmData"
    }),
    $_selectSortValue(value) {
      this.isShowSortPopUp = false;
      this.currentSort = value;
      this.saveSortRoomBy(value);

      let sortBy = "";
      switch (value) {
        case "lowestToHighest":
          sortBy = "lowest_to_highest";
          break;
        case "highestToLowest":
          sortBy = "highest_to_lowest";
          break;
        case "recommended":
          sortBy = "highest_to_lowest";
          break;
        default:
          break;
      }

      const gtmData = {
        event: "sortBy",
        language: this.lang,
        pageCategory: "HotelDetailPage",
        sortOption: sortBy,
        triggerType: "event"
      };

      this.saveGtmData(gtmData);
    },
    $_openSortPopUp() {
      this.isShowSortPopUp = true;
    },
    onChangeFilter(filterType) {
      this.$emit("changeFilter", filterType);
    },

    hide() {
      this.isShowSortPopUp = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.hotel-detail-rooms-and-plans-top {
  flex-direction: column;
  margin-bottom: 26px;

  @include min-md {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 41px;
  }

  &__title {
    flex-grow: 1;
    h2 {
      color: $text-color-blue;
      font-size: 18px;
      font-weight: 650;
      margin-bottom: 26px;

      @include min-md {
        font-size: 30px;
        margin-bottom: 0;
      }
    }
  }

  &__filter-button {
    position: relative;
    display: none;
    @include min-sm {
      display: block;
    }
    .filter-button {
      margin-right: 20px;
      border: 1px solid #cccccc;
      padding: 5px 13px;
      height: 36px;
      cursor: pointer;
      border-radius: 5px;
      span {
        margin-right: 5px;
        color: $text-color-blue-2;
        font-size: 13px;
      }
    }
    .sort-by-popup {
      position: absolute;
      top: 55px;
      left: -74%;
      width: 250px;
      background: white;
      box-shadow: -7px 11px 18px -1px rgba(37, 58, 106, 0.5);
      z-index: 10;
      ul {
        li {
          padding: 10px 10px 10px 20px;
          border-bottom: 1px solid #cccccc;
          font-size: 14px;
          cursor: pointer;
          &:hover {
            background: #1a489c;
            color: white;
            border-bottom: 1px solid #1a489c;
          }
        }

        .active {
          background: #1a489c;
          color: white;
          border-bottom: 1px solid #1a489c;
        }
      }

      &::before {
        content: "";
        position: absolute;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid #fff;
        top: -10px;
        left: 45%;
      }
    }
  }

  &__filters {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
