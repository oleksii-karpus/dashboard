import { createRoutine } from 'redux-saga-routines';
import { PublicUser } from '../../../common/types/user/public.user';

export const findAccountRoutine = createRoutine<{ user: PublicUser | null; errors?: string[] } | string>(
    'dashboard/find-account'
);

export const editAccountRoutine = createRoutine<{ user: PublicUser | null; errors?: string[] } | PublicUser>(
    'dashboard/edit-account'
);
