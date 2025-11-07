
import * as types from "../../actionType";

const initialState = {
    loading: false,
    resendOtpData: undefined,
    error: {},
};

const resendOtpReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case types.RESEND_OTP_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case types.RESEND_OTP_SUCCESS:
            return {
                ...state,
                loading: false,
                resendOtpData: action.payload
            };
        case types.RESEND_OTP_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
            case types.RESEND_OTP_CLEAR:
                return {
                    ...state,
                    loading: false,
                    error: {},
                    resendOtpData:undefined
                };
        default:
            return state;
    }
};

export default resendOtpReducer;
