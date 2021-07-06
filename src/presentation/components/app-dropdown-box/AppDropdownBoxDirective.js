const clickOutside = {
  bind (el, binding, vnode) {
    window.event = function (event) {
      if (!(el === event.target || el.contains(event.target))) {
        vnode.context[binding.expression](event)
      }
    }
    document.body.addEventListener('mousedown', window.event)
  },
  unbind () {
    document.body.removeEventListener('mousedown', window.event)
  }
}

export default clickOutside
