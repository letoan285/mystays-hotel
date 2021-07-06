<template>
  <ToggleableSideBox :is-open="isSignupOpen" @toggleBox="$_toggleBox">
    <template v-slot:box-content>
      <AppSignup />
    </template>
  </ToggleableSideBox>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "HeaderNavSignup",
  computed: {
    ...mapGetters({
      isSignupOpen: "appAuthen/isSignupOpen",
      userData: "users/userData",
    }),
  },
  methods: {
    ...mapActions({
      toggleSignup: "appAuthen/toggleSignup",
    }),
    $_toggleBox(isOpen) {
      this.toggleSignup({ isSignupOpen: isOpen });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
