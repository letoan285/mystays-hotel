<template>
  <div
    class="app-dropdown-box d-flex position-relative"
    :class="{
      'is-dropdown-open': dropdownIsOpen,
      'is-header-dropdown': isHeaderDropdown
    }"
  >
    <div @click="dropdownIsOpen = true">
      <slot name="dropdown__button" @click="dropdownIsOpen = true" />
    </div>
    <dropdown-transition>
      <div v-if="dropdownIsOpen" class="position-absolute dropdown__box">
        <slot name="dropdown__box" />
      </div>
    </dropdown-transition>
    <transition name="fade">
      <div
        v-if="dropdownIsOpen"
        class="app-dropdown-box__backdrop"
        @click="hide"
      />
    </transition>
  </div>
</template>

<script>
import DropdownTransition from "../dropdown-transition/DropdownTransition.vue";

export default {
  name: "AppDropdownBox",
  components: {
    DropdownTransition
  },
  props: {
    isHeaderDropdown: {
      type: String,
      default: ""
    },
    isOpen: {
      type: Boolean
    },
    isShowBackdrop: {
      type: Boolean
    }
  },
  computed: {
    dropdownIsOpen: {
      get() {
        return this.isOpen;
      },
      set(isOpen) {
        this.$emit("toggleBox", isOpen);
      }
    }
  },
  updated() {
    if (this.dropdownIsOpen) {
      this.$scrollBody.disable();
    }
  },
  methods: {
    hide() {
      this.dropdownIsOpen = false;
      if (this.dropdownIsOpen) {
        this.dropdownIsOpen = false;
        this.$scrollBody.enable();
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.app-dropdown-box {
  &.is-header-dropdown {
    .dropdown__box {
      top: 37px;
      left: 0;
      transform: translateX(0);

      @include min-sm {
        left: 50%;
        transform: translateX(-50%);
      }

      &::after {
        top: 0;
        left: 25%;
        transform: rotate(45deg) translateX(-50%);

        @include min-sm {
          left: 50%;
          transform: rotate(45deg) translateX(-50%);
        }
      }
    }
  }

  &__backdrop {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 17, 51, 0.6);
    z-index: 100;
  }

  .dropdown__box {
    background: $white;
    color: $text-color-blue;
    top: 52px;
    border-bottom: 4px solid $border-color-yellow;
    z-index: 1000;
    left: 5px;

    &::after {
      content: "";
      width: 15px;
      height: 15px;
      background: $white;
      position: absolute;
      transform: rotate(45deg);
      top: -7px;
      left: 70px;
      z-index: -1;
    }
  }
}
</style>
