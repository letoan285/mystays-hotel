<template>
  <div class="guest-detail__guest-info-wrapper">
    <div name="fade">
      <div
        v-for="(guestInfo, index) in guestInfosLang"
        :key="guestInfo.guestId"
        class="guest-detail__guest-info"
      >
        <!-- <h3>{{ getLang.guest }} {{ index + 1 }}</h3> -->
        <div
          v-if="guestInfo.guestId !== 1"
          class="guest-detail__guest-info__close"
          @click="$_deleteGuest(guestInfo.guestId)"
        >
          {{ getLang.removeGuest }} <span class="icon-Icon-Minus" />
        </div>
        <InputCustom
          v-for="(inputValue, name) in guestInfo.guestInfoInput"
          :key="name"
          :class="{ 'w-100': inputValue.name == 'textarea' }"
          :label="inputValue.label"
          :icon="inputValue.icon"
          :type="inputValue.type"
          :placeholder="inputValue.placeholder"
          :data-index="index"
          :value="inputValue.value"
          :input-name="inputValue.name"
          :validations="
            $v.guestInfos.$each[index].guestInfoInput[inputValue.name].value
          "
          @input="input"
        >
          <span
            v-if="validate(index, inputValue.name, 'englishValidation')"
            class="app-input__validation"
          >
            {{ getLang.required }}
          </span>
          <span
            v-else-if="inputValue.name === 'email'"
            class="app-input__validation"
          >
            {{ errorText(index, "email", "email") }}
          </span>
          <span
            v-else-if="inputValue.name === 'phone'"
            class="app-input__validation"
          >
            {{ errorText(index, "phone", 'phoneNumberValidation') }}
          </span>
          <span
            v-else-if="validate(index, inputValue.name, 'japanLangValidation')"
            class="app-input__validation"
          >
            {{ "漢字・ひらがな・カタカナで入力してください。" }}
          </span>
          <span
            v-else-if="validate(index, inputValue.name, 'hiraganaValidation')"
            class="app-input__validation"
          >
            {{ "ひらがなで入力してください。" }}
          </span>
        </InputCustom>
        <div
          v-for="(additional, name) in additionalList"
          :key="name"
          class="guest-detail__guest-info__question"
        >
          <InputCustom
            v-if="additional.answer_type !== 'none'"
            class="w-100"
            :label="additional.question"
            type="textarea"
            :data-index="index"
            value=""
            input-name="textarea"
          />
        </div>

        <CustomCheckbox
          font-size="15px"
          color="#212529"
          v-model="isMakingForSomeone"
          :is-checked="isMakingForSomeone"
          :label-text="getLang.bookingForSomeone"
          v-if="roomList.length === 1"
        />

        <GuestDetailBookingForSomeone
          v-if="isMakingForSomeone"
          :is-making-for-someone="isMakingForSomeone"
        />
      </div>
    </div>
    <div
      v-if="guestInfos.length < roomList.length"
      class="guest-detail__guest-info-add-guest"
      @click="$_addGuest"
    >
      <span class="icon-Icon-Plus" />
      {{ getLang.addGuest }}
    </div>

    <div class="payment-method">
      <p>
        <input type="hidden" value name="kameitenn_chumon_bango" />
        <input id="token" type="hidden" value name="token" />
      </p>
    </div>
  </div>
</template>

<script>
import { isNullOrUndefined } from "util";
import { mapActions, mapGetters, mapState } from "vuex";
import {
  emailValidation,
  phoneValidation,
  japanLangValidation,
  englishValidation,
  hiraganaValidation
} from "../../../../shared/helper/vuelidate-validator";
import { FormLabel } from "../../../../shared/constants/index";

