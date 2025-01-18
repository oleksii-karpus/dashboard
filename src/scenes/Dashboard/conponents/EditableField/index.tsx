import React, { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { ButtonsStyled, TextFieldStyled, WrapperStyled } from './index.styles';

type Props = {
    label: string;
    value: string;
    onSave: (value: string) => void;
    error?: boolean;
    helperText?: string;
    originalValue: string;
};

export const EditableField: React.FC<Props> = ({ label, value, onSave, error, helperText, originalValue }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState(value);

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    useEffect(() => {
        if (error) {
            setIsEditing(true);
        } else {
            setIsEditing(false);
        }
    }, [error]);

    const handleSave = () => {
        onSave(inputValue);
        if (!error) {
            setIsEditing(false);
        }
    };

    const handleCancel = () => {
        onSave(originalValue);
        setIsEditing(false);
    };

    return (
        <WrapperStyled>
            {isEditing ? (
                <>
                    <TextFieldStyled
                        label={label}
                        value={inputValue || ''}
                        onChange={e => setInputValue(e.target.value)}
                        size="small"
                        error={error}
                        helperText={helperText}
                    />
                    <ButtonsStyled>
                        <IconButton onClick={handleSave} color="primary">
                            <CheckIcon />
                        </IconButton>
                        <IconButton onClick={handleCancel} color="secondary">
                            <CloseIcon />
                        </IconButton>
                    </ButtonsStyled>
                </>
            ) : (
                <>
                    <TextFieldStyled
                        disabled
                        id={label}
                        label={label}
                        value={value || ''}
                        error={error}
                        helperText={helperText}
                    />
                    <ButtonsStyled>
                        <IconButton onClick={() => setIsEditing(true)}>
                            <EditIcon />
                        </IconButton>
                    </ButtonsStyled>
                </>
            )}
        </WrapperStyled>
    );
};
