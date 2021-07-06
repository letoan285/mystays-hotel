<template>
  <div class="room-select">
    <RoomSelectButton @on:showRoom="$_onShowRoom" />
    <RoomSelectContent
      v-if="isShowRoomSelect"
      @on:close="$_onClose"
      @on:apply="$_onApply"
      @on:showRoom="$_onShowRoom"
    />
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import Vue from 'vue'
import RoomSelectContent from './RoomSelect/RoomSelectContent.vue'
import RoomSelectButton from './RoomSelect/RoomSelectButton.vue'

export default Vue.extend({
  name: 'RoomSelect',
  components: {
    RoomSelectContent,
    RoomSelectButton
  },
  data () {
    return {}
  },
  computed: {
    ...mapGetters({
      totalGuest: 'booking/totalGuest',
      numberAdults: 'booking/numberAdults',
      numberChildren: 'booking/numberChildren',
      totalNight: 'booking/totalNight'
    }),
    ...mapState({
      isShowRoomSelect: state => state.booking.bookingState.roomSelect,
      bookingData: state => state.booking.bookingData,
      bookingHotelID: state => state.booking.bookingData.hotelID,
      searchType: state => state.booking.bookingData.searchType
    })
  },
  watch: {
    searchType (value) {
      if (value !== 'hotel') {
        this.clearTiersList()
      }
    }
  },
  mounted () {
    if (this.searchType !== 'hotel') {
      this.clearTiersList()
    }
  },
  methods: {
    ...mapActions({
      showRoomSelect: 'booking/showRoomSelect',
      showTotalGuest: 'booking/showTotalGuest',
      showPromoCode: 'booking/showPromoCode',
      setBooking: 'booking/setInitialBooking',
      closeAll: 'booking/closeAll',
      clearTiersList: 'hotel/clearTiersList'
    }),
    $_onClose () {
      this.closeAll()
    },
    $_onApply () {
      this.showPromoCode()
      this.setBooking(this.bookingData)
    },
    $_onShowRoom () {
      this.showTotalGuest()
      this.showRoomSelect()
    },
    calendarParams (y, m) {
      return {
        year: y,
        month: m,
        adults: this.numberAdults,
        children: this.numberChildren,
        nights: this.totalNight,
        hotelID: this.bookingHotelID
      }
    }
  }

})
</script>

<style lang="scss" scoped>
@mixin select-person {
  &__actions {
    display: flex;
    height: 40px;
    text-align: center;
    vertical-align: middle;
    button {
      width: 35px;
    }
    &__minus {
      border-radius: 2px 0 0 2px;
    }
    &__total-count {
      border: 1px solid #e4e4e7;
      width: 46px;
    }
    &__plus {
      border-radius: 0 2px 2px 0;
    }
  }
}
.mb-15 {
  margin-bottom: 15px;
}

.room-select {
  width: 100%;
  position: relative;
  margin-bottom: 20px;
  @include min-sm {
    flex-basis: 33%;
  }
  @include min-md {
    width: fit-content;
    min-width: 96px;
    margin-bottom: 0;
    flex-basis: auto;
  }
}
</style>
