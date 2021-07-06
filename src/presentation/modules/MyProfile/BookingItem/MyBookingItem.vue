<template>
  <div class="booking-item">
    <div class="booking-item__facility-name mb-3">
      <h5 class="font-weight-bold">
        {{ bookingData.hotel && bookingData.hotel.name }}
      </h5>
    </div>
    <div class="booking-item__checkin-out mb-3 pl-1">
      <h6>{{ bookingTime }}</h6>
    </div>
    <div class="booking-item__rooms pb-4">
      <div
        class="mb-4"
        v-for="item in bookingData.rooms"
        :key="item.id"
        @click="onRouteConfirmBooking"
      >
        <RoomItem :roomItem="item" :status="bookingItem.status" />
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "BookingItem",
  props: {
    bookingItem: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      bookingData: this.bookingItem
    };
  },
  watch: {
    bookingItem(bookingItem) {
      this.bookingData = bookingItem;
    }
  },
  computed: {
    bookingTime() {
      const checkin = moment(this.bookingData?.checkin_date)
        .format("MMM YYYY")
        .toString();
      const checkout = moment(this.bookingData?.checkout_date)
        .format("MMM YYYY")
        .toString();

      return `${checkin} - ${checkout}`;
    }
  },

  methods: {
    onRouteConfirmBooking() {
      const query = {
        email: this.bookingData.email,
        hotel_id: this.bookingData?.hotel?.id
      };
      this.$router.push({
        path: `${this.$pageRoute.comfirmBooking}/${this.bookingData.reservation_number}`,
        query
      });
    }
  }
};
</script>

<style></style>
