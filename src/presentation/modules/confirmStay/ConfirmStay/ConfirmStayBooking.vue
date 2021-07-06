<template>
  <form @submit.prevent>
    <div class="confirm-stay-booking">
      <div class="confirm-stay-booking__calendar">
        <div
          class="confirm-stay-booking__calendar__top confirm-stay-booking-block"
          @click="showChecking"
        >
          <span class="icon-Icon-Calendar confirm-stay-booking-icon" />
          <span>
            {{ bookingData.checkIn ? getCheckinDate : "" }} -
            {{ bookingData.checkOut ? getCheckoutDate : "" }}
          </span>
        </div>
        <div
          class="confirm-stay-booking__calendar__bottom"
          :class="{ 'hotel-calendar': !isShowSearchBox }"
        >
          <div v-if="bookingState.checking">
            <LazyCalendar
              :invalid-date="invalidDate"
              :minimum-stay="minimumStay"
              :container="'confirm-stay-booking__calendar'"
              :sub-container="'confirm-stay-booking__calendar__bottom'"
              @clickDoneBtn="closeAll"
            />
          </div>
        </div>
      </div>
      <div class="confirm-stay-booking__room-select">
        <div
          class="confirm-stay-booking__room-select__top confirm-stay-booking-block"
          @click="showRoomSelect"
        >
          <span class="icon-Icon-Group confirm-stay-booking-icon" />
          <span>
            {{ roomList }}
            {{
              roomList > 1 ? this.$t("booking.rooms") : this.$t("booking.room")
            }},
            {{ totalGuest }}
            {{
              totalGuest > 1
                ? this.$t("booking.guests")
                : this.$t("booking.guest")
            }}
          </span>
        </div>
        <div class="confirm-stay-booking__room-select__bottom">
          <div v-if="bookingState.roomSelect" class="room-select-container">
            <RoomSelectContent
              v-if="bookingState.roomSelect"
              @on:close="$_onClose"
              @on:apply="$_onApply"
              @on:showRoom="$_onShowRoom"
            />
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
/* eslint-disable vue/require-default-prop */

import Vue from 'vue'
import { mapActions, mapState, mapGetters } from 'vuex'

export default Vue.extend({
  name: 'ConfirmStayBooking',
  props: {
    roomSelect: {
      type: Array
    },
    isShowSearchBox: {
      type: Boolean,
      default: () => false
    }
  },
  data () {
    return {
      calendarContainer: '.confirm-stay-booking__calendar',
      data: { checkIn: null, checkOut: null },
      invalidDate: [
        { start: new Date(2020, 5, 22), end: new Date(2020, 5, 24) }
      ],
      minimumStay: [{ d: new Date(2020, 5, 4) }, { d: new Date(2020, 5, 5) }]
    }
  },
  computed: {
    ...mapState({
      bookingState: state => state.booking.bookingState,
      bookingData: state => state.booking.bookingData,
      isMobile: state => state.general.data.isMobile,
      bookingStorate: state => state.general.data.booking
    }),
    ...mapGetters({
      totalGuest: 'booking/totalGuest',
      language: 'appHeader/language',
      getCheckinDate: 'booking/getCheckinDate',
      getCheckoutDate: 'booking/getCheckoutDate',
      rooms: 'booking/roomList'
    }),

    calendarDate () {
      const checkIn = this.bookingData.checkIn
      const checkOut = this.bookingData.checkOut
      const calendarDate = [checkIn, checkOut]
      return calendarDate
    },

    roomList () {
      return this.bookingData && this.bookingData.roomList.length
    },

    searchValue () {
      return this.bookingData && this.bookingData.location
    }
  },
  watch: {
    language: {
      deep: true,
      handler () {
        this.getBooking()
      }
    }
  },
  methods: {
    ...mapActions({
      showChecking: 'booking/showChecking',
      showRoomSelect: 'booking/showRoomSelect',
      showTotalGuest: 'booking/showTotalGuest',
      showPromoCode: 'booking/showPromoCode',
      closeAll: 'booking/closeAll',
      getCheckin: 'booking/getCheckin',
      getCheckout: 'booking/getCheckout',
      openHeaderSearchBox: 'searchHotel/openHeaderSearchBox',
      getHotelPosition: 'searchHotel/getHotelPosition',
      getBooking: 'booking/getInitialBooking',
      setBooking: 'booking/setInitialBooking',
      searchRoom: 'hotelDetail/searchRoom'
    }),
    $_onClose () {
      this.closeAll()
    },

    $_onApply () {
      this.closeAll()
      this.setBooking(this.bookingData)
      this.$emit('on:applyRoom')
    },

    $_onShowRoom () {
      this.showRoomSelect()
    },

    $_openHeaderSearchBox () {
      this.openHeaderSearchBox()
      this.closeAll()
      this.$scrollBody.disable();
    }
  }

})
</script>

<style lang="scss" scoped>
.confirm-stay-booking {
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;

  @include min-sm{
    flex-direction: row;
    padding: 12px 0;
  }

  @include min-md {
    padding: 0;
    color: #000;
  }
  .confirm-stay-booking-block {
    cursor: pointer;
    width: 100%;
    color: $bg-color-blue-2;
    font-size: 12px;
    font-weight: bold;
    letter-spacing: 0;
    line-height: 17px;
    background: #fff;
    border: 1px solid #dddee0;
    border-radius: 2px;
    padding: 8px 5px;
    height: 43px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 30px;
    @include min-sm {
      position: relative;
      font-size: 14px;
      margin-bottom: 0;
    }

    @include min-lg {
      justify-content: center;
    }

    .confirm-stay-booking-icon {
      display: none;
      @include min-sm {
        display: block;
        font-size: 18px;
        margin-right: 10px;
      }
    }
  }

  &__calendar {
    width: 100%;
    @include min-sm {
      width: 250px;
      position: relative;
    }
    &__bottom {
      @include min-sm {
        display: block;
        position: absolute;
        top: calc(100% + 20px);
        left: 50%;
        transform: translateX(-50%);
        min-width: 750px;
      }
    }
  }
  &__room-select {
    width: 100%;
    @include min-sm {
      width: 250px;
    }
    &__bottom {
      @include min-sm {
        position: relative;
        width: 100%;
        .room-select-container {
          transition: 0.3s ease;
          animation-name: mbsc-anim-p-in;
          animation-duration: 0.3s;
          position: absolute;
          background: #fff;
          z-index: 10000;
          .room-select-wrapper {
            left: -60px;
            top: calc(100% + 20px);
            box-shadow: 2px 3px 14px 0 rgba(74, 74, 74, 0.25);
          }
        }
      }
    }
    @include min-sm {
      margin: 0 15px;
    }
  }
  .close-icon {
    position: absolute;
    right: 5px;
    font-size: 7px;
    width: 16px;
    height: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 1px;
    color: #fff;
    border-radius: 10px;
    background: #8a92a3;
    cursor: pointer;
    @include min-sm {
      right: 10px;
    }
  }
}
.hotel-calendar {
  display: block;
  position: fixed;
  top: 0;
  left: -27px;
  transform: translateX(0);
  z-index: 1000;
  box-shadow: 2px 3px 14px 0 rgba(74, 74, 74, 0.25);
  .calendar-desktop::after {
    left: 12%;
  }

  @include min-md {
    position: absolute;
    top: calc(100% + 20px);
  }
}
</style>
