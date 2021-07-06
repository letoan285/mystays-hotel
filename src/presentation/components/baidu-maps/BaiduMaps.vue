<template>
  <baidu-map
    class="bm-view"
    :center="center"
    :zoom="zoom"
    :continuous-zoom="false"
    :max-zoom="maxZoom"
    :min-zoom="minZoom"
    @ready="map_handler"
    @mouseover="onMouseover"
    @moveend="onMoveend"
    @zoomend="onZoomend"
    @click="onClickMap"
  >
    <bml-marker-cluster v-if="!isMobile" :max-zoom="15">
      <bm-marker
        v-for="(point, index) in allMarkers"
        :key="index"
        :position="{ lat: point.latitude, lng: point.longitude }"
        :icon="icon"
        @click="$_getMarker(point)"
        @mouseover="$_showInfoWindow(point)"
      />
    </bml-marker-cluster>

    <div v-if="isMobile">
      <bm-marker
        v-for="(point, index) in allMarkers"
        :key="index"
        :position="{ lat: point.latitude, lng: point.longitude }"
        :icon="icon"
        @click="$_getMarker(point)"
        @mouseover="$_showInfoWindow(point)"
      />
    </div>

    <bm-info-window
      :position="{ lat: marker.latitude, lng: marker.longitude }"
      :show="show"
      @close="infoWindowClose"
      @open="infoWindowOpen"
    >
      <div class="hotel-infowindow">
        <div class="hotel-infowindow__image">
          <img :src="marker.featuredImage" alt />
        </div>
        <div class="hotel-infowindow__title">
          Hotel My Stays
        </div>
        <div class="hotel-infowindow__name">
          {{ marker.name }}
        </div>
        <div class="hotel-infowindow__city">
          {{ marker.areas && marker.areas[0] }}
        </div>
        <div class="hotel-infowindow__price">
          <h5>{{ marker.price | currency("YEN" , true) }}</h5>
          <button class="m-btn m-btn__yellow" @click="onViewHotel">
            View
          </button>
        </div>
      </div>
    </bm-info-window>
    <bm-navigation v-if="isShowZoom" anchor="BMAP_ANCHOR_TOP_RIGHT" />
  </baidu-map>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
