<template>
  <section class="hotel-review-info">
    <div class="hotel-review-info__title">
      <h4>Old Stay</h4>
    </div>
    <div class="hotel-review-info__block">
      <div class="hotel-review-info__block__icon">
        <span class="icon-Icon-Calendar" />
      </div>
      <div class="hotel-review-info__block__text">
        <span>
          {{ getChecInOutText }}
        </span>
        <span class="block">/</span>
        <span>
          {{ reservationsData.nights }}
          {{
            reservationsData.nights > 1 ? getLanguage.nights : getLanguage.night
          }}
        </span>
      </div>
      <div class="hotel-review-info__block__edit">
        <!-- <span>{{ getLanguage.edit }}</span> -->
      </div>
    </div>
    <div class="hotel-review-info__block">
      <div class="hotel-review-info__block__icon">
        <span class="icon-Icon-Group" />
      </div>
      <div class="hotel-review-info__block__text">
        <span>
          {{ reservationsData.room_count }}
          {{
            reservationsData.room_count > 1
              ? getLanguage.rooms
              : getLanguage.room
          }}
          ,
          {{ guestText }}
        </span>
      </div>
      <div class="hotel-review-info__block__edit">
        <!-- <span>{{ getLanguage.edit }}</span> -->
      </div>
    </div>
    <div
      v-for="(room, index) in reservationsData.rooms"
      :key="index"
      class="hotel-review-info__block hotel-review-info--room"
    >
      <div class="hotel-review-info__block__icon">
        <span class="icon-Icon-Bed" />
      </div>
      <div class="hotel-review-info__block__text">
        <span>{{ getLanguage.room }} {{ index + 1 }} / {{ room.room_type_name }} x
          {{ getAdultsChildrenText(room.adults, room.children) }}</span>
      </div>
      <div class="hotel-review-info__block__edit">
        <!-- <span>{{ getLanguage.edit }}</span> -->
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import moment from 'moment'

export default Vue.extend({
  name: 'HotelReviewInfo',
  components: {},
  computed: {
    ...mapGetters({
      reservationsData: 'booking/reservationsData'
    }),
    getLanguage (): any {
      return {
        taxAndHotelFee: this.$t('summary.tax_and_fee_change'),
        yourStay: this.$t('summary.your_stay'),
        edit: this.$t('summary.edit'),
        room: this.$t('booking.room'),
        rooms: this.$t('booking.rooms'),
        guest: this.$t('booking.guest'),
        guests: this.$t('booking.guests'),
        night: this.$t('summary.night'),
        nights: this.$t('customhtmlcalendar.nights'),
        child: this.$t('booking.child'),
        children: this.$t('booking.children'),
        adults: this.$t('booking.adults'),
        adult: this.$t('booking.adult')
      }
    },

    guestText (): any {
      const totalGuest =
        this.reservationsData.adults + this.reservationsData.children
      return `${totalGuest} ${
        totalGuest > 1 ? this.getLanguage.guests : this.getLanguage.guest
      }`
    },

    getChecInOutText (): any {
      const checkin = moment(this.reservationsData.checkin_date)
        .format('MMM DD')
        .toString()
      const checkout = moment(this.reservationsData.checkout_date)
        .format('MMM DD')
        .toString()

      return `${checkin} - ${checkout}`
    }
  },
  methods: {
    getAdultsChildrenText (numberAdults: number, numberChildren: number) {
      let childrenText = ''
      if (numberChildren) {
        childrenText = `& ${numberChildren} ${
          numberChildren > 1
            ? this.getLanguage.children
            : this.getLanguage.child
        }`
      } else {
        childrenText = ''
      }

      return `${numberAdults} ${
        numberAdults > 1 ? this.getLanguage.adults : this.getLanguage.adult
      } ${childrenText}`
    }
  }
})
</script>

<style lang="scss" scoped>
.hotel-review-info {
  background: #ffffff;
  margin-bottom: 30px;
  @include min-sm {
    padding: 27px 30px 30px 30px;
    border: 1px solid $border-color-gray-2;
    border-radius: 0 0 4px 4px;
  }
  &__title {
    display: none;
    @include min-sm {
      display: block;
      margin-bottom: 13px;
      h4 {
        font-weight: 600;
        font-size: 16px;
      }
    }
  }
  &__block {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 13px 0;
    border-bottom: 1px solid $border-color-gray-2;
    &__icon {
      margin-right: 12px;
      color: #9196a3;
      font-size: 17px;
    }

    &__text {
      font-size: 12px;
      color: $text-color-blue;
      flex: 1;
      padding-right: 10px;

      .block {
        padding: 0 10px;
      }
    }

    &__edit {
      color: $text-color-blue-2;
      font-size: 11px;
      font-weight: bold;
      text-align: right;
      cursor: pointer;
    }
  }

  &--room {
    display: none;
    @include min-sm {
      display: flex;
    }
  }
}
</style>
