import { GET } from "../../../constants/api";
import { MakeApiRequest } from "../../../services/apiService";
import { MY_CONTACT_LIST } from "../../../services/httpService";
import * as types from "../../actionType";

export const myContactListAction = (params?: { page?: number }) => {
    return async (dispatch: any) => {
      console.log("myContactList params", params);
      try {
        dispatch(myContactListRequest(params));
        const response = await MakeApiRequest({
          apiUrl: MY_CONTACT_LIST({ page: params?.page }),
          apiMethod: GET,
        });
        dispatch(myContactListSuccess(response));
        return response;
      } catch (error: any) {
        dispatch(myContactListFailure(error));
        throw error;
      }
    };
  };

export const myContactListRequest = (payload: any) => ({
    type: types.MY_CONTACT_LIST_REQUEST,
    payload,
});

export const myContactListSuccess = (payload: any) => ({
    type: types.MY_CONTACT_LIST_SUCCESS,
    payload,
});

export const myContactListFailure = (payload: any) => ({
    type: types.MY_CONTACT_LIST_FAILURE,
    payload,
});

export const myContactListClear = () => ({
    type: types.MY_CONTACT_LIST_CLEAR,
});