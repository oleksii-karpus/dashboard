import { PublicUser } from '../../common/types/user/public.user';
import { NotificationMessages } from '../../common/enums/notification.messages';
import { AppState } from './types/app.state';

export const triggerLoader = (state: AppState, isLoading: boolean) => ({
    ...state,
    isLoading
});

export const appUserUpdate = (
    state: AppState,
    {
        user,
        errors
    }: {
        user: PublicUser | null;
        errors?: string[];
    } = {
        user: null
    }
): AppState => ({
    ...state,
    user,
    errors: {
        ...state.errors,
        user: Array.isArray(errors) ? [...errors] : []
    }
});

export const notificationSuccess = (state: AppState, message: string): AppState => ({
    ...state,
    notification: {
        message: message || NotificationMessages.success,
        severity: 'success',
        open: true
    }
});

export const notificationFailure = (state: AppState, message: string): AppState => ({
    ...state,
    notification: {
        message: message || NotificationMessages.error,
        severity: 'error',
        open: true
    }
});

export const hideNotification = (state: AppState) => ({
    ...state,
    notification: {
        ...state.notification,
        message: '',
        open: false
    }
});
