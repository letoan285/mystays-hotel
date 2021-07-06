<template>
  <section class="hotel-item" @mouseover="$_getHotel">
    <div class="hotel-item__image">
      <LazyLoadBgrImage :img-url="hotelFiler.featuredImage" />
    </div>
    <div class="hotel-item__content">
      <div class="hotel-item__content__title">
        <h4>{{ hotelFiler.name }}</h4>
      </div>
      <div class="hotel-item__content__info">
        <div class="info">
          <div
            class="info__location"
            :class="{ 'info--no-score': !isShowScore }"
          >
            <span class="icon-Icon-Map-Pin" />
            <span>
              {{ hotelFiler.prefecture }}
              {{ hotelFiler && hotelFiler.areas && hotelFiler.areas[0] }}
            </span>
          </div>
          <div v-if="isShowScore" class="info__rating">
            <RatingCircle :number-circle="reviewScore" />
            <span>{{ hotelFiler.numberOfReviews }} reviews</span>
          </div>
        </div>
      </div>
      <div class="hotel-item__content__price">
        <div>
          <h4 v-show="!isPriceLoading">
            {{ hotelFiler.price | currency("YEN") }} ~
          </h4>
          <LoadingSpinner
            style="width:100%"
            v-show="isPriceLoading"
            :number-rect="6"
          />
        </div>
        <button class="m-btn m-btn__yellow" @click="$_goToHotelDetail">
          View Hotel
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import Vue from "vue";
import { mapActions, mapGetters, mapState } from "vuex";

export default Vue.extend({
  name: "HotelSearchItem",
  props: {
    hotelDetail: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ...mapState({
      bookingData: state => state.booking.bookingData,
      isPriceLoading: state => state.hotel.isPriceLoading
    }),
    ...mapGetters({
      hotel: "searchHotel/hotelDetail",
      hotelList: "hotel/hotelFilter",
      fullLang: "appHeader/fullLanguage"
    }),
    reviewScore() {
      return Math.round(this.hotelDetail.reviewScore);
    },

    isShowScore() {
      return this.hotelDetail.numberOfReviews && this.hotelDetail.reviewScore;
    },

    hotelFiler() {
      const hotelID = this.hotelDetail && this.hotelDetail.triplaHotelId;
      this.hotelList.forEach(hotel => {
        if (hotel.triplaHotelId === hotelID) {
          this.hotelDetail.price = hotel.price;
        }
      });

      return this.hotelDetail;
    }
  },
  methods: {
    ...mapActions({
      getHotelPosition: "searchHotel/getHotelPosition"
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

    $_getHotel() {
      if (this.hotel.hotelName !== this.hotelDetail.name) {
        this.getHotelPosition(this.hotelDetail);
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.hotel-item {
  width: 100%;
  display: flex;
  background: white;
  box-shadow: 0 5px 10px -4px rgba(37, 58, 106, 0.3);
  margin-bottom: 30px;
  cursor: pointer;
  &__image {
    background-size: cover;
    display: block;
    width: 180px;
    background-position: center center;
  }

  &__content {
    width: calc(100% - 200px);
    &__title {
      padding: 10px 0px 0 10px;
      min-height: 50px;
      h4 {
        font-size: 14px;
        font-weight: bold;
      }
    }

    &__info {
      border-top: 1px solid $border-color-gray-2;
      border-bottom: 1px solid $border-color-gray-2;
      .info {
        display: flex;
        &__location {
          padding-left: 10px;
          width: 100%;
          display: flex;
          align-items: center;
          border-right: 1px solid $border-color-gray-2;
          span {
            &:first-child {
              margin-right: 8px;
            }
            &:last-child {
              font-size: 12px;
              color: #aaabae;
            }
          }
        }

        &__rating {
          padding: 10px 0 7px 10px;
          width: 100%;
          span {
            font-size: 12px;
            color: #aaabae;
          }
        }

        &--no-score {
          padding: 16px 0 16px 10px;
        }
      }
    }

    &__price {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 0 15px 10px;
      h4 {
        font-size: 15px;
        font-weight: bold;
      }
      button {
        padding: 7px 15px;
        @include min-lg {
          padding: 7px 20px;
        }
      }
    }
  }
}
</style>
