import * as types from "../../actionType";

const initialState = {
    loading: false,
    pulsesList: null,
    error: null,
};

export const pulsesListReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case types.PULSES_LIST_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case types.PULSES_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                pulsesList: action.payload,
                error: null,
            };
        case types.PULSES_LIST_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case types.PULSES_LIST_CLEAR:
            return {
                ...initialState,
            };
        default:
            return state;
    }
};
