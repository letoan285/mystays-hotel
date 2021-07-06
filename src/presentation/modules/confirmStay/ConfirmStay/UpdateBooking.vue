<template>
  <div class="update-booking">
    <div class="update-booking__title" @click="$_openUpdateBooking">
      <span class="icon-Icon-Calendar" />
      <button class="m-btn m-btn__white">
        {{ getLang.updateYourBooking }}
      </button>
    </div>
    <MyStayPopup
      ref="update-booking"
      :modal-class="'update-booking'"
      size="lg"
      :centered="false"
      :is-close-icon="true"
      @backdropClick="$_backdropClick"
    >
      <div class="update-booking-content form">
        <div class="update-booking-content__title">
          <h5>{{ getLang.updateYourBooking }}</h5>
          <p>{{ getLang.selectNewItinerary }}</p>
        </div>
        <div class="update-booking-content__content">
          <ConfirmStayBooking />
          <button class="button m-btn m-btn__yellow" @click="$_onSearchHotel">
            <b-spinner v-if="isShowLoading" small />
            {{ getLang.search }}
          </button>
        </div>
      </div>
    </MyStayPopup>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions, mapState, mapGetters } from 'vuex'

export default Vue.extend({
  name: 'UpdateBooking',
  data () {
    return {
      isShowLoading: false
    }
  },
  computed: {
    ...mapState({
      bookingData: (state: any) => state.booking.bookingData,
      reservationsSettings: (state: any) => state.booking.reservationsSettings
    }),
    ...mapGetters({
      reservationsData: 'booking/reservationsData',
      byPassToken: 'booking/byPassToken',
      reservationID: 'booking/bookingID',
      lang: 'appHeader/language',
      fullLang: 'appHeader/fullLanguage',
      cancellationPolicies: 'hotelDetail/cancellationPolicies',
      numberAdults: 'booking/numberAdults',
      numberChildren: 'booking/numberChildren'
    }),
    hotelID (): any {
      return this.$route.query.hotel_id
    },

    getLang (): any {
      return {
        updateYourBooking: this.$t('confirmbooking.update_your_booking'),
        selectNewItinerary: this.$t('confirmbooking.select_new_itinerary'),
        search: this.$t('headers.search')
      }
    }
  },
  methods: {
    ...mapActions({
      closeAll: 'booking/closeAll',
      updateBookingStatus: 'hotelDetail/updateBookingStatus',
      getTiersList: 'hotel/getTiersList',
      updateBookingGTM: 'booking/updateBookingGTM',
      setBookingFromAPI: 'booking/setBookingFromAPI',
      saveGuestDataFromAPI: 'guestDetail/saveGuestDataFromAPI'
    }),

    $_openUpdateBooking () {
      if (this.reservationsSettings?.updatable) {
        (this as any).$refs['update-booking'].showModal()
        this.getTiersList(this.hotelID)

        if (this.reservationsData?.reservation_number) {
          const roomList = this.reservationsData?.rooms?.map((room: any) => {
            const tiers = room.room_rates[0]?.tiers
            tiers.shift()
            let childrenList: Array<any> = []
            if (tiers.length) {
              // eslint-disable-next-line no-unused-expressions
              tiers?.forEach((tier: any) => {
                for (
                  let numberPerson = 0;
                  numberPerson < tier.number_of_person;
                  numberPerson++
                ) {
                  childrenList.push({
                    age: tier.code,
                    value: tier.code
                  })
                }
              })
            } else {
              childrenList = []
            }
            return {
              id: '',
              adults: {
                title: 'Adults',
                number: room.adults
              },
              children: {
                title: 'Children',
                childrenList
              }
            }
          })
          this.setBookingFromAPI({
            checkIn: this.reservationsData.checkin_date,
            checkOut: this.reservationsData.checkout_date,
            roomList
          })

          const guestInfos = this.reservationsData.rooms?.map((room: any) => {
            return room.guest
          })

          this.saveGuestDataFromAPI(guestInfos)
        }
      }
    },

    $_onSearchHotel () {
      this.updateBookingStatus(true)
      const gtmData = {
        event: 'bookingUpdated',
        language: this.fullLang,
        triggerType: 'event',
        pageCategory: 'ConfirmBooking',
        hotelID: this.hotelID,
        roomID: this.reservationsData?.rooms[0]?.room_type_code,
        planID: this.reservationsData?.rooms[0]?.room_plan_code,
        transactionID: this.reservationsData.reservation_number,
        checkIn: this.bookingData.checkIn,
        checkOut: this.bookingData.checkOut,
        numberOfChildren: this.numberChildren,
        numberOfAdults: this.numberAdults
      }

      this.updateBookingGTM(gtmData)

      const paramsHotel = {
        checkIndate: this.bookingData.checkIn,
        checkOutdate: this.bookingData.checkOut,
        language: this.fullLang,
        coupon_code: this.bookingData.promoCode,
        rooms: JSON.stringify(this.bookingData.roomList),
        email: this.reservationsData.email,
        bypass_token: this.reservationsData.bypass_token,
        reservationID: this.reservationsData.reservation_number
      }
      this.isShowLoading = true
      const url = `/hotel/${this.hotelID}`
      this.$router.push({
        path: url,
        query: paramsHotel
      })
    },

    $_onClose () {
      (this as any).$refs['update-booking'].hideModal()
    },

    $_backdropClick () {
      this.closeAll()
    }
  }
})
</script>

<style lang="scss" scoped>
.update-booking {
  cursor: pointer;
  h5 {
    font-weight: 600;
  }
  &__title {
    display: flex;
    align-items: center;
    position: relative;
    margin-bottom: 15px;
    &:hover {
      span {
        color: white;
      }
    }
    span {
      margin-right: 10px;
      font-weight: bold;
      position: absolute;
      left: 20px;
      color: $text-color-blue-2;

      &:first-child {
        font-size: 14px;
      }
    }

    button {
      width: 100%;
      height: 40px;
    }
  }

  .update-booking-content {
    &__content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: column;
      padding: 20px;
      background: $text-color-blue;

      @include min-sm {
        flex-direction: row;
      }
      button {
        padding: 10px 30px;
        width: 100%;
      }

      form {
        width: 100%;
      }
    }
  }

  .disabled {
    color: gray;
  }
}
</style>
