import * as data from '../../presentation/theme/localization/resources/en.json'
import { ILanguage, ICurrency } from '../interfaces/common/locale'

export const ActionStatus = {
  NONE: 'none',
  FETCHING: 'fetching',
  REFRESHING: 'refreshing',
  DONE: 'done'
}

export const SearchCriteriaConditionTypes = {
  Equal: 'eq',
  In: 'in',
  GreaterThan: 'gt',
  LessThan: 'lt',
  Between: 'between',
  Finset: 'finset',
  Like: 'like'
}

export const SortDirections = {
  Ascending: 'ASC',
  Descending: 'DESC'
}

export const PageSize = {
  Default: 20
}

export const Gender = {
  Male: 1,
  Female: 2
}

export const DateTimeFormat = {
  FullDateTime: 'DD/MM/YYYY hh:mm:ss',
  DateTimeAmPm: 'DD/MM/YYYY hh A',
  DateTime24h: 'DD/MM/YYYY HH:mm',
  Time: 'hh:mm:ss',
  FullDate: 'DD/MM/YYYY',
  TimeHourMinPM: 'HH:mm A',
  FullDateDash: 'DD-MM-YYYY',
  APIFormat: 'YYYY-MM-DD HH:mm:ss'
}

export const PriceFormat = {
  Default: '0,0'
}

export const LimitNumber = {
  MaxAddress: 3
}

export const CreditCardTypes = {
  Visa: 'Visa',
  MasterCard: 'MasterCard',
  JCB: 'JCB'
}

export const CurrencyCode = {
  Vietnam: 'VND',
  Dollar: 'USD',
  Yen: 'YEN'
}

export const MemberType = {
  Gold: 'Gold'
}

export const paymentType = {
  PayOnline: 'pay-online',
  PayLater: 'pay-later'
}

export const Header = {
  findHotel: 'Find a Hotel',
  myReservation: 'My Reservations',
  login: 'Login',
  join: 'Join',
  loginMobile: 'LOGIN',
  or: 'or',
  call: 'CALL',
  callMobile: 'Call to Book',
  menu: 'MENU',
  GuestRelations: 'Guest Relations',
  RecentSearches: 'Recent Searches',
  MyProfile: 'My Profile',
  MyReward: 'My Rewards',
  VisitWebsite: 'Visit Website',
  PrivatePolicy: 'Privacy Policy',
  Sitemap: 'Sitemap'
}

export const FormLabel = {
  last_name: data.forms.last_name,
  first_name: data.forms.first_name,
  kanji_last_name: data.forms.kanji_last_name,
  kanji_first_name: data.forms.kanji_first_name,
  phone: data.forms.phone,
  email: data.forms.email,
  add_comment: data.forms.add_comment,
  comment: data.forms.comments,
  password: data.forms.password,
  re_password: data.forms.re_enter_password,
  card_number: data.forms.card_number,
  card_name: data.forms.card_name,
  card_security: data.forms.card_security,
  booking_id: data.forms.booking_id
}

export const STATIC_HOTEL_ID = 1498

export const Languages: ILanguage[] = [
  {
    id: 1,
    value: 'jp',
    code: 'ja-JP',
    text: '日本語',
    prefix: '',
    label: 'JP',
    alt: 'flag-japan',
    flag:
      'https://d2ahiw9kb7is19.cloudfront.net/-/media/Mystays/Global/Header/Flags/flag-japan.svg?d=20171030T151347'
  },
  {
    id: 2,
    value: 'en',
    code: 'en-US',
    text: 'English',
    prefix: 'en-us',
    label: 'EN',
    alt: 'flag-english',
    flag:
      'https://d2ahiw9kb7is19.cloudfront.net/-/media/Mystays/Global/Header/Flags/flag-english.svg?d=20171030T151347'
  },
  {
    id: 3,
    value: 'cn',
    code: 'zh-CN',
    text: '简体中文',
    prefix: 'zh-cn',
    label: 'CN',
    alt: 'flag-china',
    flag:
      'https://d2ahiw9kb7is19.cloudfront.net/-/media/Mystays/Global/Header/Flags/flag-china.svg?d=20171030T151346'
  },
  {
    id: 4,
    value: 'kr',
    code: 'ko-KR',
    text: '한국어',
    prefix: 'ko-kr',
    label: 'KR',
    alt: 'flag-korea',
    flag:
      'https://d2ahiw9kb7is19.cloudfront.net/-/media/Mystays/Global/Header/Flags/flag-korea.svg?d=20171030T151347'
  },
  {
    id: 5,
    value: 'tw',
    code: 'zh-TW',
    text: '繁體中文',
    prefix: 'zh-tw',
    label: 'TW',
    alt: 'flag-taiwan',
    flag:
      'https://d2ahiw9kb7is19.cloudfront.net/-/media/Mystays/Global/Header/Flags/flag-taiwan.svg?d=20171030T151348'
  }
]

