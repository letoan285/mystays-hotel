<template>
  <div ref="lz-load-bgr-img" class="lazy-load">
    <ImageSpinner class="image__spinner" :numberRect="numberRect" />
    <div
      ref="lz-load-bgr"
      class="lazy-load__bgr-img"
      :lazy-background="imgUrl"
    />
  </div>
</template>

<script>
import ImageSpinner from "./ImageSpinner";
export default {
  name: "LazyLoadBgrImage",
  components: {
    ImageSpinner
  },
  props: {
    imgUrl: {
      type: String,
      default: ""
    },
    numberRect: {
      type: Number,
      default: 5
    }
  }
};
</script>

<style lang="scss" scoped>
.lazy-load {
  background: rgba(35, 46, 72, 0.1);
  height: 100%;
  position: relative;
  padding-top: 60%;
  &__bgr-img {
    height: 100%;
    width: 100%;
    background-size: cover;
    display: block;
    background-position: center center;
    position: absolute;
    left: 0;
    top: 0;
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
}
</style>
