<template>
  <div class="d-flex flex-column header-nav-mobile-footer px-4 pb-4">
    <img
      :src="require('@/assets/images/Logo-Reverse.svg')"
      class="w-25"
      alt=""
    />
    <p class="mb-2">
      © 2018 MyStays Hotel Management Co., Ltd.
    </p>
    <div class="d-flex">
      <NuxtLink :to="''" class="header-nav-mobile-footer__link mr-3">
        {{ $t("headers.visit_website") }}
      </NuxtLink>
      <NuxtLink :to="''" class="header-nav-mobile-footer__link mr-3">
        {{ $t("headers.private_policy") }}
      </NuxtLink>
      <NuxtLink :to="''" class="header-nav-mobile-footer__link mr-3">
        {{ $t("headers.sitemap") }}
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderNavMobileFooter",
  props: {},
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.header-nav-mobile-footer {
  p {
    font-size: 12px;
    color: $text-color-gray;
  }

  a {
    font-size: 12px;
    color: $text-color-blue-2;
    font-weight: bold;
  }
}
</style>
