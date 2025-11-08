import { call, put, takeLatest } from 'redux-saga/effects';
import { MakeApiRequest } from '../../services/apiService';
import { GET, POST } from '../../constants/api';
import {
  FETCH_BILLS,
  FETCH_BILL_DETAILS,
  PAY_BILL,
  FETCH_PAYMENT_HISTORY,
  fetchBillsSuccess,
  fetchBillsFailure,
  fetchBillDetailsSuccess,
  fetchBillDetailsFailure,
  payBillSuccess,
  payBillFailure,
  fetchPaymentHistorySuccess,
  fetchPaymentHistoryFailure,
} from '../actions/maintenance/maintenanceAction';

const API_BASE_URL = 'http://10.0.2.2:5000/api'; // Android emulator
// const API_BASE_URL = 'http://localhost:5000/api'; // iOS simulator

// Fetch Bills
function* fetchBillsSaga(action: any): Generator<any, void, any> {
  try {
    const { unitId } = action.payload;

    const response = yield call(MakeApiRequest, {
      apiUrl: `${API_BASE_URL}/resident/maintenance/bills`,
      apiMethod: GET,
      apiParams: { unitId },
    });

    yield put(fetchBillsSuccess(response.data));
  } catch (error: any) {
    yield put(fetchBillsFailure(error.message || 'Failed to fetch bills'));
  }
}

// Fetch Bill Details
function* fetchBillDetailsSaga(action: any): Generator<any, void, any> {
  try {
    const { billId, unitId } = action.payload;

    const response = yield call(MakeApiRequest, {
      apiUrl: `${API_BASE_URL}/resident/maintenance/bills/${billId}`,
      apiMethod: GET,
      apiParams: { unitId },
    });

    yield put(fetchBillDetailsSuccess(response.data));
  } catch (error: any) {
    yield put(
      fetchBillDetailsFailure(error.message || 'Failed to fetch bill details'),
    );
  }
}

// Pay Bill
function* payBillSaga(action: any): Generator<any, void, any> {
  try {
    const { billId, unitId, amount, paymentMethod } = action.payload;

    const response = yield call(MakeApiRequest, {
      apiUrl: `${API_BASE_URL}/resident/maintenance/bills/pay`,
      apiMethod: POST,
      apiPayload: { billId, unitId, amount, paymentMethod },
    });

    yield put(payBillSuccess(response.data));
  } catch (error: any) {
    yield put(payBillFailure(error.message || 'Failed to process payment'));
  }
}

// Fetch Payment History
function* fetchPaymentHistorySaga(action: any): Generator<any, void, any> {
  try {
    const { unitId } = action.payload;

    const response = yield call(MakeApiRequest, {
      apiUrl: `${API_BASE_URL}/resident/maintenance/payment-history`,
      apiMethod: GET,
      apiParams: { unitId },
    });

    yield put(fetchPaymentHistorySuccess(response.data));
  } catch (error: any) {
    yield put(
      fetchPaymentHistoryFailure(
        error.message || 'Failed to fetch payment history',
      ),
    );
  }
}

// Watcher Saga
export function* watchMaintenance() {
  yield takeLatest(FETCH_BILLS, fetchBillsSaga);
  yield takeLatest(FETCH_BILL_DETAILS, fetchBillDetailsSaga);
  yield takeLatest(PAY_BILL, payBillSaga);
  yield takeLatest(FETCH_PAYMENT_HISTORY, fetchPaymentHistorySaga);
}

export default watchMaintenance;
