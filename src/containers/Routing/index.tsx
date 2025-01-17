import { BrowserRouter as Router, Routes as ReactRoutes, Route, Navigate } from 'react-router-dom';
import { Routes } from '../../common/enums/routes';
import MainLayout from '../../layouts/Main';
import DashboardLayout from '../../layouts/Dashboard';
import PrivateRoutes from '../PrivateRoutes';
import { Home } from '../../scenes/Home';
import { Activate } from '../../scenes/Dashboard/Activate';
import { Account } from '../../scenes/Dashboard/Account';
import { Login } from '../../scenes/Login';

const Routing = () => {
    return (
        <Router>
            <ReactRoutes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path={Routes.login} element={<Login />} />
                </Route>
                <Route element={<PrivateRoutes />}>
                    <Route path={`/${Routes.dashboard}`} element={<DashboardLayout />}>
                        <Route index element={<Navigate to={Routes.account} replace />} />
                        <Route path={Routes.activation} element={<Activate />} />
                        <Route path={Routes.account} element={<Account />} />
                        <Route path="*" element={<Navigate to={`/${Routes.dashboard}`} replace />} />
                    </Route>
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
            </ReactRoutes>
        </Router>
    );
};

export default Routing;
