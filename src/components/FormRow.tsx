import React from 'react'
import { Box, BoxProps } from '@mui/material'

interface FormRowProps extends BoxProps {
  columns?: 1 | 2 | 3 | 4 | 5
  children: React.ReactNode
}

/**
 * Reusable form row component for consistent grid layout
 */
export const FormRow: React.FC<FormRowProps> = ({ columns = 1, children, sx, ...props }) => {
  const columnMap = {
    1: '1fr',
    2: 'repeat(2, 1fr)',
    3: 'repeat(3, 1fr)',
    4: 'repeat(4, 1fr)',
    5: 'repeat(5, 1fr)'
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: columnMap[columns],
        gap: 2,
        alignItems: 'start',
        ...sx
      }}
      {...props}
    >
      {children}
    </Box>
  )
}

export default FormRow
