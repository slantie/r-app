
import * as types from "../../actionType";

const initialState = {
    loading: false,
    profileData: undefined,
    error: {},
};

const profileReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case types.PROFILE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case types.PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                profileData: action.payload
            };
        case types.PROFILE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
            case types.PROFILE_CLEAR:
                return {
                    ...state,
                    loading: false,
                    error: {},
                    profileData:undefined
                };
        default:
            return state;
    }
};

export default profileReducer;
