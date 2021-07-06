export default () => ({
  paymentMethodSelected: {
    payOnline: false,
    payLater: false
  },
  isFormValidated: false,
  isMonthYearSelected: false,
  isPaymentTriggered: false,
  isLoading: false,
  paymentState: {
    data: {},
    error: {},
    token: ''
  }
})
