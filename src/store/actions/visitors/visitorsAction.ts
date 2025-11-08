// Visitors Action Types
export const PRE_APPROVE_VISITOR = 'PRE_APPROVE_VISITOR';
export const PRE_APPROVE_VISITOR_SUCCESS = 'PRE_APPROVE_VISITOR_SUCCESS';
export const PRE_APPROVE_VISITOR_FAILURE = 'PRE_APPROVE_VISITOR_FAILURE';

export const FETCH_MY_VISITORS = 'FETCH_MY_VISITORS';
export const FETCH_MY_VISITORS_SUCCESS = 'FETCH_MY_VISITORS_SUCCESS';
export const FETCH_MY_VISITORS_FAILURE = 'FETCH_MY_VISITORS_FAILURE';

export const FETCH_TODAY_VISITORS = 'FETCH_TODAY_VISITORS';
export const FETCH_TODAY_VISITORS_SUCCESS = 'FETCH_TODAY_VISITORS_SUCCESS';
export const FETCH_TODAY_VISITORS_FAILURE = 'FETCH_TODAY_VISITORS_FAILURE';

export const FETCH_VISITOR_STATS = 'FETCH_VISITOR_STATS';
export const FETCH_VISITOR_STATS_SUCCESS = 'FETCH_VISITOR_STATS_SUCCESS';
export const FETCH_VISITOR_STATS_FAILURE = 'FETCH_VISITOR_STATS_FAILURE';

export const DELETE_VISITOR = 'DELETE_VISITOR';
export const DELETE_VISITOR_SUCCESS = 'DELETE_VISITOR_SUCCESS';
export const DELETE_VISITOR_FAILURE = 'DELETE_VISITOR_FAILURE';

export const RESET_VISITORS = 'RESET_VISITORS';

// Action Creators
export const preApproveVisitor = (
    unitId: string,
    visitorName: string,
    visitorPhone: string,
    purpose: string,
    expectedDate: string,
    expectedTime: string,
    validityHours?: number
) => ({
    type: PRE_APPROVE_VISITOR,
    payload: { unitId, visitorName, visitorPhone, purpose, expectedDate, expectedTime, validityHours }
});

export const preApproveVisitorSuccess = (data: any) => ({
    type: PRE_APPROVE_VISITOR_SUCCESS,
    payload: data
});

export const preApproveVisitorFailure = (error: string) => ({
    type: PRE_APPROVE_VISITOR_FAILURE,
    payload: error
});

export const fetchMyVisitors = (unitId: string, status?: string) => ({
    type: FETCH_MY_VISITORS,
    payload: { unitId, status }
});

export const fetchMyVisitorsSuccess = (data: any) => ({
    type: FETCH_MY_VISITORS_SUCCESS,
    payload: data
});

export const fetchMyVisitorsFailure = (error: string) => ({
    type: FETCH_MY_VISITORS_FAILURE,
    payload: error
});

export const fetchTodayVisitors = (unitId: string) => ({
    type: FETCH_TODAY_VISITORS,
    payload: { unitId }
});

export const fetchTodayVisitorsSuccess = (data: any) => ({
    type: FETCH_TODAY_VISITORS_SUCCESS,
    payload: data
});

export const fetchTodayVisitorsFailure = (error: string) => ({
    type: FETCH_TODAY_VISITORS_FAILURE,
    payload: error
});

export const fetchVisitorStats = (unitId: string) => ({
    type: FETCH_VISITOR_STATS,
    payload: { unitId }
});

export const fetchVisitorStatsSuccess = (data: any) => ({
    type: FETCH_VISITOR_STATS_SUCCESS,
    payload: data
});

export const fetchVisitorStatsFailure = (error: string) => ({
    type: FETCH_VISITOR_STATS_FAILURE,
    payload: error
});

export const deleteVisitor = (visitorId: string) => ({
    type: DELETE_VISITOR,
    payload: { visitorId }
});

export const deleteVisitorSuccess = (data: any) => ({
    type: DELETE_VISITOR_SUCCESS,
    payload: data
});

export const deleteVisitorFailure = (error: string) => ({
    type: DELETE_VISITOR_FAILURE,
    payload: error
});

export const resetVisitors = () => ({
    type: RESET_VISITORS
});
