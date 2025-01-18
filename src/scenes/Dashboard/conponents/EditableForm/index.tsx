import { Box } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { EditableField } from '../EditableField';
import { PublicUser } from '../../../../common/types/user/public.user';

type Props = {
    defaultValues: PublicUser;
    onSave: (data: PublicUser) => void;
};

export const EditableForm = ({ defaultValues, onSave }: Props) => {
    const [originalValues] = useState<PublicUser>(defaultValues);
    const { control, handleSubmit, setValue, reset, trigger } = useForm<PublicUser>({
        defaultValues
    });

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues, reset]);

    const handleFieldSave = async (field: keyof PublicUser, value: string) => {
        setValue(field, value);
        const isValid = await trigger(field);
        if (isValid && value !== originalValues[field]) {
            const updatedUser: PublicUser = {
                ...defaultValues,
                [field]: value || ''
            };
            onSave(updatedUser);
        }
    };

    const handleAddressSave = async (field: keyof NonNullable<PublicUser['address']>, value: string) => {
        setValue(`address.${field}`, value);
        const isValid = await trigger(`address.${field}`);

        if (isValid && value !== (originalValues?.address && originalValues.address[field])) {
            const updatedAddress = defaultValues.address
                ? { ...defaultValues.address, [field]: value || '' }
                : { street: '', suite: '', city: '', zipcode: '', [field]: value || '' };

            const updatedUser: PublicUser = {
                ...defaultValues,
                address: updatedAddress
            };
            onSave(updatedUser);
        }
    };

    const onSubmit = (data: PublicUser) => {
        onSave(data);
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="name"
                rules={{ required: 'Name is required' }}
                control={control}
                render={({ field, fieldState }) => {
                    return (
                        <EditableField
                            label="Name"
                            value={field.value}
                            onSave={val => handleFieldSave('name', val)}
                            error={!!fieldState?.error}
                            helperText={fieldState?.error?.message}
                            originalValue={originalValues.name}
                        />
                    );
                }}
            />
            <Controller
                name="email"
                rules={{ required: 'Email is required' }}
                control={control}
                render={({ field, fieldState }) => (
                    <EditableField
                        label="Email"
                        value={field.value || ''}
                        onSave={val => handleFieldSave('email', val)}
                        error={!!fieldState?.error}
                        helperText={fieldState?.error?.message}
                        originalValue={originalValues.email || ''}
                    />
                )}
            />
            <Controller
                name="phone"
                rules={{ required: 'Phone is required' }}
                control={control}
                render={({ field, fieldState }) => (
                    <EditableField
                        label="Phone"
                        value={field.value || ''}
                        onSave={val => handleFieldSave('phone', val)}
                        error={!!fieldState?.error}
                        helperText={fieldState?.error?.message}
                        originalValue={originalValues.phone || ''}
                    />
                )}
            />
            <Controller
                name="address.street"
                rules={{ required: 'Street is required' }}
                control={control}
                render={({ field, fieldState }) => (
                    <EditableField
                        label="Street"
                        value={field.value || ''}
                        onSave={val => handleAddressSave('street', val)}
                        error={!!fieldState?.error}
                        helperText={fieldState?.error?.message}
                        originalValue={originalValues.address?.street || ''}
                    />
                )}
            />
            <Controller
                name="address.suite"
                rules={{ required: 'Suite is required' }}
                control={control}
                render={({ field, fieldState }) => (
                    <EditableField
                        label="Suite"
                        value={field.value || ''}
                        onSave={val => handleAddressSave('suite', val)}
                        error={!!fieldState?.error}
                        helperText={fieldState?.error?.message}
                        originalValue={originalValues.address?.suite || ''}
                    />
                )}
            />
            <Controller
                name="address.city"
                rules={{ required: 'City is required' }}
                control={control}
                render={({ field, fieldState }) => (
                    <EditableField
                        label="City"
                        value={field.value || ''}
                        onSave={val => handleAddressSave('city', val)}
                        error={!!fieldState?.error}
                        helperText={fieldState?.error?.message}
                        originalValue={originalValues.address?.city || ''}
                    />
                )}
            />
            <Controller
                name="address.zipcode"
                rules={{ required: 'Zipcode is required' }}
                control={control}
                render={({ field, fieldState }) => (
                    <EditableField
                        label="Zipcode"
                        value={field.value || ''}
                        onSave={val => handleAddressSave('zipcode', val)}
                        error={!!fieldState?.error}
                        helperText={fieldState?.error?.message}
                        originalValue={originalValues.address?.zipcode || ''}
                    />
                )}
            />
        </Box>
    );
};
