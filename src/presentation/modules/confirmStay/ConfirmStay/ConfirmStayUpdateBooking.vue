<template>
  <section class="confirm-stay-update-booking">
    <div class="confirm-stay-update-booking__guest">
      <CancelBooking />
    </div>
    <div
      v-if="reservationsSettings && reservationsSettings.updatable"
      class="confirm-stay-update-booking__guest"
    >
      <UpdateBooking />
    </div>
    <div class="confirm-stay-update-booking__guest">
      <UpdateGuest />
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  name: 'ConfirmStayUpdateBooking',
  data () {
    return {}
  },
  computed: {
    ...mapState({
      reservationsSettings: (state: any) => state.booking.reservationsSettings
    })
  }
})
</script>

<style lang="scss" scoped>
.confirm-stay-update-booking {
  padding: 20px;
  border: 1px solid $border-color-gray-2;
  margin-bottom: 20px;
}
</style>
