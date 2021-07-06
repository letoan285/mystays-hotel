<template>
  <div class="confirm-stay-overview">
    <div
      v-for="(item, index) in overviewData"
      :key="index"
      class="confirm-stay-overview confirm-stay-overview--block"
    >
      <span :class="item.icon" />
      <span>{{ item.name }}</span>
      <span>{{ item.title }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'HotelDetailOverviewSection',
  props: {
    overviewData: {
      type: Array,
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>
.confirm-stay-overview {
  &--block {
    display: flex;
    align-items: center;
    padding: 14px 0;
    border-bottom: 1px solid #d1d1d1;
    span:first-child {
      margin-right: 15px;
    }
    span:nth-child(2) {
      font-size: 12px;
      font-weight: bold;
      flex: 1;
      @include min-sm {
        font-size: 12px;
      }
    }
    span:last-child {
      font-size: 12px;
      @include min-sm {
        font-size: 12px;
      }
    }
  }
}
</style>
