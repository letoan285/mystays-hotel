<template>
  <div class="hotel-detail-rooms-and-plans__filter-section">
    <button
      class="hotel-detail-rooms-and-plans__filter-section-button"
      :disabled="isDisableFilterButton"
      @click="$_toggleSideBox(true)"
    >
      <span class="icon-Icon-Filter" />
      {{ getLanguage.filter }}
    </button>
    <toggleable-side-box
      :is-fixed="true"
      :is-open="sideBoxOpen"
      @toggleBox="$_toggleSideBox"
    >
      <template v-slot:box-close>
        <h3>{{ $t("hoteldetail.filter") }}</h3>
      </template>
      <template v-slot:box-content>
        <div class="hotel-detail-rooms-and-plans__filter-section-box">
          <div
            v-if="minPrice < maxPrice"
            class="hotel-detail-rooms-and-plans__filter-section-box-section"
          >
            <h3>{{ $t("searchhotel.price_range") }}</h3>
            <div
              class="hotel-detail-rooms-and-plans__filter-section-box-filter"
            >
              <vue-slider
                v-model="value"
                :max="maxPrice"
                :min="minPrice"
                :tooltip="'none'"
              />
              <div
                class="hotel-detail-rooms-and-plans__filter-section-box-filter-price"
              >
                {{ value[0] | currency("YEN") }}
              </div>
              <div
                class="hotel-detail-rooms-and-plans__filter-section-box-filter-price-current"
              >
                {{ value[1] | currency("YEN") }}
              </div>
            </div>
          </div>
          <div
            v-if="planTypes.length"
            class="hotel-detail-rooms-and-plans__filter-section-box-section"
          >
            <h3>Plan Type</h3>
            <div
              class="hotel-detail-rooms-and-plans__filter-section-box-checkboxes"
            >
              <AppCheckbox v-model="currentPlans" :data="planTypes" />
            </div>
          </div>
          <div class="hotel-detail-rooms-and-plans__filter-section-box-section">
            <h3>{{ $t("hoteldetail.meal_type") }}</h3>
            <div
              v-if="mealTypes.length"
              class="hotel-detail-rooms-and-plans__filter-section-box-checkboxes"
            >
              <AppCheckbox
                v-model="currentMeals"
                :data="mealTypes"
                :current-selected="currentMeals"
              />
            </div>
          </div>
          <div
            v-if="roomTypes.length"
            class="hotel-detail-rooms-and-plans__filter-section-box-section"
          >
            <h3>{{ $t("hoteldetail.room_type") }}</h3>
            <div
              class="hotel-detail-rooms-and-plans__filter-section-box-checkboxes"
            >
              <AppCheckbox
                v-model="currentRooms"
                :data="roomTypes"
                :current-selected="currentRooms"
                @input="$_onSelect"
              />
            </div>
          </div>
          <div
            v-if="tripTypes.length"
            class="hotel-detail-rooms-and-plans__filter-section-box-section"
          >
            <h3>Trip Type</h3>
            <div
              class="hotel-detail-rooms-and-plans__filter-section-box-switches"
            >
              <AppCheckbox
                v-model="currentTrips"
                :data="tripTypes"
                :is-wrapped="true"
              />
            </div>
          </div>
          <div class="hotel-detail-rooms-and-plans__filter-section-box-buttons">
            <button
              class="button m-btn m-btn__gray"
              @click="$_toggleSideBox(false)"
            >
              {{ $t("hoteldetail.close") }}
            </button>
            <button class="button m-btn m-btn__blue" @click="$_onFilter">
              {{ $t("searchhotel.done") }}
            </button>
          </div>
        </div>
      </template>
    </toggleable-side-box>
  </div>
</template>

<script>
import "vue-slider-component/dist-css/vue-slider-component.css";
import "vue-slider-component/theme/default.css";
import { mapGetters, mapActions, mapState } from "vuex";

const VueSlider = require("vue-slider-component/dist-css/vue-slider-component.umd.min.js");

