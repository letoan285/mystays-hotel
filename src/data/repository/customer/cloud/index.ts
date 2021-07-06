import { SitecoreResource } from "../../../gateway/api/resource";
import ResponseModel from "../../../../models/response";
import { getConfig, getNuxtConfig } from "../../../setting";
import ApiGateway from "../../../gateway/api";

const getLang = (fullLang: any) => {
  let lang: string = "";
  if (fullLang === "zh-CN") {
    lang = "zh_Hans";
  } else if (fullLang === "zh-TW") {
    lang = "zh_Hant";
  } else {
    lang = fullLang ? fullLang?.slice(0, 2) : "en";
  }

  return lang;
};

const login = (
  email: string,
  password: string,
  params?: any
): Promise<ResponseModel<string>> => {
  const { program_id, hotel_id, fullLang } = params;

  const setting: any = getConfig();
  setting.headers["Tripla-Locale"] = getLang(fullLang);

  const apiGateway = ApiGateway.createAPIConnection(getConfig());
  const loginResource = SitecoreResource.Customer.Login(hotel_id);

  const body = {
    email,
    password,
    program_id
  };
  return apiGateway.doPostRequest(loginResource, body);
};

const logout = (hotel_id: any): Promise<ResponseModel<string>> => {
  const apiGateway = ApiGateway.createAPIConnection(getConfig());
  const signupResource = SitecoreResource.Customer.Singout(hotel_id);

  return apiGateway.doDeleteRequest(signupResource).then((response: any) => {
    const data = response._data;
    return data;
  });
};

const signup = (data: any): Promise<ResponseModel<string>> => {
  const dataSignUp = { ...data };
  const dataSignUpBody = { ...data };
  if (dataSignUpBody.hotel_id && dataSignUpBody.password_confirm) {
    delete dataSignUpBody.hotel_id;
    delete dataSignUpBody.password_confirm;
  }
  const apiGateway = ApiGateway.createAPIConnection(getConfig());
  const signupResource = SitecoreResource.Customer.Signup(dataSignUp);

  return apiGateway
    .doPostRequest(signupResource, dataSignUpBody)
    .then((response: any) => {
      const data = response._data;
      return data;
    });
};

const resetPassword = (
  email: string,
  hotel_id: number
): Promise<ResponseModel<string>> => {
  const body = { email };
  const apiGateway = ApiGateway.createAPIConnection(getConfig());
  const signupResource = SitecoreResource.Customer.resetPassword(hotel_id);

  return apiGateway
    .doPostRequest(signupResource, body)
    .then((response: any) => {
      const data = response._data;

      return data;
    });
};

const updatePassword = (
  data: any,
  hotel_id: number
): Promise<ResponseModel<string>> => {
  const body = {
    reset_password_token: data.ressetToken,
    password: data.password
  };
  const apiGateway = ApiGateway.createAPIConnection(getConfig());
  const signupResource = SitecoreResource.Customer.updatePassword(hotel_id);

  return apiGateway
    .doPutRequest(signupResource, body)
    .then((response: any) => {
      const data = response._data;
      return data;
    })
    .catch(error => error);
};

const updateUser = (data: any): Promise<ResponseModel<string>> => {
  const apiGateway = ApiGateway.createAPIConnection(getConfig());
  const updateUserResource = SitecoreResource.Customer.updateUser(
    data.hotel_id
  );

  return apiGateway
    .doPutRequest(updateUserResource, data)
    .then((response: any) => {
      const data = response._data;
      return data;
    });
};

const getUser = (): Promise<ResponseModel<string>> => {
  const resourcePath = SitecoreResource.Customer.Profile();
  const apiGateway = ApiGateway.createAPIConnection(getConfig());
  return apiGateway.doGetRequest(resourcePath).then((response: any) => {
    return response._data;
  });
};

const getReservationsList = (
  fullLang: string
): Promise<ResponseModel<string>> => {
  const setting: any = getConfig();
  setting.headers["Tripla-Locale"] = getLang(fullLang);

  const resourcePath = SitecoreResource.Customer.getReservationsList();
  const apiGateway = ApiGateway.createAPIConnection(getConfig());
  return apiGateway.doGetRequest(resourcePath).then((response: any) => {
    return response._data;
  });
};

const confirmation = (payload: any): Promise<ResponseModel<string>> => {
  const resourcePath = SitecoreResource.Customer.confirmation(payload);
  const apiGateway = ApiGateway.createAPIConnection(getConfig());
  return apiGateway.doGetRequest(resourcePath).then((response: any) => {
    return response._data;
  });
};

const cancelMembership = (payload: any): Promise<ResponseModel<string>> => {
  const resourcePath = SitecoreResource.Customer.cancelMembership(
    payload.hotelId
  );
  const apiGateway = ApiGateway.createAPIConnection(getConfig());
  return apiGateway
    .doPostRequest(resourcePath, payload.body)
    .then((response: any) => {
      return response._data;
    });
};

const getClientSession = (): Promise<ResponseModel<string>> => {
  const apiGateway = ApiGateway.createAPIConnection(getNuxtConfig());
  const resourcePath = SitecoreResource.Customer.getClientSession();
  return apiGateway.doPostRequest(resourcePath, {}).then((response: any) => {
    return response._data;
  });
};

const getAccessToken = (): Promise<ResponseModel<string>> => {
  const resourcePath = SitecoreResource.Customer.getAccessToken();
  const apiGateway = ApiGateway.createAPIConnection(getNuxtConfig());
  return apiGateway.doPostRequest(resourcePath, {}).then((response: any) => {
    return response._data;
  });
};

export default {
  login,
  signup,
  logout,
  resetPassword,
  updatePassword,
  getClientSession,
  updateUser,
  getUser,
  confirmation,
  getAccessToken,
  cancelMembership,
  getReservationsList
};
