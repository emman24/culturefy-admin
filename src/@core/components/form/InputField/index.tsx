import React from 'react'

// ** MUI
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import FormHelperText from '@mui/material/FormHelperText'

// ** form handling lib
import { useController, UseControllerProps } from 'react-hook-form'

interface IField extends UseControllerProps {
    name: string,
    type?: 'text' | 'text-area',
    label: string,
    placeholder: string
    control: UseControllerProps['control']
}

const Field = ({ control, ...props }: IField) => {

    const {
        field: { onChange, onBlur, name, value, ref },
        fieldState: { invalid, isTouched, isDirty, error },
        formState: { touchedFields, dirtyFields }
    } = useController({
        ...props,
        control
    });

    return (
        <FormControl fullWidth>
            <TextField
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                name={name}
                inputRef={ref}
                label={props.label}
                placeholder={props.placeholder}
                error={Boolean(error)}
                aria-describedby={`validation-schema-${name}`}
                multiline={props.type === 'text-area' ? true : false}
                fullWidth
            />
            {error && (
                <FormHelperText sx={{ color: 'error.main' }} id={`validation-schema-${name}`}>
                    {error.message}
                </FormHelperText>
            )}
        </FormControl>
    )
}

export default Field;
