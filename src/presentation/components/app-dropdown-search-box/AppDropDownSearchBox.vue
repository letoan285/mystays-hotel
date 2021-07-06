<template>
  <div class="app-drop-down-search-box" :class="{ 'dropdow-active': dropdownIsOpen }">
    <transition name="slide">
      <div v-if="dropdownIsOpen" class="app-drop-down-search-box__container">
        <slot name="dropdown__box" />
      </div>
    </transition>
    <transition name="fade">
      <div v-if="dropdownIsOpen" class="app-drop-down-search-box__backdrop" @click="hide" />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'AppDropDownSearchBox',
  props: {
    dropdownIsOpen: {
      type: Boolean
    }
  },
  methods: {
    hide () {
      this.$emit('toggleSearchBox', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.app-drop-down-search-box {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  transition: 0.3s;

  &__container {
    position: relative;
    background: $white;
    color: $text-color-blue;
    z-index: 1000;
  }

  &__backdrop {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 17, 51, 0.6);
    z-index: 10;
  }
}

.dropdow-active {
  z-index: 999999;
  transition: 0.3s;
}

.slide-enter-active {
   -moz-transition-duration: 0.3s;
   -webkit-transition-duration: 0.3s;
   -o-transition-duration: 0.3s;
   transition-duration: 0.3s;
   -moz-transition-timing-function: ease-in;
   -webkit-transition-timing-function: ease-in;
   -o-transition-timing-function: ease-in;
   transition-timing-function: ease-in;
}

.slide-leave-active {
   -moz-transition-duration: 0.3s;
   -webkit-transition-duration: 0.3s;
   -o-transition-duration: 0.3s;
   transition-duration: 0.3s;
   -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
   -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
   -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
   transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}

.slide-enter-to, .slide-leave {
   max-height: 1000px;
   overflow: hidden;
}

.slide-enter, .slide-leave-to {
   overflow: hidden;
   max-height: 0;
}
</style>
