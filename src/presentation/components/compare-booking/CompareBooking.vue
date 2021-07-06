<template>
  <div v-if="isUpdateBooking" class="compare-booking">
    <div class="container">
      Old Booking is:
      <span>{{
        reservationsData &&
          reservationsData.hotel &&
          reservationsData.hotel.name
      }}</span>
      on
      <span>{{ timeText }}</span>
      for
      <span>{{ roomAndGuestText }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapState } from 'vuex'
import moment from 'moment'

export default Vue.extend({
  name: 'CompareBooking',
  data () {
    return {
      isShowMap: false
    }
  },
  computed: {
    ...mapState({
      bookingData: (state: any) => state.booking.bookingData,
      isUpdateBooking: (state: any) => state.hotelDetail.isUpdateBooking
    }),
    ...mapGetters({
      reservationsData: 'booking/reservationsData',
      totalNight: 'booking/totalNight',
      numberAdults: 'booking/numberAdults',
      numberChildren: 'booking/numberChildren'
    }),

    timeText (): string {
      const checkIn = this.$_convertTime(this.reservationsData?.checkin_date)
      const checkOut = this.$_convertTime(this.reservationsData?.checkout_date)

      return `${checkIn} - ${checkOut}`
    },

    roomAndGuestText (): string {
      const numberRoom = this.reservationsData?.room_count
      const numberGuest =
        this.reservationsData?.adults + this.reservationsData?.children

      return `${numberRoom} ${numberRoom > 1 ? this.getLang.rooms : this.getLang.room} , ${numberGuest} ${numberGuest > 1 ? this.getLang.guests : this.getLang.guest}`
    },

    getLang (): any {
      return {
        guest: this.$t('booking.guest'),
        guests: this.$t('booking.guests'),
        room: this.$t('booking.room'),
        rooms: this.$t('booking.rooms')
      }
    }
  },

  methods: {
    $_convertTime (time: any) {
      return moment(time)
        .format('MMM DD')
        .toString()
    }
  }
})
</script>

<style lang="scss" scoped>
.compare-booking {
  background: white;
  padding: 20px 0;
  .container {
    text-align: center;
    color: red;
    span {
      font-weight: bold;
    }
  }
}
</style>
