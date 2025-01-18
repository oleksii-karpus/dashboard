import { PublicUser } from '../../../../common/types/user/public.user';

export interface DashboardState {
    account: PublicUser | null;
    errors?: Record<string, string[]>;
}
