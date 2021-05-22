import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleWare from 'redux-saga';
import { loadingReducer } from './loadingReducer';
import { locationReducer } from './locationReducer';
import { recordReducer } from './recordReducer';
import root from './sagas/root';


import { userReducer } from './userReducer';

const Reducers=combineReducers({
    userState:userReducer,
    loadingState:loadingReducer,
    locationState:locationReducer,
    recordState:recordReducer
    });

const sagaMiddleWare=createSagaMiddleWare();
const middleWares=[sagaMiddleWare];
const store=createStore(Reducers,applyMiddleware(...middleWares));
sagaMiddleWare.run(root);

export default store;


