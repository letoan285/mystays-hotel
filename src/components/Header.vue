<template>
  <div class="header">
    <div class="container">
      <AppHeader />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      stickyHeaderBaseOnWidth: true,
    };
  },
  mounted() {
    window.addEventListener("resize", this.onResize);
    this.onResize();
  },
  destroyed() {
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    onResize() {
      this.stickyHeaderBaseOnWidth = window.innerWidth > 767;
    },
  },
};
</script>
<style lang="scss" scoped>
.header {
  background: $bg-color-blue;
}

.login {
  padding: 200px;
  background-color: #dddddd;
}
.login-form {
  background-color: white;
  padding: 30px;
  border-radius: 5px;
}
</style>
