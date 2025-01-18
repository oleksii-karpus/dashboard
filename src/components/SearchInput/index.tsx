import SearchIcon from '@mui/icons-material/Search';
import { ChangeEvent } from 'react';
import { InputBaseStyled, SearchIconWrapperStyled, WrapperStyled } from './index.styles';

type Props = {
    onClick: () => void;
    searchQuery: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const SearchInput = ({ onClick, searchQuery, onChange }: Props) => {
    return (
        <WrapperStyled>
            <SearchIconWrapperStyled onClick={onClick}>
                <SearchIcon />
            </SearchIconWrapperStyled>
            <InputBaseStyled
                value={searchQuery}
                onChange={onChange}
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
            />
        </WrapperStyled>
    );
};
