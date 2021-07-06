<template>
  <section
    v-click-outside="$_hide"
    class="confirm-stay-top-actions"
    :class="{ sticky: isSticky }"
  >
    <div
      class="confirm-stay-top-actions__email confirm-stay-top-actions--block"
      @click="$_openEmail"
    >
      <span class="icon-Icon-Email" />
      <span>{{ getLanguage.email }}</span>
    </div>
    <div
      class="confirm-stay-top-actions__social-network confirm-stay-top-actions--block"
    >
      <span class="icon-Icon-Share" />
      <span @click="$_onShowPopup">{{ getLanguage.share }}</span>
    </div>
    <div
      class="confirm-stay-top-actions__print confirm-stay-top-actions--block"
    >
      <span class="icon-Icon-Print" />
      <span>{{ getLanguage.print }}</span>
    </div>
    <ConfirmStaySocialNetwork
      v-if="isShowPopup"
      @closePopupSocialNetwork="$_closePopupSocialNetwork"
    />
  </section>
</template>

<script>
import Vue from "vue";
import { mapState } from "vuex";
import ClickOutside from "vue-click-outside";

export default Vue.extend({
  name: "ConfirmStayTopActions",
  directives: {
    ClickOutside
  },
  data() {
    return {
      isShowPopup: false,
      isSticky: false
    };
  },
  computed: {
    ...mapState({
      isMobile: state => state.general.data.isMobile
    }),
    getLanguage() {
      return {
        email: this.$t("confirmbooking.email"),
        share: this.$t("confirmbooking.share"),
        print: this.$t("confirmbooking.print")
      };
    }
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.onScroll);
  },
  methods: {
    $_onShowPopup() {
      this.isShowPopup = !this.isShowPopup;
    },

    $_closePopupSocialNetwork() {
      this.isShowPopup = !this.isShowPopup;
    },

    $_hide() {
      this.isShowPopup = false;
    },

    $_openEmail() {
      window.location.href = "mailto:chandra.vinay@mystays.com";
      this.isShowPopup = false;
    },
    onScroll() {
      this.isSticky = this.isMobile && window.pageYOffset > 153;
    }
  }
});
</script>

<style lang="scss" scoped>
.confirm-stay-top-actions {
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  background: #232e48;
  z-index: 1;
  display: none;
  @include min-sm {
    position: relative;
    background: white;
    display: flex;
  }
  &--block {
    display: flex;
    align-items: center;
    padding: 0 25px;
    width: calc(100% / 3);
    text-align: center;
    justify-content: center;

    @include min-sm {
      padding: 0 10px;
    }

    @include min-xl {
      margin: 0;
    }
    span {
      color: white;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 1px;
      cursor: pointer;
      &:first-child {
        font-size: 14px;
        margin-right: 12px;
      }

      @include min-sm {
        color: $text-color-blue-2;
        font-weight: bold;
      }
    }
  }

  &__social-network {
    border-right: 1px solid #dddee0;
    border-left: 1px solid #dddee0;
  }

  &__print {
    border-right: none;
  }
}

.sticky {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}
</style>
