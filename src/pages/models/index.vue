<template>
  <div class="container">
    <!-- <AppContainer /> -->
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapState } from "vuex";

export default Vue.extend({
  name: "HomePage",
  methods: {
    ...mapActions({
      getDeviceInfo: "general/getDeviceInfo"
    })
  },
  created() {
    if (window.innerWidth < 992) {
      this.getDeviceInfo(true);
    } else {
      this.getDeviceInfo(false);
    }
    window.addEventListener("resize", () => {
      if (window.innerWidth < 992) {
        this.getDeviceInfo(true);
      } else {
        this.getDeviceInfo(false);
      }
    });
  },
  computed: {
    ...mapState({
      myUserList: (state: any) => state.users,
      myLocation: (state: any) => state.position,
      title: (state: any) => state.title,
      myProductList: (state: any) => {
        return state.products.data;
      }
    })
  }
});
</script>

<style></style>
