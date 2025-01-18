import { Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../../hooks/use.auth';
import { Routes } from '../../common/enums/routes';
import { HeadingStyled } from './index.styles';

export const Home = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (!user) {
            navigate(Routes.login);
        }
    }, [navigate, user]);
    return (
        <Container>
            <HeadingStyled variant="h4">Welcome to the Home Page</HeadingStyled>
        </Container>
    );
};
