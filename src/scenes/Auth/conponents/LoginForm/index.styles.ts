import { Box, styled } from '@mui/material';

export const WrapperStyled = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border-radius: 2px;
    background-color: #f9f9f9;
    box-shadow: ${({ theme }) => theme.shadows[3]};
`;
