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
      <div class="room-item-base__room-loading__amenities">
        <div class="amenities" />
        <div class="amenities" />
        <div class="amenities" />
        <div class="amenities" />
        <div class="amenities" />
      </div>
      <div class="room-item-base__room-loading__action">
        <div class="action" />
        <button class="button m-btn m-btn__yellow">
          {{ $t("hoteldetail.see_plan") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RoomCardLoader",
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
      display: none;
      @include min-sm {
        display: block;
      }
    }
    &__amenities {
      display: none;
      @include min-sm {
        min-width: 250px;
        justify-content: space-between;
        flex-wrap: wrap;
        display: flex;
      }

      @include min-md {
        min-width: 280px;
      }

      @include min-xl {
        min-width: 355px;
      }
      .amenities {
        height: 35px;
        margin-bottom: 5px;
        box-shadow: 2px 3px 14px 0px rgba(74, 74, 74, 0.25);
        @include background-shimmer(
          $base-color: #f3f3f3,
          $shimmer-color: white
        );

        @include min-sm {
          width: 32%;
        }

        @include min-md {
          min-width: 47%;
        }
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
        min-width: 160px;
      }

      @include min-md {
        min-width: 220px;
      }

      @include min-xl {
        min-width: 250px;
      }
      box-shadow: 2px 3px 14px 0px rgba(74, 74, 74, 0.25);
      @include background-shimmer($base-color: #f3f3f3, $shimmer-color: white);
    }
  }
}
</style>
