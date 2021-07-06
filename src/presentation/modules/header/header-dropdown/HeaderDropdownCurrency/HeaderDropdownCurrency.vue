<template>
  <div class="header-dropdown__currency">
    <div
      v-for="currency in currencies"
      :key="currency"
      class="header-dropdown__currency-wrapper"
      @click="$emit('click-item')"
    >
      {{ currency }}
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'HeaderDropdownCurrency',
  data () {
    return {
      currencies: ['Yen', 'USD']
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.header-dropdown__currency {
  min-width: 110px;

  @include min-md {
    min-width: 130px;
  }

  &-wrapper {
    display: flex;
    padding: 7px 13px;
    font-size: 13px;
    cursor: pointer;

    &:hover {
      background: $bg-color-gray-5;
    }
  }
}
</style>
