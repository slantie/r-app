import {
    FETCH_NOTICES,
    FETCH_NOTICES_SUCCESS,
    FETCH_NOTICES_FAILURE,
    FETCH_NOTICE_DETAILS,
    FETCH_NOTICE_DETAILS_SUCCESS,
    FETCH_NOTICE_DETAILS_FAILURE,
    MARK_NOTICE_READ,
    MARK_NOTICE_READ_SUCCESS,
    MARK_NOTICE_READ_FAILURE,
    RESET_NOTICES
} from '../actions/notices/noticesAction';

interface NoticesState {
    loading: boolean;
    notices: any[];
    noticeDetails: any;
    error: string | null;
    markingRead: boolean;
}

const initialState: NoticesState = {
    loading: false,
    notices: [],
    noticeDetails: null,
    error: null,
    markingRead: false
};

const noticesReducer = (state = initialState, action: any): NoticesState => {
    switch (action.type) {
        case FETCH_NOTICES:
        case FETCH_NOTICE_DETAILS:
            return {
                ...state,
                loading: true,
                error: null
            };

        case FETCH_NOTICES_SUCCESS:
            return {
                ...state,
                loading: false,
                notices: action.payload,
                error: null
            };

        case FETCH_NOTICE_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                noticeDetails: action.payload,
                error: null
            };

        case MARK_NOTICE_READ:
            return {
                ...state,
                markingRead: true,
                error: null
            };

        case MARK_NOTICE_READ_SUCCESS:
            return {
                ...state,
                markingRead: false,
                error: null
            };

        case FETCH_NOTICES_FAILURE:
        case FETCH_NOTICE_DETAILS_FAILURE:
        case MARK_NOTICE_READ_FAILURE:
            return {
                ...state,
                loading: false,
                markingRead: false,
                error: action.payload
            };

        case RESET_NOTICES:
            return initialState;

        default:
            return state;
    }
};

export default noticesReducer;