export default {
  name: "RoomsAndPlansFilterSection",
  components: {
    VueSlider
  },
  props: {},
  data() {
    return {
      sideBoxOpen: false,
      value: [],
      enableCross: false,
      tooltipMerge: false,
      planTypes: [],
      roomTypes: [
        {
          value: "isSmocking",
          text: "Smocking"
        },
        {
          value: "isNonSmocking",
          text: "Non Smocking"
        }
      ],
      currentPlans: [],
      currentMeals: [],
      currentRooms: [],
      currentTrips: [],
      tripTypes: []
    };
  },
  computed: {
    ...mapGetters({
      mealTypes: "hotelDetail/mealsType",
      roomList: "hotelDetail/roomList",
      planInfo: "hotelDetail/planInfo",
      fullLang: "appHeader/fullLanguage"
    }),
    ...mapState({
      roomFilterModel: state => state.hotelDetail.roomFilterModel,
      isPlanLoading: state => state.hotelDetail.isPlanLoading,
      isRoomLoading: state => state.hotelDetail.isRoomLoading,
      roomListFromState: state => state.hotelDetail.roomList.rooms,
      planInfoFromState: state => state.hotelDetail.planList.plans
    }),

    minPrice() {
      if (this.roomList && this.roomList.length) {
        let minPrice = this.roomList[0].rate;
        this.roomList.forEach(r => {
          if (r.rate < minPrice) {
            minPrice = r.rate;
          }
        });
        return minPrice;
      }

      return 0;
    },

    maxPrice() {
      if (this.planInfo && this.planInfo.length) {
        let maxPrice = this.planInfo[0].maxPrice;
        this.planInfo.forEach(r => {
          if (r.maxPrice > maxPrice) {
            maxPrice = r.maxPrice;
          }
        });

        return maxPrice;
      }

      return 0;
    },

    priceRange() {
      return {
        minPrice: this.minPrice,
        maxPrice: this.maxPrice
      };
    },

    getLanguage() {
      return {
        filter: this.$t("hoteldetail.filter")
      };
    },

    isDisableFilterButton() {
      return (
        this.isPlanLoading ||
        this.isRoomLoading ||
        (!this.roomList.length && !this.planInfo.length)
      );
    }
  },

  watch: {
    roomListFromState() {
      this.value = [this.minPrice, this.maxPrice];
    },
    planInfoFromState() {
      this.value = [this.minPrice, this.maxPrice];
    }
  },
  mounted() {
    this.value = [
      this.roomFilterModel.priceRange[0],
      this.roomFilterModel.priceRange[1]
    ];
    this.currentTrips = this.roomFilterModel.tripType;
    this.currentPlans = this.roomFilterModel.planType;
    this.currentRooms = this.roomFilterModel.roomType;
    this.currentMeals = this.roomFilterModel.mealType;
  },
  methods: {
    ...mapActions({
      saveRoomFilter: "hotelDetail/saveRoomFilter",
      saveGtmData: "general/saveGtmData"
    }),
    $_toggleSideBox(isOpen) {
      if (this.sideBoxOpen) {
        this.$scrollBody.enable();
        this.sideBoxOpen = false;
      } else {
        this.$scrollBody.disable();
      }
      this.sideBoxOpen = isOpen;
    },

    $_onSelect() {
      if (this.currentRooms.length > 1) {
        this.currentRooms.shift();
      }
    },

    $_onFilter() {
      const filterModel = {
        status: true,
        priceRange: this.value,
        planType: this.currentPlans,
        mealType: this.currentMeals,
        roomType: this.currentRooms,
        tripType: this.currentTrips
      };

      this.saveRoomFilter(filterModel);

      this.saveGtmData({
        event: "filterBy",
        filterOption: "$filterOption",
        language: this.fullLang,
        pageCategory: "HotelDetailPage",
        priceRange: `¥${this.value[0]} - ¥${this.value[1]}`,
        triggerType: "event"
      });

      this.$_toggleSideBox(false);
    }
  }
};
</script>

<style lang="scss" scoped>
.hotel-detail-rooms-and-plans__filter-section {
  margin-left: 15px;
  font-size: 12px;
  height: 38px;
  display: flex;
  align-items: center;
  cursor: pointer;
  min-width: 90px;
  justify-content: center;

  @include min-sm {
    margin-left: 35px;
  }

  h3 {
    font-size: 18px;
    color: $text-color-blue;
  }

  [class^="icon-"],
  [class*=" icon-"] {
    margin-right: 5px;
    font-size: 14px;
  }

  &-box {
    min-height: 100%;
    width: 100%;
    background: $white;
    padding: 70px 0;

    &-section {
      padding: 30px 20px;
      border-bottom: 1px solid $border-color-gray-2;

      .app-checkbox {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
        flex-wrap: wrap;

        & .app-checkbox__checkbox {
          flex: 1 1 50%;
        }
      }
    }

    &-switches {
      .app-checkbox {
        & .app-checkbox__checkbox {
          flex: 1 1 100%;
          margin: 10px 0;
        }
      }
    }

    &-filter {
      position: relative;
      padding-top: 40px;

      .vue-slider-process {
        background-color: $bg-color-blue !important;
      }

      &-price,
      &-price-current {
        position: absolute;
        top: 10px;
        font-size: 14px;
        color: $text-color-blue;
      }

      &-price-current {
        transform: translateX(-50%);
        white-space: nowrap;
        right: -20px;

        span {
          color: $text-color-light-gray;
          font-size: 10px;
          opacity: 0.5;
        }
      }
    }

    &-buttons {
      position: fixed;
      bottom: 0;
      right: 0;
      width: 100%;
      height: 70px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: $bg-color-gray-5;

      @include min-xs {
        width: 430px;
      }

      button {
        padding: 11px 0;
        margin: 0 20px;
        flex: 1 1 50%;
      }
    }
  }
  .hotel-detail-rooms-and-plans__filter-section-button {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid $border-color-gray-2;
    border-radius: 5px;
    color: $text-color-blue-2;
    outline: none;
    background: white;
  }

  .hotel-detail-rooms-and-plans__filter-section-box {
    &-section {
      .app-checkbox {
        &__checkbox {
          flex: 1 1 50%;
        }
      }
    }
    &-switches {
      .app-checkbox {
        &__checkbox {
          flex: 1 1 100%;
          margin: 10px 0;
        }
      }
    }
  }
}
</style>
