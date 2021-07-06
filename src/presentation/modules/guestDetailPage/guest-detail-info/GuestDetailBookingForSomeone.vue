<template>
  <div class="booking-for-someone">
    <div class="booking-for-someone__form">
      <InputCustom
        v-if="language === 'ja'"
        :label="guestInfosLang['kanjiLastName'].label"
        :icon="guestInfosLang['kanjiLastName'].icon"
        :type="guestInfosLang['kanjiLastName'].type"
        :placeholder="guestInfosLang['kanjiLastName'].placeholder"
        :value="guestInfosLang['kanjiLastName'].value"
        :input-name="guestInfosLang['kanjiLastName'].name"
        :validations="$v.guestInfos['kanjiLastName'].value"
        @input="input"
      >
        <span
          v-if="validate('kanjiLastName', 'englishValidation')"
          class="app-input__validation"
          >{{ getLang.required }}</span
        >
        <span
          v-else-if="validate('kanjiLastName', 'japanLangValidation')"
          class="app-input__validation"
          >{{ "漢字・ひらがな・カタカナで入力してください。" }}</span
        >
        <span
          v-else-if="validate('kanjiLastName', 'hiraganaValidation')"
          class="app-input__validation"
          >{{ "ひらがなで入力してください。" }}</span
        >
      </InputCustom>

      <InputCustom
        v-if="language === 'ja'"
        :label="guestInfosLang['kanjiFirstName'].label"
        :icon="guestInfosLang['kanjiFirstName'].icon"
        :type="guestInfosLang['kanjiFirstName'].type"
        :placeholder="guestInfosLang['kanjiFirstName'].placeholder"
        :value="guestInfosLang['kanjiFirstName'].value"
        :input-name="guestInfosLang['kanjiFirstName'].name"
        :validations="$v.guestInfos['kanjiFirstName'].value"
        @input="input"
      >
        <span
          v-if="validate('kanjiFirstName', 'englishValidation')"
          class="app-input__validation"
          >{{ getLang.required }}</span
        >
        <span
          v-else-if="validate('kanjiFirstName', 'japanLangValidation')"
          class="app-input__validation"
          >{{ "漢字・ひらがな・カタカナで入力してください。" }}</span
        >
        <span
          v-else-if="validate('kanjiFirstName', 'hiraganaValidation')"
          class="app-input__validation"
          >{{ "ひらがなで入力してください。" }}</span
        >
      </InputCustom>

      <InputCustom
        :label="guestInfosLang['lastNameInput'].label"
        :icon="guestInfosLang['lastNameInput'].icon"
        :type="guestInfosLang['lastNameInput'].type"
        :placeholder="guestInfosLang['lastNameInput'].placeholder"
        :value="guestInfosLang['lastNameInput'].value"
        :input-name="guestInfosLang['lastNameInput'].name"
        :validations="$v.guestInfos['lastNameInput'].value"
        @input="input"
      >
        <span
          v-if="validate('lastNameInput', 'englishValidation')"
          class="app-input__validation"
        >
          {{ getLang.required }}
        </span>
        <span
          v-else-if="validate('lastNameInput', 'japanLangValidation')"
          class="app-input__validation"
        >
          {{ "漢字・ひらがな・カタカナで入力してください。" }}
        </span>
        <span
          v-else-if="validate('lastNameInput', 'hiraganaValidation')"
          class="app-input__validation"
        >
          {{ "ひらがなで入力してください。" }}
        </span>
      </InputCustom>

      <InputCustom
        :label="guestInfosLang['firstNameInput'].label"
        :icon="guestInfosLang['firstNameInput'].icon"
        :type="guestInfosLang['firstNameInput'].type"
        :placeholder="guestInfosLang['firstNameInput'].placeholder"
        :value="guestInfosLang['firstNameInput'].value"
        :input-name="guestInfosLang['firstNameInput'].name"
        :validations="$v.guestInfos['firstNameInput'].value"
        @input="input"
      >
        <span
          v-if="validate('firstNameInput', 'englishValidation')"
          class="app-input__validation"
          >{{ getLang.required }}</span
        >
        <span
          v-else-if="validate('firstNameInput', 'japanLangValidation')"
          class="app-input__validation"
          >{{ "漢字・ひらがな・カタカナで入力してください。" }}</span
        >
        <span
          v-else-if="validate('firstNameInput', 'hiraganaValidation')"
          class="app-input__validation"
          >{{ "ひらがなで入力してください。" }}</span
        >
      </InputCustom>
    </div>
  </div>
