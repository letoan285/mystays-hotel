<template>
  <div class="hotel-detail-sidebar-wrapper">
    <div :class="{ backdrop: isOpen }" @click="$_closeSidebar" />
    <transition name="slide-in">
      <div v-if="isOpen" class="hotel-detail-sidebar">
        <div
          :class="
            `hotel-detail-sidebar__header
            ${
              isMobile
                ? 'hotel-detail-sidebar--sticky-mobile'
                : 'hotel-detail-sidebar--sticky-desktop'
            }`
          "
        >
          <div class="hotel-detail-sidebar__header__title">
            <h3>{{ getLanguage.hotelDetail }}</h3>
            <span class="icon-Icon-Close" @click="$_closeSidebar" />
          </div>
          <div class="hotel-detail-sidebar__header__room-booking">
            <div class="room-booking">
              <div class="room-booking__title">
                <p>{{ getLanguage.room }}</p>
              </div>
              <div class="room-booking__checkin room-booking--block">
                <span class="icon-Icon-Time" />
                <span>{{ getLanguage.checkin }}:</span>
                <span>{{ roomDetailSidebar.roomBookingTime.checkIn }}</span>
              </div>
              <div class="room-booking__checkout room-booking--block">
                <span class="icon-Icon-Time" />
                <span>{{ getLanguage.checkout }}:</span>
                <span>{{ roomDetailSidebar.roomBookingTime.checkOut }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="hotel-detail-sidebar__content">
          <div class="hotel-detail-sidebar__content__facilities">
            <HotelDetailSidebarServiceDesktop
              :room-services="roomDetailSidebar.roomFacilities"
            />
            <HotelDetailSidebarServiceMobile
              :room-services="roomDetailSidebar.roomFacilities"
              :room-i-d="'roomFacilities'"
            />
          </div>
          <div class="hotel-detail-sidebar__content__services">
            <HotelDetailSidebarServiceDesktop
              :room-services="roomDetailSidebar.roomServices"
            />
            <HotelDetailSidebarServiceMobile
              :room-services="roomDetailSidebar.roomServices"
              :room-i-d="'roomServices'"
            />
          </div>
          <div class="hotel-detail-sidebar__content__rental-equipment">
            <HotelDetailSidebarServiceDesktop
              :room-services="roomDetailSidebar.roomRentalEquipment"
            />
            <HotelDetailSidebarServiceMobile
              :room-services="roomDetailSidebar.roomRentalEquipment"
              :room-i-d="'roomRentalEquipment'"
            />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'

export default Vue.extend({
  name: 'HotelDetailSidebar',
  props: {
    roomDetailSidebar: {
      type: Object,
      required: true
    },
    isMobile: {
      type: Boolean
    }
  },
  computed: {
    ...mapState({
      isOpen: state => state.hotelDetail.isOpen
    }),
    getLanguage () {
      const langs = {
        hotelDetail: this.$t('hoteldetail.hotel_detail'),
        checkin: this.$t('hoteldetail.checkin'),
        checkout: this.$t('hoteldetail.checkout'),
        room: this.$t('hoteldetail.room')
      }
      return langs
    }
  },
  methods: {
    ...mapActions({
      a_toggleSidebar: 'hotelDetail/a_toggleSidebar'
    }),
    $_closeSidebar () {
      this.a_toggleSidebar(false)
      this.$scrollBody.enable();
    }
  }
})
</script>

<style lang="scss" scoped>
.hotel-detail-sidebar {
  position: fixed;
  width: 310px;
  background: $text-color-blue;
  right: 0;
  top: 0;
  height: 100%;
  overflow: auto;
  z-index: 10000;
  color: white;
  padding: 0 30px 30px 30px;
  @include min-sm {
    width: 650px;
  }
  &__header {
    padding-top: 30px;
    &__title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 30px;
      h3 {
        font-size: 24px;
      }
      span {
        cursor: pointer;
      }
    }
    &__room-booking {
      padding-bottom: 15px;
      border-bottom: 1px solid rgba(216, 216, 216, 0.2);
      .room-booking {
        display: flex;
        flex-direction: column;
        @include min-sm {
          flex-direction: row;
        }
        &__title {
          width: 100%;
          margin-right: 30px;
          @include min-sm {
            width: 23%;
            margin-right: 30px;
          }
        }
        &__checkin {
          width: 100%;
          @include min-sm {
            width: 42%;
          }
        }
        &__checkout {
          width: 100%;
          @include min-sm {
            width: 35%;
          }
        }
        &--block {
          span {
            font-size: 14px;
            &:first-child {
              display: none;
              margin-right: 13px;
              font-size: 20px;
              position: relative;
              margin-right: 32px;
              &::before {
                position: absolute;
                top: -16px;
              }
              @include min-sm {
                display: inline-flex;
              }
            }
            &:last-child {
              color: #969daa;
            }
          }
        }
      }
    }
  }

  &--sticky-desktop {
    position: fixed;
    width: 573px;
    background: $text-color-blue;
  }

  &--sticky-mobile {
    padding-top: 30px;
    position: fixed;
    width: 253px;
    z-index: 1500;
    background: $text-color-blue;
  }

  &__content {
    margin-top: 220px;
    @include min-sm {
      margin-top: 175px;
    }
  }
}

.slide-in-enter-active,
.slide-in-leave-active {
  transition: all 0.5s;
  transform: translate3d(0, 0, 0);
}

.slide-in-enter,
.slide-in-leave-to {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
</style>
