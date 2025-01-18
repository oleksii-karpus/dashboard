import { RootState } from '../store/types/root.state';

export const getAppState = (state: RootState) => state.app;
export const getDashboardState = (state: RootState) => state.dashboard;
