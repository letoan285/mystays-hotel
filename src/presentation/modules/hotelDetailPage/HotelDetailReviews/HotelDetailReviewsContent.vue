<template>
  <div class="hotel-detail-reviews-content">
    <div class="hotel-detail-reviews-content__text">
      <span>“{{ comment }}{{ isReadMore && !isRead ? "..." : "" }}"</span>
      <span v-if="isReadMore" @click="$_onReadMore">{{
        isRead ? getLanguage.readLess : getLanguage.readMore
      }}</span>
    </div>
    <div class="hotel-detail-reviews-content__rating">
      <div class="hotel-detail-reviews-content__rating__circle">
        <RatingCircle :number-circle="hotelReview.rating" />
      </div>
      <div class="hotel-detail-reviews-content__rating__time">
        <span>{{ hotelReview.updatedDate }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "HotelDetailReviewsContent",
  props: {
    hotelReview: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      comment: this.hotelReview.comment.slice(0, 88),
      isRead: false
    };
  },
  computed: {
    getLanguage() {
      return {
        readMore: this.$t("hoteldetail.read_more"),
        readLess: this.$t("hoteldetail.read_less")
      };
    },

    isReadMore() {
      return this.hotelReview && this.hotelReview.comment.length > 88;
    }
  },
  methods: {
    $_onReadMore() {
      const commentLength = this.hotelReview.comment.length;
      this.isRead = !this.isRead;
      if (this.isRead) {
        this.comment = this.hotelReview.comment.slice(0, commentLength - 1);
      } else {
        this.comment = this.hotelReview.comment.slice(0, 88);
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.hotel-detail-reviews-content {
  margin-bottom: 31px;
  width: 100%;
  @include min-sm {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  &__text {
    margin-bottom: 17px;
    span {
      font-size: 13px;
      font-weight: 500;
      line-height: 24px;
      &:nth-child(2) {
        font-weight: bold;
        color: $text-color-blue-2;
        margin-left: 10px;
        cursor: pointer;
      }

      @include min-sm {
        font-size: 15px;
        line-height: 30px;
        color: $text-color-blue;
      }
    }
  }

  &__rating {
    display: flex;
    align-items: center;
    &__circle {
      margin-right: 10px;
      @include min-sm {
        padding-top: 1px;
      }
      .rating-item {
        display: flex;
        .item {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          margin-right: 2px;
          border: 1px solid $border-dark-green;
          position: relative;
          &::before {
            content: "";
            width: 8px;
            height: 8px;
            background: $border-dark-green;
            position: absolute;
            border-radius: 50%;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }
        }

        .active {
          &::before {
            width: 0;
            height: 0;
          }
        }
      }
    }

    &__time {
      display: flex;
      align-items: center;
      span {
        font-size: 10px;
        font-weight: 500;
        color: $text-color-light-gray;
        @include min-sm {
          font-size: 13px;
          color: $text-color-blue;
        }
      }
    }
  }
}
</style>
