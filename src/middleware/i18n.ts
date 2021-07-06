interface ILocale {
  isHMR: any
  app: any
  store: any
  route: any
  params: any
  error: any
  redirect: any
}
export default function ({ isHMR, store, error }: ILocale) {
  // const defaultLocale = app.i18n.fallbackLocale || 'jp';

  // route.append('zh-cn');
  // If middleware is called from hot module replacement, ignore it
  if (isHMR) {
    return
  }
  // const locale = route.query.lang || defaultLocale;
  // let local = 'en-us';
  if (!store.state.general.data.locales) {
    return error({ message: 'This page could not be found.', statusCode: 404 })
  }
  // Mutate the store's locale once we understand which locale is being requested prior to each page render
  // store.dispatch('general/changeLanguage', locale)// commit action with locale is English
  // Set locale from the query string '?lang='**''
  // app.i18n.locale = 'en-US'
}
