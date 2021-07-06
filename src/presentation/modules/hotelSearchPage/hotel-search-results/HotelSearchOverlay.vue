<template>
  <section class="hotel-search-overlay">
    <div class="hotel-search-overlay__btn-close" @click="$_closeOverlay">
      <span class="icon-Icon-Close" />
    </div>
    <div v-if="overlayState.showMap" class="hotel-search-overlay__map">
      Map
    </div>
    <div v-if="overlayState.showSortBy" class="hotel-search-overlay__sort-by">
      <HotelSearchOverlaySort :sort-by="optionsMultiLang" @onSortBy="$_onSortBy" />
    </div>
    <div v-if="overlayState.showFilter" class="hotel-search-overlay__filter">
      <HotelSearchOverlayFilter />
    </div>
  </section>
</template>

<script>
import Vue from 'vue'
import { mapActions, mapState } from 'vuex'

export default Vue.extend({
  name: 'HotelSearchOverlay',
  data () {
    return {}
  },
  computed: {
    ...mapState({
      overlayState: state => state.searchHotel.filterState
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
    ...mapActions({
      closeOverlay: 'searchHotel/closeOverlay',
      saveSortByValue: 'hotel/saveSortByValue'
    }),
    $_closeOverlay () {
      this.closeOverlay()
    },

    $_onSortBy (sortByList) {
      if (sortByList.length) {
        this.closeOverlay()
        this.saveSortByValue(sortByList[0])
      }
    }
  }

})
</script>

<style lang="scss" scoped>
.hotel-search-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: white;
  z-index: 1001;
  overflow: auto;
  animation-name: mbsc-anim-p-in;
  animation-duration: 0.5s;
  @include min-sm {
    display: none;
  }

  &__btn-close {
    padding: 20px 20px 10px 0;
    position: fixed;
    right: 0;
    width: 100%;
    background: white;
    z-index: 1000;
    text-align: right;
  }

  &__sort-by {
    height: calc(100% - 54px);
  }

  &__filter {
    margin-top: 54px;
  }
}
</style>
