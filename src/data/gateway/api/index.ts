import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { TokenType } from "../../constants";
import StorageGateway from "../storage";
import { IResource } from "../../../shared/interfaces/common/resource";
import ResponseModel from "../../../models/response";
import CustomerRepository from "../../repository/customer";
import { getBaseConfig } from "../../../config";
import { defaultHeaders } from "../../../config/env";
import Cookies from "js-cookie";

import Type from "./type";

class ApiGateway {
  _configTimeout = 60000;
  _instanceAxios!: AxiosInstance;
  _endpoint: string;
  _member_ship_endpoint: string;
  _session_endpoint: string;
  _new_session_endpoint: string;
  _new_membership_endpoint: string;
  _accessToken: string;
  _adminUsername: string;
  _adminPassword: string;
  _googleApiKey: string;
  _resource?: IResource;
  _userRepository: CustomerRepository;

  static createAPIConnection(settings: any) {
    return new ApiGateway(settings);
  }

  constructor(settings: any) {
    const {
      endpoint,
      accessToken,
      headers,
      adminUsername,
      adminPassword,
      googleApiKey,
      membership_endpoint,
      session_endpoint,
      new_session_endpoint,
      new_membership_endpoint
    } = settings;
    this._endpoint = endpoint;
    this._member_ship_endpoint = membership_endpoint;
    this._session_endpoint = session_endpoint;
    this._new_session_endpoint = new_session_endpoint;
    this._new_membership_endpoint = new_membership_endpoint;
    this._adminUsername = adminUsername;
    this._adminPassword = adminPassword;
    this._accessToken = accessToken;
    this._googleApiKey = googleApiKey;
    this._userRepository = new CustomerRepository();
    this._createInstance(headers);
  }

  getEndpoint = (resourceType: string) => {
    if (
      resourceType === "client_session" ||
      resourceType === TokenType.UserAuthorization
    ) {
      return this._session_endpoint;
    } else if (resourceType === "member_ship") {
      return this._member_ship_endpoint;
    } else if (resourceType === "session") {
      return this._new_session_endpoint;
    } else if (resourceType === "member") {
      return this._new_membership_endpoint;
    }
    return this._endpoint;
  };

  doGetAllRequest = (resource: any): Promise<any> => {
    this._interceptRequest(resource[0]);
    this._resource = resource;
    const endpoint = this.getEndpoint(resource[0].Type);
    const urls = resource.map((item: any) => {
      return this._instanceAxios.get(`${endpoint}${item.Path}`);
    });

    return Promise.all(urls)
      .then((res: any) =>
        this._handleSuccess({ data: res, status: 200 } as any)
      )
      .catch(this._handleError);
  };

  doGetRequest = (resource: IResource): Promise<ResponseModel<any>> => {
    this._interceptRequest(resource);
    this._resource = resource;
    const { Path } = resource;
    const endpoint = this.getEndpoint(resource.Type);
    const url = `${endpoint}${Path}`;

    return this._instanceAxios
      .get(url)
      .then(this._handleSuccess)
      .catch(this._handleError);
  };

  doPostRequest = (
    resource: IResource,
    body?: any
  ): Promise<ResponseModel<any>> => {
    this._interceptRequest(resource);
    this._resource = resource;
    const { Path } = resource;
    if (resource.Type === "user_login") {
      const headers = defaultHeaders;
      this._createInstance(headers);
    }
    const endpoint = this.getEndpoint(resource.Type) || "";
    const url = `${endpoint}${Path}`;

    return this._instanceAxios
      .post(url, body)
      .then(this._handleSuccess)
      .catch(this._handleError);
  };

  doPutRequest = (
    resource: IResource,
    body?: any
  ): Promise<ResponseModel<any>> => {
    if (body?.session) {
      const newResource: any = resource;
      newResource.session = body.session;
      this._interceptRequest(newResource);
    }
    this._interceptRequest(resource);
    this._resource = resource;
    const { Path } = resource;
    const endpoint = this.getEndpoint(resource.Type);
    const url = `${endpoint}${Path}`;
    return this._instanceAxios
      .put(url, body)
      .then(this._handleSuccess)
      .catch(this._handleError);
  };

  doDeleteRequest = (resource: IResource): Promise<ResponseModel<any>> => {
    this._interceptRequest(resource);
    this._resource = resource;
    const { Path } = resource;
    const endpoint = this.getEndpoint(resource.Type);
    const url = `${endpoint}${Path}`;
    return this._instanceAxios
      .delete(url)
      .then(this._handleSuccess)
      .catch(this._handleError);
  };

  _createInstance = (headers: any) => {
    const config: AxiosRequestConfig = {
      baseURL: this._endpoint,
      timeout: this._configTimeout,
      headers: headers || {
        "Content-Type": "application/json"
      }
    };
    this._instanceAxios = axios.create(config);
    this._interceptResponse();
  };

