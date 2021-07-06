<template>
  <div>
    <transition-group
      v-if="group"
      enter-active-class="enter-active"
      leave-active-class="leave-active"
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
      @before-leave="beforeLeave"
      @leave="leave"
      @after-leave="afterLeave"
    >
      <slot />
    </transition-group>
    <transition
      v-else
      enter-active-class="enter-active"
      leave-active-class="leave-active"
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
      @before-leave="beforeLeave"
      @leave="leave"
      @after-leave="afterLeave"
    >
      <slot />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'DropdownTransition',
  props: {
    group: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    beforeEnter (element) {
      requestAnimationFrame(() => {
        if (!element.style.height) {
          element.style.height = '0px'
        }

        element.style.display = null
      })
    },
    enter (element) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          element.style.height = `${element.scrollHeight}px`
        })
      })
    },
    afterEnter (element) {
      element.style.height = null
    },
    beforeLeave (element) {
      requestAnimationFrame(() => {
        if (!element.style.height) {
          element.style.height = `${element.offsetHeight}px`
        }
      })
    },
    leave (element) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          element.style.height = '0px'
        })
      })
    },
    afterLeave (element) {
      element.style.height = null
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.enter-active,
.leave-active {
  overflow: hidden;
  transition: height 0.15s linear;
}
</style>
