<template>
  <figure ref="lz-load-img" class="lz-load-image">
    <ImageSpinner class="image__spinner" :numberRect="numberRect" />
    <img v-lazy-load :data-src="url" alt="" class="lz-load-image__fadeIn" />
  </figure>
</template>

<script>
import ImageSpinner from "./ImageSpinner";
export default {
  name: "LazyLoadImage",
  components: {
    ImageSpinner
  },
  props: {
    imgUrl: {
      type: String,
      default: ""
    },
    imageWidth: {
      type: Number,
      default: 940
    },
    imageHeight: {
      type: Number,
      default: 580
    },
    numberRect: {
      type: Number,
      default: 5
    }
  },
  data() {
    return {
      url: this.imgUrl
    };
  },
  watch: {
    imgUrl(url) {
      this.url = url;
    }
  },
  mounted() {
    this.$refs["lz-load-img"].style.paddingTop = `${(this.imageHeight /
      this.imageWidth) *
      100}%`;
  }
};
</script>

<style lang="scss" scoped>
.lz-load-image {
  background: rgba(35, 46, 72, 0.1);
  position: relative;
  margin: 0;
  img {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    -webkit-transition: opacity 1s ease-in-out;
    -moz-transition: opacity 1s ease-in-out;
    -o-transition: opacity 1s ease-in-out;
    transition: opacity 1s ease-in-out;
  }

  .isLoaded {
    display: block;
  }

  .isLoading {
    display: none;
  }

  .image__spinner {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  &__fadeIn {
    transition: all 1s ease-in-out;
  }
}
</style>
