import { Snackbar, Alert } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/types/root.state';
import { notificationsRoutine } from '../../store/app/routines';
import { getAppState } from '../../utils/get.state.utils';

const NotificationSnackbar = () => {
    const { message, severity, open } = useSelector((state: RootState) => getAppState(state).notification);
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(notificationsRoutine.fulfill());
    };

    return (
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <Alert severity={severity} onClose={handleClose}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default NotificationSnackbar;
