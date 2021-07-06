<template>
  <AppSticky
    :class-name="'hotel-navigation'"
    :z-index="1000"
    :no-sticky="isMobile ? true : false"
  >
    <section
      :class="{
        'hotel-navigation-bar': true,
        active:
          bookingState.checking ||
          bookingState.roomSelect ||
          bookingState.promoCode
      }"
    >
      <!-- <HeaderNavTop @changeLanguage="changeLanguage" /> -->
      <AppSticky :z-index="2">
        <BackToSearchResults v-if="isShowBackToSearchResult" />
      </AppSticky>
      <div ref="navigationBar" class="container">
        <div class="hotel-navigation-bar__icon">
          <NuxtLink to="/" class="navbar-brand">
            <img :src="require('@/assets/images/Logo.svg')" alt />
          </NuxtLink>
        </div>
        <HotelNavigationBarInfo />
        <div class="hotel-navigation-bar__booking-block">
          <HotelNavigationBooking
            v-if="!isSelectedHotel"
            :room-select="roomSelect"
            @on:applyRoom="$_applyRoom"
          />
          <div
            v-if="isSelectedHotel"
            class="hotel-navigation-bar__booking-block__room-selected"
          >
            {{ getLanguege.selected }}:
            <span>{{ hotelName }}</span>
            {{ getLanguege.on }}
            <span>{{ checkinDate }} - {{ checkoutDate }}</span>
            {{ getLanguege.for }}
            <span>
              {{ roomParamsForGetRoomSelected.length }}
              {{
                roomParamsForGetRoomSelected.length > 1
                  ? getLanguege.rooms
                  : getLanguege.room
              }},
              {{ totalGuest }}
              {{ totalGuest > 1 ? getLanguege.guests : getLanguege.guest }}
            </span>
          </div>
        </div>
      </div>
      <HotelNavigationBarStep :current-step="currentStep" />
    </section>
  </AppSticky>
</template>

<script>
import Vue from "vue";
import { mapActions, mapState, mapGetters } from "vuex";
import moment from "moment";

export default Vue.extend({
  name: "HotelNavigationBar",
  props: {
    isSelectedHotel: {
      type: Boolean
    },
    currentStep: {
      type: Number,
      default: () => 0
    },
    isShowBackToSearchResult: {
      type: Boolean
    }
  },
  data() {
    return {
      isMobile: false
    };
  },
  computed: {
    ...mapState({
      bookingState: state => state.booking.bookingState,
      isOpenSearchBox: state => state.searchHotel.openHeaderSearchBox,
      roomSelect: state => state.booking.bookingData.roomList,
      hotelName: state =>
        state.hotelDetail.hotelDetail &&
        state.hotelDetail.hotelDetail.data &&
        state.hotelDetail.hotelDetail.data.name,
      isLogin: state => state.users.data.isLogin,
      roomParamsForGetRoomSelected: state =>
        state.booking.roomParamsForGetRoomSelected
    }),

    ...mapGetters({
      checkinDate: "booking/getCheckinDate",
      checkoutDate: "booking/getCheckoutDate",
      lang: "appHeader/language",
      numberAdultsInRoomSelected: "booking/numberAdultsInRoomSelected",
      numberChildrenInRoomSelected: "booking/numberChildrenInRoomSelected"
    }),

    totalGuest() {
      return (
        this.numberAdultsInRoomSelected + this.numberChildrenInRoomSelected
      );
    },

    getLanguege() {
      return {
        selected: this.$t("summary.you_have_selected"),
        on: this.$t("summary.on"),
        for: this.$t("summary.for"),
        room: this.$t("booking.room"),
        rooms: this.$t("booking.rooms"),
        guest: this.$t("booking.guest"),
        guests: this.$t("booking.guests")
      };
    }
  },
  watch: {
    lang(lang) {
      moment.locale(lang);
    }
  },
  mounted() {
    const width = window.innerWidth;
    this.isMobile = width < 768;
    window.addEventListener("resize", this.$_onResize);
  },
  destroyed() {
    window.removeEventListener("resize", this.$_onResize);
    this.$_closeSearchBox();
  },
  methods: {
    ...mapActions({
      toggleHeaderSearchBox: "searchHotel/toggleHeaderSearchBox",
      openHeaderSearchBox: "searchHotel/openHeaderSearchBox",
      closeHeaderSearchBox: "searchHotel/closeHeaderSearchBox"
    }),

    $_onResize(event) {
      this.isMobile = event.target.innerWidth < 768;
    },

    $_applyRoom() {
      this.$emit("on:Apply");
    },

    $_closeSearchBox() {
      this.toggleHeaderSearchBox(false);
      this.$scrollBody.enable();
    }
  }
});
</script>

<style lang="scss" scoped>
.hotel-navigation {
  top: 0 !important;
}
.hotel-navigation-bar {
  display: flex;
  flex-direction: column;
  background: $bg-color-nav;
  position: relative;
  padding-bottom: 5px;

  @include min-sm {
    padding-bottom: 0;
  }
  &__icon {
    text-align: center;
    .navbar-brand {
      margin: 0;
    }
    @include min-sm {
      padding: 0;
    }
  }

  &__booking-block {
    color: white;
    font-size: 15px;
    margin-bottom: 2px;
    span {
      font-weight: bold;
      border-bottom: 1px solid white;
    }

    @include min-md {
      margin-right: 20px;
      margin-left: 20px;
      margin-bottom: 0;
      flex-basis: 50%;
    }

    @include min-xl {
      flex-basis: auto;
    }

    @include min-xxl {
      margin-left: 0;
    }

    &__room-selected {
      display: none;
      @include min-sm {
        display: block;
        padding: 5px 0 5px 20px;
      }
    }
  }

  .container {
    @include min-md {
      display: flex;
      align-items: center;
      padding: 18px 0;
    }

    @include min-xl {
      justify-content: space-between;
    }
  }

  &--sticky {
    .back-page {
      position: fixed;
      top: 0;
      z-index: 11;
    }
    @include min-sm {
      .back-page {
        position: relative;
        // top: 0;
        // z-index: 11;
      }
      position: fixed;
      width: 100%;
      top: 0;
      left: 0;
      z-index: 500;
    }
    .hotel-navigation-bar__icon {
      @include min-md {
        display: block;
      }
    }
  }
}
.active {
  z-index: 500;
}
</style>
