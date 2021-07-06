<template>
  <div class="app-swiper">
    <swiper ref="mySwiperSlide" :options="swiperOption">
      <swiper-slide
        v-for="(image, index) in imagesList"
        :key="index"
        @click.native="$_onShowPopup(index)"
        ref="swiper-slide"
      >
        <div ref="imageSlide" class="app-swiper__image">
          <img :data-src="image" class="swiper-lazy" alt="" />
          <div class="swiper-lazy-preloader swiper-lazy-preloader-white" />
        </div>
      </swiper-slide>
      <div
        slot="pagination"
        ref="pagination"
        class="swiper-pagination"
        @click="$_onZoomSlide"
      />
      <div
        slot="button-prev"
        ref="button-prev"
        class="swiper-button-prev"
        v-if="imagesList.length > 1"
      />
      <div
        slot="button-next"
        ref="button-next"
        class="swiper-button-next"
        v-if="imagesList.length > 1"
      />
    </swiper>
  </div>
</template>

<script>
import Vue from "vue";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import { mapActions } from "vuex";
import(/* webpackChunkName: "swiper" */ "swiper/css/swiper.css");

export default Vue.extend({
  name: "AppSwiper",
  components: {
    Swiper,
    SwiperSlide
  },
  props: {
    hotelImageList: {
      type: Array,
      required: true,
      default: () => [
        "https://d1vhtuaxtr1kgn.cloudfront.net/-/media/1121019425344B2ABACCE746944EBA14.jpg?d=20171113T043000"
      ]
    },
    isMobile: {
      type: Boolean
    },
    // eslint-disable-next-line vue/require-default-prop
    currentSlide: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 1,
        loop: true,
        lazy: true,
        pagination: {
          el: ".swiper-pagination",
          type: "fraction",
          modifierClass: this.isMobile ? "swiper-pagination-custom-" : ""
        },
        spaceBetween: 20,
        centeredSlides: false,
        slidesOffsetBefore: 0,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        preventClicks: false,
        preventClicksPropagation: false,
        breakpoints: {
          768: {
            slidesPerView: 2,
            centeredSlides: true,
            slidesOffsetBefore: -50
          },
          2000: {
            slidesPerView: 3,
            centeredSlides: false,
            slidesOffsetBefore: 0
          }
        }
      },
      isMobileMode: this.isMobile,
      mLeft: 0,
      nextButtonMarginLeft: 0,
      pagingRight: 0,
      imagesList: this.hotelImageList,
      isLargeDesktop: false
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiperSlide.$swiper;
    }
  },
  watch: {
    isMobile(isMobile) {
      this.isMobileMode = isMobile;
    },
    currentSlide(ind) {
      this.swiper.slideTo(ind, 0);
    },
    hotelImageList(imagesList) {
      this.imagesList = imagesList;
    }
  },
  mounted() {
    const width = window.innerWidth;
    this.isLargeDesktop = width > 2000;
    window.addEventListener("resize", this.$_onResize);

    if (!this.isMobileMode) {
      this.$_onGetImageWidth(this.isLargeDesktop);
      window.addEventListener("resize", () => {
        this.$_onGetImageWidth(this.isLargeDesktop);
        if (!this.isLargeDesktop) {
          this.swiper?.lazy?.loadInSlide(1);
        }
      });
    }

    if (!this.isMobileMode && !this.isLargeDesktop) {
      this.swiper?.lazy?.loadInSlide(1);
    }
  },
  destroyed() {
    window.removeEventListener("resize", this.$_onGetImageWidth);
  },
  methods: {
    ...mapActions({
      a_zoomSlideFullScreen: "hotelDetail/a_zoomSlideFullScreen"
    }),

    $_onShowPopup() {
      this.$emit("on:showPopup");
    },

    $_onZoomSlide() {
      const swiperTop = this.$refs.mySwiperSlide.$swiper;
      this.$emit("on:showGalleryFullScreen", swiperTop.activeIndex);
      if (this.isMobileMode) {
        this.$scrollBody.disable();
      }
    },

    $_onResize(event) {
      this.isLargeDesktop = event.target.innerWidth > 2000;
      this.$_onGetImageWidth(this.isLargeDesktop);
    },

    $_onGetImageWidth(isLargeDesktop) {
      const buttonWidth = 60;
      const imageWidth =
        this.$refs.imageSlide && this.$refs.imageSlide[0]
          ? this.$refs.imageSlide[0].offsetWidth
          : 0;

      if (imageWidth) {
        this.mLeft = isLargeDesktop
          ? imageWidth - buttonWidth
          : imageWidth / 2 - buttonWidth * 2;
        this.nextButtonMarginLeft = this.mLeft + imageWidth + 100;
        this.pagingRight = this.nextButtonMarginLeft - 165;
      }

      if (
        this.$refs &&
        this.$refs["button-prev"] &&
        this.$refs["button-next"] &&
        this.$refs.pagination
      ) {
        this.$refs["button-prev"].style.left = `${this.mLeft}px`;
        this.$refs["button-next"].style.left = `${this.nextButtonMarginLeft}px`;
        this.$refs.pagination.style.left = `${this.pagingRight}px`;
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.app-swiper {
  overflow: hidden;
  order: 1;
  &__image {
    position: relative;
    padding-top: calc(580 * 100% / 940);
    min-width: 100%;
    img {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
    }
  }

  .swiper-slide {
    text-align: center;
    background: $text-color-blue;
    // max-width: 940px;
    .swiper-lazy-preloader {
      background: $text-color-blue;
    }
  }
  .swiper-pagination,
  .swiper-pagination-fraction,
  .swiper-pagination-custom,
  .swiper-container-horizontal > .swiper-pagination-bullets {
    top: 10px;
    right: 0;
    background: $text-color-blue;
    color: white;
    padding: 6px 10px 7px 46px;
    border-radius: 3px;
    opacity: 0.95;
    width: initial;
    bottom: initial;
    left: initial;
    font-size: 11px;
    @include min-sm {
      // right: 29%;
      width: 120px;
      font-size: 14px;
      padding: 8px 20px 8px 40px;
    }
    &::before {
      content: "\e93a";
      font-family: icomoon;
      position: absolute;
      font-size: 18px;
      left: 12px;
      top: 1px;
      @include min-sm {
        font-size: 20px;
        left: 12px;
        top: 4px;
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
}

.swiper-button-prev,
.swiper-button-next {
  width: 40px;
  height: 40px;
  background: $text-color-blue;
  opacity: 0.95;
  @include min-sm {
    width: 60px;
    height: 60px;
  }
  &::after {
    font-size: 17px;
    color: white;
    @include min-sm {
      font-size: 25px;
    }
  }
  &:hover {
    opacity: 1;
  }
}

.swiper-button-prev {
  left: 0;
}

.swiper-button-next {
  right: 0;
}

.swiper-slide-prev,
.swiper-slide-next {
  opacity: 0.2;

  @include large-desktop {
    opacity: 1;
  }
}

@include large-desktop {
  .swiper-slide-active {
    opacity: 0.4;
  }

  .swiper-slide-next + .swiper-slide {
    opacity: 0.4;
  }
}
</style>
