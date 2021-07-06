<template>
  <ToggleableSideBox
    :is-open="isGalleryOpen"
    :is-popup="true"
    @toggleBox="$_toggleSideBox"
  >
    <template v-slot:box-content>
      <swiper ref="mySwiper" :options="sideSwiperOptions">
        <swiper-slide v-for="(roomSliderImage, index) in gallery" :key="index">
          <div>
            <img
              :data-src="roomSliderImage.picture.wordpress.url"
              class="swiper-lazy"
              alt
            />
            <div class="swiper-lazy-preloader swiper-lazy-preloader-white" />
          </div>
        </swiper-slide>
        <div
          slot="pagination"
          class="swiper-pagination"
          @click="$_onZoomSlide"
        />
        <div
          slot="button-prev"
          class="swiper-button-prev"
          v-if="gallery.length > 1"
        />
        <div
          slot="button-next"
          class="swiper-button-next"
          v-if="gallery.length > 1"
        />
        <div
          slot="pagination"
          class="swiper-image-count"
          @click="$_onZoomSlide"
        />
      </swiper>
      <div
        v-if="roomInfo && roomInfo.roomLeft < 10"
        class="rooms-and-plans__gallery__tooltip"
      >
        <span>{{ getLang.only }} 4 {{ getLang.leftAt }}</span>
        <span>{{ roomInfo && roomInfo.rate | currency("YEN") }}</span>
      </div>
      <div v-else class="rooms-and-plans__gallery__tooltip">
        <span>{{ roomInfo && roomInfo.rate | currency("YEN") }}</span>
      </div>
      <button class="button m-btn m-btn__yellow" @click="$_onSelecteRoom">
        {{ getLang.reserve }}
        <br />
        <span
          >{{ getLang.priceFrom }}
          {{ roomInfo && roomInfo.rate | currency("YEN") }}~</span
        >
      </button>
    </template>
  </ToggleableSideBox>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import ToggleableSideBox from "../../../../../components/toggleable-side-box/ToggleableSideBox.vue";
import { mapActions } from "vuex";

export default {
  name: "RoomsAndPlansGallery",
  components: {
    Swiper,
    SwiperSlide,
    ToggleableSideBox
  },
  props: {
    isOpen: {
      type: Boolean
    },
    gallery: {
      type: Array,
      default: () => []
    },
    roomInfo: {
      type: Object,
      default: () => {}
    },
    currentSlide: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      isGalleryOpen: this.isOpen
    };
  },
  computed: {
    sideSwiperOptions() {
      return {
        speed: 500,
        // loop: true,
        mode: "horizontal",
        centeredSlides: true,
        slidesPerView: "auto",
        calculateHeight: true,
        resizeReInit: true,
        initialSlide: 0,
        loopedSlides: 1,
        lazy: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        pagination: {
          el: ".swiper-pagination",
          type: "fraction"
        }
      };
    },

    swiper() {
      return this.$refs.mySwiper.$swiper;
    },

    getLang() {
      return {
        only: this.$t("hoteldetail.only"),
        leftAt: this.$t("hoteldetail.left_at"),
        reserve: this.$t("hoteldetail.reserve"),
        priceFrom: this.$t("hoteldetail.price_from")
      };
    }
  },
  watch: {
    isOpen(isOpen) {
      this.isGalleryOpen = isOpen;
    },
    currentSlide(currentSlide) {
      this.swiper.slideTo(currentSlide, 0);
    }
  },
  methods: {
    ...mapActions({
      saveRoomInfo: "hotelDetail/a_saveRoomInfo"
    }),
    $_toggleSideBox(isOpen) {
      this.$emit("toggleSideBox", isOpen);
    },

    $_onSelecteRoom() {
      if (this.roomInfo.subContent) {
        this.saveRoomInfo({
          room: this.roomInfo,
          plan: this.roomInfo.subContent.filter(
            room => this.roomInfo.rate === room.rate
          )[0]
        });
      } else {
        this.$emit("onSelectRoom", this.roomInfo);
      }

      this.isGalleryOpen = false;
    },

    $_onZoomSlide() {
      const { activeIndex } = this.swiper;
      this.$emit("on:showGalleryFullScreen", activeIndex);
    }
  }
};
</script>

