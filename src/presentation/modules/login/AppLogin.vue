<template>
  <div class="app-login">
    <AppLoader v-if="isLoading" />
    <h2>{{ getLang.title }}</h2>
    <NuxtLink :to="findOutMore.findOutMoreHref">
      {{ findOutMore.findOutMoreText }}
    </NuxtLink>
    <transition name="slide-in" mode="out-in">
      <div v-if="!isForgotPassword" key="login">
        <InputCustom
          v-for="(inputValue, name) in inputValues[0]"
          :key="name"
          :label="inputValue.label"
          :icon="inputValue.icon"
          :type="inputValue.type"
          :value="inputValue.value"
          :input-name="inputValue.name"
          :validations="$v.inputValues.$each[0][inputValue.name].value"
          @input="input"
          @enter="userLogin()"
        >
          <span
            v-if="
              $v.inputValues.$each[0][inputValue.name].value.$dirty &&
                !$v.inputValues.$each[0][inputValue.name].value.required
            "
            class="app-input__validation"
            >{{ getLang.required }}</span
          >
          <span
            v-else-if="
              $v.inputValues.$each[0][inputValue.name].value.$dirty &&
                !checkIsExits(
                  $v.inputValues.$each[0][inputValue.name].value.email
                ) &&
                !$v.inputValues.$each[0][inputValue.name].value.email
            "
            class="app-input__validation"
            >{{ getLang.validEmail }}</span
          >
        </InputCustom>
        <div
          v-if="isLoginFail && loginErrorMessage.length"
          class="text-danger text-center mb-2"
        >
          <div class="send-email-fail text-center">
            <span
              class="error text-center"
              v-for="(error, index) in loginErrorMessage"
              :key="index"
            >
              {{ error.title }}
            </span>
          </div>
        </div>
        <div class="app-login__forgot-password" @click="$_openForgotPassword">
          {{ forgotPassword.forgotPasswordText }}
        </div>
        <AppButton
          :button-text="getLang.login"
          button-type="primary"
          button-width="100%"
          :validated="loginValid"
          @onclick="userLogin()"
        />
        <AppButton
          :button-text="getLang.toSignup"
          button-type="secondary"
          button-width="100%"
          :validated="false"
          @onclick="$_toggleSignup(true)"
        />
        <SigninWith />
      </div>
      <div v-else key="forgotPassword">
        <AppForgotPassword
          :is-re-enter-password-step="isReEnterPasswordStep"
          :get-language="getLang"
        />
      </div>
    </transition>
  </div>
</template>

<script>
// eslint-disable-next-line node/no-deprecated-api
import { isNullOrUndefined } from "util";
import Vue from "vue";
import { mapActions, mapState, mapGetters } from "vuex";
import { STATIC_HOTEL_ID } from "../../../shared/constants/index";
import {
  emailValidation,
  passwordValidation
} from "../../../shared/helper/vuelidate-validator";

import { required } from "vuelidate/lib/validators";

