import { GET } from "../../../constants/api";
import { MakeApiRequest } from "../../../services/apiService";
import { GET_SEATING_OFFICES_LIST } from "../../../services/httpService";
import * as types from "../../actionType";

export const getSeatingOfficesListAction = (page: number = 1) => {
  return async (dispatch: any) => {
    try {
      dispatch(getSeatingOfficesListRequest());

      console.log('Getting Seating Offices List, Page:', page);

      const response = await MakeApiRequest({
        apiUrl: GET_SEATING_OFFICES_LIST(page),
        apiMethod: GET,
      });

      dispatch(getSeatingOfficesListSuccess(response));
      return response;
    } catch (error: any) {
      dispatch(getSeatingOfficesListFailure(error));
      throw error;
    }
  };
};

export const getSeatingOfficesListRequest = () => ({
  type: types.GET_SEATING_OFFICES_LIST_REQUEST,
});

export const getSeatingOfficesListSuccess = (payload: any) => ({
  type: types.GET_SEATING_OFFICES_LIST_SUCCESS,
  payload,
});

export const getSeatingOfficesListFailure = (payload: any) => ({
  type: types.GET_SEATING_OFFICES_LIST_FAILURE,
  payload,
});

export const getSeatingOfficesListClear = () => ({
  type: types.GET_SEATING_OFFICES_LIST_CLEAR,
});
