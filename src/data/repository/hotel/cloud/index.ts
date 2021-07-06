import { SitecoreResource } from "../../../gateway/api/resource";
import ResponseModel from "../../../../models/response";
import { getConfig } from "../../../setting";
import ApiGateway from "../../../gateway/api";
import Cookies from "js-cookie";

const getLang = (data: any) => {
  let lang: string = "";
  if (data?.fullLang === "zh-CN") {
    lang = "zh_Hans";
  } else if (data?.fullLang === "zh-TW") {
    lang = "zh_Hant";
  } else {
    lang = data?.fullLang ? data?.fullLang?.slice(0, 2) : "en";
  }

  return lang;
};

const getAll = (data?: any): Promise<ResponseModel<string>> => {
  const params = {
    TargetLanguage: data.lang === "en-US" ? "en" : data?.lang,
    KeyWord: "",
    IsClearCache: false,
    Latitude: data?.lat,
    Longitude: data?.long
  };
  const accessToken = Cookies.get("Client-Session")
    ? Cookies.get("Client-Session")
    : "";

  const setting: any = getConfig();
  setting.headers["Latitude"] = data.lat;
  setting.headers["Longitude"] = data.long;
  setting.accessToken = accessToken;

  const resourcePath = SitecoreResource.Hotel.getHotelsAndAreas(data);
  const apiGateway = ApiGateway.createAPIConnection(setting);
  return apiGateway
    .doPostRequest(resourcePath, params)
    .then((response: any) => {
      return response._data;
    });
};

const getHotelsPlan = (payload?: any): Promise<ResponseModel<string>> => {
  const resourcePath = SitecoreResource.Hotel.getHotelsPlans(payload);
  const apiGateway = ApiGateway.createAPIConnection(getConfig());
  return apiGateway.doGetRequest(resourcePath).then((response: any) => {
    return response._data;
  });
};

const getRoomTypes = (hotel_id?: string): Promise<ResponseModel<string>> => {
  const resourcePath = SitecoreResource.Hotel.getRoomTypes(hotel_id);
  const apiGateway = ApiGateway.createAPIConnection(getConfig());
  return apiGateway.doGetRequest(resourcePath).then((response: any) => {
    return response._data;
  });
};

const getTiers = (hotel_id?: string): Promise<ResponseModel<string>> => {
  const resourcePath = SitecoreResource.Hotel.getTiers(hotel_id);
  const apiGateway = ApiGateway.createAPIConnection(getConfig());
  return apiGateway.doGetRequest(resourcePath).then((response: any) => {
    return response._data;
  });
};

const getLocation = (): Promise<ResponseModel<string>> => {
  const accessToken = Cookies.get("Client-Session")
    ? Cookies.get("Client-Session")
    : "";
  const setting: any = getConfig();
  setting.accessToken = accessToken;

  const resourcePath = SitecoreResource.Hotel.getLocation();
  const apiGateway = ApiGateway.createAPIConnection(setting);
  return apiGateway.doGetRequest(resourcePath).then((response: any) => {
    return response._data;
  });
};

const getAvailableRoom = (data: any): Promise<any> => {
  // const token = localStorage.getItem('client_session');
  const setting: any = getConfig();
  // setting.headers.client_session = token;
  setting.headers["Tripla-Locale"] = getLang(data);

  const resourcePath = SitecoreResource.Hotel.getAvailableRoom(data);
  const apiGateway = ApiGateway.createAPIConnection(getConfig());
  return apiGateway.doGetRequest(resourcePath).then((response: any) => {
    return response._data;
  });
};

const checkPromoCode = (promoCode: string): Promise<any> => {
  const token = localStorage.getItem("client_session");
  const setting: any = getConfig();
  setting.headers.client_session = token;
  setting.headers["Client-Session"] = token;
  const apiGateway = ApiGateway.createAPIConnection(setting);
  const resourcePath = SitecoreResource.Hotel.checkPromoCode(promoCode);
  return apiGateway.doGetRequest(resourcePath);
};

