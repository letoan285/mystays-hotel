<template>
  <div :class="{'header__nav-button-authened-wrapper': headerNavButtonType === 'Login' && authen}">
    <div
      v-if="headerNavButtonType === 'Login'"
      class="header__nav-button mr-lg-4 d-flex align-items-center"
    >
      <span :class="'icon-' + headerNavButtonIcon + ' mr-2'" />

      <span v-if="!authen" class="d-flex">
        <!-- if user is not login  -->
        <span @click="handleAunthenAction(authen)">
          <p>{{ $t('headers.login') }}</p>
          <p class="header__nav-button-text-sp">{{ $t('headers.login_mobile') }}</p>
        </span>
        <span @click="$_toggleSignup(true)">
          <div class="header__nav-button-join-section ml-2">{{ $t('headers.or') }}
            <span class="header__nav-button-join-section-join-mystays">{{ $t('headers.join_mystays_elite') }}</span>
          </div>
        </span>
      </span>

      <span v-else class="d-flex user_login" @click="handleAunthenAction(authen)">
        <!-- if user is login  -->
        <app-dropdown-box :is-open="isOpen">
          <template v-slot:dropdown__button>
            <p>{{ user.first_name_kana }} - </p>
            <p class="header__nav-button-text-sp user__email">{{ user.email }}</p>
            <div class="header__nav-button-join-section d-inline">
              <span
                class="header__nav-button-join-section-join-mystays header__nav-button-join-section-is-authened"
              > {{ user.phone }} {{ user.first_name }}</span>
            </div>
          </template>
          <template v-slot:dropdown__box>
            <!-- handle dropdown list if user is login here  -->
            <user-profile-dropdown :user-profile-links="userProfileLinks" />
          </template>
        </app-dropdown-box>

      </span>
    </div>
    <a v-else-if="headerNavButtonType === 'Phone'" :href="'tel:' + headerNavButtonTel" class="header__nav-button">
      <span :class="'icon-' + headerNavButtonIcon + ' mr-2'" />
      <p>{{ headerNavButtonText }}</p>
      <p v-if="!authen" class="header__nav-button-text-sp">{{ $t('headers.call_mobile') }}</p>
    </a>
    <div
      v-else-if="headerNavButtonType === 'Menu'"
      class="header__nav-button header__nav-button-menu"
      @click="openNavMobile"
    >
      <span :class="['icon-' + headerNavButtonIcon, {'mr-2': !authen}]" />
      <p v-if="!authen" class="header__nav-button-text-sp">
        {{ $t('headers.menu_mobile') }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapGetters, mapActions } from 'vuex'
import AppDropdownBox from '../../../components/app-dropdown-box/AppDropdownBox.vue'
import UserProfileDropdown from '../user-profile-dropdown/UserProfileDropdown.vue'

interface User {
  name?: string;
  username?: string;
  email: string;
  password: string;
}
interface IHeaderData<T> {
  userInfo: T;
  isLogin: boolean;
  isOpen: boolean;
}

export default Vue.extend({
  name: 'HeaderNavButton',
  components: {
    AppDropdownBox,
    UserProfileDropdown
  },
  props: {
    headerNavButtonText: {
      type: String,
      required: true
    },
    headerNavButtonTextSp: {
      type: String,
      default: ''
    },
    headerNavButtonLinkLogin: {
      type: String,
      default: '/'
    },
    headerNavButtonLinkSignup: {
      type: String,
      default: '/'
    },
    headerNavButtonIcon: {
      type: String,
      required: true
    },
    headerNavButtonType: {
      type: String,
      required: true
    },
    headerNavButtonTel: {
      type: String,
      default: ''
    },
    userProfileLinks: {
      type: Array,
      required: true
    },
    user: {
      type: Object,
      required: true
    },
    authen: {
      type: Boolean,
      required: true
    }
  },
  data (): IHeaderData<User> {
    return {
      isLogin: false, // show dropdown list if use login
      isOpen: false, // show dropdown list if use login
      userInfo: {
        name: 'John Doe',
        email: 'john@gmail.com',
        password: '123456'
      }
    }
  },
  computed: {
    ...mapState({
      userData: (state: any) => {
        return state.users.data
      }
    }),
    ...mapGetters({
      bookingInformation: 'hotel/bookingInformation'
    })
  },
  methods: {
    // MODULE ACTIONS
    ...mapActions({
      loginUser: 'users/loginUser',
      signupUser: 'users/signupUser',
      checkUserLogin: 'users/checkUserLogin',
      toggleLogin: 'appAuthen/toggleLogin',
      toggleSignup: 'appAuthen/toggleSignup'
    }),
    openNavMobile () {
      this.$emit('openNavMobile')
    },
    userLogin () {
      this.loginUser(this.userInfo)
    },
    userSignup () {
      const user = {
        program_id: '{{program_id}}',
        first_name: '田中',
        last_name: '太郎',
        first_name_kana: 'たなか',
        last_name_kana: 'たろう',
        email: 'johndoe@gmail.com',
        password: '12345678',
        phone: '4343243242343',
        birthday: '1990-01-01',
        membership_id: 'TH000001',
        email_permission: true
      }
      this.signupUser(user)
    },
    $_toggleSignup (isSignupOpen : boolean) : void {
      this.toggleSignup({ isSignupOpen })
    },
    handleAunthenAction (isLog: boolean) {
      if (isLog) {
        this.isOpen = true
      } else {
        this.toggleLogin({ isLoginOpen: true })
      }
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.header__nav-button {
  cursor: pointer;
  @include min-md {
    text-transform: none;
  }

  &-authened-wrapper {
    flex: 1;
    margin-right: 10px;
  }

  &-menu {
    display: inline;

    @include min-md {
      display: none;
    }
  }

  p {
    display: none;
    margin: 0;

    @include min-md {
      display: inline;
    }

    &.header__nav-button-text-sp {
      display: inline-block;
      word-break: break-word;
      max-width: 120px;

      @include min-md {
        display: none;
      }
    }
  }

  .header__nav-button-join-section {
    word-break: break-word;
    width: 140px;

    @include min-md {
      width: auto;
    }

    &-join-mystays{
      color: $text-color-yellow;
    }
  }
}
</style>
