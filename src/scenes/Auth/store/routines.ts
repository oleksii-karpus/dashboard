import { createRoutine } from 'redux-saga-routines';
import { LoginDto } from '../../../common/dto/login.dto';
import { PublicUser } from '../../../common/types/public.user';

export const LoginRoutine = createRoutine<LoginDto | { user: PublicUser | null; errors?: string[] }>('auth/login');
export const LogoutRoutine = createRoutine<{ user: null }>('auth/logout');
