<template>
  <div class="room-item-base">
    <div
      v-for="(item, index) in roomLoadingArray"
      :key="index"
      class="room-item-base__room-loading"
    >
      <div
        class="room-item-base__room-loading__image room-item-base__room-loading--animation"
      />
      <div
        class="room-item-base__room-loading__name room-item-base__room-loading--animation"
      />
      <div class="room-item-base__room-loading__action">
        <div class="action" />
        <button class="button m-btn m-btn__yellow">
          {{ $t("hoteldetail.see_room") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlansCardLoader",
  data() {
    return {
      roomLoadingArray: [1, 2, 3, 4, 5]
    };
  }
};
</script>

<style lang="scss" scoped>
.room-item-base {
  &__room-loading {
    width: 100%;
    height: 170px;
    padding: 12px;
    box-shadow: 2px 3px 14px 0px rgba(74, 74, 74, 0.25);
    margin-bottom: 30px;
    display: flex;
    justify-content: space-between;
    background: #f3f3f3;
    &__name {
      max-height: 40px;
      min-width: 600px;
      display: none;
      @include min-sm {
        display: block;
        flex: 1;
        margin: 0 35px;
      }
    }
    &__amenities {
      display: none;
      @include min-sm {
        min-width: 355px;
        justify-content: space-between;
        flex-wrap: wrap;
        display: flex;
      }
      .amenities {
        width: 47%;
        height: 35px;
        margin-bottom: 5px;
        box-shadow: 2px 3px 14px 0px rgba(74, 74, 74, 0.25);
        @include background-shimmer(
          $base-color: #f3f3f3,
          $shimmer-color: white
        );
      }
    }
    &__action {
      display: none;
      @include min-sm {
        display: block;
        min-width: 170px;
      }
      .action {
        height: 60px;
        box-shadow: 2px 3px 14px 0px rgba(74, 74, 74, 0.25);
        margin-bottom: 15px;
        @include background-shimmer(
          $base-color: #f3f3f3,
          $shimmer-color: white
        );
      }
      button {
        width: 100%;
        height: 45px;
      }
    }
    &--animation {
      min-width: 100%;
      @include min-sm {
        min-width: 250px;
      }
      box-shadow: 2px 3px 14px 0px rgba(74, 74, 74, 0.25);
      @include background-shimmer($base-color: #f3f3f3, $shimmer-color: white);
    }
  }
}
</style>
