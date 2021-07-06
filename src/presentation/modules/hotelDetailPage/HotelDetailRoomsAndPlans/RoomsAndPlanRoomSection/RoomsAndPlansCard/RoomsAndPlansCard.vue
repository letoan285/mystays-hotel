<template>
  <div
    class="rooms-and-plans__card main-card"
    :class="{ 'is-member-only': member }"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    member: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style lang="scss" scoped>
.rooms-and-plans__card.main-card {
  box-shadow: $box-shadow-room-card;
  padding: 0;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  position: relative;

  @include min-sm {
    flex-direction: row;
    padding: 12px;
    margin-bottom: 20px;
  }

  &.is-member-only {
    box-shadow: 0 0 0 3px $border-color-pink inset;

    p {
      span {
        color: $text-color-pink;
      }
    }
  }
}
</style>
