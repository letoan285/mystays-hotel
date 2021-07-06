<template>
  <div class="app-signup page">
    <AppLoader v-if="isLoading" />
    <h2 class="app-signup__title">
      {{ getLang.title }}
    </h2>
    <NuxtLink :to="findOutMore.findOutMoreHref">
      {{ findOutMore.findOutMoreText }}
    </NuxtLink>
    <transition name="slide-in" mode="out-in">
      <div v-if="!isSuccess && !verified" key="signup">
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
        <!-- <div class="app-login__forgot-password">{{ forgotPassword.forgotPasswordText }}</div> -->
        <!-- @click="$_openForgotPassword" -->
        <span
          v-if="error"
          class="app-input__validation mb-2 d-block text-center"
          >{{ error }}</span
        >
        <AppButton
          :button-text="getLang.signUp"
          button-type="primary"
          button-width="100%"
          :validated="signupValid"
          @onclick="$_userSignup()"
        />
        <AppButton
          :button-text="getLang.toLogin"
          button-type="secondary"
          button-width="100%"
          :validated="false"
          @onclick="$_toggleLogin(true)"
        />
        <SigninWith />
      </div>
      <div v-else-if="isSuccess && !verified" key="signupEmail">
        <h2>{{ getLang.emailSent }} {{ inputValues[0].emailInput.value }}</h2>
      </div>
      <div
        v-else-if="!isSuccess && verified"
        key="verified"
        class="app-signup__verified"
      >
        <h2>{{ getLang.thankYouText }}</h2>
      </div>
    </transition>
  </div>
</template>

<script>
import { isNullOrUndefined } from "util";
import { mapActions, mapGetters, mapState } from "vuex";
import { required, sameAs } from "vuelidate/lib/validators";
import { STATIC_HOTEL_ID } from "../../../shared/constants/index";
import {
  emailValidation,
  passwordValidation,
  requiredValidation
} from "../../../shared/helper/vuelidate-validator";

export default {
  name: "AppSignup",
  data() {
    return {
      verified: false
    };
  },
  validations: {
    inputValues: {
      $each: {
        emailInput: {
          value: emailValidation
        },
        lastNameInput: {
          value: requiredValidation
        },
        firstNameInput: {
          value: requiredValidation
        },
        passwordInput: {
          value: passwordValidation
        },
        rePasswordInput: {
          value: {
            required,
            sameAsPassword: sameAs(function() {
              return this.inputValues[0].passwordInput.value;
            })
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      isSuccess: "users/signupUserSuccess"
    }),
    ...mapState({
      language: state => state.appHeader.data.language,
      isLoading: state => state.users.data.isLoading,
      error: state => state.users.data.errorMsgSignUp
    }),
    inputValues() {
      return [
        {
          emailInput: {
            name: "emailInput",
            value: "",
            type: "email",
            label: this.getLang.email
          },
          lastNameInput: {
            name: "lastNameInput",
            value: "",
            type: "text",
            label:
              this.language === "ja"
                ? this.getLang.kanjiLastName
                : this.getLang.lastName
          },
          firstNameInput: {
            name: "firstNameInput",
            value: "",
            type: "text",
            label:
              this.language === "ja"
                ? this.getLang.kanjiFirstName
                : this.getLang.firstName
          },
          passwordInput: {
            name: "passwordInput",
            value: "",
            type: "password",
            label: this.getLang.password,
            icon: "icon-Icon-Virtual-Tour iconOnTheRight"
          },
          rePasswordInput: {
            name: "rePasswordInput",
            value: "",
            type: "password",
            label: this.getLang.rePassword,
            icon: "icon-Icon-Virtual-Tour iconOnTheRight"
          }
        }
      ];
    },
    isValid() {
      return !this.$v.$invalid;
    },
    findOutMore() {
      return {
        findOutMoreHref: "/",
        findOutMoreText: this.getLang.findOut
      };
    },
    signupValid() {
      return this.$v.inputValues.$dirty && this.$v.inputValues.$invalid;
    },
    getLang() {
      return {
        title: this.$t("login_signup.title"),
        findOut: this.$t("login_signup.find_out"),
        signUp: this.$t("login_signup.signup"),
        toLogin: this.$t("login_signup.to_login"),
        thankYouText: this.$t("login_signup.thank_you_text"),
        required: this.$t("forms.required"),
        validEmail: this.$t("forms.valid_email"),
        forgotPasswordText: this.$t("login_signup.forgot_password_text"),
        forgotPasswordTextConfirm: this.$t(
          "login_signup.forgot_password_text_confirm"
        ),
        forgotPasswordConfirm: this.$t("login_signup.forgot_password_confirm"),
        emailSent: this.$t("login_signup.email_sent_text"),
        newPassword: this.$t("login_signup.new_password"),
        changePassword: this.$t("login_signup.change_password_button"),
        lastName: this.$t("forms.last_name"),
        firstName: this.$t("forms.first_name"),
        kanjiLastName: this.$t("forms.kanji_last_name"),
        kanjiFirstName: this.$t("forms.kanji_first_name"),
        phone: this.$t("forms.phone"),
        email: this.$t("forms.email"),
        addComment: this.$t("forms.add_comment"),
        validPhone: this.$t("forms.valid_phone"),
        comments: this.$t("forms.comments"),
        password: this.$t("forms.password"),
        rePassword: this.$t("forms.re_enter_password"),
        cardName: this.$t("forms.card_name"),
        cardNumber: this.$t("forms.card_number"),
        cardSecurity: this.$t("forms.card_security"),
        bookingID: this.$t("forms.booking_id"),
        forgotPassword: this.$t("login_signup.forgot_password"),
        login: this.$t("login_signup.login"),
        toSignup: this.$t("login_signup.to_signup")
      };
    }
  },

  methods: {
    ...mapActions({
      toggleLogin: "appAuthen/toggleLogin",
      toggleSignup: "appAuthen/toggleSignup",
      handleSignupUser: "users/signupUser"
    }),
    checkIsExits(param) {
      return isNullOrUndefined(param);
    },
    $_toggleLogin(isOpen) {
      this.toggleLogin({ isLoginOpen: isOpen });
    },
    $_userSignup() {
      if (this.$nuxt.isOnline) {
        this.$v.$touch();
        if (this.isValid) {
          const user = {
            program_id: 31,
            first_name: this.inputValues[0].firstNameInput.value,
            last_name: this.inputValues[0].lastNameInput.value,
            first_name_kana: this.inputValues[0].firstNameInput.value,
            last_name_kana: this.inputValues[0].lastNameInput.value,
            email: this.inputValues[0].emailInput.value,
            password: this.inputValues[0].passwordInput.value,
            password_confirm: this.inputValues[0].rePasswordInput.value,
            phone: "4343243242343",
            birthday: "1986-01-01",
            membership_id: "TH000002",
            hotel_id: STATIC_HOTEL_ID,
            email_permission: true
          };
          this.handleSignupUser(user);
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
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.app-signup {
  &__verified {
    text-transform: uppercase;
  }

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
