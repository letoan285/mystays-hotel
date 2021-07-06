<template>
  <div class="city-list-container">
    <div class="city-list-container__title">
      {{ title }}
    </div>
    <div class="city-list-container__item">
      <div v-for="(city, cityIndex) in data" :key="cityIndex" class="city-box">
        <div class="city" @click="$_selectCity(city.name)">
          {{ city.name }}
          <span v-if="city.prefectures.length > 1" class="district">
            (
            <span
              v-for="(district, districtIndex) in city.prefectures"
              :key="districtIndex"
            >
              <span @click="$_selectDistrict(district.name)">{{
                district.name
              }}</span>
              <span v-if="districtIndex < city.prefectures.length - 1">/</span>
            </span>
            )
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  props: {
    title: {
      type: String,
      required: true
    },
    data: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isPageLoaded: false
    };
  },
  mounted() {
    this.isPageLoaded = true;
  },
  methods: {
    $_selectCity(cityName, type = "city") {
      this.$emit("on:selectCity", { cityName, type });
    },
    $_selectDistrict(districtName, type = "district") {
      this.$emit("on:selectDistrict", { districtName, type });
    }
  }
});
</script>

<style lang="scss" scoped>
.city-list-container {
  display: flex;
  width: 100%;
  height: min-content;
  flex-wrap: wrap;
  color: #000;
  &__title {
    width: 100%;
    font-size: 20px;
    font-weight: 600;
    letter-spacing: 1px;
    margin-bottom: 10px;
  }

  &__item {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    .city-box {
      display: flex;
      width: 100%;
      font-weight: 600;
      font-size: 14px;
      margin: 10px 0;
      @include min-sm {
        width: 50%;
      }
      .city {
        margin-right: 5px;
        cursor: pointer;
        text-decoration: underline;
      }
      .district span {
        font-weight: normal;
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }
}
</style>
