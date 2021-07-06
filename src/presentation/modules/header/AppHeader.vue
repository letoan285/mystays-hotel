<template>
  <div class="app-header">
    <div class="container">
      <nav class="navbar navbar-dark flex-column">
        <HeaderNavBottom
          @onClickMenuItem="$_toggleSideBox"
          @onClickFindHotel="$_showFindHotel"
        />
        <toggleable-side-box
          :is-open="isMobileNavOpen"
          @toggleBox="$_toggleSideBox"
        >
          <template v-slot:box-content>
            <header-nav-mobile @onClose="$_toggleSideBox" />
          </template>
        </toggleable-side-box>
      </nav>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
import { Header } from '../../../shared/constants/index'
import ToggleableSideBox from '../../components/toggleable-side-box/ToggleableSideBox.vue'
import HeaderNavMobile from './header-nav-mobile/HeaderNavMobile.vue'

import HeaderNavBottom from './HeaderNavBottom.vue'
export default Vue.extend({
  name: 'AppHeader',
  components: {
    HeaderNavMobile,
    ToggleableSideBox,
    HeaderNavBottom
  },
  data () {
    return {
      user: {},
      authen: false,
      success: false,
      isMobileNavOpen: false,
      isHeaderSearchBoxOpen: false
    }
  },
  computed: {
    ...mapGetters({
      userGetter: 'users/userData',
      isShowSearchBox: 'header/isHeaderSearchBoxOpen'
    }),
    getTextString () {
      return {
        searchText: this.$t('headers.search_text')
      }
    }
  },
  destroyed () {
    window.removeEventListener('scroll', this.onScroll)
  },
  mounted () {
    const userLogin = localStorage.getItem('session')
    if (userLogin) {
      // this.authen = true;
      this.user = JSON.parse(localStorage.getItem('user'))
    }
    window.addEventListener('scroll', this.onScroll)
    this.onScroll()
  },

  methods: {
    ...mapActions({
      toggleHeaderSearchBox: 'appAuthen/toggleHeaderSearchBox'
    }),
    onScroll () {
      if (window.innerWidth < 992) {
        const offsetTop =
          this.$refs.stickyHeaderSp && this.$refs.stickyHeaderSp.offsetTop
        this.isStickyHeaderSp = window.pageYOffset > offsetTop
      } else {
        this.isStickyHeaderSp = false
      }
    },
    openNavMobile () {
      this.isMobileNavOpen = true
    },
    $_toggleSideBox (isOpen) {
      this.isMobileNavOpen = isOpen
    },
    $_showFindHotel () {
      this.toggleHeaderSearchBox(true)
      this.$_toggleSideBox(false)
    },
    hideSearchBox () {
      this.toggleHeaderSearch(false)
    },
    computedHeaderLink (text) {
      switch (text) {
        case Header.myReservation:
          return this.$t('headers.my_reservations')
        case Header.findHotel:
          return this.$t('headers.search_text')
      }
    }
  }

})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.app-header {
  background: #232e48;
}
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

    @include min-md {
      border-bottom: 2px solid $border-color-blue-3;
      // padding: 10px 0;
    }
  }

  &.navbar {
    padding: 0;
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
  z-index: 2;
}
.active-overlay {
  display: block;
}
.active-header {
  z-index: 3;
}
</style>