  _interceptRequest = (resource: IResource) => {
    const resourceType = resource.Type;

    if (resourceType !== Type.Public) {
      this._instanceAxios.interceptors.request.use(
        async config => {
          if (resourceType === Type.GoogleMaps) {
            config.url = `${config.url}&key=${this._googleApiKey}`;
          } else if (resourceType === Type.Customer) {
            const authHeader = `Bearer ${(await this._getAccessToken()).data}`;
            config.headers.Authorization = authHeader;
          } else if (resourceType === Type.ClientSession) {
            // get client_session with no session, no header;
            config.headers["Content-Type"] = "application/json";
          } else if (resourceType === Type.UserAuthorization) {
            try {
              const token = await Cookies.get(TokenType.UserAuthorization);
              if (token) {
                config.headers.Authorization = token;
              }
            } catch (error) {
              console.log(error);
            }
            const client_session = await this._getClientSessionToken();

            if ((resource as any).session) {
              config.headers.Authorization = (resource as any).session;
              config.headers["Client-Session"] = client_session.data;
            } else {
              config.headers["Client-Session"] = client_session.data;
            }
          } else {
            let authHeader;
            const token: any = await this._getTokenFromType(resourceType);

            if (token) {
              authHeader = token.data;
              authHeader = `Bearer ${(await this._getAccessToken()).data}`;
            }
            if (authHeader) {
              // config.headers.client_session = authHeader;
              const client_session = await this._getClientSessionToken();
              config.headers["Client-Session"] = client_session.data;
            } else {
              // Add default token of axios for unit test
              config.headers.Authorization =
                axios.defaults.headers.Authorization;
            }
          }
          return config;
        },
        error => {
          return Promise.reject(error);
        }
      );
    }
  };

  _getTokenFromType = async (type: string) => {
    switch (type) {
      case Type.Customer:
        return await this._getCustomerToken();
      case Type.Admin:
        return await this._getAdminToken();
      case Type.MemberShip:
        return await this._getMembershipToken();
      case Type.ClientSession:
        return await this._getClientSessionToken();
      case Type.Member:
        return await this._getMemberToken();
      case Type.UserAuthorization:
        return await this._getUserToken();
      case Type.AccessToken:
        return await this._getAccessToken();
    }
  };

  _getCustomerToken = () => {
    return StorageGateway.doGetString(TokenType.Customer);
  };

  _getMembershipToken = async () => {
    const data = await Cookies.get("Client-Session");

    return {
      data: data
    };
  };

  _getClientSessionToken = async () => {
    const data = await Cookies.get("Client-Session");

    return {
      data: data
    };
  };

  _getAccessToken = async () => {
    const data = await Cookies.get("access_token");

    return {
      data: data
    };
  };

  _getAdminToken = () => {
    return StorageGateway.doGetString(TokenType.Admin);
  };

  _getMemberToken = () => {
    return StorageGateway.doGetString(TokenType.Session);
  };

  _getUserToken = async () => {
    const data = await Cookies.get(TokenType.UserAuthorization);

    return {
      data: data
    };
  };

  _interceptResponse = () => {
    this._instanceAxios.interceptors.response.use(
      response => response,
      error => {
        if (error.response) {
          const { status } = error.response;
          const config = error.config;
          if (status === 401) {
            // TODO: retry reauthorize
            if (this._resource) {
              if (this._resource.Type === Type.Public) {
                return this._userRepository
                  .loginUser(this._adminUsername, this._adminPassword)
                  .then((adminResp: any) => {
                    const adminToken = adminResp.data;
                    if (adminToken) {
                      this._accessToken = adminToken;
                      error.config.headers.Authorization = `Bearer ${adminToken}`;
                      const appConfigs = getBaseConfig();
                      if (appConfigs) {
                        appConfigs.accessToken = adminToken;
                      }
                      return this._instanceAxios.request(config);
                    }
                    return adminResp;
                  });
              }

              if (this._resource.Type === Type.UserAuthorization) {
                localStorage.removeItem("LoginUser");
                Cookies.remove('Authorization')
                location.reload(true);
              }
            }
          }
        }
        return Promise.reject(error);
      }
    );
  };

  _handleSuccess = (
    response: AxiosResponse
  ): ResponseModel<any> | Promise<ResponseModel<any>> => {
    const { status } = response;
    if (status >= 200 && status < 300) {
      return ResponseModel.createSuccess(response.data);
    } else {
      return Promise.reject(ResponseModel.createError(status, response.data));
    }
  };

  _handleError = (error: any) => {
    let status = 0;
    let message = "";
    let params;
    if (error.response) {
      // server was received message, but response smt
      status = error.response.status;
      message = error.response.data.message || error.response.data.errors;
      params = error.response.data.parameters;

      if (status >= 200 && status < 300) {
        return this._handleSuccess(error.response);
      } else {
        const rawDataText = error.response.data;
        if (rawDataText && typeof rawDataText === "string") {
          try {
            const errorObj = JSON.parse(rawDataText);
            if (errorObj) {
              message = errorObj.MESSAGE;
            }
          } catch (err) {
            message = err.toString();
          }
        }
      }
    } else {
      // smt went wrong
      status = 500;
      message = error.message;
    }
    return Promise.reject(ResponseModel.createError(status, message, params));
  };
}

export default ApiGateway;
