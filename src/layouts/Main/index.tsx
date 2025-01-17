import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Routes } from '../../common/enums/routes';
import { ContentWrapperStyled, WrapperStyled } from '../index.styles';

const navItems = [{ label: 'Dashboard', route: Routes.dashboard }];

const MainLayout = () => (
    <WrapperStyled>
        <Header navItems={navItems} />
        <ContentWrapperStyled>
            <Outlet />
        </ContentWrapperStyled>
        <Footer />
    </WrapperStyled>
);

export default MainLayout;
