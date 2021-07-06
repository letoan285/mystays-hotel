import * as types from './types'

export default {
  changePaymentMethodStatus: ({ commit }: any, payload: any) => {
    commit(types.PAYMENT_METHOD_SELECTED, { payload })
  },
  changeMonthYearSelectorStatus: ({ commit }: any, payload: any) => {
    commit(types.CHANGE_MONTH_YEAR_SELECTOR_STATUS, { payload })
  },
  changeFormSelectedStatus: ({ commit }: any, payload: any) => {
    commit(types.CHANGE_FORM_SELECTED_STATUS, { payload })
  },
  triggerPayment: ({ commit }: any) => {
    commit(types.TRIGGER_PAYMENT)
  },
  setValidForm: ({ commit }: any, payload: any) => {
    commit(types.SET_FORM_PAYMENT_VALID, { payload })
  },
  getDataPayment: ({ commit }: any, payload: any) => {
    commit(types.GET_DATA_PAYMENT, { payload })
  }
}
