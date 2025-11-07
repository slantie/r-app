import { GET } from "../../../constants/api";
import { MakeApiRequest } from "../../../services/apiService";
import { PULSES_LIST } from "../../../services/httpService";
import * as types from "../../actionType";

export const pulsesListAction = (params?: { page?: number; search?: string }) => {
    return async (dispatch: any) => {
        try {
            dispatch(pulsesListRequest());
            const response = await MakeApiRequest({
                apiUrl: PULSES_LIST(params),
                apiMethod: GET,
            });
            dispatch(pulsesListSuccess(response, { page: params?.page || 1, search: params?.search }));
            return response;
        } catch (error: any) {
            dispatch(pulsesListFailure(error));
            throw error;
        }
    };
};

export const pulsesListRequest = () => ({
    type: types.PULSES_LIST_REQUEST,
});

export const pulsesListSuccess = (payload: any, meta?: any) => ({
    type: types.PULSES_LIST_SUCCESS,
    payload,
    meta,
});

export const pulsesListFailure = (payload: any) => ({
    type: types.PULSES_LIST_FAILURE,
    payload,
});

export const pulsesListClear = () => ({
    type: types.PULSES_LIST_CLEAR,
});

export const pulsesListReset = () => {
    return async (dispatch: any) => {
        dispatch(pulsesListClear());
        dispatch(pulsesListAction({ page: 1 }));
    };
};