const getHotelPrice = (payload: any): Promise<ResponseModel<string>> => {
  const setting: any = getConfig();
  setting.headers["Tripla-Locale"] = getLang(payload);
  const resourcePath = SitecoreResource.Hotel.getHotelPrice(payload);
  const apiGateway = ApiGateway.createAPIConnection(getConfig());
  return apiGateway.doGetRequest(resourcePath).then((response: any) => {
    return response._data;
  });
};

const getHotelDetail = (payload: any): Promise<ResponseModel<string>> => {
  const setting: any = getConfig();
  setting.headers["Tripla-Locale"] = getLang(payload);
  const resourcePath = SitecoreResource.Hotel.getHotelDetail(payload);
  const apiGateway = ApiGateway.createAPIConnection(getConfig());
  return apiGateway.doGetRequest(resourcePath).then((response: any) => {
    return response._data;
  });
};

const getHotelDetailV2 = (payload: any): Promise<ResponseModel<string>> => {
  const setting: any = getConfig();
  setting.headers["Tripla-Locale"] = getLang(payload);
  const accessToken = Cookies.get("Client-Session")
    ? Cookies.get("Client-Session")
    : "";
  setting.accessToken = accessToken;
  const resourcePath = SitecoreResource.Hotel.getHotelDetailV2(payload);
  const apiGateway = ApiGateway.createAPIConnection(getConfig());
  return apiGateway
    .doPostRequest(resourcePath, payload)
    .then((response: any) => {
      return response._data;
    });
};

const getCancellationPolicies = (
  payload: any
): Promise<ResponseModel<string>> => {
  const setting: any = getConfig();
  setting.headers["Tripla-Locale"] = getLang(payload);
  const resourcePath = SitecoreResource.Hotel.getCancellationPolicies(payload);
  const apiGateway = ApiGateway.createAPIConnection(getConfig());
  return apiGateway.doGetRequest(resourcePath).then((response: any) => {
    return response._data;
  });
};

const getHotelReviews = (payload: any): Promise<ResponseModel<string>> => {
  const params = {
    TargetLanguage: payload.countryCode,
    KeyWord: "",
    IsClearCache: false,
    HotelID: payload.hotelID
  };
  const accessToken = Cookies.get("Client-Session")
    ? Cookies.get("Client-Session")
    : "";
  const setting: any = getConfig();
  setting.accessToken = accessToken;
  const resourcePath = SitecoreResource.Hotel.getHotelReviews(payload);
  const apiGateway = ApiGateway.createAPIConnection(setting);
  return apiGateway
    .doPostRequest(resourcePath, params)
    .then((response: any) => {
      return response._data;
    });
};

const createReservations = (payload: any): Promise<ResponseModel<any>> => {
  const resourcePath = SitecoreResource.Hotel.createReservations(payload);
  const apiGateway = ApiGateway.createAPIConnection(getConfig());

  return apiGateway
    .doPostRequest(resourcePath, payload.queryParam)
    .then((response: any) => {
      return response._data;
    });
};

const cancelReservations = (payload: any): Promise<ResponseModel<any>> => {
  const setting: any = getConfig();
  setting.headers["Tripla-Locale"] = getLang(payload);
  const resourcePath = SitecoreResource.Hotel.cancelReservations(payload);
  const apiGateway = ApiGateway.createAPIConnection(getConfig());
  return apiGateway
    .doPutRequest(resourcePath, payload.body)
    .then((response: any) => {
      return response._data;
    });
};

const updateReservations = (payload: any): Promise<ResponseModel<any>> => {
  const resourcePath = SitecoreResource.Hotel.updateReservations(payload);
  const apiGateway = ApiGateway.createAPIConnection(getConfig());
  return apiGateway
    .doPutRequest(resourcePath, payload.body)
    .then((response: any) => {
      return response._data;
    });
};

