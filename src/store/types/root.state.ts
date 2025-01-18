import { AppState } from '../app/types/app.state';
import { DashboardState } from '../../scenes/Dashboard/store/types/dashboard.state';

export interface RootState {
    app: AppState;
    dashboard: DashboardState;
}
