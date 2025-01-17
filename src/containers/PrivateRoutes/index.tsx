import { Outlet, Navigate } from 'react-router-dom';
import { useUser } from '../../hooks/use.user';
import { Routes } from '../../common/enums/routes';

const PrivateRoutes = () => {
    const { user } = useUser();
    return user ? <Outlet /> : <Navigate to={Routes.login} />;
};

export default PrivateRoutes;
