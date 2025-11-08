// Dashboard Action Types
export const FETCH_DASHBOARD_DATA = 'FETCH_DASHBOARD_DATA';
export const FETCH_DASHBOARD_DATA_SUCCESS = 'FETCH_DASHBOARD_DATA_SUCCESS';
export const FETCH_DASHBOARD_DATA_FAILURE = 'FETCH_DASHBOARD_DATA_FAILURE';

export const FETCH_QUICK_STATS = 'FETCH_QUICK_STATS';
export const FETCH_QUICK_STATS_SUCCESS = 'FETCH_QUICK_STATS_SUCCESS';
export const FETCH_QUICK_STATS_FAILURE = 'FETCH_QUICK_STATS_FAILURE';

export const RESET_DASHBOARD = 'RESET_DASHBOARD';

// Action Creators
export const fetchDashboardData = (unitId: string) => ({
    type: FETCH_DASHBOARD_DATA,
    payload: { unitId }
});

export const fetchDashboardDataSuccess = (data: any) => ({
    type: FETCH_DASHBOARD_DATA_SUCCESS,
    payload: data
});

export const fetchDashboardDataFailure = (error: string) => ({
    type: FETCH_DASHBOARD_DATA_FAILURE,
    payload: error
});

export const fetchQuickStats = (unitId: string) => ({
    type: FETCH_QUICK_STATS,
    payload: { unitId }
});

export const fetchQuickStatsSuccess = (data: any) => ({
    type: FETCH_QUICK_STATS_SUCCESS,
    payload: data
});

export const fetchQuickStatsFailure = (error: string) => ({
    type: FETCH_QUICK_STATS_FAILURE,
    payload: error
});

export const resetDashboard = () => ({
    type: RESET_DASHBOARD
});
