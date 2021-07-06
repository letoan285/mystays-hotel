<template>
  <section class="hotel-filter-district">
    <div class="hotel-filter-district__title">
      <h4>Locations</h4>
    </div>
    <div class="hotel-filter-district__dropdown">
      <AppSelectDesktop
        :list-options="districtListFormat"
        :selected-value="'Select Location'"
        :is-auto-complete="true"
        @onClickItem="$_getSortValue"
      />
    </div>
  </section>
</template>

<script>
import Vue from "vue";
import { mapState, mapGetters } from "vuex";

export default Vue.extend({
  name: "HotelFilterDisrtrict",
  computed: {
    ...mapState({
      filterModel: state => state.hotel.data.filterModel,
      location: state => state.booking.bookingData.location
    }),
    ...mapGetters({
      districtListFormat: "hotel/districtListFormat"
    }),

    getLang() {
      return {
        mostPopular: this.$t("searchhotel.most_popular"),
        highestToLowest: this.$t("searchhotel.highest_to_lowest"),
        lowestToHighest: this.$t("searchhotel.lowest_to_highest"),
        distance: this.$t("searchhotel.distance"),
        highReview: this.$t("searchhotel.high_review"),
        sortBy: this.$t("searchhotel.sort_by")
      };
    },

    optionsMultiLang() {
      const optionList = [
        { value: "mostPopular", text: this.getLang.mostPopular },
        { value: "highestToLowest", text: this.getLang.highestToLowest },
        { value: "lowestToHighest", text: this.getLang.lowestToHighest },
        { value: "distance", text: this.getLang.distance },
        { value: "highReview", text: this.getLang.highReview }
      ];
      return optionList;
    }
  },
  methods: {
    $_getSortValue(district) {
      this.$emit("on:sendDistrict", district);
    }
  }
});
</script>

<style lang="scss" scoped>
.hotel-filter-district {
  padding: 20px 20px 30px 20px;
  border-bottom: 1px solid $border-color-gray-2;
  &__title {
    margin-bottom: 21px;
    h4 {
      font-size: 16px;
      font-weight: 600;
    }
  }
}
</style>
