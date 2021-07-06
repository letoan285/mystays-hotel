<template>
  <section class="my-profile-page">
    <!-- <Aside /> -->
    <AppHeader />
    <div class="container">
      <LazyIntroduction />
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import getGtmData from "../plugins/gtm";
import { pageTitle } from "../shared/constants/pageTitle";

export default Vue.extend({
  name: "MyProfile",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      userData: (state: any) => state.users.data.userData
    })
  },

  watch: {
    userData(newValue) {
      if (!newValue) {
        this.$router.push("/");
      }
    }
  },
  mounted() {
    getGtmData({
      triggerType: "Page Load",
      locale: "en-US",
      pageCategory: "MyProfilePage"
    });
  },
  head(): any {
    return {
      title: pageTitle.myProfilePage,
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Mystays Hotel"
        }
      ]
    };
  }
});
</script>

<style lang="scss" scoped>
.my-profile-page {
  min-height: 100vh;
  .container {
    padding: 1px 0 40px 0;

    @include min-sm {
      padding: 40px 0;
    }
  }
}
</style>
