<template>
  <div class="hotel-detail-total-count">
    <div class="hotel-detail-total-count__icon">
      <span class="icon-Icon-People-2" />
    </div>
    <div class="hotel-detail-total-count__number">
      <span>Popular pick for these dates</span>
      <span>109 people looked at this hotel today.</span>
    </div>
    <div class="hotel-detail-total-count__close">
      <span class="icon-Icon-Close" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'HotelDetailTotalCount',
  components: {},
  props: {},
  data () {
    return {}
  },
  methods: {}
})
</script>

<style lang="scss" scoped>
.hotel-detail-total-count {
  background: #f5455a;
  color: white;
  padding: 12px;
  display: flex;
  justify-content: space-between;
  display: none;
  @include min-sm {
    display: none;
  }

  &__icon {
    span {
      padding: 10px;
      background: white;
      color: $text-color-blue;
      border-radius: 50%;
    }
  }

  &__number {
    font-size: 12px;
    span {
      &:first-child {
        font-weight: bold;
        display: block;
      }
    }
  }

  &__close {
    span {
      padding: 5px;
      font-size: 10px;
      background: black;
      opacity: 0.25;
    }
  }
}
</style>
