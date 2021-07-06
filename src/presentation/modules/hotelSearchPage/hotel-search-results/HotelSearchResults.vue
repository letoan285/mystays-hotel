<template>
  <section class="hotel-search-results">
    <div class="hotel-search-results__banner" v-if="!isHotelLoading">
      <div
        class="hotel-search-results__banner__image"
        @click="$_goToDetailPage"
      >
        <!-- <img :src="hotelFilter && hotelFilter.featuredImage" alt /> -->
        <LazyLoadImage
          :img-url="hotelFilter && hotelFilter.featuredImage"
          :image-width="940"
          :image-height="580"
        />
      </div>
      <!-- <div
        v-if="!isLogin"
        class="hotel-search-results__banner__card hotel-search-results__banner--earn"
        @click="$_goToLoginPage"
      >
        <span class="icon-Icon-Reward" />
        <span>Earn 125 miles!</span>
      </div> -->
      <!-- <div class="hotel-search-results__banner__card">
        <span class="icon-Icon-Time"></span>
        <span>Only 2 rooms lefts!</span>
      </div>-->
    </div>
    <div class="hotel-search-results__summary" @click="$_goToDetailPage">
      <div class="hotel-search-results__summary__hotel-name">
        <h5>{{ hotelFilter && hotelFilter.name }}</h5>
      </div>
      <div class="hotel-search-results__summary__address">
        <span>
          {{ hotelFilter && hotelFilter.prefecture }},
          {{ hotelFilter && hotelFilter.areas && hotelFilter.areas[0] }}
        </span>
        <span>|</span>
        <span>Business Friendly</span>
        <span>+2</span>
      </div>
    </div>
    <div class="hotel-search-results__desc" @click="$_goToDetailPage">
      <div class="hotel-search-results__desc__info">
        <div class="info">
          <div class="info__location">
            <span class="icon-Icon-Map-Pin" />
            <span>{{ hotelDetail.prefecture }}</span>
          </div>
          <div
            v-if="
              hotelFilter &&
                hotelFilter.numberOfReviews &&
                hotelFilter.reviewScore
            "
            class="info__rating"
          >
            <div class="info__rating__icon">
              <span class="icon-Icon-Social-TripAdvisor" />
            </div>
            <RatingCircle :number-circle="reviewScore" />
            <div class="info__rating__stats">
              <span>{{ hotelFilter && hotelFilter.numberOfReviews }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="hotel-search-results__desc__total-night">
        <p>
          {{ totalNight }}
          {{ totalNight > 1 ? getLang.nights : getLang.night }},
          {{ guestText }}
        </p>
      </div>
      <div class="hotel-search-results__desc__price">
        <div class="price">
          <div class="price__value">
            <p class="price__value__mobile">
              {{ getLang.from.toUpperCase() }}
            </p>
            <p class="price__value__desktop">
              {{ totalNight }}
              {{ totalNight > 1 ? getLang.nights : getLang.night }},
              {{ guestText }} {{ getLang.from }}
            </p>
            <h4 v-show="!isPriceLoading">
              {{ hotelFilter && hotelFilter.price | currency("YEN") }}
            </h4>
            <div v-show="isPriceLoading">
              <LoadingSpinner :number-rect="6" />
            </div>
          </div>
          <div class="price__button">
            <button class="m-bnt m-btn__yellow" @click="$_goToHotelDetail">
              {{ getLang.viewHotel }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Vue from "vue";
import { mapActions, mapState, mapGetters } from "vuex";

export default Vue.extend({
  name: "HotelSearchResults",
  props: {
    hotelDetail: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      isMobile: false
    };
  },
  computed: {
    ...mapState({
      checkin: state => state.booking.bookingData.checkIn,
      checkout: state => state.booking.bookingData.checkOut,
      isLogin: state => state.users.data.isLogin,
      bookingData: state => state.booking.bookingData,
      isPriceLoading: state => state.hotel.isPriceLoading,
      isHotelLoading: state => state.hotel.isHotelLoading
    }),
    ...mapGetters({
      roomList: "booking/roomList",
      hotelList: "hotel/hotelFilter",
      totalGuest: "booking/totalGuest",
      totalNight: "booking/totalNight",
      numberAdults: "booking/numberAdults",
      numberChildren: "booking/numberChildren",
      fullLang: "appHeader/fullLanguage"
    }),
    reviewScore() {
      return Math.round(this.hotelDetail.reviewScore);
    },
    hotelFilter() {
      const hotelID = this.hotelDetail && this.hotelDetail.triplaHotelId;
      this.hotelList.forEach(hotel => {
        if (hotel && hotel.triplaHotelId === hotelID) {
          this.hotelDetail.price = hotel.price;
        }
      });

      return this.hotelDetail;
    },

    guestText() {
      const adultsText = `${this.numberAdults} ${
        this.numberAdults > 1 ? this.getLang.adults : this.getLang.adults
      }`;
      let childrenText = "";
      if (this.numberChildren) {
        childrenText = `, ${this.numberChildren} ${
          this.numberChildren > 1 ? this.getLang.children : this.getLang.child
        }`;
      } else {
        childrenText = "";
      }
      return `${adultsText}${childrenText}`;
    },

    getLang() {
      return {
        from: this.$t("searchhotel.from"),
        viewHotel: this.$t("searchhotel.view_hotel"),
        night: this.$t("customhtmlcalendar.night"),
        nights: this.$t("customhtmlcalendar.nights"),
        guest: this.$t("booking.guest"),
        guests: this.$t("booking.guests"),
        adult: this.$t("booking.adult"),
        adults: this.$t("booking.adults"),
        child: this.$t("booking.child"),
        children: this.$t("booking.children")
      };
    }
  },
  mounted() {
    const width = window.innerWidth;
    this.isMobile = width < 768;
    window.addEventListener("resize", this.$_onResize);
  },
  destroyed() {
    window.removeEventListener("resize", this.$_onResize);
  },
  methods: {
    ...mapActions({
      toggleLogin: "appAuthen/toggleLogin",
      searchRoom: "hotelDetail/searchRoom"
    }),
    $_goToHotelDetail() {
      const hotelID = this.hotelDetail && this.hotelDetail.triplaHotelId;
      const searchData = {
        checkIndate: this.bookingData.checkIn,
        checkOutdate: this.bookingData.checkOut,
        language: this.fullLang,
        coupon_code: this.bookingData.promoCode,
        rooms: JSON.stringify(this.bookingData.roomList)
      };
      if (hotelID) {
        this.$router.push({
          path: `/hotel/${hotelID}`,
          query: searchData
        });
      }
    },

    $_goToDetailPage() {
      if (this.isMobile) {
        this.$_goToHotelDetail();
      }
    },

    $_goToLoginPage() {
      this.toggleLogin({ isLoginOpen: true });
    },

    $_onResize(event) {
      this.isMobile = event.target.innerWidth < 768;
    }
  }
});
</script>

<style lang="scss" scoped>
.hotel-search-results {
  background: white;
  margin-bottom: 20px;
  box-shadow: 2px 3px 14px 0 rgba(74, 74, 74, 0.25);
  width: 100%;

  @include min-sm {
    width: 100%;
    height: calc(100% - 30px);
    margin-bottom: 30px;
  }
  &__banner {
    position: relative;
    min-height: 100px;
    &__image {
      img {
        width: 100%;
      }

      .mystays-logo {
        padding: 60px 0 50px 0;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 40%;
        }
      }
    }
    &__card {
      display: flex;
      align-items: center;
      position: absolute;
      top: 10px;
      left: 10px;
      background: #f5455a;
      border-radius: 12px;
      padding: 6px 15px 7px 10px;
      span {
        font-size: 11px;
        color: white;
        font-weight: bold;
        margin-right: 5px;
        &:first-child {
          font-size: 15px;
          font-weight: normal;
        }
      }
    }

    &--earn {
      background: $bg-color-yellow;
      cursor: pointer;
      span {
        color: $text-color-blue;
      }
    }
  }

  &__summary {
    padding: 20px 10px 18px 20px;
    @include min-sm {
      padding: 10px;
    }
    @include min-md {
      padding: 20px 10px 18px 12px;
    }
    border-bottom: 1px solid $border-color-gray-2;
    &__hotel-name {
      min-height: 50px;
      h5 {
        font-size: 16px;
        margin-bottom: 0;
        font-weight: 600;
        @include min-sm {
          font-size: 14px;
        }
      }
    }

    &__address {
      color: $text-color-blue-2;
      span {
        font-size: 11px;
        font-weight: bold;
        &:nth-child(2) {
          color: $text-color-gray;
          font-weight: normal;
        }
      }
    }
  }

  &__desc {
    display: flex;
    @include min-sm {
      flex-direction: column;
    }
    &__info {
      width: 50%;
      border-right: 1px solid $border-color-gray-2;
      @include min-sm {
        width: 100%;
        border-right: none;
      }
      .info {
        display: flex;
        flex-direction: column;
        height: 100%;
        @include min-sm {
          flex-direction: row;
        }
        &__location {
          width: 100%;
          height: 50%;
          border-bottom: 1px solid $border-color-gray-2;
          display: flex;
          align-items: center;
          padding: 10px;

          @include min-xl {
            padding-left: 12px;
          }

          span {
            &:first-child {
              font-size: 18px;
            }
            &:last-child {
              font-size: 11px;
              color: $text-color-gray;
              margin-left: 10px;
            }
          }
        }

        &__rating {
          display: flex;
          align-items: center;
          padding: 3px 15px;
          @include min-sm {
            width: 100%;
            border-bottom: 1px solid $border-color-gray-2;
            border-left: 1px solid $border-color-gray-2;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
          }
          .rating-circle {
            margin-right: 5px;
          }

          @include min-xl {
            flex-direction: row;
            justify-content: initial;
            align-items: center;
          }

          &__icon {
            margin-right: 8px;
            @include min-sm {
              display: none;
            }
            span {
              font-size: 20px;
              margin-top: 5px;
            }
          }

          &__stats {
            font-size: 11px;
            color: $text-color-gray;
            @include min-xl {
              margin-left: 5px;
            }
          }
        }
      }
    }

    &__total-night {
      display: none;
      @include min-sm {
        display: block;
      }
      p {
        font-size: 11px;
        padding: 10px 0 0 15px;
        margin-bottom: 0;
      }
      @include min-xl {
        display: none;
      }
    }

    &__price {
      padding: 16px 12px 19px 18px;
      width: 50%;
      @include min-sm {
        width: 100%;
        padding: 12px;
      }
      .price {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        @include min-xl {
          align-items: flex-end;
          flex-direction: row;
        }
        &__value {
          width: 100%;
          &__mobile {
            font-size: 9px;
            margin-bottom: 5px;
            font-weight: bold;
            @include min-sm {
              display: none;
            }
          }

          &__desktop {
            display: none;
            @include min-xl {
              display: block;
              font-size: 11px;
              margin-bottom: 5px;
            }
          }

          h4 {
            font-size: 18px;
            margin-bottom: 0;
            font-weight: bold;
            min-height: 21px;
          }
        }
        &__button {
          display: none;
          @include min-sm {
            display: block;
            button {
              padding: 6px 0;
              border-radius: 3px;
              font-size: 13px;
              width: 102px;
            }
          }

          @include min-lg {
            button {
              font-size: 14px;
            }
          }
        }
      }
    }
  }

  .price-loading {
    height: 30px;
    box-shadow: 2px 3px 14px 0px rgba(74, 74, 74, 0.25);
    @include background-shimmer($base-color: white, $shimmer-color: #f3f3f3);
  }
}
</style>
