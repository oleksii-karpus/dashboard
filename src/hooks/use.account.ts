import { useDispatch, useSelector } from 'react-redux';
import { useState, ChangeEvent } from 'react';
import { RootState } from '../store/types/root.state';
import { getDashboardState } from '../utils/get.state.utils';
import { AppDispatch } from '../store';
import { editAccountRoutine, findAccountRoutine } from '../scenes/Dashboard/store/routines';
import { PublicUser } from '../common/types/user/public.user';

export const useAccount = () => {
    const account = useSelector((state: RootState) => getDashboardState(state).account);
    const resultInfo = useSelector((state: RootState) => getDashboardState(state).errors?.account);
    const dispatch: AppDispatch = useDispatch();
    const [searched, setSearched] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [errors, setErrors] = useState<string[]>([]);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
        setErrors([]);
        setSearched(false);
    };
    const onEdit = (data: PublicUser) => {
        dispatch(editAccountRoutine.trigger(data));
    };
    const onSearch = () => {
        if (!searchQuery) {
            return setErrors(['This field cannot be empty.']);
        }
        dispatch(findAccountRoutine.trigger(searchQuery));
        setSearched(true);
    };
    return {
        account,
        onEdit,
        onSearch,
        searched,
        handleInputChange,
        searchQuery,
        errors,
        resultInfo
    };
};
