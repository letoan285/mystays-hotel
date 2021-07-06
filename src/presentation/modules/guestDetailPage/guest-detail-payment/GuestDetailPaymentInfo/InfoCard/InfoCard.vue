<template>
  <div class="info__card">
    <div
      class="info__card__text"
      :class="{
        'is-dropdown-open': isDropdownOpen,
        'is-discount-card': isDiscountCard,
      }"
    >
      <p v-if="isRoomPriceCard">
        1 {{ paymentInfo.planName }} x {{ paymentInfo.guest }}
        {{ getLang.guests }}
      </p>
      <p v-else-if="isDiscountCard">
        {{ paymentInfo.discountText }}
      </p>
      <p v-if="isTaxesCard">
        {{ paymentInfo.taxesText }}
      </p>
      <div @click="isDropdownOpen = !isDropdownOpen">
        {{ totalPrice }}
        <span v-if="!isDiscountCard" class="icon-Arrow-Small-Down" />
      </div>
    </div>
    <dropdown-transition>
      <div v-if="isDropdownOpen && !isDiscountCard">
        <div v-if="isRoomPriceCard">
          <div
            v-for="(nightPrice, index) in paymentInfo.nightPrices"
            :key="index"
            class="info__card__detail"
          >
            <p>{{ getLang.night }} {{ index + 1 }}</p>
            <span>¥{{ nightPrice.toLocaleString() }}</span>
          </div>
        </div>
        <div v-if="isTaxesCard">
          <div class="info__card__detail">
            <p>{{ getLang.taxes }}</p>
            <span>¥{{ paymentInfo.taxes.toLocaleString() }}</span>
          </div>
          <div class="info__card__detail">
            <p>{{ getLang.hotelFee }}</p>
            <span>¥{{ paymentInfo.hotelFee.toLocaleString() }}</span>
          </div>
          <div class="info__card__detail">
            <p>{{ getLang.onsenFee }}</p>
            <span>¥{{ paymentInfo.onsenFee.toLocaleString() }}</span>
          </div>
        </div>
      </div>
    </dropdown-transition>
  </div>
</template>

<script >

export default {
  name: 'InfoCard',
  props: {
    paymentInfo: {
      type: Object,
      default: () => {}
    }
  },

  data () {
    return {
      isDropdownOpen: false
    }
  },
  computed: {
    isDiscountCard () {
      return this.paymentInfo.type === 'discount'
    },
    isRoomPriceCard () {
      return this.paymentInfo.type === 'room-price'
    },
    isTaxesCard () {
      return this.paymentInfo.type === 'taxes'
    },
    totalPrice () {
      let totalPrice = 0
      if (this.isTaxesCard) {
        totalPrice =
          this.paymentInfo.taxes +
          this.paymentInfo.hotelFee +
          this.paymentInfo.onsenFee
      } else if (this.isRoomPriceCard) {
        totalPrice = this.paymentInfo.nightPrices.reduce((acc, cur) => {
          return acc + cur
        }, 0)
      } else if (this.isDiscountCard) {
        totalPrice = this.paymentInfo.discountPrice
      }
      return `¥${totalPrice.toLocaleString()}`
    },

    getLang () {
      return {
        guests: this.$t('payment_detail.guests'),
        night: this.$t('payment_detail.night'),
        taxes: this.$t('payment_detail.taxes'),
        hotelFee: this.$t('payment_detail.hotel_fee'),
        onsenFee: this.$t('payment_detail.onsen_fee')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.info__card {
  &__text {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 13px 0;
    border-bottom: 1px solid $border-color-gray-2;

    &.is-dropdown-open {
      [class^="icon-"],
      [class*=" icon-"] {
        transform: rotate(180deg);
      }
    }

    &.is-discount-card {
      padding-right: 20px;
      color: $text-color-pink-2;

      p {
        color: $text-color-pink-2;
        font-weight: bold;
      }
    }

    p {
      font-size: 12px;
      flex: 1;
      margin-right: 10px;
    }

    span {
      font-size: 14px;
      font-weight: bold;
      cursor: pointer;

      [class^="icon-"],
      [class*=" icon-"] {
        margin-left: 10px;
        font-size: 10px;
        transition: transform 0.5s ease;
      }
    }
  }

  &__detail {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 13px 0;
    border-bottom: 1px solid $border-color-gray-2;

    p {
      font-size: 12px;
    }

    span {
      font-size: 13px;
    }
  }
}
</style>
