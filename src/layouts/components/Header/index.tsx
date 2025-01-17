import { AppBar, Box, Toolbar } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { Routes } from '../../../common/enums/routes';
import { NavItem } from '../../types/nav.items';
import { useUser } from '../../../hooks/use.user';
import { UserButton } from '../UserButton';
import { LogoWrapper, NavItemLinkStyled, NavStyled } from './index.styles';

type Props = {
    navItems: NavItem[];
};

export const Header = ({ navItems }: Props) => {
    const { user, onLogout } = useUser();
    const location = useLocation();
    const isActive = (route: string): boolean => {
        const pathSegments = location.pathname.split('/').filter(Boolean);
        return pathSegments.includes(route);
    };
    return (
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <LogoWrapper>
                        <NavItemLinkStyled to={Routes.home}>Home</NavItemLinkStyled>
                    </LogoWrapper>
                    <NavStyled>
                        {navItems.map(item => (
                            <NavItemLinkStyled key={item.route} to={item.route} isActive={isActive(item.route)}>
                                {item.label}
                            </NavItemLinkStyled>
                        ))}
                        {user ? (
                            <UserButton onLogout={onLogout} />
                        ) : (
                            <NavItemLinkStyled key="login" to={Routes.login} isActive={isActive(Routes.login)}>
                                Login
                            </NavItemLinkStyled>
                        )}
                    </NavStyled>
                </Toolbar>
            </AppBar>
        </Box>
    );
};
