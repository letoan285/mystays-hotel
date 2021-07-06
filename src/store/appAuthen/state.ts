export const strict = false
export default (): any => ({
  isFetching: false,
  status: '',
  data: {
    position: { lat: 0, long: 0 }
  },
  params: '',
  errorMessage: '',
  actionType: '',
  success: false,
  canLoadMore: null,
  isSignupOpen: false,
  isLoginOpen: false,
  isShowCancelReservation: true,
  isResetPassword: false,
  isShowSearchBox: false
})
