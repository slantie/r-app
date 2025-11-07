import { call, put, takeLatest } from 'redux-saga/effects';
import * as types from "../../actionType";
import { getDepartmentsListAction } from '../../actions/profile/getDepartmentsListAction';

function* getDepartmentsListSaga(action: any): Generator<any, void, any> {
  try {
    const response = yield call(getDepartmentsListAction, action.payload);
    yield put({ type: types.GET_DEPARTMENTS_LIST_SUCCESS, payload: response });
  } catch (error: any) {
    yield put({ type: types.GET_DEPARTMENTS_LIST_FAILURE, payload: error.message });
  }
}

export default function* getDepartmentsListWatcherSaga() {
  yield takeLatest(types.GET_DEPARTMENTS_LIST_REQUEST, getDepartmentsListSaga);
}
