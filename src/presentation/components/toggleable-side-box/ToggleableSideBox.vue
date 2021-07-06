<template>
  <div>
    <transition v-if="!isPopup" name="slide-in">
      <div
        v-if="isOpen"
        class="toggleable-side-box"
        :class="{ 'is-fixed-top-close': isFixed }"
      >
        <div class="toggleable-side-box__close 1" @click="$_closeNav">
          <slot name="box-close" />
          <span class="icon-Icon-Close" />
        </div>
        <slot name="box-content" />
      </div>
    </transition>

    <div
      v-else
      v-show="isOpen"
      class="toggleable-side-box is-pop-up"
      :class="{ 'is-fixed-top-close': isFixed, 'is-fixed': isMobile }"
    >
      <div class="toggleable-side-box__close" @click="$_closeNav">
        <slot name="box-close" />
        <span class="icon-Icon-Close" />
      </div>
      <slot name="box-content" />
    </div>

    <transition name="fade">
      <div
        v-if="isOpen"
        class="toggleable-side-box__backdrop"
        @click="$_closeNav"
      />
    </transition>
  </div>
</template>

<script>
import Vue from "vue";
import { mapState } from "vuex";
export default Vue.extend({
  name: "ToggleableSideBox",
  props: {
    isOpen: {
      type: Boolean
    },
    isFixed: {
      type: Boolean
    },
    isPopup: {
      type: Boolean
    }
  },
  computed: {
    ...mapState({
      isMobile: state => state.general.data.isMobile
    })
  },
  methods: {
    $_closeNav() {
      this.$emit("toggleBox", false);
      this.scrollBody(false);
    },

    scrollBody(isOpen) {
      if (isOpen) {
        this.$scrollBody.disable();
      } else {
        this.$scrollBody.enable();
      }
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.toggleable-side-box {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  z-index: 2000;
  height: 100%;
  overflow-y: auto;
  transition: transform 0.5s ease;
  @include scrollbar;

  &.is-pop-up {
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
    width: 100%;
    height: 100%;
    background-color: $white;
    padding: 0;
    overflow: hidden;

    @include min-md {
      width: fit-content;
      padding: 15px;
      height: auto;
      min-height: auto;
    }

    .toggleable-side-box__close {
      z-index: 10;
      top: 0;
      right: 0;
      color: $white;
      padding: 10px;
      width: 50px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: $bg-color-blue;
      opacity: 0.8;
    }
  }

  &.is-fixed {
    left: 0;
    bottom: 0;
    top: 0;
    right: 0;
    transform: none;
  }

  &.is-fixed-top-close {
    .toggleable-side-box__close {
      position: fixed;
      width: 100%;
      top: 0;
      right: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
      min-height: 70px;
      border-bottom: 1px solid $border-color-gray-2;
      background: $white;
      z-index: 1;

      @include min-xs {
        width: 430px;
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
    z-index: 1500;
    cursor: pointer;
  }

  @include min-xs {
    width: 430px;
  }

  &__close {
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
    color: $text-color-blue;
  }
}

.slide-in-enter-active,
.slide-in-leave-active {
  transition: all 0.5s;
  transform: translate3d(0, 0, 0);
}

.slide-in-enter,
.slide-in-leave-to {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.slide-to-enter-enter-active,
.slide-to-enter-leave-active {
  transition: all 0.5s;
  top: 50%;
}

.slide-to-enter-enter,
.slide-to-enter-leave-to {
  top: 0;
}
</style>
