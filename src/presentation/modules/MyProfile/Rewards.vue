<template>
  <section class="rewards container">
    <h3 class="font-weight-bold">Rewards</h3>
  </section>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Rewards",
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {}
});
</script>

<style lang="scss" scoped>
.rewards {
  padding: 15px;
  color: #232e48;

  @include min-sm {
    padding: 30px;
  }
}
</style>
