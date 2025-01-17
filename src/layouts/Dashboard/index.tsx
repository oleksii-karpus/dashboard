import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Routes } from '../../common/enums/routes';
import { ContentWrapperStyled, WrapperStyled } from '../index.styles';

const navItems = [
    { label: 'Account', route: Routes.account },
    { label: 'Activate', route: Routes.activation }
];

const DashboardLayout = () => (
    <WrapperStyled>
        <Header navItems={navItems} />
        <ContentWrapperStyled>
            <Outlet />
        </ContentWrapperStyled>
        <Footer />
    </WrapperStyled>
);

export default DashboardLayout;
