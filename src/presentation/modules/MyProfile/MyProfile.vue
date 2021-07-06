<template>
  <section class="my-profile" v-if="isPageLoaded">
    <div class="my-profile-page__content">
      <div v-if="userInfo" id="profile" class="my-profile-page__content__tab">
        <div class="title">
          <span class="title-text font-weight-bold">{{
            getTextString.my_profile
          }}</span>
          <span class="title-icon" @click="editProfile">
            <span>{{ getLang.editProfile }} -</span>
            <BIconPencilSquare></BIconPencilSquare>
          </span>
        </div>
        <InputCustom
          v-for="(inputValue, itemIdx) in userInfo[0]"
          :key="itemIdx"
          :label="inputValue.label"
          :icon="'item.icon'"
          :type="'text'"
          :input-name="inputValue.name"
          :disabled="!inputValue.editable || !editable"
          :value="inputValue.value"
          :validations="$v.userInfo.$each[0][inputValue.name].value"
          @input="input"
        >
          <span
            v-if="
              $v.userInfo.$each[0][inputValue.name].value.$dirty &&
                $v.userInfo.$each[0][inputValue.name].value.required &&
                !$v.userInfo.$each[0][inputValue.name].value.required
            "
            class="app-input__validation"
            >{{ getLang.required }}</span
          >
          <span
            v-else-if="
              $v.userInfo.$each[0][inputValue.name].value.$dirty &&
                !checkIsExits(
                  $v.userInfo.$each[0][inputValue.name].value.email
                ) &&
                !$v.userInfo.$each[0][inputValue.name].value.email
            "
            class="app-input__validation"
            >{{ getLang.validEmail }}</span
          >
        </InputCustom>
        <div class="form-submit-button">
          <button
            v-show="editable"
            class="app-button app-button--primary float-right submit-button"
            type="submit"
            @click="updateProfile"
          >
            {{ "submit" }}
          </button>
        </div>

        <div
          class="my-profile-page__content__cancel-membership d-flex d-md-none mt-4"
        >
          <button
            class="button m-btn m-btn__yellow"
            @click="onOpenCancelMembershipModal"
          >
            Cancel Membership
          </button>
        </div>

        <MyStayPopup
          ref="cancel-membership"
          size="sm"
          modal-class="modal-delete"
        >
          <div class="cancel-membership-modal">
            <div class="cancel-membership-modal__title">
              {{ getLang.sure_to_cancel_membership }}
            </div>
            <div class="d-flex justify-content-between">
              <button
                class="m-btn m-btn__white cancel-membership-modal__button"
                @click="onCancel"
              >
                Cancel
              </button>
              <button
                class="m-btn m-btn__yellow cancel-membership-modal__button"
                @click="onCancelMembership"
              >
                Confirm
              </button>
            </div>
          </div>
        </MyStayPopup>
      </div>
    </div>
  </section>
</template>

<script>
import { isNullOrUndefined } from "util";
import Vue from "vue";
import { mapActions, mapState } from "vuex";
import moment from "moment";

