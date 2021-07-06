<template>
  <div class="signin-with-cards d-flex justify-content-between mb-4">
    <routerLink
      v-for="signinWith in signinWiths"
      :key="signinWith.signinWithText"
      :to="signinWith.signinWithHref"
      tag="div"
      class="d-flex flex-column signin-with-cards__card justify-content-center align-items-center"
    >
      <img :src="require('@/assets/images/icons/' + signinWith.signinWithIcon)" class="mb-1" alt="">
      {{ signinWith.signinWithText }}
    </routerLink>
  </div>
</template>

<script>

export default {
  name: 'SigninWithCards',
  props: {
    signinWiths: {
      type: Array,
      required: true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.signin-with-cards {
  &__card {
    border: 2px solid $border-color-gray-2;
    font-size: 11px;
    color: $text-color-blue;
    width: 100px;
    height: 65px;
    cursor: pointer;
  }
}
</style>
