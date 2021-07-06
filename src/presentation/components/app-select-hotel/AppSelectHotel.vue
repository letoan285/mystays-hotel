<template>
  <div
    v-click-outside="hide"
    class="app-select-hotel"
    :class="{ 'has-error': validations.$error }"
  >
    <label for="hotel-id">{{ getLang.selectHotel }}</label>
    <input
      id="hotel-id"
      ref="input"
      v-model="currentHotel"
      :placeholder="placeholderText"
      :class="{ 'is-dropdown-open': isDropdownOpen }"
      autocomplete="off"
      type="text"
      :readonly="!isDropdownOpen"
      @click="openDropdown"
      @focus="openDropdown"
      @input="searchHotel"
    >
    <span class="icon-Icon-Required app-select-hotel__required-icon" />
    <span
      v-if="validations.$dirty && !validations.required"
      class="app-select-hotel__validation"
    >{{ getLang.required }}</span>
    <div v-if="isDropdownOpen" class="app-select-hotel__dropdown">
      <div v-if="hotelListAfterSearch.length > 0 || currentHotel.length > 0">
        <div
          v-for="hotel in hotelListAfterSearch"
          :key="hotel.name"
          class="app-select-hotel__dropdown__item"
          @click="selectHotel(hotel)"
        >
          {{ hotel.name }}
        </div>
      </div>
      <div v-else-if="data.length">
        <div
          v-for="hotel in data"
          :key="hotel.name"
          class="app-select-hotel__dropdown__item"
          @click="selectHotel(hotel)"
        >
          {{ hotel.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable vue/require-default-prop */

import { mapGetters, mapActions } from 'vuex'
import ClickOutside from 'vue-click-outside'

export default {
  name: 'AppSelectHotel',
  components: {},
  directives: {
    ClickOutside
  },
  props: {
    validations: {
      type: Object
    },
    placeholderText: String,
    data: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      hotelList: [],
      currentHotel: '',
      isFocused: false,
      currentHotelId: '',
      currentHotelList: [],
      isDropdownOpen: false,
      hotelListAfterSearch: []
    }
  },
  computed: {
    ...mapGetters({
      hotelsGetterList: 'hotel/hotelsGetterList'
    }),
    isNotValidated () {
      return !this.currentHotelId
    },
    getLang () {
      return {
        selectHotel: this.$t('cancelreservation.select_hotel'),
        required: this.$t('forms.required')
      }
    }
  },
  mounted () {
    this.hotelList = this.hotelsGetterList
  },
  methods: {
    openDropdown () {
      this.isDropdownOpen = true
      this.isFocused = true
      this.currentHotel = ''
    },
    hide () {
      if (this.isDropdownOpen) {
        this.isDropdownOpen = false
      }
    },
    selectHotel (hotel) {
      this.currentHotel = hotel.name
      this.currentHotelId = hotel.triplaHotelId
      this.$emit('on:input', this.currentHotel)
      this.$emit('changeHotelId', this.currentHotelId)
      this.hide()
    },
    searchHotel () {
      const keyword = this.currentHotel
      const hotelFilter = this.data.filter((city) => {
        return city.nameInAllLanguage
          .toLowerCase()
          .includes(keyword.toLowerCase())
      })
      this.hotelListAfterSearch = hotelFilter
    }
  }
}
</script>

<!-- Add 'scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.app-select-hotel {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  position: relative;
  width: 100%;
  label {
    font-size: 13px;
    color: $text-color-blue;
    margin-bottom: 3px;
    height: 19px;
    font-weight: bold;
  }

  input {
    border: 1.5px solid #dddee0;
    height: 50px;
    padding: 15px 25px;
    background: $white;
    cursor: pointer;

    &.is-dropdown-open {
      cursor: auto;
    }
  }

  &__required-icon {
    position: absolute;
    font-size: 10px;
    top: 59px;
    right: 3px;
    color: $text-color-yellow;
  }

  &__dropdown {
    width: 100%;
    position: absolute;
    top: 72px;
    height: 300px;
    overflow-y: scroll;
    @include scrollbar;
    z-index: 10;
    background: $white;
    border: 1px solid $border-color-gray-2;
    border-top: none;
    cursor: pointer;

    &__item {
      padding: 10px;

      &.active,
      &:hover {
        background: $bg-color-gray-8;
      }
    }
  }
}
</style>
