<template>
  <toggleable-side-box :is-open="isLoginOpen" @toggleBox="$_toggleBox">
    <template v-slot:box-content>
      <AppLogin />
    </template>
  </toggleable-side-box>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";

export default Vue.extend({
  name: "HeaderNavLogin",
  computed: {
    ...mapGetters({
      isLoginOpen: "appAuthen/isLoginOpen",
    }),
  },
  methods: {
    ...mapActions({
      toggleLogin: "appAuthen/toggleLogin",
    }),
    $_toggleBox(isOpen: any) {
      this.toggleLogin({ isLoginOpen: isOpen });
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
p {
  display: none;
  margin: 0;

  @include min-sm {
    display: inline;
  }

  &.header__nav-button-text-sp {
    display: inline-block;
    word-break: break-all;
    max-width: 120px;

    @include min-sm {
      display: none;
    }
  }
}
</style>
