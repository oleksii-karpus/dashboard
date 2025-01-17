import { alpha, Box, styled } from '@mui/material';

export const WrapperStyled = styled(Box)`
    display: flex;
    align-items: center;
    height: 50px;
    border-top: ${({ theme }) => `1px solid ${alpha(theme.palette.text.secondary, 0.15)}`};
    padding: 20px;
`;
