<template>
  <div class="navbar-nav w-100 align-items-center navbar-nav__main">
    <NuxtLink to="/">
      <img :src="require('@/assets/images/Logo.svg')" alt="" />
    </NuxtLink>
    <div v-if="isMobile" class="w-100">
      <div class="nav-list-item w-100" :class="{ 'user-login': userInfo }">
        <AppDropdownBox
          :is-show-backdrop="!false"
          is-header-dropdown="true"
          :is-open="isShowUserMenu"
          @toggleBox="$_toggleSideBox"
        >
          <template v-slot:dropdown__button>
            <div v-if="!userInfo" class="nav-item" @click="handelLogin">
              <i class="icon-Icon-Profile" />
              <span>{{ getTextString.login }}</span>
            </div>
            <div v-else class="nav-item">
              <i class="icon-Icon-Profile" />
              <span>Hi {{ userInfo && userInfo.first_name }}</span>
              <!-- <b>Gold: {{'1200 Miles'}}</b> -->
              <span class="icon-Arrow-Small-Down"></span>
            </div>
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

        <div class="nav-item">
          <i class="icon-Icon-Phone" />
          <span>{{ getTextString.call_us }}</span>
        </div>
        <div class="nav-item" @click="openNavMoblie">
          <i class="icon-Icon-Menu" />
          <span>{{ getTextString.menu }}</span>
        </div>
      </div>
    </div>
    <div v-else class="nav-desktop">
      <div class="nav-desktop__list-item">
        <div
          class="nav-item d-flex align-items-center"
          @click="$_openHeaderSearchBox"
        >
          <i class="icon-Icon-Search" />
          <span>{{ getTextString.find_a_hotel }}</span>
        </div>
        <div v-show="isLogin" class="nav-item">
          <span>{{ getTextString.my_reservations }}</span>
        </div>
      </div>
      <div class="nav-desktop__user-info">
        <div v-if="!userInfo && $nuxt.isOnline" class="nav-item">
          <i class="icon-Icon-Profile mr-2" />
          <span @click="handelLogin"
            >{{ getTextString.login }} {{ getTextString.or }}</span
          >
          <b @click="handelSignUp">{{ getTextString.join_mystays_elite }}</b>
        </div>
        <div v-else class="nav-item">
          <app-dropdown-box
            :is-show-backdrop="!false"
            is-header-dropdown="true"
            :is-open="isShowUserMenu"
            @toggleBox="$_toggleSideBox"
          >
            <template v-slot:dropdown__button>
              <i class="icon-Icon-Profile mr-2" />
              <span @click="isShowUserMenu = !isShowUserMenu"
                >Hi {{ userInfo && userInfo.first_name }}</span
              >
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
          </app-dropdown-box>
        </div>
        <div class="nav-item">
          <i class="icon-Icon-Phone mr-2" />
          <a :href="'tel:334343939'">+81-3-3434-3939</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapActions, mapState } from "vuex";

import AppDropdownBox from "../../components/app-dropdown-box/AppDropdownBox.vue";
export default Vue.extend({
  name: "HeaderNavBottom",
  components: {
    AppDropdownBox
  },
  data() {
    return {
      isShowUserMenu: false
    };
  },
  computed: {
    ...mapState({
      isMobile: state => state.general.data.isMobile,
      userInfo: state => state.users.data.userData,
      isLogin: state => state.users.data.isLogin
    }),

    userMenu() {
      return [
        { name: `${this.getTextString.my_profile}`, index: 0 },
        { name: `${this.getTextString.my_reward}`, index: 1 },
        { name: `${this.getTextString.logout}`, index: 2 }
      ];
    },
    getTextString() {
      return {
        my_reservations: this.$t("headers.my_reservations"),
        find_a_hotel: this.$t("headers.search_text"),
        login: this.$t("headers.login"),
        join_mystays_elite: this.$t("headers.join_mystays_elite"),
        or: this.$t("headers.or"),
        my_profile: this.$t("headers.my_profile"),
        my_reward: this.$t("headers.my_reward"),
        logout: this.$t("headers.logout"),
        call_us: this.$t("confirmbooking.call_us"),
        login_mobile: this.$t("headers.login_mobile"),
        menu: this.$t("headers.menu_mobile")
      };
    }
  },
  methods: {
    ...mapActions({
      toggleHeaderSearch: "header/showHeaderSearch",
      loginUser: "users/loginUser",
      logoutUser: "users/logoutUser",
      signupUser: "users/signupUser",
      checkUserLogin: "users/checkUserLogin",
      toggleLogin: "appAuthen/toggleLogin",
      toggleSignup: "appAuthen/toggleSignup"
    }),
    openNavMoblie() {
      this.$emit("onClickMenuItem", true);
    },
    handelLogin() {
      this.toggleLogin({ isLoginOpen: true });
    },
    handelSignUp() {
      this.toggleSignup({ isSignupOpen: true });
    },
    $_toggleSideBox(isShowUserMenu) {
      if (this.isShowUserMenu) {
        this.isShowUserMenu = false;
        this.$scrollBody.enable();
      }
      this.isShowUserMenu = isShowUserMenu;
    },
    $_openHeaderSearchBox() {
      this.$emit("onClickFindHotel");
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
    }
  }
});
</script>

<style lang="scss" scoped>
.navbar-nav__main {
  flex-direction: column;
  position: relative;
  @include min-md {
    flex-direction: row;
  }
  .nav-list-item {
    display: flex;
    width: 100%;
    margin-top: 38px;
    justify-content: space-between;
    align-items: center;
    .nav-item {
      display: flex;
      cursor: pointer;
      justify-content: center;
      align-items: center;
      span {
        font-size: 14px;
        text-transform: uppercase;
        margin-left: 10px;
      }
    }
  }
  .nav-desktop {
    display: flex;
    width: 100%;
    margin-left: 68px;
    justify-content: space-between;
    align-items: center;

    @include min-sm {
      padding-top: 25px;
    }

    @include min-lg {
      padding-top: 0;
    }

    &__list-item {
      display: inherit;
    }
    &__user-info {
      display: inherit;

      span.icon-Arrow-Small-Down {
        font-size: 10px;
        margin-left: 5px;
      }
    }
    .nav-item {
      cursor: pointer;
      // text-transform: capitalize;
      i {
        margin-right: 10px;
        margin-top: 2px;
      }
      b {
        color: #ffd25d;
        font-weight: normal;
      }
    }
    .nav-item:not(:first-child) {
      margin-left: 30px;
    }
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

.user-login {
  .nav-item {
    display: flex;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    span {
      font-size: 11px;
      text-transform: uppercase;
      margin-left: 10px;
    }

    span.icon-Arrow-Small-Down {
      font-size: 10px;
      margin-top: 3px;
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
      font-size: 12px;
      margin-left: 5px;
    }
  }
}
</style>
