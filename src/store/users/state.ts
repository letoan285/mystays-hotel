import { IState } from '~/src/shared/interfaces/common'
interface IData {
    userData: any;
    session_token: string;
    session: string;
    isLogin: boolean;
}

export interface UserState<T = any> extends IState<any> {

}

export default (): any => ({
  isFetching: true,
  status: '',
  data: {
    userData: null,
    session_token: '',
    session: '',
    isLogin: false,
    ressetPasswordToken: null,
    isLoading: false,
    errorMsg: null,
    errorMsgSignUp: null,
    isResetPasswordSuccess: false,
    isUpdateSuccess: '',
    isConfirmationSuccess: null
  },
  params: '',
  errorMessage: [],
  loginErrorMessage: [],
  actionType: '',
  success: false,
  canLoadMore: false
})
