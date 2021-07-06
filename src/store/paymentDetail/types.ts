export const PAYMENT_METHOD_SELECTED = 'PAYMENT_METHOD_SELECTED'
export const CHANGE_FORM_SELECTED_STATUS = 'CHANGE_FORM_SELECTED_STATUS'
export const CHANGE_MONTH_YEAR_SELECTOR_STATUS = 'CHANGE_MONTH_YEAR_SELECTOR_STATUS'
export const TRIGGER_PAYMENT = 'TRIGGER_PAYMENT'

export const SET_FORM_PAYMENT_VALID = 'SET_FORM_PAYMENT_VALID'
export const GET_DATA_PAYMENT = 'GET_DATA_PAYMENT'

export interface IActions<T> {
  type: string;
  payload?: T;
}

export interface IState {
  paymentMethodSelected: string,
  isFormValidated: boolean,
  isMonthYearSelected: boolean,
  isPaymentTriggered: boolean
}
