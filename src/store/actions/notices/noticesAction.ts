// Notices Action Types
export const FETCH_NOTICES = 'FETCH_NOTICES';
export const FETCH_NOTICES_SUCCESS = 'FETCH_NOTICES_SUCCESS';
export const FETCH_NOTICES_FAILURE = 'FETCH_NOTICES_FAILURE';

export const FETCH_NOTICE_DETAILS = 'FETCH_NOTICE_DETAILS';
export const FETCH_NOTICE_DETAILS_SUCCESS = 'FETCH_NOTICE_DETAILS_SUCCESS';
export const FETCH_NOTICE_DETAILS_FAILURE = 'FETCH_NOTICE_DETAILS_FAILURE';

export const MARK_NOTICE_READ = 'MARK_NOTICE_READ';
export const MARK_NOTICE_READ_SUCCESS = 'MARK_NOTICE_READ_SUCCESS';
export const MARK_NOTICE_READ_FAILURE = 'MARK_NOTICE_READ_FAILURE';

export const RESET_NOTICES = 'RESET_NOTICES';

// Action Creators
export const fetchNotices = (unitId: string) => ({
    type: FETCH_NOTICES,
    payload: { unitId }
});

export const fetchNoticesSuccess = (data: any) => ({
    type: FETCH_NOTICES_SUCCESS,
    payload: data
});

export const fetchNoticesFailure = (error: string) => ({
    type: FETCH_NOTICES_FAILURE,
    payload: error
});

export const fetchNoticeDetails = (id: string) => ({
    type: FETCH_NOTICE_DETAILS,
    payload: { id }
});

export const fetchNoticeDetailsSuccess = (data: any) => ({
    type: FETCH_NOTICE_DETAILS_SUCCESS,
    payload: data
});

export const fetchNoticeDetailsFailure = (error: string) => ({
    type: FETCH_NOTICE_DETAILS_FAILURE,
    payload: error
});

export const markNoticeRead = (id: string, unitId: string) => ({
    type: MARK_NOTICE_READ,
    payload: { id, unitId }
});

export const markNoticeReadSuccess = (data: any) => ({
    type: MARK_NOTICE_READ_SUCCESS,
    payload: data
});

export const markNoticeReadFailure = (error: string) => ({
    type: MARK_NOTICE_READ_FAILURE,
    payload: error
});

export const resetNotices = () => ({
    type: RESET_NOTICES
});
