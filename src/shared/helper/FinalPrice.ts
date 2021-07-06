
export default class FinalPrice {
    private static calculateFinalPriceFromBaseSpecialAndTier = (qty: number, _basePrice: any, specialPrice: any, tierPriceSort: any): number => {
      /**
         * Final Price with BasePrice + SpecialPrice + TierPrice
         * Loop TierPrice
         * 1. Qty Product with Tier > Qty Input
         * 2. Qty[i] Product with Tier < Qty input && Qty Input < Qty[i + 1] Product with Tier
         * 3. Qty Input >= Qty Qty Product with Tier ended
         */
      let finalPrice = 0
      for (let i = 0; i < tierPriceSort.length; i++) {
        if (tierPriceSort[i]._qty > qty) {
          finalPrice = parseFloat(specialPrice._price)
          break
        } else if (i < tierPriceSort.length - 1 && tierPriceSort[i]._qty <= qty && qty < tierPriceSort[i + 1]._qty) {
          finalPrice = tierPriceSort[i]._value
          break
        } else if (qty >= tierPriceSort[tierPriceSort.length - 1]._qty) {
          finalPrice = tierPriceSort[tierPriceSort.length - 1]._value
          break
        }
      }
      return finalPrice
    };

    private static calculateFinalPriceFromBaseAndSpecial = (_qty: number, basePrice: any, specialPrice: any): number => {
      let finalPrice = 0
      /**
         * Final Price with BasePrice + SpecialPrice
         * 1. Special Price with fromDate & endDate
         * + saleFrom > today & saleEnd < today ===> finalPrice = basePrice
         * + saleFrom < today & saleEnd > today ===> finalPrice = specialPrice
         * 2. Special Price only fromDate
         * + saleFrom < today ===> finalPrice = basePrice
         * + saleFrom > today ===> finalPrice = specialPrice
         */
      const today = new Date().getTime()
      if (specialPrice._price && specialPrice._fromDate &&
            specialPrice._endDate) {
        const saleFrom = new Date(specialPrice._fromDate).getTime()
        const saleEnd = new Date(specialPrice._endDate).getTime()
        if ((saleFrom > today && saleEnd > today) ||
                (saleFrom < today && saleEnd < today)) {
          finalPrice = basePrice
        } else if (saleFrom < today && saleEnd > today) {
          finalPrice = parseFloat(specialPrice._price)
        }
      } else if (specialPrice._price && specialPrice._fromDate) {
        const sale = new Date(specialPrice._fromDate).getTime()
        if (sale < today) {
          finalPrice = basePrice
        } else {
          finalPrice = parseFloat(specialPrice._price)
        }
      }
      return finalPrice
    };

    private static calculateFinalPriceFromBaseAndTier = (qty: number, basePrice: any, tierPriceSort: any): number => {
      /**
         * Final Price with BasePrice + TierPrice
         * 1. Exist tierPrice
         * + Qty Product with Tier > Qty Input ===> finalPrice = basePrice
         * + Qty [i]Product with Tier < Qty Input & Qty Input < Qty [i+1]Product with Tier ===> finalPrice = tierPrice
         * + Qty Input >= Qty Product with Tier Ended ===> finalPrice = tierPrice Ended
         * 2. Exist basePrice
         * + ===> finalPrice = basePrice;
         */
      let finalPrice = 0
      for (let i = 0; i < tierPriceSort.length; i++) {
        if (tierPriceSort[i]._qty > qty) {
          finalPrice = parseFloat(basePrice)
          break
        } else if (i < tierPriceSort.length - 1 && tierPriceSort[i]._qty <= qty && qty < tierPriceSort[i + 1]._qty) {
          finalPrice = tierPriceSort[i]._value
          break
        } else if (qty >= tierPriceSort[tierPriceSort.length - 1]._qty) {
          finalPrice = tierPriceSort[tierPriceSort.length - 1]._value
          break
        }
      }
      return finalPrice
    };

    public static calculateFinalPrice = (qty: number, basePrice: any, specialPrice?: any, tierPrice?: any): number => {
      let finalPrices = 0
      const tierPriceSort: Array<any> = []
      tierPriceSort.push(tierPrice)

      if (qty && basePrice && specialPrice && specialPrice._price !== null && tierPrice && Array.isArray(tierPrice)) {
        finalPrices = FinalPrice.calculateFinalPriceFromBaseSpecialAndTier(qty, basePrice, specialPrice, tierPriceSort[0])
      } else if (qty && basePrice && specialPrice && specialPrice._price !== null) {
        finalPrices = FinalPrice.calculateFinalPriceFromBaseAndSpecial(qty, basePrice, specialPrice)
      } else if (qty && basePrice && tierPrice && Array.isArray(tierPrice)) {
        finalPrices = FinalPrice.calculateFinalPriceFromBaseAndTier(qty, basePrice, tierPriceSort[0])
      } else if (qty && basePrice) {
        finalPrices = basePrice
      }
      return finalPrices
    };
}
