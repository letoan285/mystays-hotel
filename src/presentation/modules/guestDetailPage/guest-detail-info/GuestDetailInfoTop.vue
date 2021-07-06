<template>
  <div class="guest-detail__info-top">
    <div v-if="isAuthened">
      <div class="guest-detail__info-top-authened-member">
        <img
          v-lazy-load
          :data-src="require('@/assets/images/Logo-Reverse.svg')"
          alt="Logo"
        />
        <div
          v-if="goldMemberShip"
          class="guest-detail__info-top-authened-membership"
        >
          <span class="icon-Icon-Reward" /> Gold Member
        </div>
        <div class="guest-detail__info-top-authened-member-logout">logout</div>
      </div>
      <div class="guest-detail__info-top-authened-info">
        <div class="guest-detail__info-top-authened-info-name">
          <p class="is-bold guest-detail__info-top-authened-info-name-welcome">
            Hi {{ userInfo.userName }}
          </p>
          <p
            v-if="goldMemberShip"
            class="guest-detail__info-top-authened-info-name-member"
          >
            Gold Member
          </p>
        </div>
        <!-- <div class="guest-detail__info-top-authened-info-miles">
          <p
            class="is-bold guest-detail__info-top-authened-info-miles-current"
          >Your current balance is</p>
          <span>{{2345}} miles</span>
        </div>-->
      </div>
    </div>
    <div v-else>
      <p class="guest-detail__info-top-call-out">
        {{ getLang.enterInfo }}
      </p>
      <div v-if="!isLogin" class="guest-detail__info-top-login">
        <LoginBlock />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { mapState } from "vuex";
import Vue from "vue";
import { MemberType } from "../../../../shared/constants/index";

export default Vue.extend({
  name: "GuestDetailInfoTop",
  props: {
    isAuthened: Boolean,
    // eslint-disable-next-line vue/require-default-prop
    userInfo: Object,
  },
  computed: {
    ...mapState({
      isLogin: (state: any) => state.users.data.isLogin,
    }),
    goldMemberShip() {
      return this.userInfo.userMemberType === MemberType.Gold;
    },
    getLang() {
      return {
        enterInfo: this.$t("guest_detail.enter_info"),
      };
    },
  },
});
</script>

<style lang="scss" scoped>
.guest-detail__info-top {
  margin-bottom: 30px;

  &-call-out {
    display: none;

    @include min-sm {
      display: block;
    }
  }

  &-login {
    display: block;

    @include min-sm {
      display: none;
    }
  }

  &-authened {
    &-member {
      display: none;

      @include min-sm {
        display: flex;
        align-items: center;
        margin-bottom: 14px;

        img {
          margin-right: 12px;
        }
      }

      &ship {
        font-size: 11px;
        color: $text-color-blue;
        padding: 6px 9px;
        border-radius: 24px;
        background: $bg-color-yellow;
        font-weight: bold;

        [class^="icon-"],
        [class*=" icon-"] {
          margin-right: 6px;
          font-size: 14px;
          vertical-align: bottom;
        }
      }

      &-logout {
        margin-left: auto;
        font-size: 12px;
        color: $bg-color-blue-2;
        cursor: pointer;
      }
    }

    &-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 18px 15px;
      border: 1px solid $border-color-gray-2;
      border-radius: 4px;
      background: $bg-color-blue-4;

      @include min-sm {
        padding: 20px;
      }

      &-name {
        &-welcome {
          margin-bottom: 7px;

          @include min-sm {
            margin-bottom: 0;
          }
        }

        &-member {
          display: block;
          color: $text-color-blue-2;
          margin-bottom: 0;
          font-size: 12px;
          font-weight: bold;

          @include min-sm {
            display: none;
          }
        }
      }

      &-miles {
        &-current {
          display: none;

          @include min-sm {
            display: inline;
          }
        }
      }

      span {
        font-size: 18px;
        font-weight: bold;

        @include min-sm {
          font-size: 16px;
        }
      }
    }
  }
}
</style>
