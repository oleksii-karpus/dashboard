import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store';
import { LoginRoutine, LogoutRoutine } from '../scenes/Auth/store/routines';
import { LoginDto } from '../common/dto/login.dto';
import { getAppState } from '../utils/get.state.utils';
import { RootState } from '../store/types/root.state';

export const useAuth = () => {
    const user = useSelector((state: RootState) => getAppState(state).user);
    const errors = useSelector((state: RootState) => getAppState(state).errors?.user);
    const dispatch: AppDispatch = useDispatch();
    const onLogin = (data: LoginDto) => {
        dispatch(LoginRoutine.trigger(data));
    };

    const onLogout = () => {
        dispatch(LogoutRoutine.trigger());
    };
    return {
        user,
        onLogin,
        onLogout,
        errors: errors
    };
};
