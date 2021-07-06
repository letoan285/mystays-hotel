<template>
  <div
    class="hotel-navigation-bar-info"
    :class="{ 'offline-page': !$nuxt.isOnline }"
  >
    <div
      v-show="isLogin"
      class="hotel-navigation-bar-info__account nav-item"
      :class="{ mr: newClass }"
    >
      <AppDropdownBox
        :is-show-backdrop="!false"
        is-header-dropdown="true"
        :is-open="isShowUserMenu"
        @toggleBox="$_toggleSideBox"
      >
        <template v-slot:dropdown__button>
          <i class="icon-Icon-Profile mr-2" />
          <span @click="isShowUserMenu = !isShowUserMenu">
            Hi {{ userInfo && userInfo.first_name }}
          </span>
          <!-- <b>Gold {{'1200 Miles'}}</b> -->
          <span class="icon-Arrow-Small-Down"></span>
        </template>
        <template v-slot:dropdown__box>
          <div
            v-for="(option, optionIdx) in userMenu"
            :key="optionIdx"
            class="user-menu-item"
            @click="handelClickMenu(option.index)"
          >
            {{ option.name }}
          </div>
        </template>
      </AppDropdownBox>
    </div>
    <div
      v-show="$nuxt.isOnline && !isLogin"
      class="hotel-navigation-bar-info__account"
    >
      <span class="icon-Icon-Profile" />
      <div class="hotel-navigation-bar-info__account__login">
        <span class="m-0" @click="$_toggleLogin(true)">
          {{ getTextString.login }}
        </span>
        <span>{{ getTextString.or }}</span>
        <span class="m-0" @click="e => $_toggleSignup(true, e)">
          {{ getTextString.join_mobile }}
        </span>
      </div>
    </div>
    <div class="hotel-navigation-bar-info__menu">
      <a :href="'tel:334343939'">
        <span class="icon-Icon-Phone" />
      </a>
      <span class="icon-Icon-Menu" @click="$_toggleMenu(true)" />
      <ToggleableSideBox :is-open="isNavOpen" @toggleBox="$_toggleMenu">
        <template v-slot:box-content>
          <HeaderNavMobile @onClose="$_toggleMenu(false)" />
        </template>
      </ToggleableSideBox>
    </div>
  </div>
</template>

<script>
/* eslint-disable vue/require-default-prop */

import Vue from "vue";
import { mapActions, mapState, mapGetters } from "vuex";

