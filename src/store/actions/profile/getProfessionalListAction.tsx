import { GET } from "../../../constants/api";
import { MakeApiRequest } from "../../../services/apiService";
import { GET_PROFESSIONAL_LIST } from "../../../services/httpService";
import * as types from "../../actionType";

export const getProfessionalListAction = (page: number = 1) => {
  return async (dispatch: any) => {
    try {
      dispatch(getProfessionalListRequest(page));

      // console.log('Getting Professional List, Page:', page);

      const response = await MakeApiRequest({
        apiUrl: GET_PROFESSIONAL_LIST(page),
        apiMethod: GET,
      });

      dispatch(getProfessionalListSuccess(response, page));
      return response;
    } catch (error: any) {
      dispatch(getProfessionalListFailure(error));
      throw error;
    }
  };
};

export const getProfessionalListRequest = (page: number) => ({
  type: types.GET_PROFESSIONAL_LIST_REQUEST,
  page,
});

export const getProfessionalListSuccess = (payload: any, page: number) => ({
  type: types.GET_PROFESSIONAL_LIST_SUCCESS,
  payload,
  page,
});

export const getProfessionalListFailure = (payload: any) => ({
  type: types.GET_PROFESSIONAL_LIST_FAILURE,
  payload,
});

export const getProfessionalListClear = () => ({
  type: types.GET_PROFESSIONAL_LIST_CLEAR,
});

