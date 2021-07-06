<template>
  <div class="container">
    <h2>User List {{ myName }}</h2>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Users',
  data: () => {
    return {
      myName: 'my name is '
    }
  }
})
</script>

<style>
</style>
