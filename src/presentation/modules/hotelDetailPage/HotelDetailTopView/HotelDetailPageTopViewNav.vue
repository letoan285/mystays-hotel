<template>
  <AppSticky
    :sticky-top="isMobile ? backButtonHeight : headerHeight"
    :z-index="10"
  >
    <div ref="navbar" :class="`hotel-detail-top-view-nav`">
      <ul class="navbar-list">
        <li
          v-for="(nav, idx) in navbarsList"
          :id="nav.id + 'tab'"
          :key="nav.id"
          :class="{ active: currentTab === idx }"
          @click="$_onClickItem(nav.id, idx)"
        >
          {{ nav.name }}
        </li>
      </ul>
    </div>
  </AppSticky>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "HotelDetailPageTopViewNav",
  props: {
    // eslint-disable-next-line vue/require-default-prop
    navbarItem: {
      type: Array
    },
    isMobile: {
      type: Boolean
    }
  },
  data() {
    return {
      currentTab: 0,
      isSticky: false,
      offsetTop: 0,
      navbarHeight: 0,
      headerHeight: 0,
      backButtonHeight: 0,
      navbarsList: this.navbarItem
    };
  },
  computed: {
    bonusHeight() {
      let bonus = 0;
      if (!this.isMobile) {
        bonus = this.headerHeight + this.navbarHeight;
      } else {
        bonus = this.backButtonHeight + this.navbarHeight;
      }

      return Math.ceil(bonus);
    }
  },
  watch: {
    navbarItem(navbarItem) {
      this.navbarsList = navbarItem;
    }
  },
  mounted() {
    window.addEventListener("resize", this.$_onResize);
    window.addEventListener("scroll", this.$_onScroll);
    this.offsetTop = this.$refs.navbar && this.$refs.navbar.offsetTop;
    this.getHeight();
  },
  destroyed() {
    window.removeEventListener("scroll", this.$_onScroll);
    window.removeEventListener("resize", this.$_onResize);
  },
  methods: {
    $_onClickItem(navID) {
      const el =
        document.getElementById(navID) &&
        document.getElementById(navID).offsetTop;
      window.scrollTo({
        top: el - this.bonusHeight,
        left: 0,
        behavior: "smooth"
      });
    },

    getHeight() {
      this.navbarHeight = this.$refs && this.$refs.navbar.offsetHeight;

      this.headerHeight =
        document.querySelector(".hotel-navigation-bar") &&
        document.querySelector(".hotel-navigation-bar").getBoundingClientRect()
          .height;

      this.backButtonHeight =
        document.querySelector(".back-page") &&
        document.querySelector(".back-page").getBoundingClientRect().height;
    },

    $_onResize() {
      this.getHeight();
    },

    $_getOffseTop(navID) {
      const offsetTop =
        document.getElementById(navID) &&
        document.getElementById(navID).offsetTop;
      const offsetHeight =
        document.getElementById(navID) &&
        document.getElementById(navID).offsetHeight;
      return {
        offsetTop,
        offsetHeight
      };
    },

    $_elementVisible(navID) {
      return (
        window.pageYOffset >=
          this.$_getOffseTop(navID).offsetTop - this.bonusHeight - 100 &&
        window.pageYOffset <
          this.$_getOffseTop(navID).offsetTop +
            this.$_getOffseTop(navID).offsetHeight -
            this.bonusHeight -
            100
      );
    },

    $_onScroll() {
      if (this.$_elementVisible("room")) {
        this.currentTab = 0;
      }

      if (this.$_elementVisible("plan")) {
        this.currentTab = 1;
      }

      if (this.$_elementVisible("map")) {
        this.currentTab = 2;
      }

      if (this.$_elementVisible("review")) {
        this.currentTab = 3;
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.hotel-detail-top-view-nav {
  order: 2;
  width: 100%;
  background: white;
  border-bottom: 1px solid $border-color-gray-2;
  .navbar-list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 950px;
    margin: 0 auto;
    li {
      padding: 15px 0;
      color: $bg-color-blue-2;
      font-weight: bold;
      width: 25%;
      text-align: center;
      cursor: pointer;
      font-size: 12px;
      a {
        color: $bg-color-blue-2;
        text-decoration: none;
      }
      @include min-sm {
        padding: 15px;
        font-size: 15px;
        a {
          padding: 12px 55px;
        }
      }

      &:first-child {
        width: 23%;
      }

      &:nth-child(2) {
        width: 28%;
      }

      &:nth-child(3) {
        width: 24%;
      }
    }
    .active {
      border-bottom: 3px solid $bg-color-blue-2;
      display: flex;
      justify-content: center;
    }
  }
}

.navbar-sticky {
  position: fixed;
  top: 32px;
  left: 0;
  background: white;
  z-index: 10;
  border-bottom: 1px solid $border-color-gray-2;
  .navbar {
    max-width: 950px;
    margin: 0 auto;
  }

  @include min-sm {
    top: 141px;
  }
}
</style>
