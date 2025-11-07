import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { thunk } from 'redux-thunk';
const createSagaMiddleware = require('redux-saga').default;

import rootReducer from './reducers';
import rootSaga from './sagas';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['otp'], // Persist OTP state (which contains auth data) and punch-in data
  blacklist: [],
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  applyMiddleware(thunk, sagaMiddleware)
);

const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
