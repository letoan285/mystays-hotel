<template>
  <div class="guest-detail__login">
    <!-- <div class="guest-detail__login-top">
      + 100 Bonus miles on sign up
    </div>-->
    <div v-if="!isAuthened" class="guest-detail__login login-bottom">
      <p class="is-bold">
        {{ getLang.payWithMiles }}
      </p>
      <p>{{ getLang.payWithMilesText }}</p>
      <div class="login-bottom__buttons">
        <button
          class="btn login-bottom__buttons--login"
          @click="$_toggleLogin(true)"
        >
          <span class="icon-Icon-Profile" />
          {{ getLang.login }}
        </button>
        <button
          class="btn m-btn__blue login-bottom__buttons--join"
          @click="$_toggleSignup(true)"
        >
          {{ getLang.join }}
        </button>
      </div>
    </div>
    <div v-else class="guest-detail__login login-bottom">
      <p class="is-bold login-bottom__header">
        {{ getLang.payWithMiles }}
      </p>
      <div class="login-bottom__logout">
        {{ getLang.logout }}
      </div>
      <guest-detail-login-payment />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'GuestDetailLogin',
  props: {
    isAuthened: {
      type: Boolean
    }
  },
  computed: {
    ...mapActions({
      toggleLogin: 'appAuthen/toggleLogin',
      toggleSignup: 'appAuthen/toggleSignup'
    }),

    getLang () {
      return {
        payWithMiles: this.$t('payment_info.pay_with_miles'),
        payWithMilesText: this.$t('payment_info.pay_with_miles_text'),
        login: this.$t('payment_info.login'),
        join: this.$t('payment_info.join'),
        logout: this.$t('payment_info.logout')
      }
    }
  },
  methods: {
    $_toggleLogin (isLoginOpen) {
      this.toggleLogin({ isLoginOpen })
    },
    $_toggleSignup (isSignupOpen) {
      this.toggleSignup({ isSignupOpen })
    }
  }
}
</script>

<style lang="scss" scoped>
.guest-detail__login {
  text-align: center;

  &.login-bottom {
    border: 1px solid $border-color-gray-2;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    padding: 15px 17px 13px 17px;
    text-align: left;
    position: relative;
    margin-bottom: 20px;

    @include min-sm {
      padding: 30px 34px 26px 34px;
    }

    p {
      font-weight: normal;
    }

    p.is-bold {
      font-size: 16px;
      margin-bottom: 20px;
      font-weight: bold;
    }

    .login-bottom {
      &__header {
        margin-bottom: 20px;
      }

      &__buttons {
        display: flex;
        justify-content: space-between;

        [class^="icon-"],
        [class*=" icon-"] {
          font-size: 15px;
          margin-right: 10px;
        }

        button {
          flex: 0 1 45%;
          padding: 13px 0;
          text-transform: uppercase;
          font-size: 12px;
          font-weight: bold;
          margin-top: 20px;
        }

        &--login {
          border: 1px solid $border-color-gray-2;
          border-radius: 4px;
          color: $bg-color-blue-2;
        }
      }

      &__logout {
        position: absolute;
        top: 15px;
        right: 17px;
        border: 1px solid $border-color-gray-2;
        border-radius: 3px;
        color: $text-color-blue-2;
        font-size: 12px;
        padding: 2px 5px;
        cursor: pointer;

        @include min-sm {
          top: 29px;
          right: 34px;
        }
      }
    }
  }
}
</style>
