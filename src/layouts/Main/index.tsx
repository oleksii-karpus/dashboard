import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ContentWrapperStyled, WrapperStyled } from '../index.styles';
import { NavItem } from '../types/nav.items';
import { useAuth } from '../../hooks/use.auth';
import { Routes } from '../../common/enums/routes';

const navItems: NavItem[] = [{ label: 'Dashboard', route: Routes.dashboard }];

const MainLayout = () => {
    const { user } = useAuth();
    return (
        <WrapperStyled>
            <Header navItems={user ? navItems : []} />
            <ContentWrapperStyled>
                <Outlet />
            </ContentWrapperStyled>
            <Footer />
        </WrapperStyled>
    );
};

export default MainLayout;
