import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

interface I18nInterface<T> {
  app: any;
  store: T;
}

export default async ({ app }: I18nInterface<any>) => {
  // inject our i18n instance into the app root to be used in middleware
  // we assume a store/general/state.ts file has been defined and the variable 'locale' defined on store, we'll go into this in detail in the next code snippet

  app.i18n = await new VueI18n({ // construction a new VueI18n
    // locale: 'us_en',// app.store.state.general.data.locale,
    locale: app.store.state.general.data.locale.messages.en,
    fallbackLocale: 'en-US', // always displays Japanesese if English translation is not available
    messages: {
      // 'en-US': require('~/presentation/theme/localization/resources/en.json'),
      'en-US': require('~/presentation/theme/localization/resources/en.json')
      // 'zh-TW': require('~/presentation/theme/localization/resources/tw.json'),
      // 'ko-KR': require('~/presentation/theme/localization/resources/kr.json'),
      // 'zh-CN': require('~/presentation/theme/localization/resources/cn.json')
    },

    // messages: {
    //   'en-US': require('~/presentation/theme/localization/resources/en.json'),
    //   'ja-JP': require('~/presentation/theme/localization/resources/jp.json'),
    //   'zh-TW': require('~/presentation/theme/localization/resources/tw.json'),
    //   'ko-KR': require('~/presentation/theme/localization/resources/kr.json'),
    //   'zh-CN': require('~/presentation/theme/localization/resources/cn.json')
    // },
    silentTranslationWarn: true
  })
}
