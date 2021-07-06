<template>
  <div class="app-forgot-password">
    <hr />
    <transition name="slide-in" mode="out-in">
      <div
        class="app-forgot-password__form"
        v-if="
          (!isReEnterPasswordStep && !isConfirmSent && !isResetPawordSuccess) ||
            errorMessage.length
        "
        key="enterEmail"
      >
        <h3>{{ getLang.forgotPasswordText }}</h3>
        <p>{{ getLang.forgotPasswordTextConfirm }}</p>
        <InputCustom
          v-for="(inputValue, name) in inputEmail"
          :key="name"
          :label="inputValue.label"
          :icon="inputValue.icon"
          :type="inputValue.type"
          :value="inputValue.value"
          :input-name="inputValue.name"
          :validations="$v.inputEmail[inputValue.name].value"
          @input="inputEmails"
        >
          <span
            v-if="
              $v.inputEmail[inputValue.name].value.$dirty &&
                !$v.inputEmail[inputValue.name].value.required
            "
            class="app-input__validation"
          >
            {{ getLang.required }}
          </span>
          <span
            v-else-if="
              $v.inputEmail[inputValue.name].value.$dirty &&
                !checkIsExits($v.inputEmail[inputValue.name].value.email) &&
                !$v.inputEmail[inputValue.name].value.email
            "
            class="app-input__validation"
          >
            {{ getLang.validEmail }}
          </span>
        </InputCustom>
        <app-button
          :button-text="getLang.forgotPasswordConfirm"
          button-type="primary"
          button-width="100%"
          :validated="emailValid"
          @onclick="$_sendVerification()"
        />

        <div class="send-email-fail text-center">
          <span
            class="error text-center"
            v-for="(error, index) in errorMessage"
            :key="index"
          >
            {{ error.title }}
          </span>
        </div>
      </div>
      <div
        v-else-if="
          !isReEnterPasswordStep &&
            isConfirmSent &&
            !isResetPawordSuccess &&
            !errorMessage.length
        "
        key="confirmSent"
        class="app-forgot-password__confirm-sent text-center"
      >
        <h4>{{ getLang.emailSent }} {{ inputEmail.emailInput.value }}</h4>
      </div>
      <div
        v-else-if="
          isReEnterPasswordStep && isConfirmSent && !isResetPawordSuccess
        "
        key="enterPasswords"
        class="app-forgot-password__change-password"
      >
        <h3>{{ getLang.newPassword }}</h3>
        <InputCustom
          v-for="(inputValue, name) in inputPassword"
          :key="name"
          :label="inputValue.label"
          :icon="inputValue.icon"
          :type="inputValue.type"
          :value="inputValue.value"
          :input-name="inputValue.name"
          :validations="$v.inputPassword[inputValue.name].value"
          @input="inputPasswords"
        >
          <span
            v-if="
              $v.inputPassword[inputValue.name].value.$dirty &&
                !$v.inputPassword[inputValue.name].value.required
            "
            class="app-input__validation"
            >{{ getLang.required }}</span
          >
          <span
            v-else-if="
              $v.inputPassword[inputValue.name].value.$dirty &&
                !checkIsExits($v.inputPassword[inputValue.name].value.email) &&
                !$v.inputPassword[inputValue.name].value.email
            "
            class="app-input__validation"
            >{{ getLang.validEmail }}</span
          >
          <span
            v-else-if="
              $v.inputPassword[inputValue.name].value.$dirty &&
                !checkIsExits(
                  $v.inputPassword[inputValue.name].value.sameAsPassword
                ) &&
                !$v.inputPassword[inputValue.name].value.sameAsPassword
            "
            class="app-input__validation"
            >{{ "RePassword not Match" }}</span
          >
        </InputCustom>
        <app-button
          :button-text="getLang.changePassword"
          button-type="primary"
          button-width="100%"
          :is-loading="isLoading"
          :validated="passwordValid"
          :disabled="isLoading"
          @onclick="$_changePassword"
        />
        <div class="text-center">
          <span v-if="errorMsg" class="app-input__validation">
            {{ errorMsg }}
          </span>
        </div>
      </div>
      <div
        v-else
        key="ressetSuccess"
        class="app-forgot-password__reset-success"
      >
        <h3 class="text-center">
          {{ "Reset password successfully" }}
        </h3>
        <div
          class="app-login__forgot-password d-flex justify-content-center mt-4"
        >
          <button class="m-btn m-btn__yellow" @click="$_goToLogin">
            {{ getLang.login }}
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { isNullOrUndefined } from "util";
import { mapActions, mapState } from "vuex";
import { required, sameAs } from "vuelidate/lib/validators";
import { emailValidation } from "../../../shared/helper/vuelidate-validator";
export default {
  props: {
    getLanguage: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      isReEnterPasswordStep: false,
      isConfirmSent: false,
      isResetPawordSuccess: false,
      inputEmail: {
        emailInput: {
          name: "emailInput",
          value: "",
          type: "email",
          label: this.getLanguage.email,
          icon: "",
          required: true
        }
      },
      inputPassword: {
        passwordInput: {
          name: "passwordInput",
          value: "",
          type: "password",
          label: this.getLanguage.password,
          icon: "Icon-Virtual-Tour",
          required: true
        },
        rePasswordInput: {
          name: "rePasswordInput",
          value: "",
          type: "password",
          label: this.getLanguage.rePassword,
          icon: "Icon-Virtual-Tour",
          required: true
        }
      }
    };
  },
  validations: {
    inputEmail: {
      emailInput: {
        value: { emailValidation, required }
      }
    },
    inputPassword: {
      passwordInput: {
        value: { required }
      },
      rePasswordInput: {
        value: {
          required,
          sameAsPassword: sameAs(function() {
            return this.inputPassword.passwordInput.value;
          })
        }
      }
    }
  },
  computed: {
    ...mapState({
      isResetPassword: state => state.appAuthen.isResetPassword,
      ressetToken: state => state.users.data.ressetPasswordToken,
      isLoading: state => state.users.data.isLoading,
      errorMsg: state => state.users.data.errorMsg,
      errorMessage: state => state.users.errorMessage,
      isResetPasswordSuccess: state => state.users.data.isResetPasswordSuccess
    }),
    emailValid() {
      return this.$v.inputEmail.$dirty && this.$v.inputEmail.$invalid;
    },
    passwordValid() {
      return this.$v.inputPassword.$dirty && this.$v.inputPassword.$invalid;
    },
    getLang() {
      return {
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
        title: this.$t("login_signup.title"),
        findOut: this.$t("login_signup.find_out"),
        forgotPassword: this.$t("login_signup.forgot_password"),
        login: this.$t("login_signup.login"),
        toSignup: this.$t("login_signup.to_signup")
      };
    }
  },
  watch: {
    isResetPassword: {
      handler(newValue) {
        if (newValue) {
          this.isReEnterPasswordStep = true;
          this.isConfirmSent = true;
        }
      },
      immediate: true
    },
    isResetPasswordSuccess(newValue) {
      if (newValue) {
        this.isResetPawordSuccess = true;
      }
    }
  },
  destroyed() {
    this.resetData();
  },
  methods: {
    ...mapActions({
      handleResetPassword: "users/resetPassword",
      handleUpdatePassword: "users/updatePassword",
      goToLogin: "appAuthen/goToLogin",
      resetData: "appAuthen/resetData"
    }),

    $_goToLogin() {
      this.$router.push("/");
      this.$nuxt.$emit("on:goToLogin");
    },

    $_sendVerification() {
      this.$v.inputEmail.$touch();
      if (this.$v.inputEmail.$invalid) {
      } else {
        const email = this.inputEmail.emailInput.value;
        this.handleResetPassword(email);
        this.isConfirmSent = true;
      }
    },
    $_changePassword() {
      this.$v.inputPassword.$touch();
      if (!this.$v.inputPassword.$invalid) {
        const param = {
          password: this.inputPassword.passwordInput.value,
          ressetToken: this.$route.query.reset_password_token
        };
        this.handleUpdatePassword(param);
      }
    },
    inputEmails(target) {
      const obj = this.inputEmail[target.name];
      this.inputEmail = {
        ...this.inputEmail,
        [target.name]: {
          ...obj,
          value: target.value
        }
      };
      this.$v.inputEmail[target.name].value.$touch();
    },
    inputPasswords(target) {
      const obj = this.inputPassword[target.name];
      this.inputPassword = {
        ...this.inputPassword,
        [target.name]: {
          ...obj,
          value: target.value
        }
      };
      this.$v.inputPassword[target.name].value.$touch();
    },
    checkIsExits(param) {
      return isNullOrUndefined(param);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3,
p {
  color: $text-color-blue;
}

h3 {
  margin-top: 50px;
}

.slide-in-enter-active,
.slide-in-leave-active {
  transition: all 0.3s;
  transform: translate3d(0, 0, 0);
}

.slide-in-enter,
.slide-in-leave-to {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.app-login__forgot-password {
  font-size: 15px !important;

  button {
    padding: 10px 30px;
  }
}
</style>
