import { AppState } from '../../../store/app/types/app.state';
import {
    appUserUpdate,
    hideNotification,
    notificationFailure,
    notificationSuccess,
    triggerLoader
} from '../../../store/app/handlers';
import { PublicUser } from '../../../common/types/public.user';
import { NotificationMessages } from '../../../common/enums/notification.messages';

describe('triggerLoader', () => {
    const initialState: AppState = {
        isLoading: false,
        user: null,
        notification: {
            message: '',
            severity: 'success',
            open: false
        }
    };

    it('should set isLoading to true', () => {
        const newState = triggerLoader(initialState, true);
        expect(newState.isLoading).toBe(true);
    });

    it('should set isLoading to false', () => {
        const newState = triggerLoader({ ...initialState, isLoading: true }, false);
        expect(newState.isLoading).toBe(false);
    });
});

describe('appUserUpdate', () => {
    const initialState: AppState = {
        isLoading: false,
        user: null,
        notification: {
            message: '',
            severity: 'success',
            open: false
        }
    };

    const mockUser: PublicUser = {
        id: '1',
        name: 'Test User'
    };

    it('should update the user in state', () => {
        const newState = appUserUpdate(initialState, { user: mockUser });
        expect(newState.user).toEqual(mockUser);
    });

    it('should set user to null', () => {
        const newState = appUserUpdate({ ...initialState, user: mockUser }, { user: null });
        expect(newState.user).toBeNull();
    });
});

describe('notificationSuccess', () => {
    const initialState: AppState = {
        isLoading: false,
        user: null,
        notification: {
            message: '',
            severity: 'success',
            open: false
        }
    };

    it('should set a success message', () => {
        const message = 'Action completed successfully!';
        const newState = notificationSuccess(initialState, message);

        expect(newState.notification).toEqual({
            message,
            severity: 'success',
            open: true
        });
    });

    it('should use default success message if none provided', () => {
        const newState = notificationSuccess(initialState, '');

        expect(newState.notification.message).toBe(NotificationMessages.success);
    });
});

describe('notificationFailure', () => {
    const initialState: AppState = {
        isLoading: false,
        user: null,
        notification: {
            message: '',
            severity: 'success',
            open: false
        }
    };

    it('should set an error message', () => {
        const message = 'Something went wrong!';
        const newState = notificationFailure(initialState, message);

        expect(newState.notification).toEqual({
            message,
            severity: 'error',
            open: true
        });
    });

    it('should use default error message if none provided', () => {
        const newState = notificationFailure(initialState, '');

        expect(newState.notification.message).toBe(NotificationMessages.error);
    });
});

describe('hideNotification', () => {
    const initialState: AppState = {
        isLoading: false,
        user: null,
        notification: {
            message: 'Test message',
            severity: 'success',
            open: true
        }
    };

    it('should hide the notification and clear the message', () => {
        const newState = hideNotification(initialState);

        expect(newState.notification).toEqual({
            ...initialState.notification,
            message: '',
            open: false
        });
    });
});
