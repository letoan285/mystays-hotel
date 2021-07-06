<template>
  <div class="header-nav-mobile">
    <div class="header-nav-mobile__section">
      <img
        :src="require('@/assets/images/Logo-Reverse.svg')"
        class="mx-auto d-block w-50 header-nav-mobile__logo"
        alt=""
      >
      <div class="header-nav-mobile__section__content">
        <div class="header-nav-mobile__link">
          <div class="header-nav-mobile__link__item" @click="showSearch()">
            <span :class="'mx-4 icon-Icon-Search'" />
            {{ getTextString.find_a_hotel }}
          </div>
          <div v-if="!userData" class="header-nav-mobile__link__item">
            <span :class="'mx-4 icon-Icon-Profile'" />
            <span @click="$_toggleLogin(!userData ? true : false)">{{ getTextString.login }}</span>
            <span class="ml-1 mr-1">{{ getTextString.or }}</span>
            <span @click="$_toggleSignup(!userData ? true : false)">{{ getTextString.join_mobile }}</span>
          </div>
          <div v-if="isLogin" class="header-nav-mobile__link__item" @click="goToProfile()">
            <span :class="'mx-4 icon-Icon-Profile'" />
            {{ getTextString.my_profile }}
          </div>
          <div v-if="isLogin" class="header-nav-mobile__link__item" @click="goToProfile()">
            <span :class="'mx-4 icon-Icon-Reward'" />
            {{ getTextString.my_reward }}
          </div>
          <div v-if="isLogin" class="header-nav-mobile__link__item" @click="handelLogout()">
            <span :class="'mx-4 icon-Icon-Login'" />
            {{ getTextString.logout }}
          </div>
        </div>
      </div>
      <header-nav-mobile-footer />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions, mapState } from 'vuex'
import { Languages, currencyArray } from '../../../../shared/constants/index'
import HeaderNavMobileFooter from './HeaderNavMobileFooter/HeaderNavMobileFooter.vue'

export default Vue.extend({
  name: 'HeaderNavMobile',
  components: {
    HeaderNavMobileFooter
  },
  data () {
    return {
      isDropdownMobile: true,
      languageArray: Languages,
      currencyArray
    }
  },
  computed: {
    ...mapState({
      userData: state => state.users.data.userData,
      isLogin: state => state.users.data.isLogin
    }),
    getTextString () {
      return {
        find_a_hotel: this.$t('headers.search_text'),
        login: this.$t('headers.login'),
        join_mobile: this.$t('headers.join_mobile'),
        join_mystays_elite: this.$t('headers.join_mystays_elite'),
        or: this.$t('headers.or'),
        my_profile: this.$t('headers.my_profile'),
        my_reward: this.$t('headers.my_reward'),
        logout: this.$t('headers.logout')
      }
    }
  },
  methods: {
    ...mapActions({
      toggleLogin: 'appAuthen/toggleLogin',
      toggleSignup: 'appAuthen/toggleSignup',
      logoutUser: 'users/logoutUser',
      toggleHeaderSearchBox: 'appAuthen/toggleHeaderSearchBox'
    }),
    $_toggleLogin (isLoginOpen) {
      this.$emit('onClose', false)
      this.toggleLogin({ isLoginOpen })
    },
    $_toggleSignup (isSignupOpen) {
      this.$emit('onClose', false)
      this.toggleSignup({ isSignupOpen })
    },
    handelLogout () {
      this.$emit('onClose', false)
      this.logoutUser()
    },
    goToProfile () {
      this.$emit('onClose', false)
      if (this.$router.currentRoute.path !== '/my-profile') {
        this.$router.push('/my-profile')
      }
    },
    showSearch () {
      this.$emit('onClose', false)
      this.toggleHeaderSearchBox(true)
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.header-nav-mobile {
  width: 100%;
  height: 100%;
  background: $white;
  padding-top: 70px;

  &__section {
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;

    &__content {
      display: flex;
      flex-direction: column;
      flex: 1;
    }
  }

  &__close {
    position: absolute;
    top: 20px;
    right: 20px;
    color: $text-color-blue;
  }

  &__logo {
    margin-bottom: 30px;
  }

  &__link {
    color: $text-color-blue-2;
    position: relative;
    display: block;
    cursor: pointer;

    [class^="icon-Arrow"],
    [class*=" icon-Arrow"] {
      font-size: 10px;
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      transition: transform 0.5s;
    }
    &__item {
      display: flex;
      position: relative;
      align-items: center;
      padding: 10px 0;
      border-bottom: 1px solid #ddd;
    }
  }

  &__contact {
    position: absolute;
    top: 15px;
    left: 20px;
    color: $text-color-blue-2;
    border: 1px solid rgba(0, 0, 0, 0.1);
    display: inline-table;
    border-radius: 3px;
  }

  &__button {
    color: $text-color-blue;

    &-group {
      margin-bottom: 120px;
      margin-top: 1.5rem;
      color: $text-color-blue;

      .drop-down {
        margin: 0 0 20px 0;

        &__selected__icon {
          background: red;
        }
      }
    }
  }
}

.slide-in-enter-active,
.slide-in-leave-active {
  transition: all 0.5s;
  transform: translate3d(0, 0, 0);
}

.slide-in-enter,
.slide-in-leave-to {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
</style>
