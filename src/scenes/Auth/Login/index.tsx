import { Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../../../hooks/use.auth';
import { Routes } from '../../../common/enums/routes';
import LoginForm from '../conponents/LoginForm';
import { ErrorMessage } from '../../../components/ErrorMessage';
import { FormWrapperStyled } from './index.styles';

export const Login = () => {
    const { onLogin, user, errors } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            navigate(`/${Routes.dashboard}`);
        }
    }, [navigate, user]);
    return (
        <Container maxWidth="sm">
            <FormWrapperStyled>
                <ErrorMessage errors={errors} />
                <LoginForm onSubmit={onLogin} />
            </FormWrapperStyled>
        </Container>
    );
};
