import { configureStore } from '@reduxjs/toolkit';
import dailyReducer from "./dailies";
import weeklyReducer from "./weeklies"
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';

const persistConfig={
    key: 'main-root',
    storage,
}

const reducer = combineReducers({
   dailies: dailyReducer,
   weeklies: weeklyReducer,
})

const persistedReducer = persistReducer(persistConfig, reducer)

export default configureStore({
    reducer: persistedReducer,
});
