<template>
  <nav class="navbar navbar-expand navbar-dark flex-column">
    <div class="container">
      <div
        class="navbar-nav justify-content-end justify-content-md-end w-100 navbar-top"
      >
        <!-- <AppDropDown
          type-icon="icon"
          :drop-down-data="currencyArray"
          :selected-default="currencyArray[0]"
          @selectFieldItem="changeCurrency"
        /> -->
        <AppDropDown
          type-icon="image"
          :drop-down-data="languageArray"
          :selected-default="languageDefault"
          @selectFieldItem="changeLanguage"
        />
      </div>
    </div>
  </nav>
</template>

<script>
import Vue from "vue";
import { mapGetters } from "vuex";
import AppDropDown from "../../components/app-dropdown/AppDropDown.vue";
import { Languages, currencyArray } from "../../../shared/constants";
export default Vue.extend({
  name: "HeaderNavTop",
  components: {
    AppDropDown
  },
  data() {
    return {
      languageArray: Languages,
      languageDefault: Languages[0],
      currencyArray
    };
  },
  computed: {
    ...mapGetters({
      fullLang: "appHeader/fullLanguage"
    })
  },
  mounted() {
    const currentLang = localStorage.getItem("lang");
    this.languageDefault =
      this.languageArray.filter(item => item.code === currentLang)[0] ||
      this.languageArray[1];
  },
  methods: {
    changeCurrency() {},
    changeLanguage(lang) {
      this.$emit("changeLanguage", { ...lang });
    }
  }
});
</script>

<style lang="scss" scoped>
nav {
  color: $white;
  .navbar-brand {
    margin-bottom: 35px;
    margin-right: 0;

    @include min-md {
      margin-bottom: 0;
      margin-right: 0.5rem;
    }
  }

  .navbar-top.navbar-nav {
    border-bottom: none;
    padding: 8px 15px;
    margin-bottom: 10px;

    @include min-sm {
      margin-bottom: 0;
    }

    @include min-md {
      border-bottom: 2px solid $border-color-blue-3;
      padding: 8px 0;
    }
  }

  &.navbar {
    padding: 0;
    background: #232e48;
  }

  .navbar-nav {
    padding: 0 0 1rem 0;

    @include min-md {
      padding: 1rem 0;
    }
  }

  .navbar-left {
    display: none;

    @include min-md {
      margin-left: 50px;
      display: flex;
    }

    &__link {
      cursor: pointer;
    }
  }

  .navbar-right {
    width: 100%;
    justify-content: space-between;
    @include min-md {
      width: auto;
    }

    &.is-authened-header {
      justify-content: flex-end;
      align-items: center;
    }
  }
}
.overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #232e48;
  opacity: 0.95;
  z-index: 100;
}
.active-overlay {
  display: block;
}
.active-header {
  z-index: 3;
}
</style>