export default Vue.extend({
  name: "AppLogin",
  data() {
    return {
      isLoginFail: false,
      isForgotPassword: false,
      isReEnterPasswordStep: false,
      key: process.env.CLIENT_KEY,
      secret: process.env.CLIENT_SECRETE,
      validated: true
    };
  },

  computed: {
    ...mapState({
      isLogin: state => state.users.data.isLogin,
      isResetPassword: state => state.appAuthen.isResetPassword,
      loginErrorMessage: state => state.users.loginErrorMessage,
      isLoading: state => state.users.data.isLoading
    }),

    ...mapGetters({
      fullLang: "appHeader/fullLanguage"
    }),

    loginValid() {
      return this.$v.inputValues.$dirty && this.$v.inputValues.$invalid;
    },
    findOutMore() {
      return {
        findOutMoreHref: "/",
        findOutMoreText: this.getLang.findOut
      };
    },
    forgotPassword() {
      return {
        forgotPasswordHref: "/",
        forgotPasswordText: this.getLang.forgotPassword
      };
    },
    getLang() {
      return {
        lastName: this.$t("forms.last_name"),
        firstName: this.$t("forms.first_name"),
        kanjiLastName: this.$t("forms.kanji_last_name"),
        kanjiFirstName: this.$t("forms.kanji_first_name"),
        phone: this.$t("forms.phone"),
        email: this.$t("forms.email"),
        addComment: this.$t("forms.add_comment"),
        required: this.$t("forms.required"),
        validPhone: this.$t("forms.valid_phone"),
        validEmail: this.$t("forms.valid_email"),
        comments: this.$t("forms.comments"),
        password: this.$t("forms.password"),
        rePassword: this.$t("forms.re_enter_password"),
        cardName: this.$t("forms.card_name"),
        cardNumber: this.$t("forms.card_number"),
        cardSecurity: this.$t("forms.card_security"),
        bookingID: this.$t("forms.booking_id"),
        title: this.$t("login_signup.title"),
        findOut: this.$t("login_signup.find_out"),
        forgotPassword: this.$t("login_signup.forgot_password"),
        login: this.$t("login_signup.login"),
        toSignup: this.$t("login_signup.to_signup")
      };
    },
    inputValues() {
      return [
        {
          emailInput: {
            name: "emailInput",
            value: "",
            type: "email",
            label: this.getLang.email,
            icon: "",
            required: true
          },
          passwordInput: {
            name: "passwordInput",
            value: "",
            type: "password",
            label: this.getLang.password,
            icon: "icon-Icon-Virtual-Tour iconOnTheRight"
          }
        }
      ];
    }
  },
  watch: {
    isLogin(newValue) {
      if (newValue === true) {
        this.closeLoginForm(true);
      } else if (newValue === false) {
        this.isLoginFail = true;
      }
    },
    isResetPassword: {
      handler(newValue) {
        if (newValue) {
          this.isForgotPassword = true;
        } else {
          this.isForgotPassword = false;
        }
      },
      immediate: true
    }
  },
  validations: {
    inputValues: {
      $each: {
        emailInput: {
          value: { emailValidation, required }
        },
        passwordInput: {
          value: passwordValidation
        }
      }
    }
  },

  mounted() {
    this.$nuxt.$on("on:goToLogin", () => {
      this.isForgotPassword = false;
    });
  },

  destroyed(){
    this.$scrollBody.enable();
  },

  methods: {
    ...mapActions({
      toggleSignup: "appAuthen/toggleSignup",
      closeLoginForm: "appAuthen/toggleLogin",
      handleUserLogin: "users/loginUser",
      getClientSession: "users/getAuthenticationSession",
      isLoginSuccess: "users/loginUserSuccess"
    }),
    checkIsExits(param) {
      return isNullOrUndefined(param);
    },
    $_toggleSignup(isOpen) {
      if (this.$nuxt.isOnline) {
        this.toggleSignup({ isSignupOpen: isOpen });
      } else {
        alert("You are Offline");
      }
    },
    $_openForgotPassword() {
      this.isForgotPassword = true;
    },
    userLogin() {
      if (this.$nuxt.isOnline) {
        this.$v.inputValues.$touch();
        const data = {
          email: this.inputValues[0].emailInput.value,
          password: this.inputValues[0].passwordInput.value,
          hotel_id: STATIC_HOTEL_ID,
          fullLang: this.fullLang
        };
        if (!this.$v.$invalid) {
          this.handleUserLogin(data);
        }
      } else {
        alert("You are Offline");
      }
    },
    input(target) {
      const { value, name } = target;
      this.inputValues[0][name].value = value;
      this.$v.inputValues.$each[0][name].value.$touch();
    }
  }
});
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.app-login {
  background: linear-gradient(
    29deg,
    $white 63%,
    $bg-color-blue-4 63%,
    $bg-color-blue-4 100%
  );
  padding: 20px;
  min-height: 100%;
  h2 {
    color: $text-color-blue;
    text-align: center;
    font-size: 22px;
    padding: 50px 45px 0 45px;
    margin-bottom: 10px;
    font-weight: 300;
  }
  label {
    margin-bottom: 3px;
  }
  a {
    color: $text-color-blue-2;
    margin: 0 auto 30px auto;
    font-size: 11px;
    display: table;
  }
  & &__forgot-password {
    color: $bg-color-blue-2;
    margin: 0 auto 30px auto;
    font-size: 11px;
    display: table;
    cursor: pointer;
  }
}
</style>
