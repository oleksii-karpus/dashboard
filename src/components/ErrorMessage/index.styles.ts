import { Box, styled } from '@mui/material';

export const ErrorListStyled = styled(Box)`
    display: flex;
    flex-direction: column;
    margin: 10px 0;
`;

export const ErrorItemStyled = styled(Box)`
    color: ${({ theme }) => theme.palette.error.light};
`;
