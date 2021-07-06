<template>
  <span v-click-outside="hide" class="header-dropdown-box position-relative" @click="toggleDropdown">
    <slot name="dropdown__button" />
    <transition name="fade">
      <div v-if="isOpen" class="position-absolute dropdown__box">
        <slot name="dropdown__box" />
      </div>
    </transition>
  </span>
</template>

<script>
import ClickOutside from 'vue-click-outside'

export default {
  name: 'HeaderDropdownBox',
  directives: {
    ClickOutside
  },
  data () {
    return {
      isOpen: false
    }
  },
  methods: {
    toggleDropdown () {
      this.isOpen = !this.isOpen
    },
    hide () {
      this.isOpen = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scpoed>
  .header-dropdown-box{
    &.is-dropdown-open{
      [class^="icon-Arrow"], [class*=" icon-Arrow"]{
        transform: translateY(-50%) rotate(90deg);
      }
    }

    .dropdown__box{
      background: $white;
      color: $text-color-blue;
      top: 60px;
      border-bottom: 4px solid $border-color-yellow;
      z-index: 1000;

      &::before{
        content: "";
        width: 20px;
        height: 20px;
        background: $white;
        position: absolute;
        transform: rotate(45deg);
        top: -10px;
        left: 30px;
      }
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
