import { call, put, takeLatest } from 'redux-saga/effects';
import { MakeApiRequest } from '../../services/apiService';
import { GET, POST, DELETE } from '../../constants/api';
import {
  PRE_APPROVE_VISITOR,
  FETCH_MY_VISITORS,
  FETCH_TODAY_VISITORS,
  FETCH_VISITOR_STATS,
  DELETE_VISITOR,
  preApproveVisitorSuccess,
  preApproveVisitorFailure,
  fetchMyVisitorsSuccess,
  fetchMyVisitorsFailure,
  fetchTodayVisitorsSuccess,
  fetchTodayVisitorsFailure,
  fetchVisitorStatsSuccess,
  fetchVisitorStatsFailure,
  deleteVisitorSuccess,
  deleteVisitorFailure,
} from '../actions/visitors/visitorsAction';

const API_BASE_URL = 'http://10.0.2.2:5000/api'; // Android emulator
// const API_BASE_URL = 'http://localhost:5000/api'; // iOS simulator

// Pre-Approve Visitor
function* preApproveVisitorSaga(action: any): Generator<any, void, any> {
  try {
    const {
      unitId,
      visitorName,
      visitorPhone,
      purpose,
      expectedDate,
      expectedTime,
      validityHours,
    } = action.payload;

    const response = yield call(MakeApiRequest, {
      apiUrl: `${API_BASE_URL}/resident/visitors/pre-approve`,
      apiMethod: POST,
      apiPayload: {
        unitId,
        visitorName,
        visitorPhone,
        purpose,
        expectedDate,
        expectedTime,
        validityHours,
      },
    });

    yield put(preApproveVisitorSuccess(response.data));
  } catch (error: any) {
    yield put(
      preApproveVisitorFailure(
        error.message || 'Failed to pre-approve visitor',
      ),
    );
  }
}

// Fetch My Visitors
function* fetchMyVisitorsSaga(action: any): Generator<any, void, any> {
  try {
    const { unitId, status } = action.payload;

    const response = yield call(MakeApiRequest, {
      apiUrl: `${API_BASE_URL}/resident/visitors/my-visitors`,
      apiMethod: GET,
      apiParams: status ? { unitId, status } : { unitId },
    });

    yield put(fetchMyVisitorsSuccess(response.data));
  } catch (error: any) {
    yield put(
      fetchMyVisitorsFailure(error.message || 'Failed to fetch visitors'),
    );
  }
}

// Fetch Today's Visitors
function* fetchTodayVisitorsSaga(action: any): Generator<any, void, any> {
  try {
    const { unitId } = action.payload;

    const response = yield call(MakeApiRequest, {
      apiUrl: `${API_BASE_URL}/resident/visitors/today`,
      apiMethod: GET,
      apiParams: { unitId },
    });

    yield put(fetchTodayVisitorsSuccess(response.data));
  } catch (error: any) {
    yield put(
      fetchTodayVisitorsFailure(
        error.message || "Failed to fetch today's visitors",
      ),
    );
  }
}

// Fetch Visitor Stats
function* fetchVisitorStatsSaga(action: any): Generator<any, void, any> {
  try {
    const { unitId } = action.payload;

    const response = yield call(MakeApiRequest, {
      apiUrl: `${API_BASE_URL}/resident/visitors/stats`,
      apiMethod: GET,
      apiParams: { unitId },
    });

    yield put(fetchVisitorStatsSuccess(response.data));
  } catch (error: any) {
    yield put(
      fetchVisitorStatsFailure(
        error.message || 'Failed to fetch visitor stats',
      ),
    );
  }
}

// Delete Visitor
function* deleteVisitorSaga(action: any): Generator<any, void, any> {
  try {
    const { visitorId } = action.payload;

    const response = yield call(MakeApiRequest, {
      apiUrl: `${API_BASE_URL}/resident/visitors/${visitorId}`,
      apiMethod: DELETE,
    });

    yield put(deleteVisitorSuccess(response.data));
  } catch (error: any) {
    yield put(
      deleteVisitorFailure(error.message || 'Failed to delete visitor'),
    );
  }
}

// Watcher Saga
export function* watchVisitors() {
  yield takeLatest(PRE_APPROVE_VISITOR, preApproveVisitorSaga);
  yield takeLatest(FETCH_MY_VISITORS, fetchMyVisitorsSaga);
  yield takeLatest(FETCH_TODAY_VISITORS, fetchTodayVisitorsSaga);
  yield takeLatest(FETCH_VISITOR_STATS, fetchVisitorStatsSaga);
  yield takeLatest(DELETE_VISITOR, deleteVisitorSaga);
}

export default watchVisitors;
