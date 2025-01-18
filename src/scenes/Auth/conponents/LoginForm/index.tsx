import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Typography } from '@mui/material';
import { LoginDto } from '../../../../common/dto/login.dto';
import { WrapperStyled } from './index.styles';

type Props = {
    onSubmit: (data: LoginDto) => void;
};

const LoginForm = ({ onSubmit }: Props) => {
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginDto>();

    return (
        <WrapperStyled>
            <Typography variant="h5" component="h1" gutterBottom>
                Login
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
                <Controller
                    name="name"
                    control={control}
                    defaultValue=""
                    rules={{ required: 'Username is required' }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Username"
                            fullWidth
                            autoComplete="off"
                            margin="normal"
                            error={!!errors.name}
                            helperText={errors.name?.message}
                        />
                    )}
                />

                <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    rules={{ required: 'Password is required' }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            type="password"
                            label="Password"
                            fullWidth
                            autoComplete="off"
                            margin="normal"
                            error={!!errors.password}
                            helperText={errors.password?.message}
                        />
                    )}
                />

                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Login
                </Button>
            </form>
        </WrapperStyled>
    );
};

export default LoginForm;
