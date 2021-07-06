<template>
  <div class="hotel-navigation-bar-step">
    <ul class="narbar-step">
      <li
        v-for="(step, index) in listStep"
        :key="index"
        :class="`step ${index >= currentStep ? 'active' : ''}`"
      />
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'HotelNavigationBarStep',
  components: {},
  props: {
    currentStep: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      listStep: [1, 2, 3, 4, 5, 6],
      stepCurrent: this.currentStep
    }
  },
  watch: {
    currentStep (step) {
      this.stepCurrent = step
    }
  },
  methods: {}
})
</script>

<style lang="scss" scoped>
.hotel-navigation-bar-step {
  width: 100%;
  height: 5px;
  display: none;
  @include min-sm {
    display: block;
  }
  .narbar-step {
    height: 100%;
    display: flex;
    .step {
      background: $text-color-yellow;
      width: 100%;
      height: 100%;
      border-right: 2px solid $text-color-blue;
    }
    .active {
      background: $text-color-blue;
      border-right: none;
    }
  }
}
</style>
