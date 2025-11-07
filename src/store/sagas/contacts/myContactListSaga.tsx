import { call, put, takeLatest } from 'redux-saga/effects';

import * as types from "../../actionType";
import { myContactListAction } from '../../actions/contacts/myContactListAction';

function* myContactListSaga(action: any): Generator<any, void, any>{
    try {
      const response = yield call(myContactListAction, action.payload);
      yield put({ type: types.MY_CONTACT_LIST_SUCCESS, payload: response });
    } catch (error: any) {
      yield put({ type: types.MY_CONTACT_LIST_FAILURE, payload: error.message });
    }
  }

export default function* myContactListWatcherSaga() {
  yield takeLatest(types.MY_CONTACT_LIST_REQUEST, myContactListSaga);
}