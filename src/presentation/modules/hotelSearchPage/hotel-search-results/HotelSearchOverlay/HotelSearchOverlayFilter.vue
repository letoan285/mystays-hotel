<template>
  <section class="hotel-search-overlay-filter">
    <div
      v-if="popularFilterList.length"
      class="hotel-search-overlay-filter__popular"
    >
      <div class="hotel-search-overlay-filter__popular__title">
        <h4>Popular Filters</h4>
      </div>
      <div class="hotel-search-overlay-filter__popular__checkbox">
        <AppCheckbox
          v-model="filterList"
          :data="popularFilterList"
          :page="`hotel-filter`"
          :option="`filter`"
          :current-selected="filterList"
          @input="$_onChangeCheckbox"
        />
      </div>
    </div>
    <div
      v-if="tripTypeList.length"
      class="hotel-search-overlay-filter__trip-type"
    >
      <div class="hotel-search-overlay-filter__trip-type__title">
        <h4>Trip Type</h4>
      </div>
      <div class="hotel-search-overlay-filter__trip-type__item">
        <AppCheckbox
          :data="tripTypeList"
          :is-wrapped="true"
          :page="`hotel-filter`"
          @input="$_onChangeCheckbox"
        />
      </div>
    </div>
    <div class="hotel-search-overlay-filter__nightly-price">
      <HotelFilterPriceRange :filter-mobile="`mobile`" />
    </div>
    <div class="hotel-search-overlay-filter__rating">
      <div class="hotel-search-overlay-filter__rating__title">
        <span class="icon-Icon-Social-TripAdvisor" />
        <h4>TripAdvisor Rating</h4>
      </div>
      <div class="hotel-search-overlay-filter__rating__content">
        <div
          v-for="(item, index) in ratingList"
          :key="index"
          class="trip-advisor-rating"
        >
          <input
            :id="`trip-advisor-${item}`"
            v-model="tripAdvisorList"
            :value="item"
            type="checkbox"
          />
          <label :for="`trip-advisor-${item}`">
            <RatingCircle :number-circle="item" :custom-circle="`custom`" />
            <span v-if="index >= 1">& up</span>
          </label>
        </div>
      </div>
    </div>
    <div class="hotel-search-overlay-filter__button">
      <button class="m-btn m-btn__white" @click="$_onReset">Reset</button>
      <button class="m-btn m-btn__blue" @click="$_done">Done</button>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
export default Vue.extend({
  name: "HotelSearchOverlayFilter",
  props: {},
  data() {
    return {
      filterList: [],
      tripAdvisorList: [],
      ratingList: [5, 4, 3, 2],
    };
  },
  computed: {
    ...mapGetters({
      popularFilterList: "hotel/popularFilterList",
      tripTypeList: "hotel/tripTypeList",
    }),
  },
  methods: {
    ...mapActions({
      saveRatingCount: "hotel/saveRatingCount",
    }),

    $_onChangeCheckbox() {},

    $_onReset() {
      this.tripAdvisorList = [];
    },

    $_done() {
      this.saveRatingCount(this.tripAdvisorList);
    },
  },
});
</script>

<style lang="scss" scoped>
.hotel-search-overlay-filter {
  h4 {
    font-size: 18px;
  }
  &__popular {
    padding: 0 20px 30px 20px;
    border-bottom: 1px solid $border-color-gray-2;
    &__title {
      margin-bottom: 30px;
    }
  }

  &__trip-type {
    padding: 27px 20px 30px 20px;
    border-bottom: 1px solid $border-color-gray-2;
    &__title {
      margin-bottom: 30px;
    }
  }

  &__nightly-price {
    padding-top: 6px;
  }

  &__rating {
    padding: 20px 20px 50px 20px;
    &__title {
      display: flex;
      align-items: center;
      margin-bottom: 37px;
      span {
        font-size: 30px;
        margin-right: 8px;
      }
      h4 {
        margin-bottom: 0;
      }
    }

    &__content {
      .trip-advisor-rating {
        display: flex;
        align-items: center;

        span {
          margin-left: 14px;
          font-size: 14px;
        }
      }

      input[type="checkbox"] {
        display: none;
      }

      input[type="checkbox"] + label:before {
        content: "";
        border: 1px solid $border-color-gray-7;
        background-size: contain;
        display: inline-block;
        vertical-align: -5px;
        width: 20px;
        height: 20px;
        margin: 0 15px 0 0;
        border-radius: 3px;
      }

      input[type="checkbox"]:checked + label {
        position: relative;
      }

      input[type="checkbox"]:checked + label:before {
        background: $bg-color-blue;
      }

      input[type="checkbox"]:checked + label:after {
        content: "";
        display: block;
        position: absolute;
        top: 2px;
        left: 7px;
        width: 7px;
        height: 12px;
        -ms-transform: rotate(40deg);
        transform: rotate(40deg);
        border-bottom: 2px solid $white;
        border-right: 2px solid $white;
      }

      label {
        display: flex;
        align-items: center;
      }
    }
  }

  &__button {
    padding: 20px;
    display: flex;
    justify-content: space-between;
    box-shadow: 0 -1px 15px 0 rgba(0, 0, 0, 0.25);
    button {
      width: 48%;
      padding: 11px 0;
    }
  }
}
</style>
