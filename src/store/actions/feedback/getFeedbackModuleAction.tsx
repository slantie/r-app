import { GET } from "../../../constants/api";
import { MakeApiRequest } from "../../../services/apiService";
import { FEEDBACK_MODULE_LIST } from "../../../services/httpService";
import * as types from "../../actionType";

export const getFeedbackModuleListAction = (params?: { page?: number }) => {
    return async (dispatch: any) => {
      console.log("getContactList params", params);
      try {
        dispatch(getFeedbackModuleListRequest(params));
        const response = await MakeApiRequest({
          apiUrl: FEEDBACK_MODULE_LIST({page: params?.page}),
          apiMethod: GET,
        //   apiData: params,
        });
        dispatch(getFeedbackModuleListSuccess(response));
        return response;
      } catch (error: any) {
        dispatch(getFeedbackModuleListFailure(error));
        throw error;
      }
    };
  };

export const getFeedbackModuleListRequest = (payload: any) => ({
    type: types.GET_FEEDBACK_MODULE_LIST_REQUEST,
    payload,
});

export const getFeedbackModuleListSuccess = (payload: any) => ({
    type: types.GET_FEEDBACK_MODULE_LIST_SUCCESS,
    payload,
});

export const getFeedbackModuleListFailure = (payload: any) => ({
    type: types.GET_FEEDBACK_MODULE_LIST_FAILURE,
    payload,
});

export const getFeedbackModuleListClear = () => ({
    type: types.GET_FEEDBACK_MODULE_LIST_CLEAR,
});