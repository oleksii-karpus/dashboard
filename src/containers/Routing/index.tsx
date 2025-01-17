import { Navigate, Route, BrowserRouter as Router, Routes as ReactRoutes, Outlet } from 'react-router-dom';
import { Routes } from '../../common/enums/routes';

const Routing = () => {
    return (
        <Router>
            <ReactRoutes>
                <Route
                    path={Routes.home}
                    element={
                        <div>
                            <div>MAIN LAYOUT</div>
                            <Outlet />
                        </div>
                    }
                >
                    <Route index element={<div>HOME PAGE</div>} />
                    <Route path={Routes.activation} element={<div>ACTIVATION PAGE</div>} />
                    <Route path={Routes.account} element={<div>ACCOUNT PAGE</div>} />
                    <Route path={Routes.login} element={<div>LOGIN PAGE</div>} />
                </Route>
                <Route path="*" element={<Navigate to={Routes.home} replace />} />
            </ReactRoutes>
        </Router>
    );
};

export default Routing;
