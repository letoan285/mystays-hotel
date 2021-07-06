<template>
  <app-dropdown-box
    is-header-dropdown="true"
    :is-open="isOpen"
    @toggleBox="$_toggleSideBox"
  >
    <template v-slot:dropdown__button>
      <div
        v-if="dropdownType === 'language'"
        class="header__dropdown mr-md-3 py-1 px-2 language-switch"
        :class="{ 'has-border': hasBorder }"
      >
        <span :class="'icon-' + dropdownIcon" />
        {{ dropdownText }}
        <span class="icon-Arrow-Small-Down ml-md-2" />
      </div>
      <div
        v-else-if="dropdownType === 'currency'"
        class="header__dropdown mr-md-3 py-1 px-2 language-switch"
        :class="{ 'has-border': hasBorder }"
      >
        <span :class="'icon-' + dropdownIcon" />
        {{ dropdownText }}
        <span class="icon-Arrow-Small-Down ml-md-2" />
      </div>
    </template>
    <template v-slot:dropdown__box>
      <header-dropdown-currency
        v-if="dropdownType === 'currency'"
        @clickItem="$_toggleSideBox"
      />
      <header-dropdown-language
        v-else-if="dropdownType === 'language'"
        @clickItem="$_toggleSideBox"
      />
    </template>
  </app-dropdown-box>
</template>

<script>
import AppDropdownBox from "../../../components/app-dropdown-box/AppDropdownBox.vue";
import HeaderDropdownCurrency from "./HeaderDropdownCurrency/HeaderDropdownCurrency.vue";
import HeaderDropdownLanguage from "./HeaderDropdownLanguage/HeaderDropdownLanguage.vue";

export default {
  name: "HeaderDropdown",
  components: {
    AppDropdownBox,
    HeaderDropdownCurrency,
    HeaderDropdownLanguage
  },
  props: {
    dropdownText: {
      type: String,
      default: ""
    },
    dropdownIcon: {
      type: String,
      default: ""
    },
    dropdownType: {
      type: String,
      default: ""
    },
    hasBorder: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      lang: true,
      isOpen: false
    };
  },
  methods: {
    $_toggleSideBox(isOpen) {
      if (this.isOpen) {
        this.isOpen = false;
        this.$scrollBody.enable();
      }
      this.isOpen = isOpen;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.header {
  &__dropdown {
    font-size: 0.75rem;
    cursor: pointer;

    &.has-border {
      border: 1px solid $white;
      border-radius: 0.2rem;

      @include min-md {
        border: none;
      }
    }

    @include min-md {
      font-size: 1rem;
    }

    span {
      font-size: 0.6rem;

      @include min-md {
        font-size: 0.8rem;
      }
    }

    span[class*=" icon-Arrow"],
    span[class^="icon-Arrow"] {
      font-size: 0.6rem;
      display: none;
      transform: rotate(0);

      @include min-md {
        display: inline-block;
      }
    }
  }
}
</style>
