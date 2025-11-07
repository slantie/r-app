import { GET } from "../../../constants/api";
import { MakeApiRequest } from "../../../services/apiService";
import { GET_SHIFT_MANAGEMENTS_LIST } from "../../../services/httpService";
import * as types from "../../actionType";

export const getShiftManagementsListAction = (page: number = 1) => {
  return async (dispatch: any) => {
    try {
      dispatch(getShiftManagementsListRequest(page));

      console.log('Getting Shift Managements List, Page:', page);

      const response = await MakeApiRequest({
        apiUrl: GET_SHIFT_MANAGEMENTS_LIST(page),
        apiMethod: GET,
      });

      dispatch(getShiftManagementsListSuccess(response, page));
      return response;
    } catch (error: any) {
      dispatch(getShiftManagementsListFailure(error));
      throw error;
    }
  };
};

export const getShiftManagementsListRequest = (page: number) => ({
  type: types.GET_SHIFT_MANAGEMENTS_LIST_REQUEST,
  page,
});

export const getShiftManagementsListSuccess = (payload: any, page: number) => ({
  type: types.GET_SHIFT_MANAGEMENTS_LIST_SUCCESS,
  payload,
  page,
});

export const getShiftManagementsListFailure = (payload: any) => ({
  type: types.GET_SHIFT_MANAGEMENTS_LIST_FAILURE,
  payload,
});

export const getShiftManagementsListClear = () => ({
  type: types.GET_SHIFT_MANAGEMENTS_LIST_CLEAR,
});
