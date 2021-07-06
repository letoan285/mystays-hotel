<template>
  <div class="booking-item">
    <div
      class="booking-item__image"
      ref="room-image"
      :style="{
        backgroundImage: `url(${roomData.room_type_image ||
          defaultBackgroundImage})`
      }"
    ></div>
    <div class="booking-item__info">
      <div class="mb-2 font-weight-bold booking-item__info__room-name">
        {{ roomData.room_type_name }}
      </div>
      <div class="mb-2 font-weight-bold booking-item__info__room-plan">
        {{ roomData.room_plan_name }}
      </div>
      <div
        class="booking-item__info__status text-capitalize"
        :class="{
          'booking-item__info__status-done': status === 'done',
          'booking-item__info__status-cancelled': status === 'cancelled'
        }"
      >
        <BIconXCircle
          v-if="status === 'cancelled'"
          scale="1"
          variant="danger"
        />
        <BIconCheckSquare
          v-if="status === 'done'"
          scale="1"
          variant="success"
        />
        <span>{{ status }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { BIconXCircle, BIconCheckSquare } from "bootstrap-vue";

export default {
  name: "BookingItem",
  components: {
    BIconCheckSquare,
    BIconXCircle
  },
  props: {
    roomItem: {
      type: Object,
      default: () => {}
    },
    status: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      roomData: this.roomItem,
      defaultBackgroundImage:
        "https://s3-ap-northeast-1.amazonaws.com/triplabot-production/assets/placeholder.jpg"
    };
  },
  watch: {
    roomItem(roomItem) {
      this.roomData = roomItem;
    }
  }
};
</script>

<style lang="scss" scoped>
.booking-item {
  padding: 20px;
  box-shadow: 2px 3px 14px 0 rgba(74, 74, 74, 0.25);
  border-radius: 5px;
  background: white;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  position: relative;

  @include min-sm {
    flex-direction: row;
  }

  &__image {
    width: 150px;
    height: 125px;
    background-size: cover;
    background-position: bottom;
    margin-right: 25px;
    margin-bottom: 20px;

    @include min-sm {
      height: initial;
      margin-bottom: 0;
      width: 180px;
      height: 120px;
    }
  }

  &__info {
    flex: 1;
    &__room-name {
      font-size: 19px;
    }

    &__room-plan {
      font-size: 15px;
    }

    &__status {
      position: absolute;
      top: 120px;
      left: 200px;

      @include min-sm {
        position: static;
      }

      &-done {
        color: green;
      }

      &-cancelled {
        color: #dc3545;
      }
    }
  }

  &__price {
    position: absolute;
    left: 200px;
    top: 60px;

    @include min-sm {
      position: static;
    }
  }
}
</style>
