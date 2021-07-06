<template>
  <div id="map" class="hotel-detail-find-us">
    <div class="container">
      <div class="hotel-detail-find-us__title">
        <h3>{{ getLanguage.findUs }}</h3>
        <span @click="$_linkToGoogleMapWeb">{{
          getLanguage.getDirections
        }}</span>
      </div>
      <div class="hotel-detail-find-us__content">
        <div class="hotel-detail-find-us__content__map" v-if="isPageLoaded">
          <div class="content-map">
            <div
              v-if="!isLoadingMap && !isBaiduMap"
              class="googlemap-image"
              :lazy-background="mapBackgroundDesktop"
              @click="$_onLoadingMap"
            />
            <div v-if="isLoadingMap && !isBaiduMap">
              <VueGoogleMap
                v-if="!isBaiduMap"
                class="travel-map"
                :markers="[hotelPosition]"
                :init-map-markers="[hotelPosition]"
                :is-show-zoom="false"
                :is-full-screen="true"
              />
            </div>

            <BaiduMaps
              v-if="isBaiduMap && !isRoomLoading"
              class="travel-map"
              :markers="[hotelPosition]"
              :init-map-markers="[hotelPosition]"
              :is-show-zoom="false"
              :is-full-screen="true"
            />
          </div>
          <div class="content-text" v-html="hotelDetailV2.location"></div>
        </div>
        <div class="hotel-detail-find-us__content__overview">
          <HotelDetailOverviewSection :overview-data="findUsOverviewData" />
          <div class="get-directions" @click="$_linkToGoogleMapWeb">
            <span class="icon-Icon-Map" />
            <button class="m-btn m-btn__white">
              {{ getLanguage.getDirections }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable vue/no-side-effects-in-computed-properties */

import Vue from "vue";
import { mapGetters, mapState } from "vuex";

export default Vue.extend({
  name: "HotelDetailFindUs",
  data() {
    return {
      isLoadingMap: false,
      isMobile: false,
      mapBackgroundMobile: "",
      mapBackgroundDesktop: "",
      isPageLoaded: false
    };
  },
  computed: {
    ...mapState({
      isRoomLoading: state => state.hotelDetail.isRoomLoading
    }),
    ...mapGetters({
      findUsOverviewData: "hotelDetail/findUsOverview",
      hotelDetail: "hotelDetail/hotelDetail",
      language: "appHeader/language",
      fullLang: "appHeader/fullLanguage",
      hotelList: "hotel/allMarkers",
      hotelDetailV2: "hotelDetail/hotelDetailV2"
    }),
    getLanguage() {
      return {
        findUs: this.$t("hoteldetail.find_us"),
        getDirections: this.$t("hoteldetail.get_directions")
      };
    },

    locationText() {
      return '<div class="heading">Access from nearby stations</div>\n<ul>\n    <li>4 minutes\' walk from exit 5a of Akasaka Station on the Tokyo Metro Chiyoda Line.</li>\n    <li>7 minutes\' walk from exit 12 of Tameike-Sanno Station on the Tokyo Metro Ginza Line and Nanboku Line.</li>\n</ul>\n<div class="heading">Access from major transit terminals</div>\n<ul>\n    <li>15 minutes by train from Shinjuku Station.</li>\n    <li>12 minutes by train from Tokyo Station.</li>\n    <li>45 minutes by train from Haneda Airport.</li>\n    <li>85 minutes by train from Narita Airport.</li>\n</ul>\n<div class="heading">Parking Facility Information</div>\n<ul>\n    <li>Fee 3,000 JPY/Per night (Parking spaces are available by telephone reservation only)</li>\n    <li>Please do not park any vehicles at the entrance to hotel from roadway but directly park them at car park</li>\n    <li> If you have any questions or concerns, please inquire directly with hotel staff.</li>\n</ul>';
    },

    hotelPosition() {
      const lat = Number(this.hotelDetail && this.hotelDetail.latitude);
      const lng = Number(this.hotelDetail && this.hotelDetail.longitude);

      return {
        ...this.hotelDetail,
        latitude: lat,
        longitude: lng
      };
    },

    isBaiduMap() {
      return this.fullLang === "zh-CN";
    }
  },
  watch: {
    hotelDetail(hotelDetail) {
      const width = window.innerWidth;
      const size = `${width - 40}x135`;
      const lat = hotelDetail && hotelDetail.latitude;
      const lng = hotelDetail && hotelDetail.longitude;
      const lang = this.language;
      this.mapBackgroundMobile = this.$_getMapImage(lat, lng, size, lang);
      this.mapBackgroundDesktop = this.$_getMapImage(lat, lng, "638x265", lang);
    },
    language(lang) {
      const width = window.innerWidth;
      const size = `${width - 40}x135`;
      const lat = this.hotelDetail && this.hotelDetail.latitude;
      const lng = this.hotelDetail && this.hotelDetail.longitude;
      this.mapBackgroundMobile = this.$_getMapImage(lat, lng, size, lang);
      this.mapBackgroundDesktop = this.$_getMapImage(lat, lng, "638x265", lang);
      this.isLoadingMap = false;
    }
  },
  mounted() {
    const width = window.innerWidth;
    this.isMobile = width < 768;
    window.addEventListener("resize", this.$_onResize);
    this.isPageLoaded = true;
  },

  destroyed() {
    window.removeEventListener("resize", this.$_onResize);
  },
  methods: {
    $_onLoadingMap() {
      this.isLoadingMap = true;
    },

    $_linkToGoogleMapWeb() {
      let link = "";
      if (this.fullLang === "zh-CN") {
        link = `https://map.baidu.com/?latlng=${this.hotelDetail.latitude},${this.hotelDetail.longitude}`;
      } else {
        link = `https://www.google.com/maps?saddr=Current+Location&daddr=${this.hotelDetail.latitude},${this.hotelDetail.longitude}`;
      }
      window.open(link);
    },

    $_onResize(event) {
      this.isMobile = event.target.innerWidth < 768;
      const size = `${event.target.innerWidth - 40}x135`;
      const lat = this.hotelDetail && this.hotelDetail.latitude;
      const lng = this.hotelDetail && this.hotelDetail.longitude;
      const lang = this.language;
      this.mapBackgroundMobile = this.$_getMapImage(lat, lng, size, lang);
      this.mapBackgroundDesktop = this.$_getMapImage(lat, lng, "638x265", lang);
    },

    $_getMapImage(lat, lng, size, lang) {
      return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=15&scale=1&size=${size}&maptype=roadmap&key=AIzaSyD9G3yU6CBFBMhuClWTKYsxZIDk5D44Szs&format=png&visual_refresh=true&markers=icon:https://www.mystays.com/Assets/Mystays/images/ms-zoomout-icon.png|shadow:true|${lat},${lng}&language=${lang}&markers=icon:https://www.mystays.com/Assets/Mystays/images/location-map-hover.png|shadow:true|43.05978,141.347616&markers=icon:https://www.mystays.com/Assets/Mystays/images/location-map-hover.png|shadow:true|43.062577,141.353647&markers=icon:https://www.mystays.com/Assets/Mystays/images/location-map-hover.png|shadow:true`;
    }
  }
});
</script>

<style lang="scss" scoped>
.hotel-detail-find-us {
  padding: 30px 0 40px 0;
  border-bottom: 1px solid #d1d1d1;
  .container {
    padding: 0 20px;
  }

  &__title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    @include min-sm {
      margin-bottom: 37px;
    }
    h3 {
      font-size: 18px;
      color: $text-color-blue;
      margin-bottom: 0;
      @include min-sm {
        font-size: 30px;
      }
    }
    span {
      font-size: 11px;
      color: $text-color-blue-2;
      font-weight: bold;
      @include min-sm {
        display: none;
      }
    }
  }

  &__content {
    @include min-sm {
      display: flex;
      justify-content: space-between;
    }
    &__map {
      margin-bottom: 20px;
      @include min-sm {
        width: 58%;
      }
      .content-map {
        cursor: pointer;
        .googlemap-image {
          width: 100%;
          height: 100%;
          background-position: center center;
          position: relative;
          overflow: hidden;
          height: 135px;

          @include min-sm {
            margin-bottom: 35px;
            height: 265px;
          }
        }

        .travel-map {
          width: 100%;
          height: 135px;
          @include min-sm {
            height: 265px;
            margin-bottom: 35px;
          }
        }
      }

      .content-text {
        display: none;
        @include min-sm {
          display: block;
          font-size: 14px;
          line-height: 29px;
        }
      }
    }

    &__overview {
      @include min-sm {
        width: 32%;
      }

      .get-directions {
        display: none;
        cursor: pointer;
        @include min-sm {
          display: block;
          position: relative;
          margin-top: 38px;
          span {
            margin-left: 15px;
            margin-right: 48px;
            position: absolute;
            left: 15px;
            top: 15px;
          }
          button {
            width: 100%;
            font-size: 12px;
            color: $text-color-blue-2;
            text-transform: uppercase;
            font-weight: 500;
            padding: 13px 16px 13px 13px;
            border: 1px solid #d1d1d1;
            border-radius: 3px;
            &:hover {
              color: white;
            }
          }
        }
        &:hover {
          span {
            color: white;
          }
        }
      }
    }
  }
}

/deep/ .heading {
  font-weight: bold;
  font-size: 16px;
}

/deep/ ul {
  padding: 10px 0;
}
</style>
