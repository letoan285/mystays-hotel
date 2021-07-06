<template>
  <div class="payment-total">
    <div class="payment-total__grand-total">
      <div class="grand-total">
        <div class="grand-total__title">
          <h4>{{ getLanguage.yourTotal }}:</h4>
          <NuxtLink to="/summary">
            {{ getLanguage.reviewYourSaty }}
          </NuxtLink>
        </div>
        <div class="grand-total__price">
          <h4>{{ totalPrice | currency("YEN") }}</h4>
        </div>
        <div class="grand-total__icon">
          <span
            v-b-tooltip.hover
            class="icon-Icon-Info"
            placement="right"
            title="Grand Total"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "TotalPrice",
  computed: {
    ...mapGetters({
      totalPrice: "hotelDetail/totalPrice"
    }),

    getLanguage() {
      return {
        yourTotal: this.$t("summary.your_total"),
        reviewYourSaty: this.$t("summary.review_your_stay")
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.payment-total {
  &__grand-total {
    margin-bottom: 30px;
    border: 1px solid $border-color-gray-2;
    border-radius: 4px;
    padding: 12px 20px;
    background: #fff6df;
    .grand-total {
      display: flex;
      justify-content: space-between;
      align-items: center;

      h4 {
        font-size: 16px;
        margin-bottom: 3px;
        font-weight: bold;
      }

      &__title {
        flex-grow: 1;
        a {
          display: block;
          font-size: 12px;
          color: $text-color-blue-2;
          font-weight: bold;
          margin-bottom: 0;
        }
      }

      &__price {
        margin-right: 10px;
      }

      &__icon {
        font-size: 13px;
      }
    }
  }

  &__checkout {
    button {
      width: 100%;
      padding: 13px 0;
    }
  }
}
</style>
