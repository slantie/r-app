import { call, put, takeLatest } from 'redux-saga/effects';

import * as types from "../../actionType";
import { territoryListAction } from '../../actions/auth/territoryListAction';

function* territoryListSaga(action: any): Generator<any, void, any> {
    try {
        const response = yield call(territoryListAction, action.payload);
        yield put({ type: types.TERRITORY_LIST_SUCCESS, payload: response });
    } catch (error: any) {
        yield put({ type: types.TERRITORY_LIST_FAILURE, payload: error.message });
    }
}

export default function* territoryListWatcherSaga() {
    yield takeLatest(types.TERRITORY_LIST_REQUEST, territoryListSaga);
}
