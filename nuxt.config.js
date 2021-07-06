import redirectSSL from 'redirect-ssl'
import webpack from 'webpack'
export default {
  env: {
    HOTEL_ID: '975',
    ENCODE_SECRET: 'secret',
    BASE_URL: 'http://localhost:3000',

    CLIENT_KEY: '95c4c740baf34b0',
    CLIENT_SECRETE: '49edc0373a99c2d7',

    NEW_CLIENT_KEY: 'd26018b0375647f7',
    NEW_CLIENT_SECRETE: 'e18731cf366143b4',

    SESSION_URL: 'https://idp.staging.tripla.ai/api/client_sessions',
    ACCESS_TOKEN_URL:
      'https://mystaystripla.auth.ap-northeast-1.amazoncognito.com/oauth2/token'
  },
  mode: 'universal',
  serverMiddleware: [
    {
      path: '/api',
      handler: '~/api/index.js'
    },
    redirectSSL.create({
      enabled: process.env.NODE_ENV === 'production',
      exclude: ['localhost']
    })
  ],
  generate: {
    routes: [
      '/hotel',
      '/cancel',
      '/confirm-booking',
      '/guest-detail',
      '/summary',
      '/hotels-list',
      '/payment'
    ]
  },
  /*
   ** Headers of the page
   */
  server: {
    port: 8081, // default: 3000
    host: '0.0.0.0' // default: localhost
  },
  srcDir: 'src/',
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      }
    ],
    script: [
      {
        src: 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */

  loading: false,
  components: ['./presentation/'],
  /*
   ** Global CSS
   */
  // css: [
  //   '~/assets/scss/style.scss'
  // ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    'plugins/currency.js',
    'plugins/scrollBody.js',
    'plugins/i18n.ts',
    'plugins/vuelidate.js',
    'plugins/directives.ts',
    'plugins/filters.ts',
    'plugins/icons.js',
    'plugins/constants.js',
    'plugins/pageRoute.js',
    // { src: '~plugins/sw.js', ssr: false },
    {
      src: '~plugins/baiduMapCluster.js',
      ssr: false
    },
    {
      src: '~plugins/vueIdle.js',
      ssr: false
    },
    {
      src: '~plugins/baiduMap.js',
      ssr: false
    },
    {
      src: '~/plugins/localStorage.js',
      ssr: false
    },
    {
      src: '~plugins/vue2GoogleMap.js'
    },
    {
      src: '~plugins/gtm.js',
      ssr: false
    }
  ],
  pwa: {
    manifest: {
      name: 'Mystays',
      lang: 'en-US',
      useWebmanifestExtension: false
    },
    cleanupOutdatedCaches: true,
    workbox: {
      // importScripts: [
      //   'custom-sw.js'
      // ],
      // cachingExtensions: '@/plugins/workbox-range-request.js',
      cacheAssets: true,
      offlinePage: '/.*',
      runtimeCaching: [
        {
          urlPattern: '/.*',
          handler: 'networkFirst',
          method: 'GET',
          strategyOptions: {
            cacheName: 'mystays-api-cache',
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        },
        {
          urlPattern: 'https://endpoint.tripla.ai/.*',
          handler: 'networkFirst',
          method: 'GET',
          strategyOptions: {
            cacheName: 'enpoint',
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        },
        {
          urlPattern: 'https://endpoint.tripla.ai/.*',
          handler: 'networkFirst',
          method: 'POST',
          strategyOptions: {
            cacheName: 'enpoint',
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        },
        {
          urlPattern: 'https://d1vhtuaxtr1kgn.cloudfront.net/.*',
          handler: 'networkFirst',
          method: 'GET',
          strategyOptions: {
            cacheName: 'enpoint',
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        },
        {
          urlPattern: 'https://d2ahiw9kb7is19.cloudfront.net/.*',
          handler: 'networkFirst',
          method: 'GET',
          strategyOptions: {
            cacheName: 'enpoint',
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }
      ]
      /* workbox options */
    }
  },
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxt/typescript-build',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    '@nuxtjs/router',
    '@nuxtjs/pwa'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/style-resources',
    'nuxt-clipboard2',
    'vue-social-sharing/nuxt',
    '@nuxtjs/pwa',
    [
      'nuxt-lazy-load',
      {
        directiveOnly: true
      }
    ]
  ],
  bootstrapVue: {
    components: [
      'BAlert',
      'BCollapse',
      'BSkeleton',
      'BButton',
      'BCard',
      'BFormGroup',
      'BFormRadioGroup',
      'BFormTextarea',
      'BSpinner',
      'BModal',
      'BTooltip',
      'BToast'
    ],
    directivePlugins: ['VBTooltipPlugin', 'VBTogglePlugin']
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    transpile: [/^vue2-google-maps($|\/)/],
    plugins: [
      new webpack.ContextReplacementPlugin(
        /moment[/\\]locale$/,
        /ja|en-us|ko|zh-cn|zh-tw/
      )
    ],
    babel: {
      presets: [
        [
          require.resolve('@nuxt/babel-preset-app'),
          {
            browsers: ['IE 11', 'last 2 version']
          }
        ]
      ],
      plugins: [
        '@babel/plugin-proposal-optional-chaining'
      ],
      compact: true
    },
    extractCSS: true,
    optimizeCSS: true,
    html: {
      minify: {
        minifyURLs: true,
        removeComments: true,
        removeEmptyElements: true,
        removeTagWhitespace: true,
        removeEmptyAttributes: true,
        removeOptionalTags: true
      }
    },
    extend (config) {
      // eslint-disable-next-line no-unused-expressions
      (config.externals = {
        canvg: 'canvg',
        html2canvas: 'html2canvas',
        dompurify: 'dompurify'
        // eslint-disable-next-line no-sequences
      }),
      (config.resolve.symlinks = false)
    }
  },
  styleResources: {
    scss: ['./assets/scss/styleResource.scss']
  }
}