export default {
  name: "GuestDetailGuestInfo",
  data() {
    return {
      isMakingForSomeone: false,
      currentBillingIsSameStatus: ["billing-is-same"],
      guestInfos: [
        {
          guestInfoInput: {
            kanjiLastName: {
              name: "kanjiLastName",
              value: "",
              type: "text",
              label: FormLabel.kanji_last_name
            },
            kanjiFirstName: {
              name: "kanjiFirstName",
              value: "",
              type: "text",
              label: FormLabel.kanji_first_name
            },
            lastNameInput: {
              name: "lastNameInput",
              value: "",
              type: "text",
              label: FormLabel.last_name
            },
            firstNameInput: {
              name: "firstNameInput",
              value: "",
              type: "text",
              label: FormLabel.first_name
            },
            phone: {
              name: "phone",
              value: "",
              type: "number",
              label: FormLabel.phone,
              id: 1
            },
            email: {
              name: "email",
              value: "",
              type: "email",
              label: FormLabel.email,
              id: 1
            }
          },
          guestId: 1
        }
      ],
      isMakeForSomeoneFormValid: false
    };
  },
  validations() {
    if (this.language === "ja") {
      return {
        guestInfos: {
          $each: {
            guestInfoInput: {
              lastNameInput: {
                value: hiraganaValidation
              },
              firstNameInput: {
                value: hiraganaValidation
              },
              kanjiLastName: {
                value: japanLangValidation
              },
              kanjiFirstName: {
                value: japanLangValidation
              },
              phone: {
                value: phoneValidation
              },
              email: {
                value: emailValidation
              },
              textarea: {
                value: {}
              }
            }
          }
        }
      };
    }
    return {
      guestInfos: {
        $each: {
          guestInfoInput: {
            lastNameInput: {
              value: englishValidation
            },
            firstNameInput: {
              value: englishValidation
            },
            kanjiLastName: {
              value: {}
            },
            kanjiFirstName: {
              value: {}
            },
            phone: {
              value: phoneValidation
            },
            email: {
              value: emailValidation
            },
            textarea: {
              value: {}
            }
          }
        }
      }
    };
  },
  computed: {
    ...mapState({
      guestData: state => state.guestDetail.guest,
      isBookingForSomeoneElse: state =>
        state.guestDetail.isBookingForSomeoneElse
    }),
    ...mapGetters({
      language: "appHeader/language",
      isSubmitted: "guestDetail/isSubmitted",
      numberAdults: "booking/numberAdults",
      roomList: "booking/roomList"
    }),
    ...mapState({
      additionalList: state => state.guestDetail.additionalList
    }),
    isFormInValid() {
      return this.$v.$invalid;
    },
    billingIsSame() {
      return [
        {
          value: "billing-is-same",
          text: this.getLang.billingSame
        }
      ];
    },
    getLang() {
      return {
        guest: this.$t("guest_detail.guest"),
        addGuest: this.$t("guest_detail.add_guest"),
        removeGuest: this.$t("guest_detail.remove_guest"),
        billingSame: this.$t("guest_detail.billing_same"),
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
        toSignup: this.$t("login_signup.to_signup"),
        bookingForSomeone: this.$t("guest_detail.booking_for_someone")
      };
    },
    guestInfosLang() {
      const guestInfos = this.guestInfos;
      guestInfos.forEach(item => {
        item.guestInfoInput.lastNameInput.label = this.getLang.lastName;
        item.guestInfoInput.firstNameInput.label = this.getLang.firstName;
        item.guestInfoInput.kanjiLastName.label = this.getLang.kanjiLastName;
        item.guestInfoInput.kanjiFirstName.label = this.getLang.kanjiFirstName;
        item.guestInfoInput.phone.label = this.getLang.phone;
        item.guestInfoInput.email.label = this.getLang.email;
      });
      return guestInfos;
    }
  },
  watch: {
    isFormInValid(newValue) {
      this.triggerIsFormInvalid(newValue);
    },

    guestData(guestData) {
      if (guestData.length) {
        this.guestInfos = guestData.map((item, index) => {
          return {
            guestInfoInput: {
              lastNameInput: {
                name: "lastNameInput",
                value: item.last_name,
                type: "text",
                label: FormLabel.last_name
              },
              firstNameInput: {
                name: "firstNameInput",
                value: item.first_name,
                type: "text",
                label: FormLabel.first_name
              },
              kanjiLastName: {
                name: "kanjiLastName",
                value: item.last_name_kana,
                type: "text",
                label: FormLabel.kanji_last_name
              },
              kanjiFirstName: {
                name: "kanjiFirstName",
                value: item.first_name_kana,
                type: "text",
                label: FormLabel.kanji_first_name
              },
              phone: {
                name: "phone",
                value: item.phone,
                type: "text",
                label: FormLabel.phone,
                id: index + 1
              },
              email: {
                name: "email",
                value: item.email,
                type: "email",
                label: FormLabel.email,
                id: index + 1
              }
            },
            guestId: index + 1
          };
        });
      }
    },

    isBookingForSomeoneElse(isMakingForSomeone) {
      this.isMakingForSomeone = isMakingForSomeone;
    },

    isMakingForSomeone(isMakingForSomeone) {
      this.saveiSBookingForSomeoneElseData(isMakingForSomeone);
    },

    isSubmitted(_newValue) {
      this.$v.$touch();
      if (!this.isFormInValid) {
        this.getDataGuestDetail(this.guestInfos);
      }
    }
  },
  mounted() {
    this.triggerIsFormInvalid(true);
    this.isMakingForSomeone = this.isBookingForSomeoneElse;
    if (this.guestData.length) {
      this.$v.$touch();
      this.guestInfos = this.guestData.map((item, index) => {
        return {
          guestInfoInput: {
            lastNameInput: {
              name: "lastNameInput",
              value: item.last_name,
              type: "text",
              label: FormLabel.last_name
            },
            firstNameInput: {
              name: "firstNameInput",
              value: item.first_name,
              type: "text",
              label: FormLabel.first_name
            },
            kanjiLastName: {
              name: "kanjiLastName",
              value: item.last_name_kana,
              type: "text",
              label: FormLabel.kanji_last_name
            },
            kanjiFirstName: {
              name: "kanjiFirstName",
              value: item.first_name_kana,
              type: "text",
              label: FormLabel.kanji_first_name
            },
            phone: {
              name: "phone",
              value: item.phone,
              type: "text",
              label: FormLabel.phone,
              id: index + 1
            },
            email: {
              name: "email",
              value: item.email,
              type: "email",
              label: FormLabel.email,
              id: index + 1
            }
          },
          guestId: index + 1
        };
      });
    }
  },
  methods: {
    ...mapActions({
      triggerIsFormInvalid: "guestDetail/triggerIsFormInvalid",
      getDataGuestDetail: "guestDetail/getDataGuestDetail",
      saveiSBookingForSomeoneElseData:
        "guestDetail/saveiSBookingForSomeoneElseData"
    }),
    $_addGuest() {
      if (this.guestInfos.length < this.roomList.length) {
        this.guestInfos.push({
          guestInfoInput: {
            kanjiLastName: {
              name: "kanjiLastName",
              value: "",
              type: "text",
              label: FormLabel.kanji_last_name
            },
            kanjiFirstName: {
              name: "kanjiFirstName",
              value: "",
              type: "text",
              label: FormLabel.kanji_first_name
            },
            lastNameInput: {
              name: "lastNameInput",
              value: "",
              type: "text",
              label: FormLabel.last_name
            },
            firstNameInput: {
              name: "firstNameInput",
              value: "",
              type: "text",
              label: FormLabel.first_name
            },
            phone: {
              name: "phone",
              value: "",
              type: "text",
              label: FormLabel.phone,
              id: this.guestInfos[this.guestInfos.length - 1].guestId + 1
            },
            email: {
              name: "email",
              value: "",
              type: "email",
              label: FormLabel.email,
              id: this.guestInfos[this.guestInfos.length - 1].guestId + 1
            }
          },
          guestId: this.guestInfos[this.guestInfos.length - 1].guestId + 1
        });
      }
    },

    errorText(index, field, validateType) {
      let text = "";
      if (
        this.$v.guestInfos.$each[index].guestInfoInput[field].value.$dirty &&
        !this.$v.guestInfos.$each[index].guestInfoInput[field].value.required
      ) {
        text = this.getLang.required;
      }

      if (
        this.$v.guestInfos.$each[index].guestInfoInput[field].value.$dirty &&
        !this.$v.guestInfos.$each[index].guestInfoInput[field].value[
          validateType
        ]
      ) {
        text =
          field === "email" ? this.getLang.validEmail : this.getLang.validPhone;
      }
      return text;
    },

    validate(index, field, validateType) {
      return (
        this.$v.guestInfos.$each[index].guestInfoInput[field].value.$dirty &&
        !this.checkIsExits(
          this.$v.guestInfos.$each[index].guestInfoInput[field].value[
            validateType
          ]
        ) &&
        !this.$v.guestInfos.$each[index].guestInfoInput[field].value[
          validateType
        ]
      );
    },

    $_deleteGuest(guestId) {
      this.guestInfos = this.guestInfos.reduce((acc, cur) => {
        return cur.guestId !== guestId ? [...acc, cur] : [...acc];
      }, []);
    },
    checkIsExits(param) {
      return isNullOrUndefined(param);
    },
    input(target) {
      const guestIndex = parseInt(target.getAttribute("data-index"));
      const guestData = this.guestInfos.filter(
        val => val.guestId === guestIndex + 1
      );
      guestData[0].guestInfoInput[target.name].value = target.value;
      this.guestInfos[guestIndex] = guestData[0];
      this.$v.guestInfos.$each[guestIndex].guestInfoInput[
        target.name
      ].value.$touch();
    }
  }
};
</script>

