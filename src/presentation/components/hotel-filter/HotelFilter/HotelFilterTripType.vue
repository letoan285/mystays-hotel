<template>
  <section class="hotel-filter-trip-type">
    <div class="hotel-filter-trip-type__title">
      <h4>Trip Type</h4>
    </div>
    <div class="hotel-filter-trip-type__radio">
      <AppCheckbox
        v-model="tripTypeList"
        :data="tripTypes"
        :is-wrapped="true"
        :page="`hotel-filter`"
        :current-selected="tripTypeList"
        @input="$_onChangeCheckbox"
      />
    </div>
  </section>
</template>

<script lang="ts">
/* eslint-disable vue/require-default-prop */

import Vue from 'vue'
export default Vue.extend({
  name: 'HotelFilterTripType',
  props: {
    tripTypes: {
      type: Array
    },
    tripTypeList: {
      type: Array
    }
  },
  data () {
    return {
      tripsTypeList: this.tripTypeList
    }
  },
  methods: {
    $_onChangeCheckbox () {
      this.$emit('changeTripType', this.tripTypeList)
    }
  }
})
</script>

<style lang="scss" scoped>
.hotel-filter-trip-type {
  padding: 20px 20px 12px 20px;
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
