import {
    FETCH_DASHBOARD_DATA,
    FETCH_DASHBOARD_DATA_SUCCESS,
    FETCH_DASHBOARD_DATA_FAILURE,
    FETCH_QUICK_STATS,
    FETCH_QUICK_STATS_SUCCESS,
    FETCH_QUICK_STATS_FAILURE,
    RESET_DASHBOARD
} from '../actions/dashboard/dashboardAction';

interface DashboardState {
    loading: boolean;
    data: any;
    quickStats: any;
    error: string | null;
}

const initialState: DashboardState = {
    loading: false,
    data: null,
    quickStats: null,
    error: null
};

const dashboardReducer = (state = initialState, action: any): DashboardState => {
    switch (action.type) {
        case FETCH_DASHBOARD_DATA:
        case FETCH_QUICK_STATS:
            return {
                ...state,
                loading: true,
                error: null
            };

        case FETCH_DASHBOARD_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null
            };

        case FETCH_QUICK_STATS_SUCCESS:
            return {
                ...state,
                loading: false,
                quickStats: action.payload,
                error: null
            };

        case FETCH_DASHBOARD_DATA_FAILURE:
        case FETCH_QUICK_STATS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        case RESET_DASHBOARD:
            return initialState;

        default:
            return state;
    }
};

export default dashboardReducer;
