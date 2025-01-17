import { combineReducers } from '@reduxjs/toolkit';
import AppReducer from './app/reducer';

const rootReducer = combineReducers({
    app: AppReducer
});

export default rootReducer;
