import { call, put, takeLatest } from 'redux-saga/effects';

import * as types from "../../actionType";
import { deleteUserAction } from '../../actions/auth/deleteUserAction';

function* deleteUserSaga(action: any): Generator<any, void, any>{
    try {
      const response = yield call(deleteUserAction, action.payload);
      yield put({ type: types.DELETE_USER_SUCCESS, payload: response });
    } catch (error: any) {
      yield put({ type: types.DELETE_USER_FAILURE, payload: error.message });
    }
  }

export default function* deleteUserWatcherSaga() {
  yield takeLatest(types.DELETE_USER_REQUEST, deleteUserSaga);
}