<style lang="scss" scoped>
.toggleable-side-box {
  .swiper-container {
    display: block;
    z-index: 2;

    @include min-md {
      z-index: 1;
      width: 800px;
    }
  }
}

.rooms-and-plans__gallery__tooltip {
  position: absolute;
  width: 90%;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  bottom: 72px;
  padding: 7px 0;
  background: $bg-color-blue;
  color: $white;
  opacity: 0.9;
  border-radius: 2px;

  span {
    font-size: 10px;
  }

  span:last-child {
    font-size: 14px;
    font-weight: bold;
  }

  @include min-xs {
    display: none;
  }

  &::before {
    content: "";
    width: 0;
    height: 0;
    border-width: 10px 9px;
    border-style: solid;
    margin-left: -9px;
    border-color: transparent transparent $border-color-blue transparent;
    left: 50%;
    position: absolute;
    transform: rotate(180deg);
    bottom: -15px;
  }
}

.swiper-image-count {
  display: flex;
  align-items: center;
  position: absolute;
  z-index: 2;
  background: $bg-color-blue;
  color: $white;
  border-radius: 3px;
  left: 16px;
  bottom: 17px;
  padding: 6px 10px 7px 46px;
  border-radius: 3px;
  opacity: 0.95;
  font-size: 11px;

  @include min-md {
    background: transparent;
    top: auto;
    font-size: 16px;
    right: 130px;
    left: auto;
    top: 400px;
    bottom: auto;
  }

  [class^="icon-"],
  [class*=" icon-"] {
    font-size: 15px;
    margin-right: 13px;
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);

    @include min-md {
      display: none;
    }
  }
}

.swiper-pagination {
  text-align: right;
}

.swiper-pagination-fraction {
  padding-right: 10px;
  color: white;
  font-size: 15px;
  bottom: 25px;
}

.swiper-pagination,
.swiper-pagination-fraction,
.swiper-pagination-custom,
.swiper-container-horizontal > .swiper-pagination-bullets {
  top: initial;
  right: initial;
  background: $text-color-blue;
  color: white;
  padding: 6px 10px 7px 46px;
  border-radius: 3px;
  opacity: 0.95;
  width: initial;
  bottom: 17px;
  left: 16px;
  font-size: 11px;
  &::before {
    font-family: icomoon;
    position: absolute;
    content: "\e935";
    font-size: 15px;
    top: 4px;
    left: 15px;
  }
  @include min-sm {
    top: initial;
    right: 120px;
    bottom: 12px;
    left: initial;
    font-size: 15px;
    padding: 8px 20px 8px 50px;
    background: none;
    &::before {
      display: none;
    }
  }
}

.swiper-pagination-custom-fraction {
  right: initial;
  top: initial;
  left: 16px;
  bottom: 17px;
  &::before {
    content: "\e935";
    font-size: 15px;
    top: 4px;
  }
}

.swiper-container {
  .swiper-lazy-preloader {
    // background: $text-color-blue;
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;

    @include min-sm {
      position: static;
    }
  }

  @include min-sm {
    display: none;
  }

  .swiper-slide {
    position: relative;
    padding-top: calc(2 * 100% / 3);
    background: $text-color-blue;

    @include min-xs {
      padding-top: 100vh;
    }

    @include min-sm {
      height: 450px;
      padding-top: 0;
    }
  }

  .swiper-button-prev,
  .swiper-button-next {
    width: 40px;
    height: 40px;
    background: $bg-color-blue;
    color: $white;
    outline: none;

    @include min-md {
      display: flex;
      width: 50px;
      height: 50px;
      top: 422px;
    }

    &::after {
      font-size: 17px;
    }
  }

  .swiper-button-next {
    right: 0;
  }

  .swiper-button-prev {
    right: auto;
    left: 0;
    @include min-md {
      right: 50px;
      left: auto;
    }
  }

  & ~ button {
    padding: 10px 50px;
    position: absolute;
    left: 50%;
    bottom: 12px;
    z-index: 2;
    width: 90%;
    transform: translateX(-50%);
    font-size: 16px;
    height: 50px;

    @include min-xs {
      bottom: 40px;
      width: auto;
      margin: 0;
      font-size: 13px;
      height: auto;
    }

    span {
      display: none;
      font-weight: 500;

      @include min-xs {
        display: block;
      }
    }
  }
}
</style>
