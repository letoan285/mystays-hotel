<template>
  <div v-click-outside="hide" class="phone-code-dropdown" :class="{error: isError}">
    <input
      :name="name"
      :value="value"
      :type="type"
      :data-index="dataIndex"
      :placeholder="placeholder"
      @input="input($event.target)"
    >
    <div class="phone-code-dropdown__button" @click="isDropdownOpen = !isDropdownOpen">
      {{ selectedPhoneCode }}
      <span class="icon-Arrow-Small-Down" />
    </div>
    <transition name="fade">
      <div v-show="isDropdownOpen" class="phone-code-dropdown__dropdown">
        <div
          v-for="phoneCode in phoneCodes"
          :key="phoneCode.code"
          ref="dropdown"
          :selected="phoneCode.code === 'JP'"
          class="phone-code-dropdown__dropdown__item"
          @click="(e) => $_selectItem(e, phoneCode.dialCode)"
        >
          {{ phoneCode.name }} ++ ({{ phoneCode.dialCode }})
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
/* eslint-disable vue/require-default-prop */

import Vue from 'vue'
import ClickOutside from 'vue-click-outside'
import PhoneCode from '../../../shared/dataFake/PhoneCodeDropdown'

export default Vue.extend({
  name: 'PhoneCodeDropdown',
  directives: {
    ClickOutside
  },
  props: {
    name: {
      type: String
    },
    value: {
      type: String
    },
    type: {
      type: String
    },
    placeholder: {
      type: String
    },
    dataIndex: {
      type: Number
    },
    isError: {
      type: Boolean
    }
  },
  data () {
    return {
      phoneCodes: PhoneCode,
      selectedPhoneCode: PhoneCode[106].dialCode,
      isDropdownOpen: false
    }
  },
  mounted () {
    this.$emit('changePhoneCode', this.selectedPhoneCode)
  },
  methods: {
    $_selectItem (e, dialCode) {
      for (const item of this.$refs.dropdown) {
        item.classList.remove('active')
        e.target.classList.add('active')
        this.selectedPhoneCode = dialCode
        this.$emit('changePhoneCode', this.selectedPhoneCode)
        this.isDropdownOpen = false
      }
    },
    hide () {
      if (this.isDropdownOpen) {
        this.isDropdownOpen = false
      }
    },
    input (target) {
      this.hide()
      this.$emit('on:input', target)
    }
  }
})
</script>

<style lang="scss" scoped>
.phone-code-dropdown {
  cursor: pointer;
  position: relative;
  input {
    border: 1.5px solid #dddee0;
    width: 100%;
    height: 50px;
    padding: 15px;
    padding-left: 75px;
  }
  &__button {
    display: flex;
    align-items: center;
    position: absolute;
    top: 0;
    left: 10px;
    transform: translateY(50%);
    [class^="icon-"],
    [class*=" icon-"] {
      font-size: 7px;
      font-weight: bold;
      margin-left: 3px;
    }
  }

  &__dropdown {
    width: 285px;
    position: absolute;
    top: 100%;
    left: 0;
    height: 300px;
    overflow-y: scroll;
    @include scrollbar;
    z-index: 10;
    background: $white;
    border: 1px solid $border-color-gray-2;

    &__item {
      padding: 0 0.5rem;

      &.active,
      &:hover {
        background: $bg-color-gray-8;
      }
    }
  }
}

.error {
  input {
    border: 1.5px solid red;
  }
}
</style>
