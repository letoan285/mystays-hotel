<template>
  <div>
    <div class="room-select__top__title">
      {{ getTextString.room }} & {{ getTextString.guests }}
    </div>
    <div class="room-select__top">
      <div class="room-select__top__select-box" @click="$_showRoomSelect">
        <div class="person-icon">
          <span>{{ totalGuest }}</span>
        </div>
        <div class="text">
          {{ getTextString.select }}
        </div>
      </div>
    </div>
    <div class="room-select__mobile" @click="$_showRoomSelect">
      <div class="person-icon">
        <span class="icon-Icon-People-2" />
      </div>
      <div class="guest-stats">
        {{ roomList.length }} {{ roomList.length > 1 ? `${getTextString.rooms}` : `${getTextString.room}` }} ,
        {{ totalGuest }} {{ totalGuest > 1 ? `${getTextString.guests}` : `${getTextString.guest}` }}
      </div>
      <div class="plus-icon">
        <span class="icon-Icon-Plus" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import Vue from 'vue'
export default Vue.extend({
  name: 'RoomSelectButton',
  components: {},
  data () {
    return {}
  },
  computed: {
    ...mapState({
      roomList: state => state.booking.bookingData.roomList,
      isShowTotalGuest: state => state.booking.isShowTotalGuest
    }),
    ...mapGetters({
      totalGuest: 'booking/totalGuest'
    }),
    getTextString () {
      return {
        adults: this.$t('booking.adult'),
        children: this.$t('booking.children'),
        add_a_room: this.$t('booking.add_a_room'),
        room: this.$t('booking.room'),
        rooms: this.$t('booking.rooms'),
        guest: this.$t('booking.guest'),
        guests: this.$t('booking.guests'),
        apply: this.$t('booking.apply'),
        select: this.$t('booking.select')
      }
    }
  },
  created () { },
  methods: {
    $_showRoomSelect () {
      this.$emit('on:showRoom')
      this.isShowNumberGuest = true
    }
  }
})
</script>

<style lang="scss" scoped>
.room-select {
  &__top {
    display: none;
    @include min-md {
      display: block;
    }
    &__title {
      display: none;
      color: $text-color-blue;
      font-size: 13px;
      margin-bottom: 12px;
      text-align: center;
      @include min-md {
        display: block;
        white-space: nowrap;
      }
    }
    &__select-box {
      position: relative;
      height: 60px;
      border: 2px solid #e4e4e7;
      background: white;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      cursor: pointer;
      &::after {
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
      .person-icon {
        font-weight: bold;
        .icon-Icon-Person {
          font-weight: bold;
        }
      }
    }

    .text {
      font-size: 12px;
      color: #a5a5ac;
    }
  }

  &__mobile {
    position: relative;
    height: 50px;
    border: 2px solid #dddee0;
    background: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: $text-color-blue;
    @include min-md {
      display: none;
    }

    .person-icon {
      margin-left: 15px;
    }

    .guest-stats {
      margin-left: 15px;
      font-size: 14px;
    }

    .plus-icon {
      flex-grow: 1;
      text-align: right;
      padding-right: 15px;
    }

    .icon-Icon-Plus {
      font-size: 10px;
    }
  }
}
</style>
