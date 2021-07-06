<template>
  <div class="hotel-review-location" v-if="isPageLoaded">
    <div class="hotel-review-location__address">
      <div
        v-if="!isHotelDetailLoading"
        class="hotel-review-location__address__name"
      >
        <p>{{ hotelName }}</p>
        <span>{{ address }}</span>
      </div>
      <div v-else class="hotel-review-location__address__loading">
        <b-skeleton animation="fade" width="85%" height="24px" />
        <b-skeleton animation="fade" width="55%" height="13px" />
      </div>
      <div class="hotel-review-location__address__icon">
        <span class="icon-Icon-Map-Pin" />
      </div>
    </div>
    <div v-if="!isBaiduMap" class="hotel-review-location__map">
      <!-- <img
        v-if="!isShowMap"
        v-lazy-load
        :data-src="mapBackgroundImage && mapBackgroundImage.ipadImage"
        alt
        @click="$_showMap" -->
      <!-- > -->
      <div
        v-if="!isShowMap"
        class="gg-map-image"
        :lazy-background="mapBackgroundImage && mapBackgroundImage.desktopImage"
        @click="$_showMap"
      />
      <VueGoogleMap
        v-if="isShowMap"
        class="travel-map"
        :init-map-markers="[hotelPosition]"
        :is-show-zoom="false"
        :is-full-screen="true"
      />
    </div>
    <BaiduMaps
      v-if="isBaiduMap && !isHotelDetailLoading"
      class="baidu-map"
      :markers="[hotelPosition]"
      :init-map-markers="[hotelPosition]"
      :is-show-zoom="false"
      :is-full-screen="true"
    />
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapState } from 'vuex'

export default Vue.extend({
  name: 'LocationBlock',
  data () {
    return {
      isShowMap: false,
      isPageLoaded: false
    }
  },
  computed: {
    ...mapState({
      isHotelDetailLoading: state => state.hotelDetail.isHotelDetailLoading
    }),
    ...mapGetters({
      hotelDetail: 'hotelDetail/hotelDetail',
      mapBackgroundImage: 'hotelDetail/mapBackgroundImage',
      fullLang: 'appHeader/fullLanguage',
      hotelList: 'hotel/allMarkers'
    }),

    hotelName () {
      return this.hotelDetail && this.hotelDetail.name
    },

    address () {
      if (this.hotelDetail) {
        return `${this.hotelDetail.address.full_address}, ${this.hotelDetail.address.country}`
      }
      return ''
    },

    hotelPosition () {
      if (this.hotelDetail) {
        const lat = Number(this.hotelDetail.latitude)
        const lng = Number(this.hotelDetail.longitude)

        return {
          ...this.hotelDetail,
          latitude: lat,
          longitude: lng
        }
      }
      return ''
    },

    isBaiduMap () {
      return this.fullLang === 'zh-CN'
    }
  },
  mounted(){
    this.isPageLoaded = true
  },
  methods: {
    $_showMap () {
      this.isShowMap = true
    }
  }
})
</script>

<style lang="scss" scoped>
.hotel-review-location {
  margin-bottom: 20px;
  @include min-sm {
    margin-bottom: 0;
  }
  &__address {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 20px 20px 18px;
    border: 1px solid $border-color-gray-2;
    border-radius: 3px 3px 0 0;
    @include min-sm {
      padding: 20px 30px 16px 30px;
    }
    &__name {
      p {
        font-size: 14px;
        margin: 0;
        @include min-sm {
          font-size: 16px;
        }
      }
      span {
        font-size: 11px;
        color: $text-color-blue-2;
        @include min-sm {
          font-weight: 700;
        }
      }
    }

    &__loading {
      width: 95%;
    }
    &__icon {
      @include min-sm {
        span {
          font-size: 22px;
        }
      }
    }
  }

  &__map {
    display: none;
    @include min-sm {
      display: block;
      img {
        width: 100%;
        height: 177px;
        cursor: pointer;
      }

      .gg-map-image {
        width: 100%;
        height: 177px;
        background-position: center center;
        cursor: pointer;
      }
    }

    .travel-map {
      height: 177px;
      border-left: 1px solid $border-color-gray-2;
      border-right: 1px solid $border-color-gray-2;
    }
  }

  .baidu-map {
    height: 177px;
  }
}
</style>
