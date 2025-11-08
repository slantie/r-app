import {
    PRE_APPROVE_VISITOR,
    PRE_APPROVE_VISITOR_SUCCESS,
    PRE_APPROVE_VISITOR_FAILURE,
    FETCH_MY_VISITORS,
    FETCH_MY_VISITORS_SUCCESS,
    FETCH_MY_VISITORS_FAILURE,
    FETCH_TODAY_VISITORS,
    FETCH_TODAY_VISITORS_SUCCESS,
    FETCH_TODAY_VISITORS_FAILURE,
    FETCH_VISITOR_STATS,
    FETCH_VISITOR_STATS_SUCCESS,
    FETCH_VISITOR_STATS_FAILURE,
    DELETE_VISITOR,
    DELETE_VISITOR_SUCCESS,
    DELETE_VISITOR_FAILURE,
    RESET_VISITORS
} from '../actions/visitors/visitorsAction';

interface VisitorsState {
    loading: boolean;
    myVisitors: any[];
    todayVisitors: any[];
    stats: any;
    error: string | null;
    approving: boolean;
    deleting: boolean;
}

const initialState: VisitorsState = {
    loading: false,
    myVisitors: [],
    todayVisitors: [],
    stats: null,
    error: null,
    approving: false,
    deleting: false
};

const visitorsReducer = (state = initialState, action: any): VisitorsState => {
    switch (action.type) {
        case FETCH_MY_VISITORS:
        case FETCH_TODAY_VISITORS:
        case FETCH_VISITOR_STATS:
            return {
                ...state,
                loading: true,
                error: null
            };

        case FETCH_MY_VISITORS_SUCCESS:
            return {
                ...state,
                loading: false,
                myVisitors: action.payload,
                error: null
            };

        case FETCH_TODAY_VISITORS_SUCCESS:
            return {
                ...state,
                loading: false,
                todayVisitors: action.payload,
                error: null
            };

        case FETCH_VISITOR_STATS_SUCCESS:
            return {
                ...state,
                loading: false,
                stats: action.payload,
                error: null
            };

        case PRE_APPROVE_VISITOR:
            return {
                ...state,
                approving: true,
                error: null
            };

        case PRE_APPROVE_VISITOR_SUCCESS:
            return {
                ...state,
                approving: false,
                error: null
            };

        case DELETE_VISITOR:
            return {
                ...state,
                deleting: true,
                error: null
            };

        case DELETE_VISITOR_SUCCESS:
            return {
                ...state,
                deleting: false,
                error: null
            };

        case FETCH_MY_VISITORS_FAILURE:
        case FETCH_TODAY_VISITORS_FAILURE:
        case FETCH_VISITOR_STATS_FAILURE:
        case PRE_APPROVE_VISITOR_FAILURE:
        case DELETE_VISITOR_FAILURE:
            return {
                ...state,
                loading: false,
                approving: false,
                deleting: false,
                error: action.payload
            };

        case RESET_VISITORS:
            return initialState;

        default:
            return state;
    }
};

export default visitorsReducer;