const getReservations = (payload: any): Promise<ResponseModel<any>> => {
  const setting: any = getConfig();
  setting.headers["Tripla-Locale"] = getLang(payload);
  const resourcePath = SitecoreResource.Hotel.getReservations(payload);
  const apiGateway = ApiGateway.createAPIConnection(getConfig());
  return apiGateway.doGetRequest(resourcePath).then((response: any) => {
    return response._data;
  });
};

const updateGuestDetail = (payload: any): Promise<ResponseModel<any>> => {
  const setting: any = getConfig();
  setting.headers["Tripla-Locale"] = getLang(payload);
  const resourcePath = SitecoreResource.Hotel.updateGuestDetail(payload);
  const apiGateway = ApiGateway.createAPIConnection(getConfig());
  return apiGateway
    .doPutRequest(resourcePath, payload.body)
    .then((response: any) => {
      return response._data;
    });
};

const getSettingReservations = (payload: any): Promise<ResponseModel<any>> => {
  const setting: any = getConfig();
  setting.headers["Tripla-Locale"] = getLang(payload);
  const resourcePath = SitecoreResource.Hotel.getSettingReservations(payload);
  const apiGateway = ApiGateway.createAPIConnection(getConfig());
  return apiGateway.doGetRequest(resourcePath).then((response: any) => {
    return response._data;
  });
};

const getRoomSelected = (payload: any): Promise<ResponseModel<any>> => {
  const setting: any = getConfig();
  setting.headers["Tripla-Locale"] = getLang(payload);
  const resourcePath = SitecoreResource.Hotel.getRoomSelected(payload);
  const apiGateway = ApiGateway.createAPIConnection(getConfig());
  return apiGateway.doGetRequest(resourcePath).then((response: any) => {
    return response._data;
  });
};

const getExtras = (payload: any): Promise<ResponseModel<any>> => {
  const setting: any = getConfig();
  setting.headers["Tripla-Locale"] = getLang(payload);
  const resourcePath = SitecoreResource.Hotel.getExtras(payload);
  const apiGateway = ApiGateway.createAPIConnection(getConfig());
  return apiGateway.doGetRequest(resourcePath).then((response: any) => {
    return response._data;
  });
};

const getAdditionalQuestion = (payload: any): Promise<ResponseModel<any>> => {
  const setting: any = getConfig();
  setting.headers["Tripla-Locale"] = getLang(payload);
  const resourcePath = SitecoreResource.Hotel.getAdditionalQuestion(payload);
  const apiGateway = ApiGateway.createAPIConnection(getConfig());
  return apiGateway.doGetRequest(resourcePath).then((response: any) => {
    return response._data;
  });
};

const getReservationAdditionalQuestion = (
  payload: any
): Promise<ResponseModel<any>> => {
  const setting: any = getConfig();
  setting.headers["Tripla-Locale"] = getLang(payload);
  const resourcePath = SitecoreResource.Hotel.getReservationAdditionalQuestion(
    payload
  );
  const apiGateway = ApiGateway.createAPIConnection(getConfig());
  return apiGateway.doGetRequest(resourcePath).then((response: any) => {
    return response._data;
  });
};

const updateBatch = (payload: any): Promise<ResponseModel<any>> => {
  const setting: any = getConfig();
  setting.headers["Tripla-Locale"] = getLang(payload);
  const resourcePath = SitecoreResource.Hotel.updateBatch(payload);
  const apiGateway = ApiGateway.createAPIConnection(getConfig());
  return apiGateway
    .doPutRequest(resourcePath, payload.body)
    .then((response: any) => {
      return response._data;
    });
};

export default {
  getAll,
  getHotelsPlan,
  getRoomTypes,
  getTiers,
  getAvailableRoom,
  getLocation,
  checkPromoCode,
  getHotelPrice,
  getHotelDetail,
  createReservations,
  getCancellationPolicies,
  getHotelReviews,
  getExtras,
  getAdditionalQuestion,
  cancelReservations,
  updateReservations,
  getReservations,
  updateGuestDetail,
  getSettingReservations,
  getRoomSelected,
  getReservationAdditionalQuestion,
  updateBatch,
  getHotelDetailV2
};
