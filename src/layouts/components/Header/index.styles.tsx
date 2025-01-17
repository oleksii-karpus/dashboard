import { Box, styled } from '@mui/material';
import { Link } from 'react-router-dom';

export const LogoWrapper = styled(Box)`
    margin-right: 20px;
`;

export const NavStyled = styled('nav')`
    margin-left: auto;
    display: flex;
    gap: 10px;
`;

export const NavItemLinkStyled = styled(Link, {
    shouldForwardProp: (prop: string) => prop !== 'isActive'
})<{ isActive?: boolean }>`
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.palette.common.white};
    padding: 5px 10px;
    text-decoration: none;
    border: 1px solid ${({ isActive, theme }) => (isActive ? theme.palette.common.white : 'transparent')};
    border-radius: 5px;
    font-weight: bold;
    background-color: ${({ isActive, theme }) => (isActive ? theme.palette.secondary.main : 'transparent')};
`;
