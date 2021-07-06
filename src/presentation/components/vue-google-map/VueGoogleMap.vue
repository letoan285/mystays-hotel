<template>
  <div class="app-google-map">
    <GmapMap
      ref="gmap"
      :center="center"
      :zoom="zoom"
      class="google-map"
      :options="ggMapOptions"
      @click="onClickMap"
      @mouseover="onMouseOver"
      @idle="onIdle"
    >
      <GmapCluster
        v-if="zoom < 10"
        :zoom-on-click="true"
        :max-zoom="15"
        :ignore-hidden="true"
        :enable-retina-icons="true"
      >
        <GmapMarker
          v-for="(m, index) in allMarkers"
          :key="index"
          :position="{ lat: m.latitude, lng: m.longitude }"
          :icon="{ url: require('../../../assets/images/ms-zoomout-icon.svg') }"
          @click="onClickInfoWindow(m, index)"
          @mouseover="onShowInfoWindow(m, index)"
        />
      </GmapCluster>

      <div v-if="zoom >= 10">
        <GmapMarker
          v-for="(m, index) in allMarkers"
          :key="index"
          :position="{ lat: m.latitude, lng: m.longitude }"
          :icon="{ url: require('../../../assets/images/ms-zoomout-icon.svg') }"
          @click="onClickInfoWindow(m, index)"
          @mouseover="onShowInfoWindow(m, index)"
        />
      </div>

      <GmapInfoWindow
        :options="infoOptions"
        :position="infoWindowPos"
        :opened="infoWinOpen"
        @closeclick="infoWinOpen = false"
      >
        <div class="hotel-info">
          <div class="hotel-info__image">
            <img :src="hotelInfo.featuredImage" alt="" />
          </div>
          <div class="hotel-info__title">
            Hotel My Stays
          </div>
          <div class="hotel-info__name">
            {{ hotelInfo.name }}
          </div>
          <div class="hotel-info__city">
            {{ hotelInfo.prefecture }}
          </div>
          <div class="hotel-info__price">
            <h5>
              {{ hotelInfo.price | currency("YEN", true) }}
            </h5>
            <button class="m-btn m-btn__yellow" @click="onViewHotel">
              View
            </button>
          </div>
        </div>
      </GmapInfoWindow>
    </GmapMap>
  </div>
</template>

<script>
import Vue from "vue";
import GmapCluster from "vue2-google-maps/dist/components/cluster";
import { mapGetters, mapActions, mapState } from "vuex";
import constants from "@/api/constants";
Vue.component("GmapCluster", GmapCluster);

