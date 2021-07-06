import { Languages } from '../constants'
import { ILanguage } from '../interfaces/common/locale'

const key = process.env.CLIENT_KEY || ''
const secret = process.env.CLIENT_SECRETE || ''
const encodeSecret = process.env.ENCODE_SECRET || ''
export default class Utilities {
  static delay = (duration = 1000): Promise<any> => {
    return new Promise((resolve, reject) => {
      try {
        setTimeout(() => {
          resolve(duration);
        }, duration);
      } catch (error) {
        reject(error)
      }
    })
  };

  static isObjectEmpty(obj: {}) {
    return Object.keys(obj).length === 0
  }

  /**
   * Returns a random number between min (inclusive) and max (exclusive)
   */
  static getRandomArbitrary = (min: number, max: number): number => {
    return Math.random() * (max - min) + min
  };

  static getRandomInt = (min: number, max: number): number => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  };

  static ecodedBase64Data = (data?: string) => {
    if (data) {
      let rs = btoa(data)
      rs = encodeSecret + '@&@&' + rs
      return btoa(rs)
    }
    return ''
  }

  static decodedBase64Data = (data?: string) => {
    if (data) {
      return atob(data[1])
    }
    return ''
  }

  static encodedKeyString = (str?: string) => {
    if (str) {
      return btoa(str)
    }
    return btoa(key)
  }

  static encodedSecretString = (str?: string) => {
    if (str) {
      return btoa(str)
    }
    return btoa(secret)
  }

  static decodedKeyString = (str?: string) => {
    if (str) {
      return atob(Utilities.encodedKeyString(str))
    }
    return atob(Utilities.encodedKeyString())
  }

  static decodedSecretString = (str?: string) => {
    if (str) {
      return atob(Utilities.encodedSecretString(str))
    }
    return atob(Utilities.encodedSecretString())
  }

  static getLocale(lang?: string): ILanguage {
    if (!lang) { return Languages[0] }
    const short_lang = lang.slice(0, 2)
    const locale = Languages.filter((item: ILanguage) => {
      return item.value === short_lang
    })
    if (!locale.length) {
      return Languages[0]
    }
    return locale[0]
  }

  static getBrowserLocale(lang: string): ILanguage {
    const short_lang = lang.slice(0, 2)
    const langFilter = Languages.filter((item: any) => {
      return item.value === short_lang
    })
    return langFilter[0]
  }
}
export function Log(value: any) {
  let color = ''
  if (typeof (value) === 'string') { color = '#3fb984' }
  if (Array.isArray(value)) { color = '#007bff;' }
  if (typeof (value) === 'object') { color = '#6610f2;' }
  if (!value) { console.log('%c \'No Value for Logging\'', 'color: red; font-size: 1.5em') }
  console.log(`%c ${value}`, `color: ${color}; font-size: 1.5em`)
}