</template>

<script>
import {
  japanLangValidation,
  englishValidation,
  hiraganaValidation
} from "../../../../shared/helper/vuelidate-validator";
import { FormLabel } from "../../../../shared/constants/index";
import { mapGetters, mapActions, mapState } from "vuex";
import { isNullOrUndefined } from "util";
export default {
  name: "GuestDetailBookingForSomeone",
  props: {
    isMakingForSomeone: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      guestInfos: {
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
        }
      }
    };
  },
  computed: {
    ...mapState({
      someElseData: state => state.guestDetail.someoneElseData
    }),
    ...mapGetters({
      language: "appHeader/language",
      isSubmitted: "guestDetail/isSubmitted"
    }),
    getLang() {
      return {
        lastName: this.$t("forms.last_name"),
        firstName: this.$t("forms.first_name"),
        kanjiLastName: this.$t("forms.kanji_last_name"),
        kanjiFirstName: this.$t("forms.kanji_first_name"),
        bookingForSomeone: this.$t("guest_detail.booking_for_someone"),
        required: this.$t("forms.required")
      };
    },
    guestInfosLang() {
      const guestInfos = this.guestInfos;

      guestInfos.lastNameInput.label = this.getLang.lastName;
      guestInfos.firstNameInput.label = this.getLang.firstName;
      guestInfos.kanjiLastName.label = this.getLang.kanjiLastName;
      guestInfos.kanjiFirstName.label = this.getLang.kanjiFirstName;

      return guestInfos;
    },

    isFormInValid() {
      return this.$v.$invalid;
    }
  },
  watch: {
    isSubmitted(_newValue) {
      if (this.isMakingForSomeone) {
        this.$v.$touch();
      }
      if (!this.isFormInValid) {
        this.saveiSBookingForSomeoneElseData(this.isMakingForSomeone);
        this.saveBookingForSomeoneElseData(this.guestInfos);
      }
    },

    someElseData(data) {
      this.guestInfos.lastNameInput.value = data.last_name;
      this.guestInfos.firstNameInput.value = data.first_name;
      this.guestInfos.kanjiLastName.value = data.last_name_kana;
      this.guestInfos.kanjiFirstName.value = data.first_name_kana;
    },

    isFormInValid(newValue) {
      this.triggerIsMakingForSomeoneFormInvalid(newValue);
    }
  },
  mounted() {
    this.triggerIsMakingForSomeoneFormInvalid(this.$v.$invalid);
    if (this.someElseData.first_name) {
      this.$v.$touch();
      this.guestInfos.lastNameInput.value = this.someElseData.last_name;
      this.guestInfos.firstNameInput.value = this.someElseData.first_name;
      this.guestInfos.kanjiLastName.value = this.someElseData.last_name_kana;
      this.guestInfos.kanjiFirstName.value = this.someElseData.first_name_kana;
    }
  },
  methods: {
    ...mapActions({
      saveBookingForSomeoneElseData:
        "guestDetail/saveBookingForSomeoneElseData",
      saveiSBookingForSomeoneElseData:
        "guestDetail/saveiSBookingForSomeoneElseData",
      triggerIsMakingForSomeoneFormInvalid:
        "guestDetail/triggerIsMakingForSomeoneFormInvalid"
    }),
    checkIsExits(param) {
      return isNullOrUndefined(param);
    },
    validate(field, validateType) {
      return (
        this.$v.guestInfos[field].value.$dirty &&
        !this.checkIsExits(this.$v.guestInfos[field].value[validateType]) &&
        !this.$v.guestInfos[field].value[validateType]
      );
    },
    input(target) {
      this.guestInfos[target.name].value = target.value;
      this.$v.guestInfos[target.name].$touch();
    }
  },
  validations() {
    if (this.language === "ja") {
      return {
        guestInfos: {
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
          }
        }
      };
    }
    return {
      guestInfos: {
        lastNameInput: {
          value: englishValidation
        },
        firstNameInput: {
          value: englishValidation
        }
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.booking-for-someone {
  width: 100%;
  margin-top: 10px;
  .app-checkbox {
    margin-bottom: 15px;
  }

  &__form {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .input-custom-container {
      @include min-sm {
        flex-basis: 48%;
      }
    }
  }
}
</style>
