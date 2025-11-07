import { POST } from "../../../constants/api";
import { MakeApiRequest } from "../../../services/apiService";
import { LOGIN } from "../../../services/httpService";
import * as types from "../../actionType";

export const loginAction = (credentials: { countryCode: string; phoneNumber: string }) => {
    return async (dispatch: any) => {
      console.log("credentials",credentials);
      try {
        dispatch(loginRequest(credentials));
        const response = await MakeApiRequest({
          apiUrl: LOGIN,
          apiMethod: POST,
          apiData: credentials,
        });
        dispatch(loginSuccess(response));
        return response
      } catch (error: any) {
        dispatch(loginFailure(error));
        throw error;
      }
    };
  };

export const loginRequest = (payload: any) => ({
    type: types.LOGIN_REQUEST,
    payload,
});

export const loginSuccess = (payload: any) => ({
    type: types.LOGIN_SUCCESS,
    payload,
});

export const loginFailure = (payload: any) => ({
    type: types.LOGIN_FAILURE,
    payload,
});

export const loginClear = () => ({
    type: types.LOGIN_CLEAR,
});

// Authentication actions
export const setAuthToken = (payload: { accessToken: string; userData: any }) => ({
    type: types.SET_AUTH_TOKEN,
    payload,
});

export const updateUserData = (userData: any) => ({
    type: types.UPDATE_USER_DATA,
    payload: userData,
});

export const logout = () => ({
    type: types.LOGOUT,
});

export const resetStore = () => ({
    type: types.RESET_STORE,
});
