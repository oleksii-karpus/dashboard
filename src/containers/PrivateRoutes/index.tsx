import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/use.auth';
import { Routes } from '../../common/enums/routes';

const PrivateRoutes = () => {
    const { user } = useAuth();
    return user ? <Outlet /> : <Navigate to={Routes.login} />;
};

export default PrivateRoutes;
