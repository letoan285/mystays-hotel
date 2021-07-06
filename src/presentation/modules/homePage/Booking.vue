<template>
  <div class="app-booking" :class="{ active: isActiveBooking }">
    <div
      class="app-booking__overlay"
      :class="{ 'active-overlay': isActiveBooking }"
      @click="$_closeOverlay"
    />
    <div
      class="app-booking__booking-section"
      :class="{
        'active-section': isActiveBooking,
        'active-mobile': isBooking.checking || isBooking.roomSelect,
      }"
    >
      <SearchBox />
      <div class="app-booking__middle-device__section">
        <Checkin />
        <RoomSelect />
        <PromotionCode />
      </div>
      <SearchButton />
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { mapActions, mapState, mapGetters } from "vuex";
export default Vue.extend({
  name: "Booking",
  computed: {
    ...mapState({
      isBooking: (state) => state.booking.bookingState,
      languages: (state) => state.general.data.locale.messages,
    }),
    ...mapGetters({
      isSelectedAge: "booking/isSelectedAge",
      isKidsTierSupport: "hotel/isKidsTierSupport",
    }),
    isActiveBooking() {
      const { location, checking, roomSelect, promoCode } = this.isBooking;

      return location || checking || roomSelect || promoCode;
    },
  },
  methods: {
    ...mapActions({
      closeAll: "booking/closeAll",
    }),
    $_closeOverlay() {
      if (this.isKidsTierSupport) {
        if (this.isSelectedAge) {
          this.closeAll();
        } else {
          this.$nuxt.$emit("onCloseOverlay");
        }
      } else {
        this.closeAll();
      }
    },
  },
});
</script>
<style lang="scss" scoped>
.app-booking {
  background-color: #f3f3f3;
  padding: 40px 20px 18px 20px;
  height: 100%;
  display: flex;
  align-items: center;

  @include min-sm {
    background-image: url("https://d2ahiw9kb7is19.cloudfront.net/-/media/Mystays/Home/Hero-Banner/desktop.jpg?d=20200421T022239");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    padding: 40px 0 18px 0;
    min-height: 750px;
    position: relative;

    &.active {
      overflow: hidden;
    }
  }

  @include min-md {
    padding: 135px 50px 203px 50px;
  }

  @include min-xl {
    padding: 135px 135px 203px 135px;
    min-height: 700px;
  }

  &__middle-device__section {
    width: 100%;

    @include min-sm {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }

    @include min-md {
      justify-content: space-evenly;
      flex: 1;
    }
  }

  &__overlay {
    display: none;
    position: fixed;
    left: 0;
    top: 0;
    opacity: 0.95;
    width: 100%;
    z-index: 1010;
    height: 100%;
    @include min-sm {
      background: #232e48;
    }
  }
  
  &__booking-section {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    flex-direction: column;
    position: relative;
    width: 100%;
    transition: top 0.3s ease-in;

    @include min-sm {
      padding: 40px 20px 18px 20px;
      background-color: $bg-color-white;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    @include min-md {
      padding: 27px 37px;
      flex-direction: row;
      margin: 0 auto;
      width: 950px;
      box-shadow: 0 0 7px 0;
    }
  }
  
  .active-overlay {
    display: block;
    transition: 0.5s ease;
    animation: show 0.5s;
  }

  @keyframes show {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  
  .active-section {
    z-index: 1020;

    &.active-mobile {
      z-index: 10000;
    }

    @include min-sm {
      top: 30%;

      &.active-mobile {
        position: static;
        top: 0;
        left: 0;
        transform: none;
      }
    }
    @include min-md {
      top: 20%;
      background-color: $border-color-blue-3;
      box-shadow: none;

      &.active-mobile {
        position: absolute;
        left: 50%;
        top: 20%;
        transform: translate(-50%, -50%);
      }
      .search-box__top__input {
        &::before {
          content: "";
          right: 1px;
          bottom: 1px;
          position: absolute;
          width: 0;
          height: 0;
          border: 5px solid transparent;
          border-top: 5px solid #ffd25d;
          border-right: 5px solid #ffd25d;
          -webkit-transform: rotate(90deg);
          transform: rotate(90deg);
        }
      }
    }
  }
}
</style>
