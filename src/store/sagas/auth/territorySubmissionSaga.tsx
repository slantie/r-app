import { call, put, takeLatest } from 'redux-saga/effects';
import * as types from "../../actionType";
import { territorySubmissionAction } from '../../actions/auth/territorySubmissionAction';

function* territorySubmissionSaga(action: any): Generator<any, void, any>{
    try {
      const response = yield call(territorySubmissionAction, action.payload);
      yield put({ type: types.TERRITORY_SUBMISSION_SUCCESS, payload: response });
    } catch (error: any) {
      yield put({ type: types.TERRITORY_SUBMISSION_FAILURE, payload: error.message });
    }
  }

export default function* territorySubmissionWatcherSaga() {
  yield takeLatest(types.TERRITORY_SUBMISSION_REQUEST, territorySubmissionSaga);
}