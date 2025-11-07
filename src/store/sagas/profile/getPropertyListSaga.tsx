import { call, put, takeLatest } from 'redux-saga/effects';
import * as types from "../../actionType";
import { getPropertyListAction } from '../../actions/profile/getPropertyListAction';

function* getPropertyListSaga(action: any): Generator<any, void, any> {
  try {
    const response = yield call(getPropertyListAction, action.payload);
    yield put({ type: types.PROPERTY_LIST_SUCCESS, payload: response });
  } catch (error: any) {
    yield put({ type: types.PROPERTY_LIST_FAILURE, payload: error.message });
  }
}

export default function* getPropertyListWatcherSaga() {
  yield takeLatest(types.PROPERTY_LIST_REQUEST, getPropertyListSaga);
}
