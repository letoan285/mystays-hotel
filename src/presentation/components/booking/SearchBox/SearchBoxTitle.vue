<template>
  <div class="search-box-top">
    <div class="search-box-top__title">
      {{ title }}
    </div>
    <div
      class="search-box-top__container"
      :class="{ active: isShowLocation, error: locationError.msg }"
    >
      <span class="icon-Icon-Search" @click="clearSearchText" />
      <input
        ref="input"
        v-model="searchText"
        class="search-city-input booking"
        type="text"
        :placeholder="placeholder"
        @focus="$_onFocus"
        @input="$_onInput($event)"
      >
      <span v-if="searchText" class="icon-Icon-Close" @click="clearSearchText" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  props: {
    title: {
      type: String,
      required: true,
      default: 'Title is null'
    },
    placeholder: {
      type: String,
      required: true,
      default: 'Placeholder is null'
    }
  },
  data () {
    return {
      searchText: ''
    }
  },
  computed: {
    ...mapState({
      isMobile: state => state.general.data.isMobile,
      locationError: state => state.booking.bookingError.location,
      isShowLocation: state => state.booking.bookingState.location,
      location: state => state.booking.bookingData.location
    })
  },
  watch: {
    location (newValue) {
      this.searchText = newValue
    }
  },
  mounted () {
    this.searchText = this.location
  },
  methods: {
    ...mapActions({
      getLocation: 'booking/getLocation'
    }),
    clearSearchText () {
      this.$refs.input.focus()
      this.searchText = ''
      this.getLocation('')
      this.$emit('on:input', { searchText: this.searchText })
    },
    $_onInput () {
      this.$emit('on:input', { searchText: this.searchText })
    },
    $_onFocus () {
      this.$emit('on:focus')
    }
  }

}
</script>

<style lang="scss" scoped>
.search-box-top {
  position: relative;
  &__title {
    font-size: 13px;
    margin-bottom: 12px;
    font-weight: bold;
    line-height: 16px;
    letter-spacing: 0;
    @include min-md {
      padding: 2px 0;
      line-height: 15px;
      color: $bg-color-blue;
      font-weight: normal;
      text-align: center;
      width: 100%;
      text-align: center;
    }
  }
  &__container {
    width: 100%;
    border: 2px solid $border-color-light-gray;
    background-color: $bg-color-white;
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 15px;
    &::before {
      content: "";
      z-index: 1;
      right: 3px;
      bottom: 3px;
      position: absolute;
      width: 0;
      height: 0;
      border: 5px solid transparent;
      border-top: 5px solid #ffd25d;
      border-right: 5px solid #ffd25d;
      -webkit-transform: rotate(90deg);
      transform: rotate(90deg);
    }
    .icon-Icon-Close {
      background: #7b7b85;
      border-radius: 20px;
      color: #fff;
      padding: 5px;
      font-size: 7px;
      cursor: pointer;
    }
    @include min-md {
      padding: 5px 15px;
      &::before {
        display: none;
      }
      .icon-Icon-Search {
        display: none;
      }
    }
    input {
      height: 46px;
      border: 2px solid #ddd;
      outline: none;
      border: none;
      padding: 0 30px 0 15px;
      width: 100%;
      font-size: 14px;
      line-height: 17px;
      color: #232e48;
      @include min-sm {
        font-weight: bold;
      }
      &:focus {
        outline: none;
      }
      &::placeholder {
        font-size: 14px;
        letter-spacing: 0;
        font-weight: 500;
        line-height: 17px;
        color: #232e48;
        @include min-md {
          font-size: 12px;
          letter-spacing: 0;
          font-weight: normal;
          line-height: 15px;
          opacity: 0.75;
          color: $text-color-gray-6;
        }
      }
    }
  }
  .active {
    border: 2px solid $text-color-yellow;
    &::before {
      display: block;
    }
  }
  .error {
    border: 2px solid red;
  }
}
</style>
