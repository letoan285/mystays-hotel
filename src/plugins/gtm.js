export default function (data) {
  window.dataLayer = window.dataLayer || []
  if (data.triggerType) {
    window.dataLayer.push(data)
  }
}

export const $gtm = {
  init: () => initGoogletagmanager(),
  push: (data) => {
    if (process.browser) {
      window.dataLayer = window.dataLayer || []
      if (data.triggerType) {
        window.dataLayer.push(data)
      }
    }
  }
}

const initGoogletagmanager = () => {
  if (process.browser) {
    // Init Facebook conversion Api;
    initFacebookConversionApi();

    window.dataLayer =
    window.dataLayer ||
    [](function (w, d, s, l, i) {
      w[l] = w[l] || []
      w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' })
      const f = d.getElementsByTagName(s)[0]
      const j = d.createElement(s)
      const dl = l != 'dataLayer' ? '&l=' + l : ''
      j.async = true
      // j.src = isbot ? "https://www.googletagmanager.com/gtm.js?id=" + i + dl : ''; // mystays bot chatting
      f.parentNode.insertBefore(j, f)
    })(window, document, 'script', 'dataLayer', 'GTM-TQBWSJ')
  }
}

export function getPaymentGtmPayload (payload) {
  return {
    triggerType: 'Page Load',
    pageCategory: 'ConfirmStayPage',
    eeAction: 'eeCheckout',
    checkoutStep: '2',
    userId: payload.userId || 0,
    products: [
      {
        brand: payload.productBrand,
        category: payload.productCategory,
        checkInDate: payload.checkInDate,
        checkOutDate: payload.checkOutDate,
        coupon: payload.productCoupon,
        id: payload.productId,
        name: payload.productName,
        numberOfAdult: payload.numberOfAdult,
        numberOfChildren: payload.numberOfChildren,
        numberOfRooms: payload.numberOfRooms,
        numberOfDaysToCheckIn: payload.numberOfDaysToCheckIn,
        price: payload.productPrice,
        quantity: payload.productQuantity,
        roomId: payload.roomId,
        roomName: payload.roomName,
        roomSize: payload.roomSize,
        roomType: payload.roomType,
        planId: payload.planId,
        planName: payload.planName
      }
    ]
  }
}
export function getCancelBookingGtmPayload (payload) {
  return {
    triggerType: 'User Interaction',
    pageCategory: 'BookingCancellation',
    event: 'bookingCancellation',
    eeAction: 'eeRefund',
    language: 'en-US',
    bookingCancellationReason: 'Cancel',
    hotelID: payload.hotelID,
    roomID: payload.roomID,
    planID: payload.planID,
    transactionID: payload.transactionID,
    refundAmount: payload.refundAmount,
    products: [
      {
        brand: payload.productBrand,
        category: payload.productCategory,
        checkInDate: payload.checkInDate,
        checkOutDate: payload.checkOutDate,
        coupon: payload.productCoupon,
        id: payload.hotelID,
        name: payload.hotel.name,
        numberOfAdult: payload.numberOfAdult,
        numberOfChildren: payload.numberOfChildren,
        numberOfRooms: payload.numberOfRooms,
        numberOfDaysToCheckIn: payload.numberOfDaysToCheckIn,
        price: payload.room_price,
        quantity: payload.roomId,
        roomId: payload.roomId,
        roomName: payload.roomIdroomName,
        roomSize: payload.roomIdroomSize,
        roomType: payload.roomIdroomType,
        planId: payload.roomIdplanId,
        planName: payload.roomIdplanName
      }
    ]
  }
}
export function getPaymentDetailGtmPayload (payload) {
  return {
    triggerType: 'User Interaction',
    pageCategory: 'ConfirmStayPage',
    event: 'additionalQuestions',
    language: 'en-US',
    // pageCategory: 'PaymentDetailPage',
    hotelID: payload.hotelID,
    roomID: payload.roomID,
    planID: payload.planID
  }
}

export function initFacebookConversionApi () {
  !(function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js'));
  fbq('init', '228522545469599')
  fbq('track', 'PageView')
  // <noscript><img height="1" width="1" style="display:none"
  //   src="https://www.facebook.com/tr?id=228522545469599&ev=PageView&noscript=1"
  // /></noscript>
}
