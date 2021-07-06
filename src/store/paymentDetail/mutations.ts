import * as types from './types'

export default {
  [types.PAYMENT_METHOD_SELECTED]: (state: any, action: types.IActions<any>) => {
    if (action.payload === 'payOnline') {
      state.paymentMethodSelected.payOnline = true
      state.paymentMethodSelected.payLater = false
    } else {
      state.paymentMethodSelected.payOnline = false
      state.paymentMethodSelected.payLater = true
    }
  },
  [types.CHANGE_MONTH_YEAR_SELECTOR_STATUS]: (state: types.IState, action: types.IActions<any>) => {
    state.isMonthYearSelected = action.payload.isMonthYearSelected
  },
  [types.CHANGE_FORM_SELECTED_STATUS]: (state: types.IState, action: types.IActions<any>) => {
    state.isFormValidated = action.payload.isFormValidated
  },
  [types.TRIGGER_PAYMENT]: (state: types.IState) => {
    state.isPaymentTriggered = !state.isPaymentTriggered
  },
  [types.SET_FORM_PAYMENT_VALID]: (state: types.IState, action: any) => {
    state.isFormValidated = action.payload
  },
  [types.GET_DATA_PAYMENT]: (state: any, action: any) => {
    state.paymentState.token = action.payload
  }
}
