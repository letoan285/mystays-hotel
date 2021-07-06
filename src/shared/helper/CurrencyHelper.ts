import numeral from 'numeral'

import { CurrencyCode, PriceFormat } from '../constants'

export default class CurrencyHelper {
    static getCurrencySymbol = (currencyCode: string) => {
      if (currencyCode) {
        switch (currencyCode.toLowerCase()) {
          case CurrencyCode.Vietnam:
            return 'đ'
          case CurrencyCode.Dollar:
            return '$'
          case CurrencyCode.Yen:
            return '¥'
          default:
            return '¥'
        }
      }
      return 'd'
    };

    static getFormattedPrice = (currencyCode: string, price: number) => {
      const symbol = CurrencyHelper.getCurrencySymbol(currencyCode)

      if (price > 0) {
        const format = PriceFormat.Default
        return `${symbol}${numeral(price).format(`${format} ${symbol}`)}`.replace(/,/g, ',')
      }

      if (price === 0) {
        return `${symbol}0`
      }

      if (price < 0) {
        const format = PriceFormat.Default
        return `- ${symbol}${numeral(-price).format(`${format} ${symbol}`)}`.replace(/,/g, ',')
      }
    };

    static convertPrice = (price: number, rate: number): number => {
      return price * rate
    };
}
