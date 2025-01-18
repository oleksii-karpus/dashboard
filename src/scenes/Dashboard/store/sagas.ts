import { all, call, put, takeLatest } from 'redux-saga/effects';
import { Action } from 'redux-actions';
import { userService } from '../../../services/user';
import { AppResponse } from '../../../common/types/app.response';
import { PublicUser } from '../../../common/types/user/public.user';
import { ApplicationException } from '../../../exception/application.exception';
import { ErrorMessages } from '../../../common/enums/error.messages';
import { notificationFlowRoutine } from '../../../store/app/routines';
import { NotificationMessages } from '../../../common/enums/notification.messages';
import { editAccountRoutine, findAccountRoutine } from './routines';

function* findAccountHandler({ payload }: Action<string>) {
    try {
        const { data }: AppResponse<PublicUser | null> = yield call([userService, userService.getUserById], payload);
        yield put(findAccountRoutine.success({ user: data || null }));
    } catch (error) {
        if (error instanceof ApplicationException) {
            yield put(
                findAccountRoutine.failure({
                    user: null,
                    errors: [error?.message || ErrorMessages.NotFound]
                })
            );
        } else {
            yield put(
                findAccountRoutine.failure({
                    user: null,
                    errors: [ErrorMessages.NotFound]
                })
            );
        }
    }
}

function* watchFindAccount() {
    yield takeLatest(findAccountRoutine.trigger, findAccountHandler);
}

function* editAccountHandler({ payload }: Action<PublicUser>) {
    try {
        const { data }: AppResponse<PublicUser> = yield call([userService, userService.updateAccount], payload);
        if (!data) {
            yield put(notificationFlowRoutine.trigger({ success: false, message: NotificationMessages.error }));
            return;
        }
        yield put(editAccountRoutine.success({ user: data }));
        yield put(
            notificationFlowRoutine.trigger({ success: true, message: NotificationMessages.updateAccountSuccess })
        );
    } catch (error) {
        console.error(error);
        yield put(notificationFlowRoutine.trigger({ success: false, message: NotificationMessages.error }));
    }
}

function* watchEditAccount() {
    yield takeLatest(editAccountRoutine.trigger, editAccountHandler);
}

export default function* dashboardSaga() {
    yield all([watchFindAccount(), watchEditAccount()]);
}
