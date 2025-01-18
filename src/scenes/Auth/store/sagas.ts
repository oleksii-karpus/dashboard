import { all, call, put, takeLatest } from 'redux-saga/effects';
import { Action } from 'redux-actions';
import { LoginDto } from '../../../common/dto/login.dto';
import { authService } from '../../../services/auth';
import { notificationFlowRoutine } from '../../../store/app/routines';
import { NotificationMessages } from '../../../common/enums/notification.messages';
import { ApplicationException } from '../../../exception/application.exception';
import { PublicUser } from '../../../common/types/user/public.user';
import { AppResponse } from '../../../common/types/app.response';
import { LoginRoutine, LogoutRoutine } from './routines';

function* loginHandler({ payload }: Action<LoginDto>) {
    try {
        const { data }: AppResponse<PublicUser> = yield call([authService, authService.login], payload);
        yield put(
            LoginRoutine.success({
                user: data || null
            })
        );
        yield put(notificationFlowRoutine.trigger({ success: true, message: NotificationMessages.loginSuccess }));
    } catch (error) {
        if (error instanceof ApplicationException) {
            yield put(
                LoginRoutine.failure({
                    user: null,
                    errors: [error?.message || NotificationMessages.loginFailure]
                })
            );
        } else {
            yield put(
                LoginRoutine.failure({
                    user: null,
                    errors: [NotificationMessages.loginFailure]
                })
            );
        }
        yield put(notificationFlowRoutine.trigger({ success: false, message: NotificationMessages.loginFailure }));
    }
}

function* watchLogin() {
    yield takeLatest(LoginRoutine.trigger, loginHandler);
}

function* logoutHandler() {
    try {
        yield call([authService, authService.logout]);
        yield put(LogoutRoutine.success({ user: null }));
        yield put(notificationFlowRoutine.trigger({ success: true, message: NotificationMessages.loginSuccess }));
    } catch (error) {
        console.error(error);
        yield put(notificationFlowRoutine.trigger({ success: false, message: NotificationMessages.logoutFailure }));
    }
}

function* watchLogout() {
    yield takeLatest(LogoutRoutine.trigger, logoutHandler);
}
export default function* authSaga() {
    yield all([watchLogin(), watchLogout()]);
}
