import IdleVue from 'idle-vue'
import Vue from 'vue'

const eventsHub = new Vue()

Vue.use(IdleVue, {
  eventEmitter: eventsHub,
  idleTime: 600000, // 10 minutes
  startAtIdle: false
})
