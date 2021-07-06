<template>
  <div class="guest-detail-policy">
    <CustomCheckbox
      v-model="isCheckedPolicy"
      :is-checked="isCheckedPolicy"
      @input="$_onChangeCheckbox"
    />
    <div
      class="label"
      :class="{
        'checkbox-error': isError,
        'checbox-success': !isError && isClickPayment
      }"
      @click="$_onTriggerCheckbox"
    >
      {{ $t("guest_detail.tripla_policy_first") }}
      <a
        href="https://corp.tripla.jp/userpolicy/#1546828367318-9c7544c7-efe1"
        target="_blank"
        @click="$_onClickPolicyLink"
        >Terms of Use</a
      >,
      <a
        href="https://corp.tripla.jp/privacypolicy/#1546828619484-31e622cf-69a0"
        target="_blank"
        @click="$_onClickPolicyLink"
        >Privacy Policy
      </a>
      {{ $t("guest_detail.tripla_policy_and") }}
      <a
        href="https://corp.tripla.jp/gdprprivacypolicy/"
        target="_blank"
        @click="$_onClickPolicyLink"
      >
        GDPR Policy </a
      >{{ $t("guest_detail.tripla_policy_by_lang") }}.
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapState, mapGetters } from "vuex";

export default Vue.extend({
  name: "GuestDetailPayment",
  props: {
    isClickPayment: {
      type: Boolean
    }
  },
  data() {
    return {
      isCheckedPolicy: false,
      isError: false
    };
  },
  computed: {
    ...mapState({
      isLogin: (state: any) => state.users.data.isLogin,
      selectedRoom: (state: any) => state.hotelDetail.selectedRoom,
      roomSelectedFromAPI: (state: any) =>
        state.hotelDetail.roomSelectedFromAPI,
      hotelID: (state: any) => state.hotel.hotelID
    }),

    ...mapGetters({
      isFormInvalid: "guestDetail/isFormInValid"
    })
  },
  watch: {
    isClickPayment(isClick) {
      if (isClick) {
        if (this.isCheckedPolicy) {
          this.isError = false;
        } else {
          this.isError = true;
        }
      }
    }
  },
  methods: {
    ...mapActions({
      triggerSubmitButton: "guestDetail/triggerSubmitButton",
      saveAdditionallData: "guestDetail/saveAdditionallData"
    }),

    $_onChangeCheckbox(isChecked: boolean) {
      if (this.isClickPayment) {
        if (isChecked) {
          this.isError = false;
        } else {
          this.isError = true;
        }
      }

      this.$emit("onCheckedPolicy", this.isCheckedPolicy);
    },

    $_onTriggerCheckbox() {
      this.isCheckedPolicy = !this.isCheckedPolicy;
      if (this.isClickPayment) {
        if (this.isCheckedPolicy) {
          this.isError = false;
        } else {
          this.isError = true;
        }
      }
      this.$emit("onCheckedPolicy", this.isCheckedPolicy);
    },

    $_onClickPolicyLink() {
      this.isCheckedPolicy = !this.isCheckedPolicy;
    }
  }
});
</script>

<style lang="scss" scoped>
.guest-detail-policy {
  font-size: 14px;
  display: flex;
  align-items: flex-start;
  cursor: pointer;

  a {
    font-size: 14px;
    cursor: pointer;
    color: #007bff;
    display: inline-flex;
    margin-bottom: 0;
    font-weight: normal;

    &:hover {
      text-decoration: underline;
    }
  }

  .label {
    margin-top: -5px;
  }

  .checkbox-error {
    color: #ec1000;
  }

  .checbox-success {
    color: #00805b;
  }
}
</style>
