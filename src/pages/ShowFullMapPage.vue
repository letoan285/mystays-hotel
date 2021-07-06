<template>
  <div class="show-full-map" v-if="isPageLoaded">
    <VueGoogleMap
      v-if="!isBaiduMap"
      class="show-full-map__map"
      :markers="[hotelPosition]"
      :init-map-markers="[hotelPosition]"
      :hotel-id="hotelId"
    />

    <BaiduMaps
      v-if="isBaiduMap"
      class="show-full-map__map"
      :markers="[hotelPosition]"
      :init-map-markers="[hotelPosition]"
      :hotel-id="hotelId"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import getGtmData from "../plugins/gtm";

export default {
  name: "ShowFullMap",
  data() {
    return {
      hotelPosition: {
        latitude: 0,
        longitude: 0
      },
      isPageLoaded: false,
      hotelId: 0
    };
  },
  computed: {
    ...mapGetters({
      hotelDetail: "hotelDetail/hotelDetail",
      hotelList: "hotel/allMarkers",
      fullLang: "appHeader/fullLanguage"
    }),

    isBaiduMap() {
      return this.fullLang == "zh-CN";
    }
  },
  mounted() {
    this.isPageLoaded = true;
    this.hotelId = this.$route.params.hotelId;
    this.hotelPosition = {
      latitude: this.hotelDetail.latitude,
      longitude: this.hotelDetail.longitude
    };
    getGtmData({
      triggerType: "Page Load",
      locale: "en-US",
      pageCategory: "ShowFullMapPage"
    });
  }
};
</script>

<style scoped lang="scss">
.show-full-map {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100000;
  width: 100%;
  height: 100vh;
  background: white;
  &__map {
    position: absolute;
    width: 100%;
    height: 100%;
  }
}
</style>
