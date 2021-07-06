<template>
  <div v-if="!isLogin" class="login-block">
    <div class="login-block__bonus">
      <span>+ 100 {{ getLanguage.bonus }}</span>
    </div>
    <div class="login-block__title">
      <span>{{ getLanguage.i_want_to_be_a_member }}</span>
    </div>
    <div class="login-block__content">
      <span>{{ getLanguage.use_your_earned_miles }}</span>
    </div>
    <div class="login-block__button">
      <div class="login-block__button__login">
        <span class="icon-Icon-Profile" />
        <button class="m-btn m-btn__white" @click="$_onLogin">
          {{ getLanguage.login }}
        </button>
      </div>
      <div class="login-block__button__learn-more">
        <button class="m-btn m-btn__blue" @click="$_onJoin">
          {{ isMobileMode ? getLanguage.learnMore : getLanguage.join }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapActions } from "vuex";

export default Vue.extend({
  name: "LoginBlock",
  components: {},
  props: {
    isMobile: {
      type: Boolean
    }
  },
  data() {
    return {
      isMobileMode: this.isMobile
    };
  },
  computed: {
    ...mapState({
      isLogin: (state: any) => state.users.data.isLogin
    }),
    getLanguage(): any {
      return {
        memberLogin: this.$t("summary.member_login"),
        join: this.$t("hoteldetail.join"),
        bonus: this.$t("summary.bonus_miles_on_sign_up"),
        learnMore: this.$t("summary.learn_more"),
        login: this.$t("summary.login"),
        i_want_to_be_a_member: this.$t("guest_detail.i_want_to_be_a_member"),
        use_your_earned_miles: this.$t("guest_detail.use_your_earned_miles")
      };
    }
  },
  watch: {
    isMobile(isMobile: any) {
      this.isMobileMode = isMobile;
    }
  },
  methods: {
    ...mapActions({
      toggleLogin: "appAuthen/toggleLogin",
      toggleSignup: "appAuthen/toggleSignup"
    }),

    $_onLogin() {
      this.toggleLogin({ isLoginOpen: true });
    },

    $_onJoin() {
      this.toggleSignup({ isSignupOpen: true });
    }
  }
});
</script>

<style lang="scss" scoped>
.login-block {
  padding: 15px 20px;
  margin-bottom: 15px;
  border: 1px solid $border-color-gray-2;
  border-radius: 2px;
  position: relative;
  @include min-sm {
    margin-bottom: 30px;
    padding: 20px;
  }

  &__bonus {
    display: none;
    @include min-sm {
      padding: 4px 0 5px;
      display: block;
      text-align: center;
      background: $bg-color-blue-2;
      position: absolute;
      width: 100%;
      left: 0;
      top: 0;
      border-radius: 2px 2px 0 0;
      span {
        font-size: 13px;
        color: white;
        font-weight: bold;
        text-transform: uppercase;
      }
    }
  }
  &__title {
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 6px;
    @include min-sm {
      margin-top: 20px;
    }
  }

  &__content {
    font-size: 13px;
    margin-bottom: 15px;
  }

  &__button {
    display: flex;
    justify-content: space-between;
    button {
      padding: 12px 0 12px 5px;
      width: 100%;
      height: 100%;
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 1px;
      text-transform: uppercase;
      @include min-sm {
        padding: 12px 23px;
      }
    }

    &__login {
      position: relative;
      width: 48%;
      @include min-md {
        button {
          padding: 12px 23px;
        }
      }
      &:hover,
      &:active {
        span {
          color: white;
        }
      }
      span {
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
      }
    }

    &__learn-more {
      width: 46%;
      @include min-sm {
        button {
          padding: 12px 0;
        }
      }
    }
  }
}
</style>
