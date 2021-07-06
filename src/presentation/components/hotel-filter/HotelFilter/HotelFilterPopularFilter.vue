<template>
  <section class="hotel-filter-popular-filter">
    <div class="hotel-filter-popular-filter__title">
      <h4>Popular Filters</h4>
    </div>
    <div class="hotel-filter-popular-filter__checkbox">
      <AppCheckbox
        v-model="popularFilterList"
        :data="popularFilters"
        :page="`hotel-filter`"
        @input="$_onChangeCheckbox"
      />
    </div>
  </section>
</template>

<script lang="ts">
/* eslint-disable vue/require-default-prop */

import Vue from 'vue'
export default Vue.extend({
  name: 'HotelFilterPopularFilter',
  props: {
    popularFilters: {
      type: Array
    },
    popularFilterList: {
      type: Array
    }
  },
  data () {
    return {
      popularsFilterList: this.popularFilterList
    }
  },
  methods: {
    $_onChangeCheckbox () {
      this.$emit('changePopularFilterList', this.popularFilterList)
    }
  }
})
</script>

<style lang="scss" scoped>
.hotel-filter-popular-filter {
  padding: 20px 20px 8px 20px;
  border-bottom: 1px solid $border-color-gray-2;
  &__title {
    margin-bottom: 20px;
    h4 {
      font-size: 16px;
      font-weight: 600;
    }
  }
}
</style>
