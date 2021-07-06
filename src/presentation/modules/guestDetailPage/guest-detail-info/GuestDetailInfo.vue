<template>
  <div class="guest-detail__info">
    <GuestDetailInfoTop :is-authened="isAuthened" :user-info="userInfo" />
    <GuestDetailGuestInfo />
    <GuestDetailAdditional />
  </div>
</template>

<script lang="ts">
import { MemberType } from "../../../../shared/constants/index";

export default {
  name: "GuestDetailInfo",
  props: {
    isAuthened: {
      type: Boolean,
    },
  },
  data() {
    return {
      userInfo: {
        userName: "Hideyoshi",
        userMiles: 2345,
        userMemberType: MemberType.Gold,
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.guest-detail__info {
  width: 100%;

  @include min-md {
    width: 656px;
  }
}
</style>
