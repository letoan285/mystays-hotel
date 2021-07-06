<template>
  <div class="checkin">
    <div class="checkin__top" @click="showChecking">
      <div v-if="isMobile">
        <div class="checkin__top__container">
          <span class="icon-Icon-Calendar" />
          <div>
            {{ bookingData.checkIn ? getCheckinDate : `${getLang.checkIn}` }} -
            {{ bookingData.checkOut ? getCheckoutDate : `${getLang.checkOut}` }}
          </div>
        </div>
      </div>
      <div v-else>
        <div class="checkin__top__title">
          <div>{{ getLang.checkIn }}</div>
          <div>{{ getLang.checkOut }}</div>
        </div>
        <div
          class="checkin__top__container"
          :class="{ 'calender-active': isShowChecking }"
        >
          <div class="date-icon">
            <span class="icon-Icon-Calendar" />
          </div>
          <div class="date-item booking-checkin" @click="setStartDate">
            <span class="icon-Icon-Calendar" />
            <div class="date">
              {{ bookingData.checkIn ? getCheckinDate : `${getLang.select}` }}
            </div>
          </div>
          <span class="icon-Arrow-Thin-Right" />
          <div class="date-item" @click="setEndDate">
            <span class="icon-Icon-Calendar" />
            <div class="date">
              {{ bookingData.checkOut ? getCheckoutDate : `${getLang.select}` }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="checkin__bottom">
      <div class="checkin__bottom__container">
        <div v-if="isShowChecking">
          <LazyCalendar
            ref="calendarComponent"
            :minimum-stay="minimumStay"
            :container="'checkin'"
            :sub-container="'checkin__bottom__container'"
            :inner-height="innerHeight"
            @clickDoneBtn="closeAll"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { mapActions, mapState, mapGetters } from "vuex";
import Calendar from "../calendar/Calendar.vue";

export default Vue.extend({
  name: "Checkin",
  components: {
    Calendar
  },
  data: () => {
    return {
      isSetEndDate: false,
      isSetStartDate: false,
      minimumStay: [
        { d: new Date(2020, 12, 25) },
        { d: new Date(2020, 12, 26) }
      ],
      innerHeight: 0
    };
  },
  computed: {
    ...mapGetters({
      language: "appHeader/language",
      getCheckinDate: "booking/getCheckinDate",
      getCheckoutDate: "booking/getCheckoutDate"
    }),
    ...mapState({
      isMobile: state => state.general.data.isMobile,
      bookingData: state => state.booking.bookingData,
      isShowChecking: state => state.booking.bookingState.checking
    }),
    getLang() {
      return {
        checkIn: this.$t("booking.check_in"),
        checkOut: this.$t("booking.check_out"),
        adults: this.$t("booking.adult"),
        children: this.$t("booking.children"),
        add_a_room: this.$t("booking.add_a_room"),
        room: this.$t("booking.room"),
        rooms: this.$t("booking.rooms"),
        guest: this.$t("booking.guest"),
        guests: this.$t("booking.guests"),
        select: this.$t("booking.select"),
        apply: this.$t("booking.apply")
      };
    },
    getDate() {
      const checkIn = this.bookingData.checkIn
        ? new Date(this.bookingData.checkIn)
        : "";
      const checkOut = this.bookingData.checkOut
        ? new Date(this.bookingData.checkOut)
        : "";
      const dateArray = [checkIn, checkOut];
      return dateArray;
    }
  },
  watch: {
    language: {
      deep: true,
      handler() {
        this.getBooking();
      }
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.innerHeight = window.innerHeight;
    });
  },

  methods: {
    ...mapActions({
      showChecking: "booking/showChecking",
      showRoomSelect: "booking/showRoomSelect",
      showTotalGuest: "booking/showTotalGuest",
      getCheckin: "booking/getCheckin",
      getCheckout: "booking/getCheckout",
      closeAll: "booking/closeAll",
      getBooking: "booking/getInitialBooking"
    }),
    setStartDate() {
      if (this.$refs.calendarComponent) {
        this.$refs.calendarComponent.datePicker("start");
      }
    },
    setEndDate() {
      if (this.$refs.calendarComponent) {
        this.$refs.calendarComponent.datePicker("end");
      }
    }
  }
});
</script>
<style scoped lang="scss">
.checkin {
  width: 100%;
  margin-bottom: 20px;
  position: relative;
  @include min-sm {
    flex-basis: 42%;
  }
  @include min-md {
    width: fit-content;
    min-width: 204px;
    margin-bottom: 0;
    flex-basis: auto;
  }
  &__top {
    position: relative;
    &__title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 13px;
      margin-bottom: 12px;
      padding: 0 15px;
      white-space: nowrap;
      display: none;
      & > div {
        width: 45%;
        text-align: center;
      }

      @include min-md {
        display: flex;
      }
    }
    &__container {
      display: flex;
      align-items: center;
      padding: 15px;
      width: 100%;
      background: $bg-color-white;
      border: 2px solid $border-color-gray-2;
      font-size: 14px;
      line-height: 16px;
      color: $text-color-blue;
      // font-weight: 500;
      position: relative;
      @include min-sm {
        height: 50px;
        justify-content: flex-start;
        .icon-Icon-Calendar {
          display: none;
        }
        .date-icon {
          .icon-Icon-Calendar {
            display: block;
          }
        }

        .icon-Arrow-Thin-Right {
          font-size: 13px;
          margin: 15px;
        }
      }
      cursor: pointer;
      span {
        font-size: 16px;
        margin-right: 15px;
      }
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
      @include min-md {
        .date-icon {
          display: none;
        }
        .icon-Icon-Calendar {
          display: block;
        }
        height: 60px;
        &::after {
          content: "";
          opacity: 0;
          visibility: hidden;
          right: 50%;
          width: 20px;
          height: 20px;
          background: #fff;
          top: calc(100% + 50px);
          position: absolute;
          -webkit-transform: translateX(50%) rotate(-45deg);
          transform: translateX(50%) rotate(-45deg);
        }
        justify-content: space-between;
        padding: 10px 20px;
        color: $text-color-gray-6;
        .date-item {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          font-size: 12px;
        }
        .date {
          margin-top: 4px;
        }
        span {
          margin: 0;
          font-size: 16px;
        }
      }
    }

    .calender-active {
      &::after {
        top: calc(100% + 22px);
        opacity: 1;
        visibility: visible;
        transition: 1s ease-in-out;
      }
    }
  }
  &__bottom {
    display: block;
    position: fixed;
    width: fit-content;
    height: 0px;
    top: 0;
    left: 0;
    transition: 0.5s ease;
    animation-name: mbsc-anim-p-in;
    animation-duration: 0.5s;
    z-index: 10;
    padding: 0 100px;

    @include min-md {
      position: absolute;
      top: calc(100% + 28px);
      left: 50%;
      transform: translateX(-50%);
    }

    &__container {
      width: 100vw;
      left: 0;
      position: fixed;
      @include min-md {
        width: 0;
        position: relative;
        min-width: 750px;
      }
    }
  }
}
</style>
