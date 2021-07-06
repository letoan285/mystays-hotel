<template>
  <section class="confirm-stay-elite">
    <div class="confirm-stay-elite__title">
      <img v-lazy-load :data-src="require('@/assets/images/Logo-Icon.png')" alt>
      <h5>MyStays Elite</h5>
    </div>
    <div class="confirm-stay-elite__content">
      <div class="confirm-stay-elite__content__title">
        <p>Hi Hideyoshi-sama</p>
        <span>Gold Member</span>
      </div>
      <div class="confirm-stay-elite__content__price">
        <!-- <h4>2,345 {{ $t("confirmbooking.miles") }}</h4> -->
      </div>
    </div>
  </section>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'ConfirmStayElite'
})
</script>

<style lang="scss" scoped>
.confirm-stay-elite {
  display: none;
  @include min-sm {
    display: block;
  }
  &__title {
    margin-bottom: 10px;
    display: flex;
    align-content: center;
    img {
      width: 25px;
      height: 25px;
      margin-right: 10px;
    }
    h5 {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 0;
      margin-top: 2px;
    }
  }
  &__content {
    border: 1px solid $border-color-gray-2;
    border-radius: 4px;
    padding: 11px 20px;
    background: #f5f8ff;
    margin-bottom: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &__title {
      p {
        font-size: 14px;
        margin-bottom: 0;
        font-weight: 600;
      }
      span {
        font-size: 12px;
        color: $text-color-blue-2;
      }
    }

    &__price {
      h4 {
        font-size: 18px;
        font-weight: 600;
      }
    }
  }
}
</style>
