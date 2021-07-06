<template>
  <div class="not-found">
    <h2>Oops !!!</h2>
    <h2>We can’t seem to find the page you’re looking for.</h2>
    <p>Either something went wrong or the page doesn’t exist anymore.</p>
  </div>
</template>

<script lang="ts">
export default {
  name: "NotFound",
};
</script>

<style lang="scss" scoped>
.not-found {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}
</style>
