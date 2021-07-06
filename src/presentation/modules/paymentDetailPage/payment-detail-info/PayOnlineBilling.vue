<template>
  <div class="pay-online__billing">
    <h4>{{ getLang.billingDetails }}</h4>
    <div class="pay-online__biling billing-card">
      <div class="billing-card__header">
        <div class="billing-card__header__text">
          {{ getLang.billingSame }}
        </div>
      </div>
      <div
        v-for="(payCard, payCardIdx) in payOnlineData"
        :key="payCardIdx"
        class="billing-card__content"
      >
        <div v-if="payCardIdx > 0" class="billing-card__content__remove">
          <div>Add a card</div>
          <div @click="$_removeCard(payCardIdx)">removeCard</div>
        </div>
        <div class="billing-card__content-row">
          <div class="billing-card__content-card-number">
            <InputCustom
              :label="payCard.cardNumber.label"
              :icon="payCard.cardNumber.icon"
              :type="payCard.cardNumber.type"
              :value="payCard.cardNumber.value"
              :input-name="payCard.cardNumber.name"
              :validations="$v.payOnlineData.$each[payCardIdx].cardNumber.value"
              @input="input"
            />
            <div class="billing-card__birth-day">
              <SelectCustom
                :data="expirationDate"
                :label-text="getLang.card_expired_date"
                :default-selected-props="''"
                :validations="
                  $v.payOnlineData.$each[payCardIdx].Expiration.year
                "
                @input="$_onChangeYear"
              />
              <SelectCustom
                :data="expirationMonth"
                :default-selected-props="''"
                :validations="
                  $v.payOnlineData.$each[payCardIdx].Expiration.month
                "
                @input="$_onChangeMonth"
              />
            </div>
          </div>
          <div class="billing-card__content-card-name">
            <InputCustom
              :label="payCard.nameOnCard.label"
              :icon="payCard.nameOnCard.icon"
              :type="payCard.nameOnCard.type"
              :value="payCard.nameOnCard.value"
              :input-name="payCard.nameOnCard.name"
              :validations="$v.payOnlineData.$each[payCardIdx].nameOnCard.value"
              @input="input"
            />
            <div class="securityCode">
              <InputCustom
                :label="payCard.SecurityCode.label"
                :icon="payCard.SecurityCode.icon"
                :type="payCard.SecurityCode.type"
                :value="payCard.SecurityCode.value"
                :input-name="payCard.SecurityCode.name"
                :validations="
                  $v.payOnlineData.$each[payCardIdx].SecurityCode.value
                "
                @input="input"
              />
              <div class="securityCode__popup">
                <span class="icon-Icon-Credit-Card" />
                <p>{{ getLang.what }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="error" class="billing-card__header">
        <div class="add-card">
          {{ `Error: ${error}` }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { requiredValidation } from "../../../../shared/helper/vuelidate-validator";
import {
  paymentErrorCode,
  getMessageCodeError
} from "../../../../shared/constants/paymentErrorCode";

export default {
  name: "PayOnlineBilling",
  head() {
    return {
      script: [{ src: "https://pt01.mul-pay.jp/ext/js/token.js" }]
    };
  },
  data() {
    return {
      isPopupOpen: false,
      currentBillingIsSameStatus: ["billing-is-same"],
      savePaymentStatus: ["save-payment"],
      expirationDate: ["2000"],
      expirationMonth: ["2000"],
      error: ""
    };
  },
  validations: {
    payOnlineData: {
      $each: {
        cardNumber: {
          value: requiredValidation
        },
        nameOnCard: {
          value: requiredValidation
        },
        SecurityCode: {
          value: requiredValidation
        },
        Expiration: {
          year: requiredValidation,
          month: requiredValidation
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      isMonthYearSelected: "paymentDetail/isMonthYearSelected",
      isPaymentTriggered: "paymentDetail/isPaymentTriggered",
      changeFormSelectedStatus: "paymentDetail/changeFormSelectedStatus"
    }),
    getLang() {
      return {
        billingDetails: this.$t("payment_info.billing_details"),
        what: this.$t("payment_info.what_is_cvv"),
        whatx: this.$t("payment_info.what_is_cvv_text"),
        billingSame: this.$t("payment_info.billing_same"),
        save: this.$t("payment_info.save_payment"),
        card_number: this.$t("forms.card_number"),
        card_name: this.$t("forms.card_name"),
        card_security: this.$t("forms.card_security"),
        card_expired_date: this.$t("forms.card_expired_date")
      };
    },
    isFormInValid() {
      return this.$v.$invalid;
    },
    payOnlineData() {
      return [
        {
          cardNumber: {
            name: "cardNumber",
            icon: "",
            value: "",
            type: "text",
            label: this.getLang.card_number
          },
          nameOnCard: {
            name: "nameOnCard",
            value: "",
            type: "text",
            icon: "",
            label: this.getLang.card_name
          },
          Expiration: {
            year: "",
            month: ""
          },
          SecurityCode: {
            name: "SecurityCode",
            value: "",
            type: "text",
            icon: "",
            label: this.getLang.card_security
          },
          savePayment: true,
          paymentId: 0
        }
      ];
    }
  },
  watch: {
    isFormInValid(newValue) {
      this.setValidForm(!newValue);
    },
    isFormVadatedChange() {
      this.ceFormSelectedStatus({ isFormValidated: true });
    },
    isPaymentTriggered(_newValue) {
      this.$v.$touch();
      if (!this.isFormInValid) {
        this.doPurchase();
      }
    }
  },
  mounted() {
    this.handelExpirationDate();
    this.handelExpirationMonth();
    this.payOnlineData[0].Expiration.year = this.expirationDate[0].value;
    this.payOnlineData[0].Expiration.month = this.expirationMonth[0].value;
  },
  methods: {
    ...mapActions({
      setValidForm: "paymentDetail/setValidForm",
      getDataPayment: "paymentDetail/getDataPayment"
    }),
    $_addCard() {
      this.payOnlineData.push({
        cardNumber: {
          name: "cardNumber",
          icon: "",
          value: "",
          type: "text",
          label: "Card Number"
        },
        nameOnCard: {
          name: "nameOnCard",
          label: "Name on Card",
          value: "",
          type: "text",
          icon: ""
        },
        Expiration: {
          name: "Expiration",
          label: "Expiration Date",
          value: "",
          type: "text",
          icon: ""
        },
        SecurityCode: {
          name: "SecurityCode",
          label: "SecurityCode/CVV",
          value: "",
          type: "text",
          icon: ""
        },
        savePayment: true,
        paymentId:
          this.payOnlineData[this.payOnlineData.length - 1].paymentId + 1
      });
    },
    $_removeCard(index) {
      this.payOnlineData.splice(index, 1);
    },
    input(target) {
      const { value, name } = target;
      this.payOnlineData[0][name].value = value;
      this.$v.payOnlineData.$each[0][name].$touch();
    },
    $_onChangeYear(e) {
      this.payOnlineData[0].Expiration.year = e;
    },
    $_onChangeMonth(e) {
      this.payOnlineData[0].Expiration.month = e;
    },
    $_savePayment(e) {
      this.payOnlineData[0].savePayment = e;
    },
    handelExpirationDate() {
      const expirationDate = [];
      const thisYear = new Date().getFullYear();
      let yearNumberBefore = 0;
      for (let index = 0; index <= 15; index++) {
        const obj = thisYear + yearNumberBefore;
        yearNumberBefore++;
        expirationDate.push(obj);
      }
      return (this.expirationDate = expirationDate);
    },
    handelExpirationMonth() {
      const expirationMonth = [];
      for (let index = 1; index <= 12; index++) {
        const obj = index < 10 ? `0${index}` : index;
        expirationMonth.push(obj);
      }
      return (this.expirationMonth = expirationMonth);
    },
    doPurchase() {
      const cardno = this.payOnlineData[0].cardNumber.value;
      const expire = `${this.payOnlineData[0].Expiration.year}${this.payOnlineData[0].Expiration.month}`;
      const securitycode = this.payOnlineData[0].SecurityCode.value;
      const holdername = this.payOnlineData[0].nameOnCard.value;
      Multipayment.init("tshop00027497");
      Multipayment.getToken(
        {
          cardno: cardno && cardno.trim(),
          expire: expire && expire.trim(),
          securitycode: securitycode && securitycode.trim(),
          holdername: holdername && holdername.trim()
        },
        res => {
          if (res.resultCode === paymentErrorCode.SuccessfulAcquisition.code) {
            this.error = "";
            this.getDataPayment(res.tokenObject);
          } else {
            const errorMessage = getMessageCodeError(res.resultCode);
            this.error = errorMessage;
          }
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.pay-online__biling {
  margin-top: 40px;

  h4 {
    display: none;

    @include min-sm {
      display: block;
    }
  }

  &.billing-card {
    .billing-card {
      &__header {
        border: 1px solid $border-color-gray-2;
        border-radius: 2px 2px 0 0;
        padding: 15px 24px;
        background: $bg-color-gray-10;
        font-size: 13px;
        &__text {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          font-size: 13px;
          line-height: 22px;
          position: relative;
          padding-left: 25px;
          &::before {
            content: "";
            width: 10px;
            height: 10px;
            background: #1a489c;
            display: block;
            border-radius: 5px;
            position: absolute;
            left: 3px;
          }
          &::after {
            content: "";
            width: 16px;
            height: 16px;
            display: block;
            border-radius: 8px;
            border: 1px solid #1a489c;
            position: absolute;
            left: 0;
          }
        }
      }
      &__header:last-child {
        margin-top: 15px;
        border-radius: 0 0 2px 2px;
      }
      &__content {
        padding: 30px 24px;
        border: 1px solid $border-color-gray-2;
        border-top: none;
        border-radius: 0 0 2px 2px;
        &__remove {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 13px;
          font-weight: bold;
          margin-bottom: 20px;
          :first-child {
            font-size: 18px;
            font-weight: bold;
          }
        }
        &-row {
          display: flex;
          justify-content: space-between;
          flex-direction: column-reverse;

          @include min-sm {
            flex-direction: row;
          }

          &__date {
            width: 100%;

            @include min-sm {
              width: 314px;
            }
          }

          &__security {
            width: 100%;
            display: flex;
            align-items: flex-start;
            justify-content: space-between;

            @include min-sm {
              width: 264px;
            }
          }
        }

        &-card {
          &-name {
            width: 100%;

            @include min-sm {
              width: 264px;
            }
          }

          &-number {
            width: 100%;

            @include min-sm {
              width: 314px;
            }
          }

          &-security {
            width: 45%;

            &.security-popup {
              width: auto;
              height: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              flex-direction: column;

              @include min-sm {
                height: auto;
              }
            }

            @include min-sm {
              width: 145px;
            }

            &-info {
              width: 45%;
              display: flex;
              flex-direction: column;
              color: $text-color-blue-2;
              align-items: center;
              font-size: 12px;
              margin-top: 25px;

              [class^="icon-"],
              [class*=" icon-"] {
                font-size: 25px;
                color: $text-color-gray;
              }

              @include min-sm {
                width: 100%;
              }
            }
          }
        }
      }
      &__birth-day {
        .app-select:first-child {
          margin-right: 20px;
        }
        display: flex;
      }
    }
  }
}
.add-card {
  width: 100%;
  display: flex;
  align-items: center;
  font-weight: bold;
  color: red;
  cursor: pointer;

  [class^="icon-"],
  [class*=" icon-"] {
    margin-right: 20px;
    font-size: 10px;
    font-weight: bold;
    background: $bg-color-blue-2;
    color: $white;
    padding: 4px;
    border-radius: 50%;
  }
}
.securityCode {
  display: flex;
  align-items: center;
  .input-custom-container {
    width: 55%;
  }
  &__popup {
    margin-left: 20px;
    text-align: center;
  }
}
</style>
