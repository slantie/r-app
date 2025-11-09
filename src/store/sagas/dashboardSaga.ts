import { call, put, takeLatest } from 'redux-saga/effects';
import { MakeApiRequest } from '../../services/apiService';
import { GET } from '../../constants/api';
import { SOCIETY_API_URL } from '../../config/environment';
import {
  FETCH_DASHBOARD_DATA,
  FETCH_QUICK_STATS,
  fetchDashboardDataSuccess,
  fetchDashboardDataFailure,
  fetchQuickStatsSuccess,
  fetchQuickStatsFailure,
} from '../actions/dashboard/dashboardAction';

// Fetch Dashboard Data
function* fetchDashboardDataSaga(action: any): Generator<any, void, any> {
  try {
    const { unitId } = action.payload;

    const response = yield call(MakeApiRequest, {
      apiUrl: `${SOCIETY_API_URL}/resident/dashboard`,
      apiMethod: GET,
      apiParams: { unitId },
    });

    yield put(fetchDashboardDataSuccess(response.data));
  } catch (error: any) {
    yield put(
      fetchDashboardDataFailure(
        error.message || 'Failed to fetch dashboard data',
      ),
    );
  }
}

// Fetch Quick Stats
function* fetchQuickStatsSaga(action: any): Generator<any, void, any> {
  try {
    const { unitId } = action.payload;

    const response = yield call(MakeApiRequest, {
      apiUrl: `${SOCIETY_API_URL}/resident/dashboard/quick-stats`,
      apiMethod: GET,
      apiParams: { unitId },
    });

    yield put(fetchQuickStatsSuccess(response.data));
  } catch (error: any) {
    yield put(fetchQuickStatsFailure(error.message || 'Failed to fetch stats'));
  }
}

// Watcher Saga
export function* watchDashboard() {
  yield takeLatest(FETCH_DASHBOARD_DATA, fetchDashboardDataSaga);
  yield takeLatest(FETCH_QUICK_STATS, fetchQuickStatsSaga);
}

export default watchDashboard;
