import { call, put, takeLatest } from 'redux-saga/effects';
import * as types from "../../actionType";
import { getShiftManagementsListAction } from '../../actions/profile/getShiftManagementsListAction';

function* getShiftManagementsListSaga(action: any): Generator<any, void, any> {
  try {
    const page = action.payload || action.page || 1;
    const response = yield call(getShiftManagementsListAction, page);
    yield put({ type: types.GET_SHIFT_MANAGEMENTS_LIST_SUCCESS, payload: response, page });
  } catch (error: any) {
    yield put({ type: types.GET_SHIFT_MANAGEMENTS_LIST_FAILURE, payload: error.message });
  }
}

export default function* getShiftManagementsListWatcherSaga() {
  yield takeLatest(types.GET_SHIFT_MANAGEMENTS_LIST_REQUEST, getShiftManagementsListSaga);
}
