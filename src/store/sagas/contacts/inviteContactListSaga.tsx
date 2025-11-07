import { call, put, takeLatest } from 'redux-saga/effects';

import * as types from "../../actionType";
import { inviteContactListAction } from '../../actions/contacts/inviteContactListAction';

function* inviteContactListSaga(action: any): Generator<any, void, any>{
    try {
      const response = yield call(inviteContactListAction, action.payload);
      yield put({ type: types.INVITE_CONTACT_LIST_SUCCESS, payload: response });
    } catch (error: any) {
      yield put({ type: types.INVITE_CONTACT_LIST_FAILURE, payload: error.message });
    }
  }

export default function* inviteContactListWatcherSaga() {
  yield takeLatest(types.INVITE_CONTACT_LIST_REQUEST, inviteContactListSaga);
}