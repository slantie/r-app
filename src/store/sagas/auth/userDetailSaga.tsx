import { call, put, takeLatest } from 'redux-saga/effects';

import * as types from "../../actionType";
import { userDetailAction } from '../../actions/auth/userDetailAction';

function* userDetailSaga(action: any): Generator<any, void, any> {
    try {
        const response = yield call(userDetailAction, action.payload);
        yield put({ type: types.USER_DETAIL_SUCCESS, payload: response });
    } catch (error: any) {
        yield put({ type: types.USER_DETAIL_FAILURE, payload: error.message });
    }
}

export default function* userDetailWatcherSaga() {
    yield takeLatest(types.USER_DETAIL_REQUEST, userDetailSaga);
}
