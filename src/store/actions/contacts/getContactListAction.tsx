import { GET } from "../../../constants/api";
import { MakeApiRequest } from "../../../services/apiService";
import { GET_CONTACT_LIST } from "../../../services/httpService";
import * as types from "../../actionType";

export const getContactListAction = (params?: { page?: number }) => {
    return async (dispatch: any) => {
      console.log("getContactList params", params);
      try {
        dispatch(getContactListRequest(params));
        const response = await MakeApiRequest({
          apiUrl: GET_CONTACT_LIST({page: params?.page}),
          apiMethod: GET,
        //   apiData: params,
        });
        dispatch(getContactListSuccess(response));
        return response;
      } catch (error: any) {
        dispatch(getContactListFailure(error));
        throw error;
      }
    };
  };

export const getContactListRequest = (payload: any) => ({
    type: types.GET_CONTACT_LIST_REQUEST,
    payload,
});

export const getContactListSuccess = (payload: any) => ({
    type: types.GET_CONTACT_LIST_SUCCESS,
    payload,
});

export const getContactListFailure = (payload: any) => ({
    type: types.GET_CONTACT_LIST_FAILURE,
    payload,
});

export const getContactListClear = () => ({
    type: types.GET_CONTACT_LIST_CLEAR,
});