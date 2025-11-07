import { POST } from "../../../constants/api";
import { MakeApiRequest } from "../../../services/apiService";
import {  FEEDBACK } from "../../../services/httpService";
import * as types from "../../actionType";

export interface FeedbackPayload {
    title: string;
    description: string;
}

export const feedbackAction = (payload: FeedbackPayload) => {
    return async (dispatch: any) => {
        try {
            dispatch(feedbackRequest());

            const apiUrl = FEEDBACK;

            const response = await MakeApiRequest({
                apiUrl,
                apiMethod: POST,
                apiData: payload,
            });
            dispatch(feedbackSuccess(response));
            return response;
        } catch (error: any) {
            dispatch(feedbackFailure(error));
            throw error;
        }
    };
};

export const feedbackRequest = () => ({
    type: types.FEEDBACK_REQUEST,
});

export const feedbackSuccess = (payload: any) => ({
    type: types.FEEDBACK_SUCCESS,
    payload,
});

export const feedbackFailure = (payload: any) => ({
    type: types.FEEDBACK_FAILURE,
    payload,
});

export const feedbackClear = () => ({
    type: types.FEEDBACK_CLEAR,
});