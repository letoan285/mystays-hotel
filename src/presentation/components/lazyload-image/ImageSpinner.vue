<template>
  <div class="image-spinner">
    <img :src="require('@/assets/images/CustomLogo.png')" alt="" />
    <div class="spinner">
      <div
        :class="`rect${index + 1}`"
        v-for="(item, index) in numberRect"
        :key="index"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "ImageSpiner",
  props: {
    numberRect: {
      type: Number,
      default: 5
    }
  }
};
</script>

<style lang="scss" scoped>
.image-spinner {
  display: inline-block;
  position: absolute;
  width: 40%;
  height: 50px;

  img {
    width: 100%;
  }

  &__circle {
    position: absolute;
    border: 4px solid rgb(96, 208, 112);
    opacity: 1;
    border-radius: 50%;
    animation: image-spinner 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }

  &__inner-circle {
    animation-delay: -0.5s;
  }
}

.spinner {
  margin: 10px auto;
  text-align: center;
  font-size: 10px;
  height: 25px;
}

.spinner > div {
  background-color: #232e48;
  opacity: 0.8;
  height: 100%;
  width: 4px;
  display: inline-block;
  margin: 0 2px;

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

@keyframes image-spinner {
  0% {
    top: 28px;
    left: 28px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: -1px;
    left: -1px;
    width: 58px;
    height: 58px;
    opacity: 0;
  }
}
</style>