export default Vue.extend({
  name: "HotelNavigationBarInfo",
  props: {
    newClass: {
      type: String
    }
  },
  data() {
    return {
      isNavOpen: false,
      authen: false,
      isShowUserMenu: false,
      isShowLoginText: true,
      userMenu: [
        { name: "My Profile", index: 0 },
        { name: "My Rewards", index: 1 },
        { name: "Logout", index: 2 }
      ]
    };
  },
  watch: {
    isLogin(isLogin) {
      this.isShowLoginText = isLogin;
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.users.data.userData,
      isMobile: state => state.general.data.isMobile,
      isLogin: state => state.users.data.isLogin
    }),
    ...mapGetters({
      hotelFilterByMapView: "hotel/hotelFilterByMapView"
    }),
    getLanguage() {
      return {
        miles: this.$t("confirmbooking.miles")
      };
    },
    getTextString() {
      return {
        find_a_hotel: this.$t("headers.search_text"),
        login: this.$t("headers.login"),
        join_mobile: this.$t("headers.join_mobile"),
        join_mystays_elite: this.$t("headers.join_mystays_elite"),
        or: this.$t("headers.or"),
        my_profile: this.$t("headers.my_profile"),
        my_reward: this.$t("headers.my_reward"),
        logout: this.$t("headers.logout")
      };
    },

    userData() {
      return this.users && this.users.userData;
    }
  },
  destroyed() {
    // this.$scrollBody.enable();
  },
  methods: {
    ...mapActions({
      toggleLogin: "appAuthen/toggleLogin",
      toggleSignup: "appAuthen/toggleSignup",
      toggleHeaderSearch: "header/showHeaderSearch",
      logoutUser: "users/logoutUser"
    }),
    $_toggleMenu(isOpen) {
      this.isNavOpen = isOpen;
      this.scrollBody(isOpen);
    },
    $_toggleLogin(isLoginOpen) {
      this.toggleLogin({ isLoginOpen });
      this.scrollBody(isLoginOpen);
    },
    $_toggleSignup(isSignupOpen, e) {
      e.stopPropagation();
      this.toggleSignup({ isSignupOpen });
      this.scrollBody(isSignupOpen);
    },
    showFindHotel() {
      this.toggleHeaderSearch(true);
      this.$_toggleSideBox(false);
    },
    $_toggleSideBox(isShowUserMenu) {
      if (!this.isMobile) {
        if (this.isShowUserMenu) {
          this.isShowUserMenu = false;
          this.$scrollBody.enable();
        }
        this.isShowUserMenu = isShowUserMenu;
      }
    },
    handelClickMenu(index) {
      switch (index) {
        case 0:
          this.$router.push(this.$pageRoute.profile);

          this.$_toggleSideBox(false);
          break;
        case 1:
          this.$router.push(this.$pageRoute.myRewards);

          this.$_toggleSideBox(false);
          break;
        case 2:
          this.logoutUser();
          this.$_toggleSideBox(false);
          break;
        default:
          break;
      }
    },

    scrollBody(isOpen) {
      if (isOpen) {
        this.$scrollBody.disable();
      } else {
        this.$scrollBody.disable();
      }

      const path = this.$route.path;
      const body = document.body;
      if (
        path === this.$pageRoute.hotelsList &&
        !this.isMobile &&
        this.hotelFilterByMapView.length <= 3
      ) {
        body.style.paddingRight = 0;
      } else {
        body.style.paddingRight = "";
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.hotel-navigation-bar-info {
  display: flex;
  color: white;
  justify-content: space-between;
  padding-top: 16px;
  order: 2;
  @include min-md {
    padding: 0;
    align-items: center;
  }
  &__account {
    font-size: 13px;
    margin-right: 15px;
    display: flex;
    align-items: center;
    @include min-md {
      margin-right: 60px;
      margin-bottom: 0;
    }
    @include min-xl {
      margin-right: 60px;
    }
    &__login {
      color: $text-color-yellow;
    }
    span {
      font-weight: 500;
      cursor: pointer;
      &:first-child {
        margin-right: 10px;
      }

      &:nth-child(3) {
        color: #ffd25d;
        margin-left: 10px;
      }
    }

    span.icon-Arrow-Small-Down {
      font-size: 10px;
      color: white;
    }
  }

  .mr {
    @include min-sm {
      margin-right: 20px;
    }
    @include min-md {
      margin-right: 100px;
    }
    @include min-xl {
      margin-right: 20px;
      margin-bottom: 0;
    }
  }

  &__menu {
    display: flex;
    span {
      cursor: pointer;
      font-size: 18px;
      cursor: pointer;
      &:first-child {
        margin-right: 10px;
        @include min-sm {
          margin-right: 24px;
        }
      }
    }
  }
}

.offline-page {
  justify-content: flex-end;
}
.nav-item {
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  span {
    font-size: 14px;
    text-transform: uppercase;
    @include min-sm {
      font-size: 15px;
      text-transform: uppercase;
      margin-left: 10px;
    }
  }
}
.nav-item:not(:first-child) {
  width: 15%;
  span {
    display: none;
  }
}
.nav-item:first-child {
  width: 100%;
  justify-content: start;
  span {
    text-transform: capitalize;
  }
  b {
    color: #ffd25d;
    font-weight: normal;
    font-size: 15px;
    margin-left: 5px;
  }
}
.user-menu-item {
  padding: 15px;
  width: 200px;
  &:hover {
    background: rgba(255, 210, 93, 0.2);
  }
}
.user-menu-item:not(:last-child) {
  border-bottom: 1.5px solid #dddddd;
}
</style>
