import { call, put, takeLatest } from 'redux-saga/effects';

import * as types from "../../actionType";
import { getFeedbackModuleListAction } from '../../actions/feedback/getFeedbackModuleAction';

function* getFeedbackModuleListSaga(action: any): Generator<any, void, any>{
    try {
      const response = yield call(getFeedbackModuleListAction, action.payload);
      yield put({ type: types.GET_FEEDBACK_MODULE_LIST_SUCCESS, payload: response });
    } catch (error: any) {
      yield put({ type: types.GET_FEEDBACK_MODULE_LIST_FAILURE, payload: error.message });
    }
  }

export default function* getFeedbackModuleListWatcherSaga() {
  yield takeLatest(types.GET_FEEDBACK_MODULE_LIST_REQUEST, getFeedbackModuleListSaga);
}