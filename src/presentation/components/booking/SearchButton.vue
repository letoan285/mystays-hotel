<template>
  <div class="search-button" @click="closeAll">
    <div class="search-button__title">
      {{ title_text }}
    </div>
    <div class="search-button__search">
      <button class="button m-btn m-btn__yellow" @click="searchHotels()">
        {{ search_button_text }}
      </button>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { mapActions, mapState, mapGetters } from "vuex";
import Utilities from "../../../shared/helper/utilities";

export default Vue.extend({
  name: "SearchButton",
  components: {},
  computed: {
    ...mapState({
      bookingData: state => state.booking.bookingData,
      bookingError: state => state.booking.bookingError,
      searchType: state => state.booking.bookingData.searchType
    }),
    ...mapGetters({
      fullLang: "appHeader/fullLanguage"
    }),
    title_text() {
      return this.$t("booking.find_a_hotel");
    },
    search_button_text() {
      return this.$t("headers.search");
    }
  },

  methods: {
    ...mapActions({
      closeAll: "booking/closeAll",
      getError: "booking/getError",
      searchRoom: "booking/searchRoom",
      handlegetHotelPlans: "hotel/getHotelPlans",
      handleSearchResult: "hotel/saveRecentSearch",
      setBooking: "booking/setInitialBooking"
    }),
    searchHotels() {
      const lang = localStorage.getItem("lang");
      const locale = Utilities.getLocale(lang);
      const searchData = {
        location: this.bookingData.location,
        checkIndate: this.bookingData.checkIn,
        checkOutdate: this.bookingData.checkOut,
        language: this.fullLang,
        coupon_code: this.bookingData.promoCode,
        rooms: JSON.stringify(this.bookingData.roomList)
      };

      const hotelData = {
        checkIndate: this.bookingData.checkIn,
        checkOutdate: this.bookingData.checkOut,
        language: this.fullLang,
        coupon_code: this.bookingData.promoCode,
        rooms: JSON.stringify(this.bookingData.roomList)
      };
      if (!locale.prefix || locale.prefix === "") {
        delete searchData.language;
      }
      if (
        this.bookingData.location == null ||
        this.bookingData.location === ""
      ) {
        this.getError({ key: "location", msg: "null feild" });
      }
      if (!this.bookingError.location.msg) {
        this.setBooking(this.bookingData);
        let next_redirect_route = "";
        if (this.searchType === "hotel") {
          const hotelID = this.bookingData.hotelID;
          next_redirect_route = `/hotel/${hotelID}`;
        } else {
          next_redirect_route = this.$pageRoute.hotelsList;
        }

        this.$router.push({
          path: `${next_redirect_route}`,
          query:
            this.$route.path === this.$pageRoute.hotelsList ? searchData : hotelData
        });
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.search-button {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  @include min-md {
    width: auto;
  }
  &__title {
    color: $text-color-blue;
    font-size: 13px;
    margin-bottom: 12px;
    text-align: center;
    display: none;
    @include min-md {
      display: block;
    }
  }
  &__search {
    margin-top: 20px;
    width: 100%;
    @include min-md {
      margin-top: 0;
    }
    .button {
      padding: 12px;
      width: 100%;
      max-height: 59px;
      @include min-md {
        padding: 0 20px;
        max-width: 100%;
        height: 59px;
      }
    }
  }
}
</style>
