import Constants from '../presentation/constants/constantsPlugin'

export default ({ _app }, inject) => {
  inject('constants', Constants)
}
