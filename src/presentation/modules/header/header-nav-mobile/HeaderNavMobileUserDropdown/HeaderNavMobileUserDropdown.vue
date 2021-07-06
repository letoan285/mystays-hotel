<template>
  <span
    class="header-dropdown-box position-relative"
    :class="{ 'is-dropdown-open': isOpen }"
    @click="toggleDropdown"
  >
    <slot name="header-nav-mobile-user-dropdown__button" />
    <dropdown-transition>
      <div v-if="isOpen">
        <slot name="header-nav-mobile-user-dropdown__box" />
      </div>
    </dropdown-transition>
  </span>
</template>

<script>
import DropdownTransition from '../../../../components/dropdown-transition/DropdownTransition'

export default {
  name: 'HeaderNavMobileUserDropdown',
  components: {
    DropdownTransition
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
<style scoped lang="scss">
.header-dropdown-box {
  &.is-dropdown-open {
    [class^="icon-Arrow"],
    [class*=" icon-Arrow"] {
      transform: translateY(-50%) rotate(90deg);
    }
  }
}
</style>
