import Vue from 'vue'

Vue.directive('myColor', {
  inserted: (el) => {
    el.style.color = 'red'
  }
})
