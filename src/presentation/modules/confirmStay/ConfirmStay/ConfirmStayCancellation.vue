<template>
  <section class="confirm-stay-cancellation">
    <div class="confirm-stay-cancellation__title">
      <h6>{{ $t("summary.cancellation_and_refund_policy") }}</h6>
    </div>
    <div class="confirm-stay-cancellation__text">
      <div
        v-for="(item, index) in cancellationPolicies"
        :key="index"
        class="confirm-stay-cancellation__text__item"
        v-html="item"
      />
    </div>
  </section>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapActions, mapState } from 'vuex'
import Text from '../../../../shared/dataFake/dummyText'

export default Vue.extend({
  name: 'ConfirmStayCancellation',
  data () {
    return {
      cancelationText: Text.cancelationText
    }
  },
  computed: {
    ...mapState({
      hotelID: state => state.hotel.data.hotelID
    }),
    ...mapGetters({
      reservationData: 'booking/reservationsData',
      fullLang: 'appHeader/fullLanguage',
      cancellationPolicies: 'hotelDetail/cancellationPolicies'
    })
  },
  watch: {
    reservationData (data) {
      if (data.reservation_number) {
        const params = {
          hotelID: this.hotelID,
          queryString: {
            room_plan_codes: data.rooms[0].room_plan_code
          },
          fullLang: this.fullLang
        }
        this.getCancellationPolicies(params)
      }
    }
  },
  methods: {
    ...mapActions({
      getCancellationPolicies: 'hotelDetail/getCancellationPolicies'
    })
  }
})
</script>

<style lang="scss" scoped>
.confirm-stay-cancellation {
  display: none;
  @include min-sm {
    display: block;
  }
  &__title {
    margin-bottom: 10px;
    h6 {
      font-weight: bold;
      font-size: 15px;
    }
  }

  &__text {
    font-size: 14px;

    &__item{
      margin-bottom: 15px;
    }
  }
}
</style>
