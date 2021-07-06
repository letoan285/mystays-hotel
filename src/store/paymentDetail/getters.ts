import { IState } from "./types";

interface IMethod {
  name: string;
  code: string;
}

export default {
  paymentMethodSelected: (state: IState) => state.paymentMethodSelected,
  isPaymentTriggered: (state: IState) => state.isPaymentTriggered,
  isBillingInformationValidated: (state: IState) =>
    state.isFormValidated && state.isMonthYearSelected,
  isMonthYearSelected: (state: IState) => state.isMonthYearSelected,
  paymentMethodList(_state: any, _getters: any, rootState: any) {
    const { roomSelectedFromAPI } = rootState.hotelDetail;

    return roomSelectedFromAPI.payment_method;
  },
  paymentMethod(_state: any, getters: any) {
    const { paymentMethodList } = getters;
    let paymentMethod = {
      isOnsite: false,
      isCreditCard: false,
      isOnsideCreditCardRequired: false
    };
    if (paymentMethodList?.length) {
      paymentMethodList.forEach((method: IMethod) => {
        switch (method.code) {
          case "on_site":
            paymentMethod.isOnsite = true;
            break;
          case "on_site_credit_card_required":
            paymentMethod.isOnsideCreditCardRequired = true;
            break;
          case "credit_card":
            paymentMethod.isCreditCard = true;
            break;
          default:
            break;
        }
      });
    }

    return paymentMethod;
  }
};
