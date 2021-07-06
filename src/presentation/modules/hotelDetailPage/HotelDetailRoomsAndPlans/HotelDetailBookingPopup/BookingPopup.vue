<template>
  <div class="booking-popup">
    <!-- <div class="booking-popup__title">Room {{ roomN Selected!</div> -->
    <div class="booking-popup__content">
      <h3>Great! You’ve added</h3>
      <div class="booking-popup__content__booking-status">
        <div
          class="room-and-plan"
          v-for="(item, index) in roomName"
          :key="index"
        >
          <span>{{ $t("booking.room") }} {{ index + 1 }}:</span>
          <span> {{ item }}</span>
        </div>
      </div>
      <p v-if="isSameRoom && !isKidsTierSupport">
        Book the same for Room {{ roomName.length + 1 }}?
      </p>
    </div>
    <div class="booking-popup__button">
      <button class="m-btn m-btn__black" @click="$_closeModal">
        {{
          isSameRoom && !isKidsTierSupport && isRoomValid
            ? "No, Select another room"
            : $t("hoteldetail.select_another_room")
        }}
      </button>
      <button
        v-if="isSameRoom && !isKidsTierSupport && isRoomValid"
        class="m-btn m-btn__yellow"
        @click="$_bookSameRoom"
      >
        Yes, Book the same room
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "BookingPopup",
  props: {
    roomName: {
      type: Array,
      default: () => []
    },
    isSameRoom: {
      type: Boolean,
      default: false
    },
    isKidsTierSupport: {
      type: Boolean,
      default: false
    },
    isRoomValid: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    $_bookSameRoom() {
      this.$emit("on:BookSameRoom");
    },

    $_closeModal() {
      this.$emit("on:CloseModal");
    }
  }
};
</script>

<style lang="scss" scoped>
.booking-popup {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  color: white;
  background: $text-color-blue;
  overflow: auto;
  @include min-sm {
    position: static;
    padding: 10px;
  }
  &__title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  &__content {
    font-size: 16px;
    margin-bottom: 20px;
    font-weight: 500;
    padding: 50px 15px;
    @include min-sm {
      padding: 0;
      h3 {
        margin-bottom: 20px;
        font-size: 20px;
      }
    }
    &__booking-status {
      text-align: left;
      @include min-sm {
        margin-left: 15px;
      }

      .room-and-plan {
        margin-bottom: 20px;
        span {
          margin-bottom: 15px;
          &:first-child {
            font-weight: bold;
            margin-right: 15px;
          }
        }
      }
    }
  }
  &__button {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    position: fixed;
    left: 0;
    bottom: 10px;
    padding: 30px 20px 0 20px;
    background: $text-color-blue;
    @include min-sm {
      flex-direction: row;
      position: static;
    }
    button {
      width: 100%;
      padding: 15px 20px;
      margin-bottom: 15px;
      @include min-sm {
        padding: 10px;
        margin-bottom: 0;
        width: 48%;
      }
    }
  }
}
</style>
