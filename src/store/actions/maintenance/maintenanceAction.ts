// Maintenance Action Types
export const FETCH_BILLS = 'FETCH_BILLS';
export const FETCH_BILLS_SUCCESS = 'FETCH_BILLS_SUCCESS';
export const FETCH_BILLS_FAILURE = 'FETCH_BILLS_FAILURE';

export const FETCH_BILL_DETAILS = 'FETCH_BILL_DETAILS';
export const FETCH_BILL_DETAILS_SUCCESS = 'FETCH_BILL_DETAILS_SUCCESS';
export const FETCH_BILL_DETAILS_FAILURE = 'FETCH_BILL_DETAILS_FAILURE';

export const PAY_BILL = 'PAY_BILL';
export const PAY_BILL_SUCCESS = 'PAY_BILL_SUCCESS';
export const PAY_BILL_FAILURE = 'PAY_BILL_FAILURE';

export const FETCH_PAYMENT_HISTORY = 'FETCH_PAYMENT_HISTORY';
export const FETCH_PAYMENT_HISTORY_SUCCESS = 'FETCH_PAYMENT_HISTORY_SUCCESS';
export const FETCH_PAYMENT_HISTORY_FAILURE = 'FETCH_PAYMENT_HISTORY_FAILURE';

export const RESET_MAINTENANCE = 'RESET_MAINTENANCE';

// Action Creators
export const fetchBills = (unitId: string) => ({
    type: FETCH_BILLS,
    payload: { unitId }
});

export const fetchBillsSuccess = (data: any) => ({
    type: FETCH_BILLS_SUCCESS,
    payload: data
});

export const fetchBillsFailure = (error: string) => ({
    type: FETCH_BILLS_FAILURE,
    payload: error
});

export const fetchBillDetails = (billId: string, unitId: string) => ({
    type: FETCH_BILL_DETAILS,
    payload: { billId, unitId }
});

export const fetchBillDetailsSuccess = (data: any) => ({
    type: FETCH_BILL_DETAILS_SUCCESS,
    payload: data
});

export const fetchBillDetailsFailure = (error: string) => ({
    type: FETCH_BILL_DETAILS_FAILURE,
    payload: error
});

export const payBill = (billId: string, unitId: string, amount: number, paymentMethod: string) => ({
    type: PAY_BILL,
    payload: { billId, unitId, amount, paymentMethod }
});

export const payBillSuccess = (data: any) => ({
    type: PAY_BILL_SUCCESS,
    payload: data
});

export const payBillFailure = (error: string) => ({
    type: PAY_BILL_FAILURE,
    payload: error
});

export const fetchPaymentHistory = (unitId: string) => ({
    type: FETCH_PAYMENT_HISTORY,
    payload: { unitId }
});

export const fetchPaymentHistorySuccess = (data: any) => ({
    type: FETCH_PAYMENT_HISTORY_SUCCESS,
    payload: data
});

export const fetchPaymentHistoryFailure = (error: string) => ({
    type: FETCH_PAYMENT_HISTORY_FAILURE,
    payload: error
});

export const resetMaintenance = () => ({
    type: RESET_MAINTENANCE
});
