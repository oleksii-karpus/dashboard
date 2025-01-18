import { Box, Container } from '@mui/material';
import { useAccount } from '../../../hooks/use.account';
import { SearchInput } from '../../../components/SearchInput';
import { ErrorMessage } from '../../../components/ErrorMessage';
import { EditableForm } from '../conponents/EditableForm';
import { HeadingStyled } from './index.styles';

export const Account = () => {
    const { searchQuery, handleInputChange, onSearch, errors, searched, resultInfo, account, onEdit } = useAccount();

    return (
        <Container>
            <HeadingStyled variant="h4">Account Page</HeadingStyled>
            <Box>
                <SearchInput onClick={onSearch} searchQuery={searchQuery} onChange={handleInputChange} />
                <ErrorMessage errors={errors} />
            </Box>
            <Box>{searched && resultInfo && <div>{resultInfo}</div>}</Box>
            {account && (
                <Box>
                    <EditableForm defaultValues={account} onSave={onEdit} />
                </Box>
            )}
        </Container>
    );
};
