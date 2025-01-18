import { all, call, delay, put, takeLatest } from 'redux-saga/effects';
import { Action } from 'redux-actions';
import { AppResponse } from '../../common/types/app.response';
import { PublicUser } from '../../common/types/public.user';
import { authService } from '../../services/auth';
import {
    appInitRoutine,
    notificationFlowRoutine,
    notificationsRoutine,
    triggerLoaderRoutine,
    updateUserRoutine
} from './routines';

function* appInitHandler() {
    try {
        yield put(triggerLoaderRoutine.success(true));
        const { data }: AppResponse<PublicUser | null> = yield call([authService, authService.getCurrentUser]);
        yield put(updateUserRoutine.success({ user: data || null }));
        yield put(triggerLoaderRoutine.success(false));
    } catch (error) {
        console.error(error);
    } finally {
        yield put(triggerLoaderRoutine.success(false));
    }
}

function* watchAppInit() {
    yield takeLatest(appInitRoutine.trigger, appInitHandler);
}

function* notificationFlowHandler({ payload: { success, message } }: Action<{ success: boolean; message: string }>) {
    if (success) {
        yield put(notificationsRoutine.success(message));
    } else {
        yield put(notificationsRoutine.failure(message));
    }
    yield delay(3000);
    yield put(notificationsRoutine.fulfill());
}

function* watchNotificationFlow() {
    yield takeLatest(notificationFlowRoutine.trigger, notificationFlowHandler);
}

export default function* appSaga() {
    yield all([watchAppInit(), watchNotificationFlow()]);
}
