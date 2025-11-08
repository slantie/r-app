import {
    FETCH_MY_COMPLAINTS,
    FETCH_MY_COMPLAINTS_SUCCESS,
    FETCH_MY_COMPLAINTS_FAILURE,
    FETCH_COMPLAINT_DETAILS,
    FETCH_COMPLAINT_DETAILS_SUCCESS,
    FETCH_COMPLAINT_DETAILS_FAILURE,
    CREATE_COMPLAINT,
    CREATE_COMPLAINT_SUCCESS,
    CREATE_COMPLAINT_FAILURE,
    ADD_FOLLOW_UP,
    ADD_FOLLOW_UP_SUCCESS,
    ADD_FOLLOW_UP_FAILURE,
    CANCEL_COMPLAINT,
    CANCEL_COMPLAINT_SUCCESS,
    CANCEL_COMPLAINT_FAILURE,
    RESET_COMPLAINTS
} from '../actions/complaints/complaintsAction';

interface ComplaintsState {
    loading: boolean;
    myComplaints: any[];
    complaintDetails: any;
    error: string | null;
    creating: boolean;
    addingFollowUp: boolean;
    cancelling: boolean;
}

const initialState: ComplaintsState = {
    loading: false,
    myComplaints: [],
    complaintDetails: null,
    error: null,
    creating: false,
    addingFollowUp: false,
    cancelling: false
};

const complaintsReducer = (state = initialState, action: any): ComplaintsState => {
    switch (action.type) {
        case FETCH_MY_COMPLAINTS:
        case FETCH_COMPLAINT_DETAILS:
            return {
                ...state,
                loading: true,
                error: null
            };

        case FETCH_MY_COMPLAINTS_SUCCESS:
            return {
                ...state,
                loading: false,
                myComplaints: action.payload,
                error: null
            };

        case FETCH_COMPLAINT_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                complaintDetails: action.payload,
                error: null
            };

        case CREATE_COMPLAINT:
            return {
                ...state,
                creating: true,
                error: null
            };

        case CREATE_COMPLAINT_SUCCESS:
            return {
                ...state,
                creating: false,
                error: null
            };

        case ADD_FOLLOW_UP:
            return {
                ...state,
                addingFollowUp: true,
                error: null
            };

        case ADD_FOLLOW_UP_SUCCESS:
            return {
                ...state,
                addingFollowUp: false,
                error: null
            };

        case CANCEL_COMPLAINT:
            return {
                ...state,
                cancelling: true,
                error: null
            };

        case CANCEL_COMPLAINT_SUCCESS:
            return {
                ...state,
                cancelling: false,
                error: null
            };

        case FETCH_MY_COMPLAINTS_FAILURE:
        case FETCH_COMPLAINT_DETAILS_FAILURE:
        case CREATE_COMPLAINT_FAILURE:
        case ADD_FOLLOW_UP_FAILURE:
        case CANCEL_COMPLAINT_FAILURE:
            return {
                ...state,
                loading: false,
                creating: false,
                addingFollowUp: false,
                cancelling: false,
                error: action.payload
            };

        case RESET_COMPLAINTS:
            return initialState;

        default:
            return state;
    }
};

export default complaintsReducer;
