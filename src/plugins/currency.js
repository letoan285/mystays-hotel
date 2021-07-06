import Vue from 'vue'

Vue.filter('currency', (price, currency, isShowPrice) => {
  const priceFixed = Number(price).toFixed(2)
  const priceNumber = Number(priceFixed)

  let moneyFormat = ''

  if (currency) {
    switch (currency) {
      case 'USD':
        moneyFormat = `$${new Intl.NumberFormat().format(priceNumber)}`
        break
      case '$':
        moneyFormat = `$${new Intl.NumberFormat().format(priceNumber)}`
        break
      case 'YEN':
        moneyFormat = `¥${new Intl.NumberFormat().format(priceNumber)}`
        break
      case '¥':
        moneyFormat = `¥${new Intl.NumberFormat().format(priceNumber)}`
        break
      default:
        break
    }
  } else {
    moneyFormat = new Intl.NumberFormat().format(priceNumber)
  }

  if (priceNumber) {
    return moneyFormat
  } else if (!isShowPrice) {
    return '¥0'
  } else {
    return ''
  }
})
