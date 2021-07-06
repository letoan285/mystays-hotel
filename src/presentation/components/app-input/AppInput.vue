<template>
  <div
    class="app-input"
    :class="{
      'has-error': validation ? validation.value.$error : false,
      'is-textarea': validationInputName === 'textarea'
    }"
  >
    <label :for="inputName + inputIndex">{{ getLabelLanguageText }}</label>
    <div v-if="isPhoneNumberInput" class="app-input__phone">
      <input
        :id="inputName + inputIndex"
        ref="input"
        v-model="computedValue"
        :type="inputType"
        @focus="isFocused = true"
      >
      <phone-code-dropdown @changePhoneCode="$_changePhoneCode" />
    </div>
    <textarea
      v-else-if="validationInputName === 'textarea'"
      :id="inputName + inputIndex"
      v-model="computedValue"
      rows="4"
      :placeholder="getPlaceholderLanguageText"
      @focus="$emit('input', $event.target.value)"
    />
    <input
      v-else
      :id="inputName + inputIndex"
      ref="input"
      v-model="computedValue"
      :type="inputType"
      @focus="isFocused = true"
    >
    <span :class="'icon-' + inputIcon" @click="$_onClickIcon" />
    <span v-if="required" class="icon-Icon-Required app-input__required-icon" />
    <span v-if="isFocused && isRequired" class="app-input__validation">{{
      getLang.required
    }}</span>
    <span
      v-else-if="isFocused && isPhoneNumberValidated && isPhoneNumberInput"
      class="app-input__validation"
    >{{ getLang.validPhone }}</span>
    <span
      v-else-if="isFocused && isEmailMatched && isEmailInput"
      class="app-input__validation"
    >{{ getLang.validEmail }}</span>
  </div>
</template>

<script>
import Vue from 'vue'
import { FormLabel } from '../../../shared/constants/index'
import PhoneCodeDropdown from '../phone-code-dropdown/PhoneCodeDropdown'

export default Vue.extend({
  name: 'AppInput',
  components: {
    PhoneCodeDropdown
  },
  props: {
    value: {
      type: String,
      required: true
    },
    inputType: {
      type: String,
      required: true
    },
    inputName: {
      type: String,
      required: true
    },
    inputLabel: {
      type: String,
      default: ''
    },
    inputIcon: {
      type: String,
      default: ''
    },
    inputIndex: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    validationInputName: {
      type: String,
      required: true
    },
    validations: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isFocused: false,
      phoneCode: ''
    }
  },
  computed: {
    computedValue: {
      get () {
        return this.value
      },
      set (value) {
        if (this.validation) {
          this.validation.value.$touch()
        }
        if (this.isPhoneNumberInput) {
          this.$emit('getPhoneCode', this.phoneCode)
        }
        this.$emit('input', value)
      }
    },
    validation () {
      return this.validations[this.validationInputName]
    },
    isRequired () {
      if (this.validation) {
        return !this.validation.value.required
      }
      return false
    },
    isPhoneNumberInput () {
      return this.validationInputName === 'phone'
    },
    isPhoneNumberValidated () {
      if (this.validation) {
        return !this.validation.value.phoneNumberValidation
      }
      return false
    },
    isEmailInput () {
      return this.inputType === 'email'
    },
    isEmailMatched () {
      if (this.validation) {
        return !this.validation.value.email
      }
      return false
    },
    getLabelLanguageText () {
      switch (this.inputLabel) {
        case FormLabel.last_name:
          return this.getLang.lastName
        case FormLabel.first_name:
          return this.getLang.firstName
        case FormLabel.kanji_last_name:
          return this.getLang.kanjiLastName
        case FormLabel.kanji_first_name:
          return this.getLang.kanjiFirstName
        case FormLabel.phone:
          return this.getLang.phone
        case FormLabel.email:
          return this.getLang.email
        case FormLabel.add_comment:
          return this.getLang.addComment
        case FormLabel.password:
          return this.getLang.password
        case FormLabel.re_password:
          return this.getLang.rePassword
        case FormLabel.card_security:
          return this.getLang.cardSecurity
        case FormLabel.card_name:
          return this.getLang.cardName
        case FormLabel.card_number:
          return this.getLang.cardNumber
        case FormLabel.booking_id:
          return this.getLang.bookingID
        default:
          return this.inputLabel
      }
    },
    getPlaceholderLanguageText () {
      switch (this.placeholder) {
        case FormLabel.comment:
          return this.getLang.comments
        default:
          return this.placeholder
      }
    },
    getLang () {
      return {
        lastName: this.$t('forms.last_name'),
        firstName: this.$t('forms.first_name'),
        kanjiLastName: this.$t('forms.kanji_last_name'),
        kanjiFirstName: this.$t('forms.kanji_first_name'),
        phone: this.$t('forms.phone'),
        email: this.$t('forms.email'),
        addComment: this.$t('forms.add_comment'),
        required: this.$t('forms.required'),
        validPhone: this.$t('forms.valid_phone'),
        validEmail: this.$t('forms.valid_email'),
        comments: this.$t('forms.comments'),
        password: this.$t('forms.password'),
        rePassword: this.$t('forms.re_enter_password'),
        cardName: this.$t('forms.card_name'),
        cardNumber: this.$t('forms.card_number'),
        cardSecurity: this.$t('forms.card_security'),
        bookingID: this.$t('forms.booking_id')
      }
    }
  },
  methods: {
    $_onClickIcon () {
      if (this.$refs.input.type === 'password') {
        this.$refs.input.type = 'text'
      } else {
        this.$refs.input.type = 'password'
      }
    },
    $_changePhoneCode (phoneCode) {
      this.phoneCode = phoneCode
      this.$emit('getPhoneCode', phoneCode)
    }
  }
})
</script>

<!-- Add 'scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.app-input {
  margin-bottom: 22px;
  display: flex;
  flex-direction: column;
  position: relative;

  label {
    font-size: 13px;
    color: $text-color-blue;
    margin-bottom: 3px;
    height: 19px;
    font-weight: bold;
  }

  [class^="icon-"],
  [class*=" icon-"],
  &__slot {
    position: absolute;
    font-size: 22px;
    left: 15px;
    top: 35px;
  }

  input {
    border: 1.5px solid $border-color-gray-2;
    height: 50px;
    padding: 15px 25px;

    & ~ [class^="icon-"],
    [class*=" icon-"] {
      font-size: 27px;
      right: 20px;
      left: auto;
      cursor: pointer;
      color: $text-color-blue;
    }

    & ~ .app-input__required-icon[class^="icon-"],
    & ~ .app-input__required-icon[class*=" icon-"] {
      font-size: 10px;
      top: 59px;
      right: 3px;
      color: $text-color-yellow;
    }
  }

  textarea {
    border: 2px solid $border-color-gray-2;
    border-radius: 3px;
    width: 100%;
    padding: 5px 10px;
  }

  &__phone {
    position: relative;
    z-index: 1;

    input {
      width: 100%;
      padding-left: 70px;
    }

    & ~ .app-input__required-icon[class^="icon-"],
    & ~ .app-input__required-icon[class*=" icon-"] {
      left: auto;
      font-size: 10px;
      top: 59px;
      right: 3px;
      color: $text-color-yellow;
      z-index: 1;
    }
  }
}
</style>
