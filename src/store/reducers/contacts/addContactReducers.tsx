import * as types from "../../actionType";

const initialState = {
    loading: false,
    addContactData: undefined,
    error: {},
};

const addContactReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case types.ADD_CONTACT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case types.ADD_CONTACT_SUCCESS:
            return {
                ...state,
                loading: false,
                addContactData: action.payload
            };
        case types.ADD_CONTACT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case types.ADD_CONTACT_CLEAR:
            return {
                ...state,
                loading: false,
                error: {},
                addContactData: undefined
            };
        default:
            return state;
    }
};

export default addContactReducer;