import constants from "@/api/constants";
export default {
  props: {
    markers: {
      type: Array,
      default: () => []
    },
    initMapMarkers: {
      type: Array,
      default: () => []
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
      show: false,
      listMarkers: this.initMapMarkers,
      icon: {
        url:
          "https://www.mystays.com/Assets/Mystays/images/ms-zoomout-icon.svg",
        size: { width: 30, height: 30 }
      },
      marker: {},
      zoom: 10,
      center: {
        lat: this.markers[0].latitude,
        lng: this.markers[0].longitude
      },
      BMap: null,
      map: null,
      maxZoom: 15,
      minZoom: 2,
      isMouseoverMap: false,
      isMarkersChange: false
    };
  },
  computed: {
    ...mapGetters({
      markerPosition: "searchHotel/hotelDetail",
      allMarkers: "hotel/allMarkers",
      mapMarkersList: "hotel/mapMarkers",
      fullLang: "appHeader/fullLanguage",
      hotelDetail: "hotelDetail/hotelDetail"
    }),

    ...mapState({
      viewType: state => state.searchHotel.viewType,
      isMobile: state => state.general.data.isMobile,
      bookingData: state => state.booking.bookingData
    })
  },
  watch: {
    mapMarkersList(markerList) {
      this.isMarkersChange = true;
      if (this.hotelId) {
        const hotel = markerList.filter(
          marker => marker.triplaHotelId == this.hotelId
        )[0];
        this.center = {
          lat: Number(hotel.latitude),
          lng: Number(hotel.longitude)
        };
        this.show = true;
        this.marker = hotel;
      }
    },
    markers(listMarkers) {
      this.maxZoom = 15;
      this.listMarkers = listMarkers;
      this.isMouseoverMap = false;
      this.$nuxt.$emit("on:IdleGoogleMap", false);
      if (this.BMap) {
        const resultPoints = listMarkers.map(p => {
          return new this.BMap.Point(p.longitude, p.latitude);
        });
        this.fitBounds(resultPoints);
      }
    },
    markerPosition: {
      handler(newMarker) {
        this.marker = newMarker;
        if (this.marker) {
          this.show = true;
        }
      },
      deep: true
    },

    viewType(type) {
      if (
        type === "Map View" &&
        this.map &&
        this.BMap &&
        this.isMarkersChange
      ) {
        this.maxZoom = 15;
        const resultPoints = this.listMarkers.map(p => {
          return new this.BMap.Point(p.longitude, p.latitude);
        });

        setTimeout(() => {
          this.fitBounds(resultPoints);
        }, 100);
      }
    }
  },
  methods: {
    ...mapActions({
      saveHotelList: "hotel/saveHotelList"
    }),
    infoWindowClose() {
      this.show = false;
    },

    map_handler({ BMap, map }) {
      this.BMap = BMap;
      this.map = map;
      this.maxZoom = 15;

      const resultPoints = this.listMarkers.map(p => {
        return new BMap.Point(p.longitude, p.latitude);
      });
      map.enableScrollWheelZoom(true);
      this.fitBounds(resultPoints);
    },

    onMouseover() {
      this.isMouseoverMap = true;
    },

    onMoveend() {
      this.maxZoom = 18;
      this.onFilterHotelByMoveMap();
    },

    onZoomend() {
      this.onFilterHotelByMoveMap();
    },

    onClickMap() {
      if (this.isFullScreen) {
        // this.$router.push('/see-full-map')
        window.open(`${constants.domain}/full-map/${this.hotelDetail.id}`);
      }
    },

    onFilterHotelByMoveMap() {
      if (this.map) {
        const markersList = [];
        for (
          let markerIndex = 0;
          markerIndex < this.allMarkers.length;
          markerIndex++
        ) {
          if (
            this.map
              .getBounds()
              .containsPoint(
                new this.BMap.Point(
                  this.allMarkers[markerIndex].longitude,
                  this.allMarkers[markerIndex].latitude
                )
              )
          ) {
            markersList.push(this.allMarkers[markerIndex]);
          }
        }

        if (this.isMouseoverMap) {
          this.$nuxt.$emit("on:IdleGoogleMap", true);
          if (this.viewType === "Map View") {
            this.saveHotelList(markersList);
          }
        }
      }
    },

    infoWindowOpen() {
      this.show = true;
    },

    $_getMarker(marker) {
      if (this.isMobile) {
        this.onClickMap();
      }
      this.marker = marker;
      this.show = true;
      this.map.setZoom(15);
      const point = new this.BMap.Point(marker.longitude, marker.latitude);
      this.map.setCenter(point);
    },

    $_showInfoWindow(marker) {
      this.marker = marker;
      this.show = true;
    },

    fitBounds(bPoints) {
      // eslint-disable-next-line no-eval
      const { zoom, center } = this.map.getViewport(eval(bPoints));
      this.map.centerAndZoom(center, zoom);
    },

    onViewHotel() {
      const searchData = {
        checkIndate: this.bookingData.checkIn,
        checkOutdate: this.bookingData.checkOut,
        language: this.fullLang,
        promoCode: this.bookingData.promoCode,
        rooms: JSON.stringify(this.bookingData.roomList)
      };
      if (this.marker.triplaHotelId) {
        this.$router.push({
          path: `/hotel/${this.marker.triplaHotelId}`,
          query: searchData
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.bm-view {
  width: 100%;
  height: 100%;
}

.hotel-infowindow {
  width: 240px;
  &__image {
    padding: 10px 0;
    img {
      width: 240px;
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
