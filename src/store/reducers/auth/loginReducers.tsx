
import * as types from "../../actionType";

const initialState = {
    loading: false,
    loginData: undefined,
    error: {},
};

const authReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case types.LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                loginData: action.payload
            };
        case types.LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
            case types.LOGIN_CLEAR:
                return {
                    ...state,
                    loading: false,
                    error: {},
                    loginData:undefined
                };
        default:
            return state;
    }
};

export default authReducer;