export default {
  name: "VueGoogleMap",
  components: {
    GmapCluster
  },
  props: {
    markers: {
      type: Array,
      default: () => []
    },
    initMapMarkers: {
      type: Array
    },

    isShowZoom: {
      type: Boolean,
      default: () => true
    },

    isFullScreen: {
      type: Boolean,
      default: () => false
    },

    hotelId: {
      type: String,
      default: () => ""
    }
  },
  data() {
    return {
      center: {
        lat: this.markers[0] && this.markers[0].latitude,
        lng: this.markers[0] && this.markers[0].longitude
      },
      map: null,
      infoContent: "",
      infoWindowPos: {
        lat: 0,
        lng: 0
      },
      zoom: 10,
      infoWinOpen: false,
      currentMidx: null,
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      },
      markersFromAPI: this.initMapMarkers,
      hotelInfo: {},
      isFilterMap: false,
      ggMapOptions: {
        scrollwheel: true,
        maxZoom: 15,
        mapTypeControl: false,
        zoomControl: this.isShowZoom,
        streetViewControl: this.isShowZoom,
        fullscreenControl: true
      },
      isMarkersChange: false,
      isGoogleMapLoading: false,
      isGoogleMapLoading: false
    };
  },
  computed: {
    ...mapGetters({
      markerPosition: "searchHotel/hotelDetail",
      mapMarkersList: "hotel/mapMarkers",
      allMarkers: "hotel/allMarkers",
      fullLang: "appHeader/fullLanguage",
      hotelDetail: "hotelDetail/hotelDetail"
    }),

    ...mapState({
      viewType: state => state.searchHotel.viewType,
      bookingData: state => state.booking.bookingData
    })
  },
  watch: {
    mapMarkersList(markerList) {
      this.isMarkersChange = true;

      if (this.hotelId) {
        const hotel = markerList.filter(
          marker => marker && marker.triplaHotelId == this.hotelId
        )[0];
        this.infoWindowPos = {
          lat: Number(hotel.latitude),
          lng: Number(hotel.longitude)
        };
        this.center = this.infoWindowPos;
        this.infoWinOpen = true;
        this.hotelInfo = hotel;
      }
    },

    markers(marker) {
      this.markersFromAPI = marker;
      this.isFilterMap = false;
      this.$nuxt.$emit("on:IdleGoogleMap", false);
      this.ggMapOptions.maxZoom = 15;
      this.$refs.gmap.$mapPromise.then(map => {
        const bounds = new google.maps.LatLngBounds();
        for (const m of this.markersFromAPI) {
          bounds.extend({ lat: m.latitude, lng: m.longitude });
        }
        map.fitBounds(bounds);
      });
    },
    markerPosition: {
      handler(newMarker) {
        this.hotelInfo = newMarker;
        this.infoWindowPos = {
          lat: newMarker.latitude,
          lng: newMarker.longitude
        };
        this.infoWinOpen = true;
      }
    },

    viewType(type) {
      if (type === "Map View" && this.isMarkersChange && this.map) {
        this.ggMapOptions.maxZoom = 15;
        // eslint-disable-next-line no-undef
        const bounds = new google.maps.LatLngBounds();
        for (const m of this.markersFromAPI) {
          bounds.extend({ lat: m.latitude, lng: m.longitude });
        }
        this.map.fitBounds(bounds);
        this.isMarkersChange = false;
      }
    },

    isGoogleMapLoading(isLoading) {
      this.$nuxt.$emit("onLoadingGoogleMap", isLoading);
    }
  },
  created() {
    this.isGoogleMapLoading = true;
  },
  mounted() {
    this.initMarkers();
  },
  methods: {
    ...mapActions({
      saveHotelList: "hotel/saveHotelList"
    }),
    onClickInfoWindow(marker) {
      this.hotelInfo = marker;
      this.infoWindowPos = { lat: marker.latitude, lng: marker.longitude };
      this.infoWinOpen = true;
      this.center = { lat: marker.latitude, lng: marker.longitude };
      this.$refs.gmap.$mapPromise.then(map => {
        map.setZoom(15);
        map.setCenter(this.center);
      });
    },

    onShowInfoWindow(marker) {
      this.hotelInfo = marker;
      this.infoWindowPos = { lat: marker.latitude, lng: marker.longitude };
      this.infoWinOpen = true;
    },

    onViewHotel() {
      const searchData = {
        checkIndate: this.bookingData.checkIn,
        checkOutdate: this.bookingData.checkOut,
        language: this.fullLang,
        coupon_code: this.bookingData.promoCode,
        rooms: JSON.stringify(this.bookingData.roomList)
      };
      if (this.hotelInfo && this.hotelInfo.triplaHotelId) {
        this.$router.push({
          path: `/hotel/${this.hotelInfo && this.hotelInfo.triplaHotelId}`,
          query: searchData
        });
      }
    },

    onClickMap() {
      this.infoWinOpen = false;
      if (this.isFullScreen) {
        window.open(`${constants.domain}/full-map/${this.hotelDetail.id}`);
      }
    },

    initMarkers() {
      this.$refs.gmap.$mapPromise.then(map => {
        this.isGoogleMapLoading = false;
        this.map = map;
        map.setZoom(15);
        const bounds = new google.maps.LatLngBounds();
        for (const m of this.markersFromAPI) {
          bounds.extend({ lat: m.latitude, lng: m.longitude });
        }
        map.fitBounds(bounds);
      });
    },

    onMouseOver() {
      this.isFilterMap = true;
    },

    onIdle() {
      const markersList = [];
      this.zoom = this.map.getZoom();
      this.ggMapOptions.maxZoom = 18;
      for (
        let markerIndex = 0;
        markerIndex < this.allMarkers.length;
        markerIndex++
      ) {
        if (
          this.map.getBounds().contains({
            lat: this.allMarkers[markerIndex].latitude,
            lng: this.allMarkers[markerIndex].longitude
          })
        ) {
          markersList.push(this.allMarkers[markerIndex]);
        }
      }
      if (this.isFilterMap) {
        this.$nuxt.$emit("on:IdleGoogleMap", true);
        if (this.viewType === "Map View") {
          this.saveHotelList(markersList);
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.google-map {
  width: 100%;
  height: 100%;
  outline: none;

  .gm-style .gm-style-iw-c {
    padding-left: 11px !important;
  }
}

.hotel-info {
  width: 180px;
  padding-right: 5px;
  &__image {
    padding: 10px 0;
    img {
      width: 100%;
    }
  }
  &__title {
    font-weight: bold;
    margin-bottom: 10px;
    font-size: 14px;
  }
  &__name {
    margin-bottom: 10px;
    font-size: 13px;
    font-weight: 500;
  }
  &__city {
    margin-bottom: 10px;
  }
  &__price {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    h5 {
      font-size: 14px;
      font-weight: bold;
      margin-bottom: 0;
    }
    button {
      width: 45%;
      padding: 5px;
      font-size: 14px;
    }
  }
}
</style>
