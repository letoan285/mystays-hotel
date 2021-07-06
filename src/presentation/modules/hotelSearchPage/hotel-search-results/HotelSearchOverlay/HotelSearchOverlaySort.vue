<template>
  <section class="hotel-search-overlay-sort">
    <div class="hotel-search-overlay-sort__title">
      <h4>{{ $t("searchhotel.sort_by") }}</h4>
    </div>
    <div class="hotel-search-overlay-sort__checkbox">
      <AppCheckbox
        v-model="sortByList"
        :data="sortBy"
        :page="`hotel-filter`"
        :option="`sort-by`"
        :current-selected="sortByList"
        @input="$_onChangeCheckbox"
      />
    </div>
    <div class="hotel-search-overlay-sort__button">
      <button class="m-btn m-btn__blue" @click="$_onSortBy">
        Done
      </button>
    </div>
  </section>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  name: 'HotelSearchOverlaySort',
  props: {
    sortBy: {
      type: Array
    }
  },
  data () {
    return {
      sortByList: []
    }
  },
  computed: {
    ...mapState({
      sortByModel: state => state.hotel.data.filterModel.sortBy
    })
  },
  created () {
    this.sortByList[0] = this.sortByModel
  },
  methods: {
    $_onChangeCheckbox (_value) {
      if (this.sortByList.length > 1) {
        this.sortByList.shift()
      }
    },

    $_onSortBy () {
      this.$emit('onSortBy', this.sortByList)
    }
  }
})
</script>

<style lang="scss" scoped>
.hotel-search-overlay-sort {
  position: relative;
  height: 100%;
  margin-top: 54px;
  &__title {
    padding: 0 34px;
    margin-bottom: 32px;
    h4 {
      font-size: 18px;
    }
  }

  &__checkbox {
    padding: 0 34px;
  }

  &__button {
    position: absolute;
    width: 100%;
    bottom: 21px;
    padding: 0 20px;
    button {
      width: 100%;
      padding: 11px 0;
    }
  }
}
</style>
