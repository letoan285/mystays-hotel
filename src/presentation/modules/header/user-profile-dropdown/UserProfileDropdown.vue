<template>
  <ul class="list-group" :class="{'user-profile-dropdown__list-group': isDropdownMobile}">
    <NuxtLink
      v-for="userProfileLink in userProfileLinks"
      :key="userProfileLink.userProfileText"
      tag="li"
      :to="userProfileLink.userProfileHref"
      class="list-group-item header-dropdown"
      :class="{'user-profile-dropdown__list-group-item': isDropdownMobile}"
    >
      {{ getProfileTextLanguageText(userProfileLink.userProfileText) }}
    </NuxtLink>
    <li class="list-group-item" :class="{'user-profile-dropdown__list-group-item': isDropdownMobile}" @click="userLogout()">
      <a class="logout-button" type="button">{{ $t('headers.logout') }}</a>
    </li>
  </ul>
</template>

<script>
import Vue from 'vue'
import { mapActions } from 'vuex'
import { Header } from '../../../../shared/constants/index'

export default Vue.extend({
  name: 'UserProfileDropdown',
  props: {
    userProfileLinks: {
      type: Array,
      required: true
    },
    isDropdownMobile: {
      type: Boolean
    }
  },
  methods: {
    ...mapActions({
      handleLogoutUser: 'users/logoutUser'
    }),

    userLogout () {
      localStorage.removeItem('LoginUser')
      this.handleLogoutUser()
      location.reload()
    },
    getProfileTextLanguageText (text) {
      switch (text) {
        case Header.MyProfile:
          return this.$t('headers.my_profile')
        case Header.MyReward:
          return this.$t('headers.my_reward')
        default:
          return ''
      }
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .list-group-item{
    padding: 15px 130px 15px 10px;
    border-radius: 0;
    backface-visibility: hidden;
    white-space: nowrap;
    &:hover {
      background-color: #fff6df;
    }

    &:nth-child(1){
      border-top: none;
    }
    .logout-button {
      background-color: none;
      border: none;
      padding: 0px;

    }
  }

  .user-profile-dropdown__list-group{
    margin-bottom: 20px;

    &-item{
      border-left: none;
      border-right: none;
      padding: 10px 0 10px calc(3rem + 16px);
      color: $text-color-blue;
    }
  }

</style>
