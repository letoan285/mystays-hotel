<template>
  <div
    v-show="hotelReviews && hotelReviews.length"
    id="review"
    ref="hotel-review"
    class="hotel-detail-reviews"
  >
    <div class="container">
      <div class="hotel-detail-reviews__title">
        <span class="icon-Icon-Social-TripAdvisor" />
        <h3>{{ getLanguage.reviews }}</h3>
      </div>
      <div class="hotel-detail-reviews__info">
        <div class="hotel-detail-reviews__info__item">
          <HotelDetailReviewsContent
            class="review-item"
            v-for="hotelReview in hotelReviews"
            :key="hotelReview.reviewId"
            :hotel-review="hotelReview"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";

export default Vue.extend({
  name: "HotelDetailReviews",
  computed: {
    ...mapGetters({
      hotelReviews: "hotelDetail/hotelReviews",
    }),
    getLanguage() {
      return {
        reviews: this.$t("hoteldetail.reviews"),
      };
    }
  },
  methods: {},
});
</script>

<style lang="scss" scoped>
.hotel-detail-reviews {
  padding: 35px 0 42px 0;
  @include min-sm {
    padding: 80px 0;
  }
  .container {
    padding: 0 20px;
  }
  &__title {
    display: flex;
    align-items: center;
    margin-bottom: 32px;
    @include min-sm {
      font-size: 30px;
      margin-bottom: 47px;
    }
    span {
      font-size: 30px;
      margin-right: 10px;
      @include min-sm {
        display: none;
      }
    }
    h3 {
      font-size: 18px;
      color: $text-color-blue;
      margin-bottom: 0;
      @include min-sm {
        font-size: 30px;
      }
    }
  }

  &__info {
    &__item {
      width: 100%;
      @include min-sm {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
      }

      .review-item {
        @include min-sm {
          width: 45%;
        }
      }
    }
  }
}
</style>
