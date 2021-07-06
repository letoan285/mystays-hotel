<template>
  <section id="cancel-reservation-page" class="cancel-reservation-page">
    <AppHeader />
    <div class="container">
      <AppCancelReservation />
    </div>
  </section>
</template>

<script lang="ts">
import { mapActions } from 'vuex'
import getGtmData from '../plugins/gtm'

export default {
  name: 'CancelReservation',
  mounted () {
    getGtmData({ triggerType: 'Page Load', locale: 'en-US', pageCategory: 'CancelReservationPage' })
  },
  methods: {
    ...mapActions({
      showCancelReservation: 'appAuthen/showCancelReservation'
    })
  },
  head () {
    return {
      title: 'Cancel Reservation',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Mystays Hotel'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.cancel-reservation-page {
  background: $white;
  text-align: center;
  flex: 1;

  .container {
    background: white;
    padding-top: 25px;
    padding-bottom: 20px;
    text-align: center;
    flex: 1;

    @include min-sm {
      padding-top: 75px;
      padding-bottom: 220px;
    }
  }
}
</style>
