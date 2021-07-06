
import { CreditCardTypes } from '../constants'

export default class CreditCardHelper {
    static getCardIconFromType = (type: string) => {
      switch (type.toUpperCase()) {
        case CreditCardTypes.Visa:
        case CreditCardTypes.MasterCard:
        case CreditCardTypes.JCB:
        default:
          return null
      }
    };
}
