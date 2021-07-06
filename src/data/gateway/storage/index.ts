/* eslint-disable @typescript-eslint/no-unused-vars */
import ResponseModel from "../../../models/response";
import StorageModel from "../../../models/storageModel";
import { TokenType, User } from "../../constants";
import Cookies from "js-cookie";

class StorageGateway {
  doGet = (key: string): Promise<ResponseModel<any>> => {
    try {
      return new Promise((resolve, reject) => {
        const results = localStorage.getItem(key);
        if (results) {
          resolve(ResponseModel.createSuccess(results));
        } else {
          reject(ResponseModel.createError(400, "No Data Found"));
        }
      });
    } catch (error) {
      return new Promise((resolve, reject) => {
        reject(ResponseModel.createError(400, error.toString()));
      });
    }
  };

  doGetString = (key: string): Promise<ResponseModel<any>> => {
    try {
      return new Promise((resolve, reject) => {
        const results = localStorage.getItem(key);
        if (results) {
          resolve(ResponseModel.createSuccess(results));
        } else {
          reject(ResponseModel.createError(400, "No Data Found"));
        }
      });
    } catch (error) {
      return new Promise((resolve, reject) => {
        reject(ResponseModel.createError(400, error.toString()));
      });
    }
  };

  doGetJson = (key: string): Promise<ResponseModel<StorageModel<any>>> => {
    try {
      return new Promise((resolve, reject) => {
        const results = localStorage.getItem(key);
        if (results) {
          const data = JSON.parse(results);
          resolve(ResponseModel.createSuccess(data));
        } else {
          reject(ResponseModel.createError(400, "No Data Found"));
        }
      });
    } catch (error) {
      return new Promise((resolve, reject) => {
        reject(ResponseModel.createError(400, error.toString()));
      });
    }
  };

  doUpdate = (key: string, value: any): Promise<ResponseModel<any>> => {
    try {
      // localStorage.setItem(key, Utilities.ecodedBase64Data(JSON.stringify(value)));
      return new Promise((resolve, reject) => {
        // localStorage.setItem(key, value.session);
        if (key === User.Key) {
          const userToken = value.session;
          Cookies.set(TokenType.UserAuthorization, userToken);
        }
        // const result = localStorage.setItem(key, JSON.stringify(value));
        resolve(ResponseModel.createSuccess({}));
      });
    } catch (error) {
      return new Promise((resolve, reject) => {
        reject(ResponseModel.createError(400, error.toString()));
      });
    }
  };

  doUpdateSearchResult = (
    key: string,
    value: any
  ): Promise<ResponseModel<any>> => {
    try {
      return new Promise((resolve, reject) => {
        let recentSearch: any = localStorage.getItem(key);
        if (!recentSearch) {
          const recentSearchTemp = [];
          recentSearchTemp.push(value);
          localStorage.setItem(key, JSON.stringify(recentSearchTemp));
        } else {
          recentSearch = JSON.parse(recentSearch);

          recentSearch = recentSearch.filter((item: any) => {
            return item !== value;
          });

          recentSearch.push(value);

          localStorage.setItem(key, JSON.stringify(recentSearch));

          if (recentSearch.length > 3) {
            const recentSearchDataArrayTemp = recentSearch.slice(0, 3);
            localStorage.setItem(
              key,
              JSON.stringify(recentSearchDataArrayTemp)
            );
          }
        }

        resolve(ResponseModel.createSuccess("Successfully saved"));
      });
    } catch (error) {
      return new Promise((resolve, reject) => {
        reject(ResponseModel.createError(400, error.toString()));
      });
    }
  };

  doUpdateJson = (key: string, value: any): Promise<ResponseModel<any>> => {
    try {
      return new Promise((resolve, reject) => {
        localStorage.setItem(key, JSON.stringify(value));
        resolve(ResponseModel.createSuccess("Successfully saved"));
      });
    } catch (error) {
      return new Promise((resolve, reject) => {
        reject(ResponseModel.createError(400, error.toString()));
      });
    }
  };

  doDelete(key: string): Promise<ResponseModel<any>> {
    try {
      return new Promise((resolve, reject) => {
        localStorage.removeItem(key);
        resolve(ResponseModel.createSuccess("Successfully Delete"));
      });
    } catch (error) {
      return new Promise((resolve, reject) => {
        reject(ResponseModel.createError(400, error.toString()));
      });
    }
  }

  doClean(): Promise<ResponseModel<any>> {
    try {
      return new Promise((resolve, reject) => {
        localStorage.clear();
        resolve(ResponseModel.createSuccess("Successfully Clear"));
      });
    } catch (error) {
      return new Promise((resolve, reject) => {
        reject(ResponseModel.createError(400, error.toString()));
      });
    }
  }
}

export default new StorageGateway();
