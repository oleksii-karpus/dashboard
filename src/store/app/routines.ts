import { createRoutine } from 'redux-saga-routines';
import { PublicUser } from '../../common/types/user/public.user';

export const triggerLoaderRoutine = createRoutine('app/trigger-loader');
export const appInitRoutine = createRoutine('app/init');
export const notificationsRoutine = createRoutine<string>('app/notifications');
export const notificationFlowRoutine = createRoutine<{ success: boolean; message: string }>('app/notification-flow');
export const updateUserRoutine = createRoutine<{ user: PublicUser | null }>('app/update-user');
