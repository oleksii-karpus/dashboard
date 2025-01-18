import { combineReducers } from '@reduxjs/toolkit';
import DashboardReducer from '../scenes/Dashboard/store/reducer';
import AppReducer from './app/reducer';

const rootReducer = combineReducers({
    app: AppReducer,
    dashboard: DashboardReducer
});

export default rootReducer;
