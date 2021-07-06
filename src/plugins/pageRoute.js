import PageRoute from '../shared/constants/PageRoute';

export default ({ app }, inject) => {
  inject('pageRoute', PageRoute)
}
