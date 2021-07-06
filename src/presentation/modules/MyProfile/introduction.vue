<template>
  <section class="my-profile-page-content" v-if="isPageLoaded">
    <div class="my-profile-page-content__left">
      <div class="my-profile-page-content__left__header">
        <p class="my-profile-page-content__left__header--name">
          {{ (userData && userData.first_name) || "" }}
          {{ (userData && userData.last_name) || "" }}
        </p>
      </div>
      <div class="my-profile-page-content__left__list-item">
        <ul>
          <li
            v-for="(item, itemIdx) in tabs"
            :key="itemIdx"
            class="tab-item"
            :class="{ active: item.routerLink == $route.path }"
            @click="changeTab(item.routerLink)"
          >
            <div>{{ item.name }}</div>
          </li>
        </ul>
      </div>
      <div
        class="my-profile-page-content__left__cancel-membership d-none d-md-flex"
      >
        <button
          class="button m-btn m-btn__white"
          @click="onOpenCancelMembershipModal"
        >
          Cancel Membership
        </button>
      </div>
    </div>
    <div class="my-profile-page-content__right">
      <router-view></router-view>
    </div>
    <b-button class="d-none" @click="toast('b-toaster-top-center')">
      Failed
    </b-button>

    <MyStayPopup ref="cancel-membership" size="sm" modal-class="modal-delete">
      <div class="cancel-membership-modal">
        <div class="cancel-membership-modal__title">
          Are you sure to cancel membership ?
        </div>
        <div class="d-flex justify-content-between">
          <button
            class="m-btn m-btn__white cancel-membership-modal__button"
            @click="onCancel"
          >
            {{ $t("summary.cancel") }}
          </button>
          <button
            class="m-btn m-btn__yellow cancel-membership-modal__button"
            @click="onCancelMembership"
          >
            {{ $t("summary.confirm") }}
          </button>
        </div>
      </div>
    </MyStayPopup>
  </section>
</template>

<script>
import { isNullOrUndefined } from "util";
import Vue from "vue";
import { mapActions, mapState } from "vuex";
import CustomerUserCase from "../../../domain/usecases/customer";

import { ToastPlugin } from "bootstrap-vue";
Vue.use(ToastPlugin);

export default Vue.extend({
  name: "Introduction",
  data() {
    return {
      selectedTab: 0,
      counter: 0,
      editable: false,
      isPageLoaded: false
    };
  },

  mounted() {
    this.isPageLoaded = true;
  },
  computed: {
    ...mapState({
      userData: state => state.users.data.userData,
      isUpdateSuccess: state => state.users.data.isUpdateSuccess
    }),

    tabs() {
      return {
        myprofile: {
          id: 0,
          name: this.getTextString.my_profile,
          routerLink: "/my-profile"
        },
        billHistory: {
          id: 1,
          name: this.getLang.yourBooking,
          routerLink: "/my-booking"
        },
        rewards: {
          id: 2,
          name: this.getLang.my_rewards,
          routerLink: "/my-rewards"
        }
      };
    },

    getTextString() {
      return {
        my_profile: this.$t("headers.my_profile")
      };
    },
    getLang() {
      return {
        title: this.$t("login_signup.title"),
        findOut: this.$t("login_signup.find_out"),
        signUp: this.$t("login_signup.signup"),
        toLogin: this.$t("login_signup.to_login"),
        thankYouText: this.$t("login_signup.thank_you_text"),
        required: this.$t("forms.required"),
        validEmail: this.$t("forms.valid_email"),
        forgotPasswordText: this.$t("login_signup.forgot_password_text"),
        forgotPasswordTextConfirm: this.$t(
          "login_signup.forgot_password_text_confirm"
        ),
        forgotPasswordConfirm: this.$t("login_signup.forgot_password_confirm"),
        emailSent: this.$t("login_signup.email_sent_text"),
        newPassword: this.$t("login_signup.new_password"),
        changePassword: this.$t("login_signup.change_password_button"),
        lastName: this.$t("forms.last_name"),
        firstName: this.$t("forms.first_name"),
        kanjiLastName: this.$t("forms.kanji_last_name"),
        kanjiFirstName: this.$t("forms.kanji_first_name"),
        phone: this.$t("forms.phone"),
        email: this.$t("forms.email"),
        addComment: this.$t("forms.add_comment"),
        validPhone: this.$t("forms.valid_phone"),
        comments: this.$t("forms.comments"),
        password: this.$t("forms.password"),
        rePassword: this.$t("forms.re_enter_password"),
        cardName: this.$t("forms.card_name"),
        cardNumber: this.$t("forms.card_number"),
        cardSecurity: this.$t("forms.card_security"),
        bookingID: this.$t("forms.booking_id"),
        forgotPassword: this.$t("login_signup.forgot_password"),
        login: this.$t("login_signup.login"),
        toSignup: this.$t("login_signup.to_signup"),
        yourBooking: this.$t("my_profile.your_booking"),
        my_rewards: this.$t("headers.my_reward"),
        joiningDate: this.$t("my_profile.joining_date"),
        birthDay: this.$t("my_profile.birthDay"),
        billHistory: this.$t("my_profile.bill_history"),
        myRewards: this.$t("my_profile.my_rewards"),
        editProfile: this.$t("my_profile.edit_profile")
      };
    },
    isValid() {
      return !this.$v.$invalid;
    }
  },

  methods: {
    ...mapActions({
      handleUpdateUserInfo: "users/updateUserInfo"
    }),
 
    changeTab(routerLink) {
      this.$router.push(routerLink);
    },

    onOpenCancelMembershipModal() {
      this.$refs["cancel-membership"].showModal();
    },

    onCancel() {
      this.$refs["cancel-membership"].hideModal();
    },

    async onCancelMembership() {
      const params = {
        body: {
          reason: "Too many advertising advertisement emails."
        },
        hotelId: 1498
      };

      const cancelMembershipUserCase = new CustomerUserCase.CancelMembershipUseCase(
        params
      );

      cancelMembershipUserCase
        .execute()
        .then(res => {
          localStorage.removeItem("LoginUser");
          location.reload(true);
        })
        .catch(err => {
          console.log(err);
          this.$bvToast.toast("Cancel Fail", {
            title: "Error",
            toaster,
            solid: true,
            appendToast: append,
            variant: "danger"
          });
        });
    }
  }
});
</script>