export const currencyArray: ICurrency[] = [
  { flag: 'icon-Icon-Currency-YEN', text: 'Yen' },
  { flag: 'icon-Icon-Currency-USD', text: 'USD' }
]
export const promoCodes = ['aaaa', 'bbbb', 'cccc', 'dddd']

export const amenitiesInclude = [
  { name: 'Phone', icon: 'icon-Phone' },
  { name: 'CD player', icon: 'icon-Playlist' },
  { name: 'FAX', icon: 'icon-Fax' },
  { name: 'Bath towel', icon: 'icon-Bath' },
  { name: 'TV set', icon: 'icon-TV_set' },
  { name: 'Toilet', icon: 'icon-Icon-Amenity-Toilet' },
  { name: 'Coffee, tea', icon: 'icon-Coffee_tea' },
  { name: 'Alarm clock', icon: 'icon-Icon-Time' },
  { name: 'Shampoo', icon: 'icon-Shampoo' },
  { name: 'Conditioner', icon: 'icon-Conditioner' },
  { name: 'Hairbrush', icon: 'icon-Hairbrush' },
  { name: 'Toothbrush', icon: 'icon-Toothbrush' },
  { name: 'Body soap', icon: 'icon-Body_soap' },
  { name: 'Air conditioning', icon: 'icon-Air_conditioning' },
  { name: 'Refrigerator', icon: 'icon-Refrigerator' },
  { name: 'Free Wi-Fi', icon: 'icon-Free_wifi' },
  { name: 'Bath towel', icon: 'icon-Bath_towel' },
  { name: 'Towel', icon: 'icon-Towel' },
  { name: 'Hair dryer', icon: 'icon-Hair_dryer' },
  { name: 'Body lotion', icon: 'icon-Body_lotion' },
  { name: 'Toothbrush set', icon: 'icon-Toothbrush_set' },
  { name: 'Bath salt', icon: 'icon-Bath_salt' },
  { name: 'Razor', icon: 'icon-Razor' },
  { name: 'Soap', icon: 'icon-Soap' },
  { name: 'Nightwear', icon: 'icon-Nightwear' },
  { name: 'Shower cap', icon: 'icon-Shower_cap' },
  { name: 'Bathrobe', icon: 'icon-Bathrobe' },
  { name: 'Yukata', icon: 'icon-Yukata' },
  { name: 'Sewing kit', icon: 'icon-Sewing_kit' },
  { name: "Women's cosmetics", icon: 'icon-Women_s_cosmetics' },
  { name: "Men's cosmetics", icon: 'icon-Men_s_cosmetics' },
  { name: 'Video on demand', icon: 'icon-Video_on_demand' },
  { name: 'Satellite TV / Cable TV', icon: 'icon-Cable_TV' },
  { name: 'DVD player', icon: 'icon-DVD_player' },
  { name: 'Air purifier', icon: 'icon-Air_purifier' },
  { name: 'Modular jack', icon: 'icon-Modular_jack' },
  { name: 'Thermo pot', icon: 'icon-Thermo_pot' },
  { name: 'Internet connection (wired LAN)', icon: 'icon-Lan' },
  { name: 'Wake-up call', icon: 'icon-Wake-up_call' },
  { name: 'Transformer', icon: 'icon-Transformer' },
  { name: 'Desk lamp', icon: 'icon-Desk_lamp' },
  { name: 'Humidifier', icon: 'icon-Humidifier' },
  { name: 'Mineral water', icon: 'icon-Mineral_water' },
  { name: 'Coffee maker', icon: 'icon-Coffee_maker' },
  { name: 'Mini-bar', icon: 'icon-Mini_bar' },
  { name: 'Trouser presser', icon: 'icon-Trouser_presser' },
  { name: 'Cleaning service', icon: 'icon-Cleaning_service' },
  { name: 'Iron', icon: 'icon-Iron' },
  { name: 'Smoking', icon: 'icon-Smoking' },
  { name: 'Bathroom', icon: 'icon-Bathroom' },
  { name: 'USB outlet', icon: 'icon-USB_outlet' }
]
export const paymentTokenSource = {
  dev: 'https://pt01.mul-pay.jp/ext/js/token.js',
  production: 'https://p01.mul-pay.jp/ext/js/token.js'
}
