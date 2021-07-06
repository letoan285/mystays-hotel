<template>
  <div class="loader-container">
    <div class="loader-container__loading" />
    <div class="spinner">
      <div class="rect1" />
      <div class="rect2" />
      <div class="rect3" />
      <div class="rect4" />
      <div class="rect5" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loader',
  props: {
    isOverlay: {
      type: Boolean,
      default: () => true
    }
  }
}
</script>

<style lang="scss" scoped>
.loader-container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1001;
  background: white;
  img {
    width: 120px;

    @include min-sm {
      width: 180px;
    }
  }

  &__loading{
    background-image: url('~assets/images/CustomLogo.png');
    background-size: contain;
    width: 120px;
    height: 40px;
    background-repeat: no-repeat;
  }
}
.spinner {
  margin: 15px auto;
  width: 50px;
  height: 35px;
  text-align: center;
  font-size: 10px;

  @include min-sm{
    height: 40px;
  }
}

.spinner > div {
  background-color: #232e48;
  height: 100%;
  width: 6px;
  display: inline-block;

  -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;
  animation: sk-stretchdelay 1.2s infinite ease-in-out;
}

.spinner .rect2 {
  -webkit-animation-delay: -1.1s;
  animation-delay: -1.1s;
}

.spinner .rect3 {
  -webkit-animation-delay: -1s;
  animation-delay: -1s;
}

.spinner .rect4 {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}

.spinner .rect5 {
  -webkit-animation-delay: -0.8s;
  animation-delay: -0.8s;
}

@-webkit-keyframes sk-stretchdelay {
  0%,
  40%,
  100% {
    -webkit-transform: scaleY(0.4);
  }
  20% {
    -webkit-transform: scaleY(1);
  }
}

@keyframes sk-stretchdelay {
  0%,
  40%,
  100% {
    transform: scaleY(0.4);
    -webkit-transform: scaleY(0.4);
  }
  20% {
    transform: scaleY(1);
    -webkit-transform: scaleY(1);
  }
}
</style>
