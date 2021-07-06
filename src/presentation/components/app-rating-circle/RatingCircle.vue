<template>
  <div :class="getCustomClass">
    <ul :class="`${getCustomClass}__item`">
      <li
        v-for="(item, index) in listCircle"
        :key="item"
        :class="`item ${index >= numberCircle ? 'active' : ''}`"
      />
    </ul>
  </div>
</template>

<script lang="ts">
/* eslint-disable vue/require-default-prop */
import Vue from 'vue'

export default Vue.extend({
  name: 'RatingCircle',
  components: {},
  props: {
    numberCircle: {
      type: Number,
      default: 3
    },
    customCircle: {
      type: String
    }
  },
  data () {
    return {
      listCircle: [1, 2, 3, 4, 5]
    }
  },
  computed: {
    getCustomClass () {
      return this.customCircle ? 'custom-circle' : 'rating-circle'
    }
  },
  methods: {}
})
</script>

<style lang="scss" scoped>
.rating-circle {
  &__item {
    display: flex;
    .item {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      margin-right: 2px;
      border: 1px solid $border-dark-green;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      &::before {
        content: "";
        width: 8px;
        height: 8px;
        background: $border-dark-green;
        position: absolute;
        border-radius: 50%;
      }
    }

    .active {
      &::before {
        width: 0;
        height: 0;
      }
    }
  }
}

.custom-circle {
  &__item {
    display: flex;
    .item {
      width: 17px;
      height: 17px;
      border-radius: 50%;
      margin-right: 2px;
      border: 1px solid $border-dark-green;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      &::before {
        content: "";
        width: 11px;
        height: 11px;
        border-radius: 50%;
        background: $border-dark-green;
      }
    }

    .active {
      &::before {
        width: 0;
        height: 0;
      }
    }
  }
}
</style>
