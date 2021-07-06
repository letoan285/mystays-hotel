<template>
  <div class="guest-detail__login login-payment">
    <div class="login-payment__row">
      <p>Hi {{ userInfo.userName }}</p>
      <div v-if="goldMemberShip" class="login-payment__authened-membership">
        <span class="icon-Icon-Reward" /> Gold Member
      </div>
    </div>
    <div class="login-payment__row">
      <p>Your miles</p>
      <div class="login-payment__authened-miles">
        {{ userInfo.userMiles.toLocaleString() }} miles
        <span class="icon-Icon-Info" />
      </div>
    </div>
    <div class="login-payment__apply">
      <p>Apply to this stays:</p>
      <div class="login-payment__apply__input">
        <button
          class="login-payment__apply__input__minus m-btn__blue"
          :disabled="disableMinusButton"
          @click="$_minus"
        >
          <span class="icon-Arrow-Minus" />
        </button>
        <input
          v-model="applyMiles"
          type="number"
          min="0"
          :max="userInfo.userMiles"
          @input="$_keydownInput"
        >
        <span class="login-payment__apply__input__unit">miles</span>
        <button
          class="login-payment__apply__input__plus m-btn__blue"
          :disabled="disablePlusButton"
          @click="$_plus"
        >
          <span class="icon-Arrow-Plus" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { MemberType } from '../../../../../../shared/constants/index'
export default {
  name: 'GuestDetailLoginPayment',
  data () {
    return {
      MILES__STEP: 100,
      miles: 0,
      userInfo: {
        userName: 'Hideyoshi',
        userMiles: 2345,
        userMemberType: MemberType.Gold
      }
    }
  },
  computed: {
    applyMiles: {
      get () {
        return this.miles
      },
      set (newVal) {
        const newValAfterValidate = newVal.toString().replace(/[e+-]/gi, '')
        if (+newValAfterValidate >= this.userInfo.userMiles) {
          this.miles = this.userInfo.userMiles
        } else if (+newValAfterValidate < 0 || !newValAfterValidate) {
          this.miles = 0
        } else {
          this.miles = +newValAfterValidate
        }
      }
    },

    goldMemberShip () {
      return this.userInfo.userMemberType === MemberType.Gold
    },

    disableMinusButton () {
      return +this.applyMiles === 0
    },

    disablePlusButton () {
      return +this.applyMiles + this.MILES__STEP >= this.userInfo.userMiles
    }
  },
  methods: {
    $_keydownInput (event) {
      ['e', 'E', '+', '-'].includes(event.key) && event.preventDefault()
    },
    $_minus () {
      this.miles -= this.MILES__STEP
    },

    $_plus () {
      this.miles += this.MILES__STEP
    }
  }
}
</script>

<style lang="scss" scoped>
.guest-detail__login.login-payment {
  .login-payment {
    &__row,
    &__apply {
      display: flex;
      justify-content: space-between;
      padding: 7px 0;
      border-bottom: 1px solid $border-color-gray-4;
      align-items: center;

      p {
        font-size: 12px;
        text-align: left;
        word-break: break-all;
        margin-right: 10px;
        flex: 1;
      }
    }

    &__apply {
      border-bottom: none;
      padding: 20px 0 0 0;

      &__input {
        display: flex;
        position: relative;

        input[type="number"] {
          padding-right: 45px;
          width: 85px;
          height: 40px;
          text-align: right;
          border: 1px solid $border-color-gray-2;
        }

        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        input[type="number"] {
          -moz-appearance: textfield;
        }

        button {
          font-size: 10px;
          width: 35px;

          span {
            vertical-align: middle;
          }
        }

        &__unit {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: 40px;
        }
      }
    }

    &__authened-membership {
      font-size: 11px;
      color: $text-color-blue;
      padding: 6px 9px;
      border-radius: 24px;
      background: $bg-color-yellow;
      font-weight: bold;

      [class^="icon-"],
      [class*=" icon-"] {
        margin-right: 6px;
        font-size: 14px;
        vertical-align: bottom;
      }
    }

    &__authened-miles {
      font-size: 18px;
      color: $text-color-blue;
      font-weight: bold;
      display: flex;
      align-items: center;

      [class^="icon-"],
      [class*=" icon-"] {
        margin-left: 10px;
        font-size: 14px;
        vertical-align: bottom;
      }
    }
  }
}
</style>