import { STATIC_HOTEL_ID } from "../../../shared/constants";
import {
  requiredValidation,
  phoneValidation
} from "../../../shared/helper/vuelidate-validator";

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
  validations() {
    if (this.editable) {
      return {
        userInfo: {
          $each: {
            firstName: {
              value: requiredValidation
            },
            lastName: {
              value: requiredValidation
            },
            firstNameKana: {
              value: requiredValidation
            },
            lastNameKana: {
              value: requiredValidation
            },
            phoneNumber: {
              value: phoneValidation
            },
            emailAddress: {
              value: {}
            },
            birthday: {
              value: requiredValidation
            },
            created: {
              value: {}
            }
          }
        }
      };
    }
    return {
      userInfo: {
        $each: {
          firstName: {
            value: {}
          },
          lastName: {
            value: {}
          },
          firstNameKana: {
            value: {}
          },
          lastNameKana: {
            value: {}
          },
          phoneNumber: {
            value: {}
          },
          emailAddress: {
            value: {}
          },
          birthday: {
            value: {}
          },
          created: {
            value: {}
          }
        }
      }
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
          name: this.getTextString.my_profile
        },
        billHistory: {
          id: 1,
          name: this.getLang.yourBooking
        },
        rewards: {
          id: 2,
          name: this.getLang.my_rewards
        }
      };
    },

    userInfo() {
      let userInfo = null;
      const data = this.userData;
      if (data && data.first_name) {
        userInfo = [
          {
            firstName: {
              name: "firstName",
              label: `${this.$t("forms.first_name")}`,
              value: data.first_name,
              editable: true
            },
            lastName: {
              name: "lastName",
              label: this.getLang.lastName,
              value: data.last_name,
              editable: true
            },
            firstNameKana: {
              name: "firstNameKana",
              label: this.getLang.kanjiFirstName,
              value: data.first_name_kana,
              editable: true
            },
            lastNameKana: {
              name: "lastNameKana",
              label: this.getLang.kanjiLastName,
              value: data.last_name_kana,
              editable: true
            },
            emailAddress: {
              name: "emailAddress",
              label: this.getLang.email,
              value: data.email
            },
            phoneNumber: {
              id: 1,
              name: "phoneNumber",
              label: this.getLang.phone,
              value: data.phone,
              editable: true
            },
            birthday: {
              name: "birthday",
              label: this.getLang.birthDay,
              value: moment(data.birthday).format("DD-MM-YYYY"),
              editable: true
            },
            created: {
              name: "created",
              label: this.getLang.joiningDate,
              value: moment(data.created_at).format("DD-MM-YYYY"),
              editable: false
            }
          }
        ];
      }
      return userInfo;
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
        my_reward: this.$t("headers.my_reward"),
        joiningDate: this.$t("my_profile.joining_date"),
        birthDay: this.$t("my_profile.birthDay"),
        billHistory: this.$t("my_profile.bill_history"),
        myRewards: this.$t("my_profile.my_rewards"),
        editProfile: this.$t("my_profile.edit_profile"),
        sure_to_cancel_membership: this.$t(
          "my_profile.sure_to_cancel_membership"
        ),
        cancel_membership: this.$t("my_profile.cancel_membership")
      };
    },
    isValid() {
      return !this.$v.$invalid;
    }
  },
  watch: {
    isUpdateSuccess(newValue) {
      if (newValue === true && newValue !== "") {
        this.toast("b-toaster-top-center", true, true);
      } else if (newValue === false) {
        this.toast("b-toaster-top-center", true, false);
      }
    }
  },
  methods: {
    ...mapActions({
      handleUpdateUserInfo: "users/updateUserInfo"
    }),
    toast(toaster, append = false, isSuccess) {
      this.counter++;
      this.$bvToast.toast(
        isSuccess ? "Updated Successfully" : "Updated Failed",
        {
          title: isSuccess ? "Success" : "Error",
          toaster,
          solid: true,
          appendToast: append,
          variant: isSuccess ? "success" : "danger"
        }
      );
    },
    checkIsExits(param) {
      return isNullOrUndefined(param);
    },
    changeTab(index) {
      this.selectedTab = index;
    },
    editProfile() {
      this.editable = true;
    },
    updateProfile() {
      // Login->get Client Session --> update info
      this.$v.$touch();
      if (this.isValid) {
        const user = {
          first_name: this.userInfo[0].firstName.value,
          last_name: this.userInfo[0].lastName.value,
          email_permission: true,
          birthday: this.userInfo[0].birthday.value,
          phone: this.userInfo[0].phoneNumber.value,
          // streetAddress: this.userInfo[0].streetAddress.value,
          first_name_kana: this.userInfo[0].firstNameKana.value,
          last_name_kana: this.userInfo[0].lastNameKana.value,
          // gender: this.userInfo[0].gender.value,
          // companyName: this.userInfo[0].companyName.value,
          // organizationRole: this.userInfo[0].organizationRole.value,
          hotel_id: STATIC_HOTEL_ID,
          session: this.userData.session
        };
        this.handleUpdateUserInfo(user);
        this.editable = false;
      }
    },
    input(target) {
      this.userInfo[0][target.name].value = target.value;
      this.$v.userInfo.$each[0][target.name].value.$touch();
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
.my-profile-page {
  width: 100%;
  height: 800px;
  display: flex;
  color: #fff;
  flex-direction: column;
  border: 1px solid #dddee0;
  @include min-sm {
    flex-direction: row;
  }

  &__content {
    width: 100%;

    @include min-sm {
      padding: 30px;
    }
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

    &__cancel-membership {
      display: flex;
      justify-content: center;
      button {
        padding: 8px 30px;
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
