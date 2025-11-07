import * as types from "../../actionType";

const initialState = {
    loading: false,
    contactUploadData: undefined,
    error: {},
};

const contactUploadReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case types.CONTACT_UPLOAD_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case types.CONTACT_UPLOAD_SUCCESS:
            return {
                ...state,
                loading: false,
                contactUploadData: action.payload
            };
        case types.CONTACT_UPLOAD_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case types.CONTACT_UPLOAD_CLEAR:
            return {
                ...state,
                loading: false,
                error: {},
                contactUploadData: undefined
            };
        default:
            return state;
    }
};

export default contactUploadReducer;
