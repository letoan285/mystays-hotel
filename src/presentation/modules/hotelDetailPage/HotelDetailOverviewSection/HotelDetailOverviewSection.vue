<template>
  <div class="hotel-detail-overview">
    <div
      v-for="(item, index) in overviews"
      :key="index"
      class="hotel-detail-overview hotel-detail-overview--block"
    >
      <span :class="item.icon" />
      <span>{{ item.name }}</span>
      <span>{{ item.title }}</span>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable vue/require-default-prop */
import Vue from 'vue'

export default Vue.extend({
  name: 'HotelDetailOverviewSection',
  props: {
    overviewData: {
      type: Array
    }
  },
  data () {
    return {
      overviews: this.overviewData
    }
  },
  watch: {
    overviewData (newData) {
      this.overviews = newData
    }
  }
})
</script>

<style lang="scss" scoped>
.hotel-detail-overview {
  &--block {
    display: flex;
    align-items: center;
    padding: 14px 0;
    border-bottom: 1px solid #d1d1d1;
    @include min-sm {
      flex-wrap: wrap;
    }
    @include min-xl {
      flex-wrap: nowrap;
    }
    span:first-child {
      margin-right: 15px;
    }
    span:nth-child(2) {
      font-size: 12px;
      font-weight: bold;
      width: 130px;
      flex: 1;
      @include min-sm {
        font-size: 14px;
        flex-basis: 70%;
      }
      @include min-xl {
        flex: 1;
        width: fit-content;
      }
    }
    span:last-child {
      font-size: 12px;
      @include min-sm {
        font-size: 13px;
        margin-left: 30px;
      }
    }
  }
}
</style>
