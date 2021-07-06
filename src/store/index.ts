// import createLogger from 'vuex/dist/logger'
import createGtmPlugin from '../plugins/gtmPlugin'

const gtmPlugin = createGtmPlugin()
export const plugins = [gtmPlugin]

export const strict = false
// const debug = process.env.NODE_ENV !== 'production'
// export const plugins = debug ? [createLogger({})] : []
export const namespaced = true