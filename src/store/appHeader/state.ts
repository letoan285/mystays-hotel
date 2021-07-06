export const strict = false
export const namespaced = true

export default (): any => ({
  isFetching: false,
  status: '',
  data: {
    language: 'en',
    fullLang: 'en-US',
    currency: '$'
  },
  params: '',
  errorMessage: '',
  actionType: '',
  success: false,
  canLoadMore: null,
  isSignupOpen: false,
  isLoginOpen: false
})
