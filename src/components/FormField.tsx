import React from 'react'
import { TextField, TextFieldProps } from '@mui/material'

interface FormFieldProps extends Omit<TextFieldProps, 'InputLabelProps'> {
  label: string
  value: string
  onChange: (value: string) => void
}

/**
 * Reusable form field component with consistent styling
 * Applies bold, larger labels automatically
 */
export const FormField: React.FC<FormFieldProps> = ({
  label,
  value,
  onChange,
  ...props
}) => {
  return (
    <TextField
      label={label}
      value={value}
      onChange={(e: any) => onChange(e.target.value)}
      InputLabelProps={{
        sx: { fontWeight: 'bold', fontSize: '0.95rem' },
        ...props.InputLabelProps
      }}
      {...props}
    />
  )
}

export default FormField
