<template>
  <div class="hotel-search-input mb-3">
    <SearchBoxTitle
      :title="getTextString.where_in_japan"
      :placeholder="getTextString.search_hotels_destinations"
      @on:focus="focus"
    />
  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions } from 'vuex'

export default Vue.extend({
  name: 'HotelSearchInput',
  props: {},
  computed: {
    getTextString () {
      return {
        where_in_japan: this.$t('booking.where_in_japan'),
        search_hotels_destinations: this.$t(
          'booking.search_hotels_destinations'
        )
      }
    }
  },
  methods: {
    ...mapActions({
      openHeaderSearchBox: 'searchHotel/openHeaderSearchBox',
      closeHeaderSearchBox: 'searchHotel/closeHeaderSearchBox',
      toggleHeaderSearchBox: 'appAuthen/toggleHeaderSearchBox'
    }),
    focus () {
      this.toggleHeaderSearchBox(true)
    }
  }
})
</script>

<style lang="scss" scoped>
.hotel-search-input {
  margin-top: 24px;
  padding: 0 15px;
  @include min-sm {
    display: none;
  }
  label {
    font-size: 13px;
    font-weight: bold;
    margin-bottom: 5px;
  }

  &__search {
    position: relative;
    margin-bottom: 20px;
    span {
      position: absolute;
      top: 16px;
      left: 15px;
      font-size: 18px;
    }
    input {
      width: 100%;
      height: 51.5px;
      padding-left: 47px;
      border: 1.5px solid $border-color-gray-2;
      font-size: 14px;
      outline: none;
    }
  }

  &__text {
    text-align: center;
    p {
      color: $text-color-blue-2;
      margin-bottom: 20px;
      font-size: 12px;
      font-weight: bold;
    }
  }
}
</style>
