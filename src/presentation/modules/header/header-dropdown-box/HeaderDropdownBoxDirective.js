/* eslint-disable no-unused-vars */
const clickOutside = {
  bind (el, binding, vNode) {
    if (typeof binding.value !== 'function') {
      const compName = vNode.context.name
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      let warn = `[Vue-click-outside:] provided expression '${binding.expression}' is not a function, but has to be`
      if (compName) { warn += `Found in component '${compName}'` }
    }
    // Define Handler and cache it on the element
    const bubble = binding.modifiers.bubble
    const handler = (e) => {
      if (bubble || (!el.contains(e.target) && el !== e.target)) {
        binding.value(e)
      }
    }
    el.__vueClickOutside__ = handler

    // add Event Listeners
    document.addEventListener('click', handler)
  },
  unbind (el) {
    document.removeEventListener('click', el.__vueClickOutside__)
    el.__vueClickOutside__ = null
  }
}

export default clickOutside