<style lang="scss" scoped>
.guest-detail {
  &__guest-info {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    border: 1px solid $border-color-gray-2;
    padding: 15px 15px 0 15px;
    border-radius: 2px;
    position: relative;
    margin-bottom: 15px;

    @include min-sm {
      padding: 40px 30px 60px 30px;
      margin-bottom: 20px;
    }
    .input-custom-container {
      @include min-sm {
        flex-basis: 48%;
      }
    }
    &__close {
      position: absolute;
      top: 15px;
      right: 20px;
      cursor: pointer;
      color: $text-color-blue-2;
      font-size: 12px;
      display: flex;
      align-items: center;
      font-weight: bold;

      [class^="icon-"],
      [class*=" icon-"] {
        margin-left: 5px;
        font-size: 7px;
        font-weight: bold;
        background: $bg-color-blue-2;
        color: $white;
        padding: 3px;
        border-radius: 50%;
      }
    }

    &__checkbox {
      margin: 10px 0 30px 0;
    }

    h3 {
      width: 100%;
      margin-bottom: 10px;
    }

    label {
      font-weight: bold;
    }

    .app-input {
      flex: 0 1 100%;

      @include min-sm {
        flex-basis: 100%;
      }

      &.is-textarea {
        flex-basis: 100%;
      }
    }

    &-wrapper {
      position: relative;
      @include min-sm {
        margin-bottom: 30px;
      }
    }

    &-add-guest {
      // position: absolute;
      bottom: 0;
      height: 50px;
      width: 100%;
      background: $bg-color-gray-10;
      border: 1px solid $border-color-gray-2;
      display: flex;
      align-items: center;
      // border-top: none;
      padding: 0 25px;
      font-weight: bold;
      color: $text-color-blue-2;
      cursor: pointer;

      @include min-sm {
        padding: 0 30px;
        position: absolute;
      }

      [class^="icon-"],
      [class*=" icon-"] {
        margin-right: 20px;
        font-size: 10px;
        font-weight: bold;
        background: $bg-color-blue-2;
        color: $white;
        padding: 4px;
        border-radius: 50%;
      }
    }

    &-comment {
      display: flex;
      flex-direction: column;
      width: 100%;

      label {
        margin-bottom: 5px;
      }

      textarea {
        width: 100%;
      }
    }

    &__question {
      width: 100%;
    }
  }
  &__guest-info:not(:first-child) {
    // border-top: none;
  }

  .active {
    color: gray;
    [class^="icon-"],
    [class*=" icon-"] {
      background: gray;
    }
  }
}
</style>
