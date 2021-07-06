<template>
  <div class="promotion-code" @click="showPromoCode">
    <div class="promotion-code__title">
      {{ getTextString.promoCode }}
    </div>
    <div class="promotion-code__input" :class="{ error: promoCodeExist }">
      <div class="promotion-code__input__icon promotion-code__input--icon">
        <span class="icon-Icon-Promo-Codes" />
      </div>
      <input
        ref="input"
        v-model="promoCode"
        type="text"
        maxlength="10"
        minlength="3"
        placeholder="------"
        @input="onKeyup($event)"
        @blur="setPromoCode"
      >
      <div class="promotion-code__input__status promotion-code__input--icon">
        <span class="icon-Icon-Free" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { promoCodes } from '../../../shared/constants'
export default {
  name: 'PromotionCode',
  data () {
    return {
      promoCode: '',
      promoCodeExist: false
    }
  },
  computed: {
    getTextString () {
      return {
        promoCode: this.$t('booking.promo_code')
      }
    },
    ...mapState({
      promoCodeIsExist: state => state.booking.bookingData.promoCodeExist.match,
      isShowPromoCode: state => state.booking.bookingState.promoCode,
      promotionCode: state => state.booking.bookingData.promoCode
    })
  },
  watch: {
    promoCodeIsExist (newValue) {
      return !newValue
    },
    isShowPromoCode (value) {
      if (value) {
        this.$refs.input.focus()
      }
    },
    promotionCode (promoCode) {
      this.promoCode = promoCode
    }
  },
  mounted () {
    this.promoCode = this.promotionCode
  },
  methods: {
    ...mapActions({
      showPromoCode: 'booking/showPromoCode',
      getPromoCode: 'booking/getPromoCode',
      closeAll: 'booking/closeAll',
      checkPromoCode: 'booking/checkPromoCodeExistance'
    }),
    onKeyup (e) {
      const promoCode = e.target.value
      if (promoCode.length >= 4) {
        const result = promoCodes.includes(promoCode.toLowerCase())

        if (result) {
          this.promoCodeExist = false
        } else {
          this.promoCodeExist = true
        }
      }
    },
    setPromoCode () {
      this.getPromoCode(this.promoCode)
    }
  }

}
</script>
<style lang="scss" scoped>
.error {
  border: 2px solid red;
}
.promotion-code {
  width: 100%;
  @include min-sm {
    flex-basis: 20%;
    margin-bottom: 20px;
  }
  @include min-md {
    width: fit-content;
    min-width: 96px;
    margin-bottom: 0;
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
  &__input {
    position: relative;
    input {
      width: 100%;
      height: 50px;
      border: 2px solid #e4e4e7;
      text-transform: uppercase;
      font-weight: 600;
      outline: none;
      padding: 0 47px;
      @include min-md {
        height: 60px;
        text-align: center;
        padding: 0 17px;
      }
      &::placeholder {
        color: white;
        opacity: 0.75;
        letter-spacing: 4px;
        font-size: 12px;
        @include min-md {
          color: #7b7b85;
        }
      }
    }
    &--icon {
      position: absolute;
      top: 15px;
      @include min-md {
        display: none;
      }
    }
    &__icon {
      left: 15px;
    }
    &__status {
      right: 15px;
    }
    .icon-Icon-Free {
      color: $bg-color-blue-2;
    }
  }
}
</style>
