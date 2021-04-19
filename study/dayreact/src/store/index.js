import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';

import RootReducer from "./reducers/root.reducer";

import CreateSagaMiddleWare from 'redux-saga';
import rootSaga from './sagas/root.saga';

const sagaMiddleware = CreateSagaMiddleWare()

export const store = createStore(RootReducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootSaga)