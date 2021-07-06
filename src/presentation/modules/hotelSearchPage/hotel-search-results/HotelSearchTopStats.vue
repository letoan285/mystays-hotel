<template>
  <section
    class="hotel-search-top-stats"
    :class="{ w50: viewType === 'Map View' }"
  >
    <div class="hotel-search-top-stats__left">
      <span class="icon-Icon-Heart-It" />
      <span>Popular destination for these dates.</span>
    </div>
    <div class="hotel-search-top-stats__right">
      <span>20 people searched for ‘Kanto’ today.</span>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'HotelSearchTopStats',
  props: {
    viewType: {
      type: String,
      default: 'List View'
    }
  }
})
</script>

<style lang="scss" scoped>
.hotel-search-top-stats {
  font-size: 14px;
  display: flex;
  flex-direction: column;
  background: white;
  box-shadow: 2px 3px 14px 0 rgba(74, 74, 74, 0.25);
  padding: 10px 20px;
  border-radius: 4px;
  width: 60%;
  @include min-lg {
    width: 74.6%;
  }
  @include min-xl {
    flex-direction: row;
  }
  &__left {
    margin-right: 30px;
    display: flex;
    align-items: center;
    span {
      color: #e02d47;
      font-weight: bold;
      &:first-child {
        font-size: 16px;
        margin-right: 10px;
      }
    }
  }
}

.w50 {
  width: 55%;
}
</style>
