<template>
  <section v-if="maxPrice && !isPriceLoading" class="hotel-filter-price-range">
    <div class="hotel-filter-price-range__title">
      <h4>{{ filterMobile ? "Nightly Price" : "Price Range" }}</h4>
      <p>¥ YEN</p>
    </div>
    <div v-show="filterMobile" class="hotel-filter-price-range__text">
      <span>All prices are starting from…lorem ipsum dolor est.</span>
    </div>
    <div class="hotel-filter-price-range__slider">
      <div class="slider">
        <vue-slider
          v-model="value"
          :tooltip="'none'"
          :min="minPrice"
          :max="maxPrice"
          @change="$_onChangeSlider"
        />
        <div class="slider__price">
          {{ value[0] | currency("YEN") }}
        </div>
        <div class="slider__price-current">
          {{ value[1] | currency("YEN") }}
          <!-- <span>per person</span> -->
        </div>
      </div>
    </div>
  </section>
</template>

<script>
/* eslint-disable vue/require-default-prop */

import "vue-slider-component/dist-css/vue-slider-component.css";
import "vue-slider-component/theme/default.css";
import Vue from "vue";
import { mapGetters, mapState } from "vuex";
const VueSlider = require("vue-slider-component/dist-css/vue-slider-component.umd.min.js");

export default Vue.extend({
  name: "HotelFilterPriceRange",
  components: {
    VueSlider
  },
  props: {
    filterMobile: {
      type: String
    }
  },
  data() {
    return {
      value: [0, 1000]
    };
  },
  computed: {
    ...mapGetters({
      hotelFilter: "hotel/hotelFilter",
      maxPrice: "hotel/maxPrice",
      minPrice: "hotel/minPrice"
    }),
    ...mapState({
      isPriceLoading: state => state.hotel.isPriceLoading
    }),

    getPriceRange() {
      if (this.hotelFilter.length) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        const hotelList = this.hotelFilter.map(hotel => hotel.price);
        return {
          minPrice: Math.min(...hotelList),
          maxPrice: Math.max(...hotelList)
        };
      }
      return {
        minPrice: 0,
        maxPrice: 1
      };
    }
  },
  watch: {
    // hotelFilter(_hotelFilter) {
    //   const hotelList = this.hotelFilter.map(hotel => hotel.price);
    //   const minPrice = Math.min(...hotelList);
    //   const maxPrice = Math.max(...hotelList);
    //   this.value = [minPrice, maxPrice];
    //   this.$emit("on:ChangeSlider", this.value);
    // },
    maxPrice(maxPrice) {
      this.value = [this.minPrice, maxPrice];
      this.$emit("on:ChangeSlider", this.value);
    }
  },
  mounted() {
    this.value = [this.minPrice, this.maxPrice];
    this.$emit("on:ChangeSlider", this.value);
  },
  methods: {
    $_onChangeSlider() {
      this.$emit("on:ChangeSlider", this.value);
    }
  }
});
</script>

<style lang="scss" scoped>
.hotel-filter-price-range {
  padding: 24px 22px 30px 20px;
  border-bottom: 1px solid $border-color-gray-2;
  &__title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    h4 {
      font-size: 16px;
      font-weight: 600;
    }

    p {
      font-size: 12px;
      padding: 3px 10px;
      border-radius: 3px;
      border: 1px solid;
    }
  }

  &__text {
    font-size: 12px;
    margin-bottom: 27px;
    max-width: 204px;
  }
  &__slider {
    position: relative;
    z-index: 0;
  }
  .slider {
    position: relative;
    padding-top: 40px;
    width: 100%;
    &__price {
      position: absolute;
      top: 5px;
      font-size: 14px;
      left: 0;
      color: $text-color-blue;
      font-weight: bold;
    }
    &__price-current {
      position: absolute;
      top: 5px;
      right: 0;
      font-size: 14px;
      font-weight: bold;
      color: $text-color-blue;
      span {
        font-weight: normal;
        font-size: 10px;
        color: #656565;
      }
    }
  }
}
</style>
