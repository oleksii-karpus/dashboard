import { Routine } from 'redux-saga-routines';
import { ReducerHandlers } from '../types/reducer.handlers';
import { LoginRoutine, LogoutRoutine } from '../../scenes/Auth/store/routines';
import { AppState } from './types/app.state';
import { appUserUpdate, hideNotification, notificationFailure, notificationSuccess, triggerLoader } from './handlers';
import { notificationsRoutine, triggerLoaderRoutine, updateUserRoutine } from './routines';

const initialState: AppState = {
    isLoading: true,
    user: null,
    notification: {
        message: '',
        severity: 'error',
        open: false
    },
    errors: {}
};

const handlers: ReducerHandlers<AppState> = {
    [triggerLoaderRoutine.SUCCESS]: triggerLoader,
    [updateUserRoutine.SUCCESS]: appUserUpdate,
    [LoginRoutine.SUCCESS]: appUserUpdate,
    [LoginRoutine.FAILURE]: appUserUpdate,
    [LogoutRoutine.SUCCESS]: appUserUpdate,
    [notificationsRoutine.SUCCESS]: notificationSuccess,
    [notificationsRoutine.FAILURE]: notificationFailure,
    [notificationsRoutine.FULFILL]: hideNotification
};

const AppReducer = (
    state = initialState,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { type, payload }: Routine<any> = {}
): AppState => {
    const handler = handlers[type];
    if (handler) {
        return handler(state, payload);
    }
    return state;
};

export default AppReducer;
