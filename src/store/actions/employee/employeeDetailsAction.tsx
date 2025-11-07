import { GET } from "../../../constants/api";
import { MakeApiRequest } from "../../../services/apiService";
import { EMPLOYEE_DETAILS } from "../../../services/httpService";
import * as types from "../../actionType";

export const employeeDetailsAction = (userId: string) => {
    return async (dispatch: any) => {
        try {
            dispatch(employeeDetailsRequest());
            const response = await MakeApiRequest({
                apiUrl: EMPLOYEE_DETAILS(userId),
                apiMethod: GET,
            });
            dispatch(employeeDetailsSuccess(response));
            return response;
        } catch (error: any) {
            dispatch(employeeDetailsFailure(error));
            throw error;
        }
    };
};

export const employeeDetailsRequest = () => ({
    type: types.EMPLOYEE_DETAILS_REQUEST,
});

export const employeeDetailsSuccess = (payload: any) => ({
    type: types.EMPLOYEE_DETAILS_SUCCESS,
    payload,
});

export const employeeDetailsFailure = (payload: any) => ({
    type: types.EMPLOYEE_DETAILS_FAILURE,
    payload,
});

export const employeeDetailsClear = () => ({
    type: types.EMPLOYEE_DETAILS_CLEAR,
});