<style lang="scss" scoped>
.my-profile-page-content {
  width: 100%;
  min-height: 80vh;
  display: flex;
  color: #fff;
  flex-direction: column;
  border: 1px solid #dddee0;
  @include min-sm {
    flex-direction: row;
  }
  &__left {
    background: $bg-color-blue;
    width: 100%;
    position: relative;
    @include min-sm {
      width: 30%;
    }
    &__header {
      margin: 20px 70px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
      @include min-sm {
        border-bottom: 1px solid #ccc;
      }
      &--name {
        display: none;
        @include min-sm {
          display: block;
          font-size: 18px;
          margin: 15px 0 0;
        }
      }
    }

    &__cancel-membership {
      position: absolute;
      bottom: 20px;
      left: 0;
      width: 100%;
      display: flex;
      justify-content: center;
      button {
        padding: 8px 30px;
      }
    }

    &__list-item {
      @include min-sm {
        margin-top: 60px;
      }
      ul {
        display: flex;
        @include min-sm {
          display: block;
        }
        li {
          width: 100%;
          text-align: center;
        }
      }
      .tab-item {
        padding: 15px 10px;
        border-top: 1px solid #ccc;
        border-left: 1px solid #ccc;
        cursor: pointer;
        &:hover {
          background: #fff;
          color: #1a489c;
        }
      }
      .tab-item:not(:first-child) {
        border-top: 1px solid #ccc;
        border-left: 1px solid #ccc;
        @include min-sm {
          border-top: 1px solid #ccc;
        }
      }
    }
  }
  &__right {
    position: relative;
    width: 100%;
    // @include min-sm {
    //   width: 70%;
    //   padding: 20px 40px;
    //   background: #fff;
    // }
    &__tab {
      padding: 15px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      @include min-sm {
        padding: 0;
      }
      .title {
        font-size: 30px;
        width: 100%;
        color: #000;
        margin-bottom: 30px;
      }

      .title-icon {
        cursor: pointer;
        float: right;
        font-size: 15px;
        &:hover {
          color: grey;
        }
      }

      .input-custom-container {
        width: 49%;
      }
    }
  }
}
.active {
  background: #fff;
  color: #1a489c;
}
.form-submit-button {
  width: 100%;
  .submit-button {
    float: right;
    background: #ffd25d;
    color: #232e48;
    font-weight: bold;
    border: none;
    padding: 20px;
    margin-bottom: 20px;
    font-size: 14px;
    width: 25%;
  }
}

.cancel-membership-modal {
  padding: 20px 20px 10px;
  &__title {
    font-size: 16px;
    margin-bottom: 30px;
    text-align: center;
  }

  &__button {
    width: 48%;
    padding: 8px 0;
  }
}
</style>
