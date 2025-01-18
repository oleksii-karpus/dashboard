import { PublicUser } from '../../../common/types/user/public.user';
import { DashboardState } from './types/dashboard.state';

export const accountUpdate = (
    state: DashboardState,
    {
        user,
        errors
    }: {
        user: PublicUser | null;
        errors?: string[];
    } = {
        user: null
    }
): DashboardState => ({
    ...state,
    account: user,
    errors: {
        ...state.errors,
        account: Array.isArray(errors) ? [...errors] : []
    }
});
