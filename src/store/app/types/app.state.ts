import { PublicUser } from '../../../common/types/user/public.user';
import { Notifications } from '../../../common/types/notifications';

export interface AppState {
    isLoading: boolean;
    user: PublicUser | null;
    notification: Notifications;
    errors?: Record<string, string[]>;
    account?: PublicUser | undefined;
}
