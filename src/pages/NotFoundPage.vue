<template>
  <div class="not-found-page">
    <HotelNavigationBar />
    <div class="container">
      <NotFound />
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import getGtmData from "../plugins/gtm";
export default Vue.extend({
  name: "NotFoundComponent",
  mounted() {
    getGtmData({
      triggerType: "Page Load",
      locale: "en-US",
      pageCategory: "NotFoundPage",
    });
  },
});
</script>

<style lang="scss" scoped>
.not-found-page {
  flex: 1;
  text-align: center;
  position: relative;
  .container {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -15%);

    @include min-sm{
      transform: translate(-50%, -38%);
    }
  }
}
</style>
