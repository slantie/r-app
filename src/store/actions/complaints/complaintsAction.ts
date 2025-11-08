// Complaints Action Types
export const FETCH_MY_COMPLAINTS = 'FETCH_MY_COMPLAINTS';
export const FETCH_MY_COMPLAINTS_SUCCESS = 'FETCH_MY_COMPLAINTS_SUCCESS';
export const FETCH_MY_COMPLAINTS_FAILURE = 'FETCH_MY_COMPLAINTS_FAILURE';

export const FETCH_COMPLAINT_DETAILS = 'FETCH_COMPLAINT_DETAILS';
export const FETCH_COMPLAINT_DETAILS_SUCCESS = 'FETCH_COMPLAINT_DETAILS_SUCCESS';
export const FETCH_COMPLAINT_DETAILS_FAILURE = 'FETCH_COMPLAINT_DETAILS_FAILURE';

export const CREATE_COMPLAINT = 'CREATE_COMPLAINT';
export const CREATE_COMPLAINT_SUCCESS = 'CREATE_COMPLAINT_SUCCESS';
export const CREATE_COMPLAINT_FAILURE = 'CREATE_COMPLAINT_FAILURE';

export const ADD_FOLLOW_UP = 'ADD_FOLLOW_UP';
export const ADD_FOLLOW_UP_SUCCESS = 'ADD_FOLLOW_UP_SUCCESS';
export const ADD_FOLLOW_UP_FAILURE = 'ADD_FOLLOW_UP_FAILURE';

export const CANCEL_COMPLAINT = 'CANCEL_COMPLAINT';
export const CANCEL_COMPLAINT_SUCCESS = 'CANCEL_COMPLAINT_SUCCESS';
export const CANCEL_COMPLAINT_FAILURE = 'CANCEL_COMPLAINT_FAILURE';

export const RESET_COMPLAINTS = 'RESET_COMPLAINTS';

// Action Creators
export const fetchMyComplaints = (unitId: string, status?: string) => ({
    type: FETCH_MY_COMPLAINTS,
    payload: { unitId, status }
});

export const fetchMyComplaintsSuccess = (data: any) => ({
    type: FETCH_MY_COMPLAINTS_SUCCESS,
    payload: data
});

export const fetchMyComplaintsFailure = (error: string) => ({
    type: FETCH_MY_COMPLAINTS_FAILURE,
    payload: error
});

export const fetchComplaintDetails = (complaintId: string) => ({
    type: FETCH_COMPLAINT_DETAILS,
    payload: { complaintId }
});

export const fetchComplaintDetailsSuccess = (data: any) => ({
    type: FETCH_COMPLAINT_DETAILS_SUCCESS,
    payload: data
});

export const fetchComplaintDetailsFailure = (error: string) => ({
    type: FETCH_COMPLAINT_DETAILS_FAILURE,
    payload: error
});

export const createComplaint = (
    unitId: string,
    category: string,
    subject: string,
    description: string,
    priority: string,
    images?: string[]
) => ({
    type: CREATE_COMPLAINT,
    payload: { unitId, category, subject, description, priority, images }
});

export const createComplaintSuccess = (data: any) => ({
    type: CREATE_COMPLAINT_SUCCESS,
    payload: data
});

export const createComplaintFailure = (error: string) => ({
    type: CREATE_COMPLAINT_FAILURE,
    payload: error
});

export const addFollowUp = (complaintId: string, message: string, images?: string[]) => ({
    type: ADD_FOLLOW_UP,
    payload: { complaintId, message, images }
});

export const addFollowUpSuccess = (data: any) => ({
    type: ADD_FOLLOW_UP_SUCCESS,
    payload: data
});

export const addFollowUpFailure = (error: string) => ({
    type: ADD_FOLLOW_UP_FAILURE,
    payload: error
});

export const cancelComplaint = (complaintId: string) => ({
    type: CANCEL_COMPLAINT,
    payload: { complaintId }
});

export const cancelComplaintSuccess = (data: any) => ({
    type: CANCEL_COMPLAINT_SUCCESS,
    payload: data
});

export const cancelComplaintFailure = (error: string) => ({
    type: CANCEL_COMPLAINT_FAILURE,
    payload: error
});

export const resetComplaints = () => ({
    type: RESET_COMPLAINTS
});
