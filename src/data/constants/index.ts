export const User = {
  Key: 'LoginUser',
  Auth: 'AuthToken',
  RememberLogin: 'RememberLoginKey'
}

interface ITokenType<T> {
  [key: string]: T
}

export const TokenType: ITokenType<string> = {
  Customer: 'Authorization',
  Admin: 'Authorization',
  Integration: 'Token.Integration',
  DeviceToken: 'Token.DeviceToken',
  ClientSession: 'Client-Session',
  MemberShipSession: 'Client-Session',
  recentSearch: 'recent_search',
  Locale: 'lang',
  Location: 'location',
  Booking: 'booking',
  Session: 'Client-Session',
  Member: 'Member',
  UserAuthorization: 'Authorization',
  AccessToken: 'access_token'
}

export const General = {
  StoreConfigs: '@StoreConfigs',
  Countries: '@Countries',
  CurrencyConfig: '@CurrencyConfig'
}

export const PrivateTokens = {
  url:
    'https://mystaystripla.auth.ap-northeast-1.amazoncognito.com/oauth2/token',
  headers: {
    Authorization:
      'Basic N2Q4YWwybnVqdGhodmVycTlpdmZpN2FvbzY6MTlhM28xamE4MWRxa2w2ODFxb2NibWdjZWcwY2ttdjk4NGkyZDc4aWlvbHFxaDRlb2dsNQ==',
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  data: {
    grant_type: 'refresh_token',
    client_id: '7d8al2nujthhverq9ivfi7aoo6',
    refresh_token:
      'eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.ggB_KYVMY3Lk7AiXXLAuScTt2rR6BbXcUXGdgn49Djrt8SY3qSChTxSNh0g-H0P6u140xej_uQ7h4NQ4u932JidDbBkdgc6yMiWzlZkhppdwm-_4gv_qEa9hY-DtcXUJorCBQNX9HBXjH9kMU3JUjB9DlnYAvEa-vEjprag8esBTcCN3YDfSv_jl8SmfdL4vZi1sz1AT27DnhjMNDnlf0OMPnyuF4RnUhGygE1aDmRG3rE_L9pjL6cNfRXNkNDavBwG0cNFvrv8Y8Gb_AIH24Wyu51soviIbmldvwn0dMJ0lmABrnJunMt_SxKvrf-8-4E18ZJPbf7oUOEMJK9tQug.6j9O63nW670YbroL.U33UF_2UmPmzBFQFXBRQvGeEJnrM_4Ebg5MDxobdNGAwx91lzk_IBBrcPz_yc9ueKstOtlRMEQIhQWxwM-eKz4dRjXGfbb8QSXLi07Q8DtQ0R3rfmK9Zj_ckrf0GZWIpmVp9TIjiHR6vHzIe6Yzdb3cqALmKtZVFg22CNXsgkZnvzzTJ75TJbUwS8ONfjZsF5bAeBPGyjlsMEBmz55N9wc7kJBhZbGu2syZf9cUTxO1mbyKFDwiMeZvUxP2B90mtumttBHAN-Qc7_TrSUQ-3v3Xf_hC1Exqlt7TXg5OKYVDgUM2vYf11Ut6t2cOjpjQHzyJyZn5h-DIbkSduxgehojWAyAtOkN_xRGWCcEA_hgnQweggqdXyNp-C9KpZ5jZbB7JC7MEme1pbG7s1hqIputbJz1Dgp5YLhtUm2SLJ47f9Ez_bRBj-GmDgHgQxSCTCiPNa-7xDwg49dN-OTtchFSrJNmoGEFe4_LHbfQ9gamoehPzYBhX8oOPKzZ0Mu4gaxi_5Vc_Ek4AGkLtEKT-4w9_w7ebppu48zzSVnEylRyTm3abPvA9wlnb12xRHDHtjGGhQUlQadnY4uC287Y75G1JPr99jV-3ccg_fHc_3dA_jTDWXJde6SFJ6oXcoy2336iuJaIi8NtoJ6NJ0OOL2nt_yCk-dQK3qOmbakfl0Nidhkkoou1QsHP_c76qkdKMg0lBK9HpjjnwN-M_1iO_2XjXDgIb3yJjsJPj1xtOit1lt_BO4_qa9sfEoTIJGspss7RM6kvr7OZAFNDPwQ1S9da4XjlkCU015ZdPIPhjiO3wo4yOcgNXKPHnosK4wZ7gb5ZKUXIjLf3IMpoXsd9FQxdULB090OIHid5wed1G6LyuPHpxGNU-i3WYD5WSOQmhXK0XlJZMYwdmKyxYyLH2M7icN58LkpOex1HjnWCZ24nezDvsuSJ0l5_R2IEREbUY6H9lSDjg2rkt64ZUpeiYoJQScmVuOMnhgyrhLkdSA_YDUKG_EWjLAhO2Jd_CcLgiNTcfovmxgKzap13Ytd6KEzpmtHPwD0iJZkc3cHKNn1d8q9_KtXGe_HayxplwuXuODUx1hxNFhXGY5D0eu4imX893-brjVtdql9ohABVmOi4tAzMmu3HmUAiTVfVAQnvFFw5xom8Qi25kfdcpsoFjxsYtDavhlo2i60_vmBK-WEUZxwW1c8m2pF54M-IZAc-zSDBkVIDcnDOUdM_RO6Kn6Kz3iXdr8InM9134zgTKJDySpJmq0YeRACAVKrPoLUwfkFlIa9UQHn68l4lIAA6-zsOc3PJrSjWlADYiKHMXPJv7Jvj5Teobvw4co7-anxVwAvotPlYh3CxRaFvTqWBNdou0EvbPCZqBnfDuGf1IDqwVHOH40.KppMY_y3GFJGJW0J4C4WSQ'
  },
  client_key: {
    staging: '95c4c740baf34b0',
    production: 'd26018b0375647f7'
  },
  client_secret: {
    staging: '49edc0373a99c2d7',
    production: 'e18731cf366143b4'
  }
}
