<template>
  <section class="hotel-filter-sort-by">
    <div class="hotel-filter-sort-by__title">
      <h4>{{ getLang.sortBy }}</h4>
    </div>
    <div class="hotel-filter-sort-by__dropdown">
      <AppSelectDesktop
        :list-options="optionsMultiLang"
        :selected-value="filterModel.sortBy"
        :is-auto-complete="false"
        @onClickItem="$_getSortValue"
      />
    </div>
  </section>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  name: 'HotelFilterSortBy',
  data () {
    return {
      selectedSortBy: ''
    }
  },
  computed: {
    ...mapState({
      filterModel: state => state.hotel.data.filterModel
    }),

    getLang () {
      return {
        mostPopular: this.$t('searchhotel.most_popular'),
        highestToLowest: this.$t('searchhotel.highest_to_lowest'),
        lowestToHighest: this.$t('searchhotel.lowest_to_highest'),
        distance: this.$t('searchhotel.distance'),
        highReview: this.$t('searchhotel.high_review'),
        sortBy: this.$t('searchhotel.sort_by')
      }
    },

    optionsMultiLang () {
      const optionList = [
        { value: 'mostPopular', text: this.getLang.mostPopular },
        { value: 'highestToLowest', text: this.getLang.highestToLowest },
        { value: 'lowestToHighest', text: this.getLang.lowestToHighest },
        { value: 'distance', text: this.getLang.distance },
        { value: 'highReview', text: this.getLang.highReview }
      ]
      return optionList
    }
  },
  methods: {
    $_getSortValue (sortBy) {
      this.$emit('sortBy', sortBy)
    }
  }
})
</script>

<style lang="scss" scoped>
.hotel-filter-sort-by {
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
