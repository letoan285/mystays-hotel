<template>
  <section class="my-booking container">
    <div class="my-booking__title">
      <h3 class="font-weight-bold">My Billing</h3>
    </div>
    <div class="my-booking__content mt-4" v-if="!isLoading">
      <MyBookingItem
        v-for="item in reservationsList"
        :key="item.id"
        :booking-item="item"
      />
    </div>
    <div class="my-booking__loading mt-4" v-if="isLoading">
      <div class="loader" />
    </div>
  </section>
</template>

<script>
import Vue from "vue";
import customer from "../../../data/repository/customer/cloud";
import { mapGetters } from "vuex";

export default Vue.extend({
  name: "MyBooking",
  data() {
    return {
      reservationsList: [],
      error: {},
      isLoading: true
    };
  },
  computed: {
    ...mapGetters({
      fullLang: "appHeader/fullLanguage"
    })
  },
  created() {
    this.getReservations();
  },
  watch: {
    fullLang() {
      this.getReservations();
    }
  },
  methods: {
    async getReservations() {
      this.isLoading = true;
      try {
        let reservations = await customer.getReservationsList(this.fullLang);
        this.isLoading = false;
        this.reservationsList = reservations.data;
      } catch (error) {
        this.isLoading = false;
        this.error = error;
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.my-booking {
  padding: 15px;
  color: #232e48;

  @include min-sm {
    padding: 30px;
    max-height: 80vh;
    overflow: auto;
    @include scrollbar();
  }

  &__loading {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .loader {
      border: 6px solid #f3f3f3; /* Light grey */
      border-top: 6px solid #3498db; /* Blue */
      border-radius: 50%;
      width: 40px;
      height: 40px;
      animation: spin 1s linear infinite;
    }
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
