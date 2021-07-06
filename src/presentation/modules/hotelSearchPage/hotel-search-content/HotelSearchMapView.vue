<template>
  <section class="hotel-search-map-view">
    <div ref="hotelList" class="container">
      <div
        ref="hotelList"
        class="hotel-search-map-view__hotel"
        :class="{ w0: isShowFullMap }"
      >
        <HotelSearchItem
          v-for="hotel in hotelList"
          :key="hotel && hotel.triplaHotelId"
          :hotel-detail="hotel"
        />
      </div>
      <div
        ref="travelMap"
        class="hotel-search-map-view__map"
        :class="{ 'hotel-search-map-view--show-full-map': isShowFullMap }"
        :style="styleMap"
      >
        <div class="map-view">
          <div
            class="hotel-search-map-view__map__show-full"
            @click="$_showFullMap"
          >
            <span
              :class="
                `${
                  isShowFullMap
                    ? 'icon-Arrow-Thin-Right'
                    : 'icon-Arrow-Thin-Left'
                }`
              "
            />
          </div>
          <BaiduMaps
            v-if="isBaibuMap"
            class="baidu-map"
            :markers="mapMarkers"
            :init-map-markers="hotelList"
          />
          <VueGoogleMap
            v-else
            class="hotel-search-map-view__map__travel-map"
            :markers="mapMarkers"
            :init-map-markers="hotelList"
          />
        </div>
      </div>
    </div>
    <div :class="{ 'backdrop-blue': isOpen }" @click="$_closeHotelFilter" />
    <div class="hotel-search-map-view__filter-section">
      <transition name="slide-in">
        <div v-if="isOpen" class="filter-section">
          <HotelFilter />
        </div>
      </transition>
    </div>
  </section>
</template>

<script>
import Vue from "vue";
import { mapState, mapActions, mapGetters } from "vuex";

export default Vue.extend({
  name: "HotelSearchMapView",
  data() {
    return {
      styleMap: {
        width: 47 + "%",
        position: "static",
        bottom: "initial",
        right: 0 + "px"
      },
      isShowFullMap: false,
      isMobile: false,
      isIpad: false,
      mapOffsetTop: 0,
      mapOffsetWidth: 0,
      offsetRight: 0
    };
  },
  computed: {
    ...mapState({
      isOpen: state => state.searchHotel.openFilterSection
    }),
    ...mapGetters({
      hotelList: "hotel/hotelFilter",
      mapMarkers: "hotel/mapMarkers",
      language: "appHeader/fullLanguage"
    }),
    isBaibuMap() {
      return this.language === "zh-CN";
    }
  },
  mounted() {
    const width = window.innerWidth;
    this.isMobile = width < 768;
    this.isIpad = !!(width >= 768 && width < 1024);
    this.mapOffsetTop = this.$refs.hotelList && this.$refs.hotelList.offsetTop;
    this.mapOffsetWidth =
      this.$refs.travelMap && this.$refs.travelMap.offsetWidth;
    this.offsetRight =
      (this.$refs.hotelList && this.$refs.hotelList.offsetLeft) || 15;
    window.addEventListener("resize", this.$_onResize);
    window.addEventListener("scroll", this.$_onScroll);

    if (this.isMobile) {
      this.styleMap.width = "100%";
    } else {
      this.styleMap.width = "47%";
    }
  },
  destroyed() {
    window.removeEventListener("scroll", this.$_onScroll);
    window.removeEventListener("resize", this.$_onResize);
  },
  methods: {
    ...mapActions({
      openFilterSection: "searchHotel/openFilterSection"
    }),

    $_closeHotelFilter() {
      this.openFilterSection(false);
      this.$scrollBody.enable();
    },

    $_showFullMap() {
      window.scroll({
        top: this.mapOffsetTop,
        left: 0
      });

      this.isShowFullMap = !this.isShowFullMap;
      if (this.isShowFullMap && window.pageYOffset < this.mapOffsetTop) {
        this.styleMap.position = "absolute";
      }
    },

    $_onResize(event) {
      this.isMobile = event.target.innerWidth < 768;
      this.isIpad = !!(
        event.target.innerWidth >= 768 && event.target.innerWidth < 1140
      );
      this.mapOffsetWidth = this.$refs.travelMap.offsetWidth;
      this.offsetRight =
        (this.$refs.hotelList && this.$refs.hotelList.offsetLeft) || 15;
    },

    $_onScroll() {
      const hotelListHeight =
        this.$refs.hotelList && this.$refs.hotelList.clientHeight;

      this.offsetRight =
        (this.$refs.hotelList && this.$refs.hotelList.offsetLeft) || 15;

      const pageHeight = document.getElementById("__nuxt").clientHeight;

      if (!this.isMobile) {
        if (
          window.pageYOffset >= this.mapOffsetTop &&
          window.pageYOffset < pageHeight - window.innerHeight - 250
        ) {
          this.styleMap = {
            position: "fixed",
            top: 0 + "px",
            right: this.offsetRight + "px",
            bottom: "initial",
            width: this.mapOffsetWidth + "px"
          };
        } else if (
          window.pageYOffset > pageHeight - window.innerHeight - 300 &&
          hotelListHeight > window.innerHeight
        ) {
          this.styleMap = {
            position: "absolute",
            top: "initial",
            right: this.isIpad ? 15 + "px" : 0 + "px",
            bottom: 30 + "px",
            width: this.mapOffsetWidth + "px"
          };
        } else if (pageHeight <= window.innerHeight) {
          this.styleMap = {
            top: 0 + "px",
            width: 47 + "%",
            position: "static",
            bottom: "initial",
            right: 0 + "px"
          };
        } else {
          this.styleMap = {
            top: 0 + "px",
            width: 47 + "%",
            position: "static",
            bottom: "initial",
            right: 0 + "px"
          };
        }
      } else {
        this.styleMap = {
          top: 0 + "px",
          width: 100 + "%",
          position: "static",
          bottom: "initial",
          right: 0 + "px"
        };
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.hotel-search-map-view {
  .container {
    display: flex;
    justify-content: space-between;
    position: relative;
  }

  &__map {
    width: 100%;
    @include min-sm {
      width: 47%;
    }
    .map-view {
      position: fixed;
      width: 100vw;
      top: 0;
      left: 0;
      height: 100vh;
      @include min-sm {
        width: initial;
        position: relative;
      }
    }
    &__travel-map {
      height: 100vh;
    }

    &__show-full {
      display: none;
      @include min-sm {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 40px;
        background: rgba(255, 255, 255, 0.7);
        height: 100%;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1;
        span {
          font-size: 20px;
        }
      }
    }
  }

  &--show-full-map {
    width: 1140px !important;
    transition: 0.4s;
    left: 0;
    @include min-xl {
      left: initial;
    }
  }

  &__hotel {
    width: 50%;
    display: none;
    @include min-sm {
      display: block;
    }
    .hotel-search-results {
      width: 100%;
      height: calc(100% - 30px);
    }
  }

  .w0 {
    width: 0;
    opacity: 0;
  }

  &__filter-section {
    .filter-section {
      width: 430px;
      height: 100%;
      position: fixed;
      right: 0;
      top: 0;
      z-index: 2000;
      background: white;
      overflow: auto;
      @include scrollbar;
    }
  }
}

.backdrop-blue {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 17, 51, 0.6);
  z-index: 1500;
  cursor: pointer;
}

.baidu-map {
  height: 100vh;
}

.slide-in-enter-active,
.slide-in-leave-active {
  transition: all 0.5s;
  transform: translate3d(0, 0, 0);
}

.slide-in-enter,
.slide-in-leave-to {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
</style>
