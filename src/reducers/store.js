import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleWare from 'redux-saga';
import { loadingReducer } from './loadingReducer';
import { locationReducer } from './locationReducer';
import { recordReducer } from './recordReducer';
import root from './sagas/root';
import REDUX_PERSIST from './ReduxPersistConfig';
import {persistStore,persistReducer} from 'redux-persist'

import { userReducer } from './userReducer';
import { mockReducer } from './mockReducer';

const Reducers=combineReducers({
    userState:userReducer,
    loadingState:loadingReducer,
    locationState:locationReducer,
    recordState:recordReducer,
    mockState:mockReducer
    });

let persistedReducer=Reducers;
if(REDUX_PERSIST.active){
    const persistConfig=REDUX_PERSIST.storeConfig;
    persistedReducer=persistReducer(persistConfig, Reducers);
}
const sagaMiddleWare=createSagaMiddleWare();
const middleWares=[sagaMiddleWare];
const store=createStore(persistedReducer,applyMiddleware(...middleWares));
const persistor=persistStore(store)

sagaMiddleWare.run(root);

export const storey=()=>{
    return {store,persistor};
}


