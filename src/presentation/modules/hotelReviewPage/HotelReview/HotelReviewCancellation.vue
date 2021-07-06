<template>
  <section class="hotel-review-cancellation">
    <div class="hotel-review-cancellation__title">
      <h4>{{ getLanguage.cancellation }}</h4>
    </div>
    <div class="hotel-review-cancellation__mobile">
      <div class="hotel-review-cancellation__content">
        <div
          v-for="(item, index) in cancellationPolicies"
          :key="index"
          class="item"
          v-html="item"
        />
      </div>
      <div class="hotel-review-cancellation__grand-total">
        <span>{{ getLanguage.grandTotal }}:</span>
        <span>{{ totalPrice | currency("YEN") }}</span>
      </div>
    </div>
    <div
      v-show="!isCancellationLoading"
      class="hotel-review-cancellation__desktop"
    >
      <div
        v-for="(item, index) in cancellationPolicies"
        :key="index"
        class="item"
        v-html="item"
      />
    </div>
    <div v-show="isCancellationLoading" class="loading-item">
      <b-skeleton class="mb-4" animation="fade" width="90%" height="24px" />
      <b-skeleton class="mb-3" animation="fade" width="65%" height="24px" />
      <b-skeleton class="mb-3" animation="fade" width="70%" height="24px" />
      <b-skeleton class="mb-3" animation="fade" width="65%" height="24px" />
      <b-skeleton class="mb-3" animation="fade" width="70%" height="24px" />
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapState } from 'vuex'

export default Vue.extend({
  name: 'HotelReviewCancellation',
  components: {},
  computed: {
    ...mapState({
      isCancellationLoading: (state: any) => state.hotelDetail?.isLoading
    }),
    ...mapGetters({
      totalPrice: 'hotelDetail/totalPrice',
      cancellationPolicies: 'hotelDetail/cancellationPolicies'
    }),

    getLanguage () {
      return {
        cancellation: this.$t('summary.cancellation_and_refund_policy'),
        grandTotal: this.$t('summary.grand_total')
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.hotel-review-cancellation {
  margin-bottom: 32px;
  &__title {
    h4 {
      font-size: 12px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    @include min-sm {
      h4 {
        font-size: 16px;
        font-weight: 600;
      }
    }
  }

  &__mobile {
    @include min-sm {
      display: none;
    }
  }

  &__content {
    font-size: 13px;
    line-height: 22px;
    margin-bottom: 30px;
    p {
      font-size: 12px;
      margin-bottom: 8px;
    }
    @include min-sm {
      line-height: 22px;
    }
  }

  &__grand-total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 18px;
    border: 1px solid $border-color-gray-2;
    border-radius: 4px;
    @include min-sm {
      display: none;
    }
    span {
      &:first-child {
        font-size: 14px;
        font-weight: 500;
      }
      &:last-child {
        font-size: 18px;
        font-weight: bold;
      }
    }
  }

  &__text {
    margin-bottom: 21px;
    font-size: 14px;
  }

  &__desktop {
    display: none;
    @include min-sm {
      display: block;
      margin-top: 20px;
      font-size: 14px;
    }
  }

  .loading-item {
    margin-top: 20px;
    p {
      width: 100%;
      min-height: 21px;
      margin-bottom: 20px;
      box-shadow: 2px 3px 14px 0px rgba(74, 74, 74, 0.25);
      @include background-shimmer($base-color: white, $shimmer-color: #f3f3f3);

      &:first-child {
        width: 100%;
        min-height: 21px;
      }

      @include min-sm {
        min-height: 21px;
        width: 60%;
      }
    }
  }

  &__table {
    margin-bottom: 15px;
    font-size: 14px;

    &__head {
      border-bottom: 1px solid $border-color-gray-2;
    }

    &--row {
      padding: 10px 0;
      display: flex;
      span {
        text-align: center;
        width: calc(100% / 6);
        &:first-child {
          font-weight: 600;
          text-align: left;
        }
      }
    }
  }

  .item {
    margin-bottom: 7px;

    @include min-sm{
      margin-bottom: 15px;
    }
  }
}
</style>
