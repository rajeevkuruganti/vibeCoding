import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormControl,
  FormLabel,
  MenuItem,
  Typography
} from '@mui/material'
import { DESCRIPTION_MAX_LENGTH } from '../constants'

interface NewRecordDialogProps {
  open: boolean
  submitting: boolean
  record: Record<string, string>
  onClose: () => void
  onCreate: () => void
  onRecordChange: (field: string, value: string) => void
  onClear: () => void
}

export default function NewRecordDialog({
  open,
  submitting,
  record,
  onClose,
  onCreate,
  onRecordChange,
  onClear
}: NewRecordDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>New Book Record</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'grid', gap: 2, mt: 1 }}>
          {/* Row 1: Name */}
          <TextField
            label="Name (Title)"
            value={record.title || ''}
            onChange={(e) => onRecordChange('title', e.target.value)}
            fullWidth
            size="small"
            InputLabelProps={{ sx: { fontWeight: 'bold', fontSize: '0.95rem' } }}
          />

          {/* Row 2: Author */}
          <TextField
            label="Author"
            value={record.author || ''}
            onChange={(e) => onRecordChange('author', e.target.value)}
            fullWidth
            size="small"
            InputLabelProps={{ sx: { fontWeight: 'bold', fontSize: '0.95rem' } }}
          />

          {/* Row 3: ISBN, Edition, Autographed */}
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, alignItems: 'start' }}>
            <TextField
              label="ISBN"
              value={record.isbn || ''}
              onChange={(e) => onRecordChange('isbn', e.target.value)}
              fullWidth
              size="small"
              InputLabelProps={{ sx: { fontWeight: 'bold', fontSize: '0.95rem' } }}
            />
            <TextField
              label="Edition"
              value={record.edition || ''}
              onChange={(e) => onRecordChange('edition', e.target.value)}
              fullWidth
              size="small"
              InputLabelProps={{ sx: { fontWeight: 'bold', fontSize: '0.95rem' } }}
            />
            <FormControl size="small" fullWidth sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}>
              <FormLabel sx={{ fontSize: '0.95rem', mb: 0, fontWeight: 'bold' }}>Autographed:</FormLabel>
              <RadioGroup
                row
                value={record.autographed || 'No'}
                onChange={(e) => onRecordChange('autographed', e.target.value)}
                sx={{ gap: 0 }}
              >
                <FormControlLabel value="No" control={<Radio size="small" />} label="No" sx={{ mr: 1 }} />
                <FormControlLabel value="Yes" control={<Radio size="small" />} label="Yes" />
              </RadioGroup>
            </FormControl>
          </Box>

          {/* Row 2: Date Acquired, Cost, Condition */}
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
            <TextField
              label="Date Acquired"
              type="date"
              value={record.dateAcquired || ''}
              onChange={(e) => onRecordChange('dateAcquired', e.target.value)}
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true, sx: { fontWeight: 'bold', fontSize: '0.95rem' } }}
            />
            <TextField
              label="Cost"
              type="number"
              value={record.cost || ''}
              onChange={(e) => onRecordChange('cost', e.target.value)}
              fullWidth
              size="small"
              inputProps={{ step: '0.01' }}
              InputLabelProps={{ sx: { fontWeight: 'bold', fontSize: '0.95rem' } }}
            />
            <TextField
              select
              label="Condition"
              value={record.condition || 'Good'}
              onChange={(e) => onRecordChange('condition', e.target.value)}
              fullWidth
              size="small"
              InputLabelProps={{ sx: { fontWeight: 'bold', fontSize: '0.95rem' } }}
            >
              <MenuItem value="Damaged">Damaged</MenuItem>
              <MenuItem value="Fair">Fair</MenuItem>
              <MenuItem value="Good">Good</MenuItem>
              <MenuItem value="Excellent">Excellent</MenuItem>
            </TextField>
          </Box>

          {/* Description */}
          <Box>
            <TextField
              label="Description (max 3000 characters)"
              value={record.description || ''}
              onChange={(e) => onRecordChange('description', e.target.value.slice(0, DESCRIPTION_MAX_LENGTH))}
              fullWidth
              multiline
              rows={4}
              helperText={`${(record.description || '').length}/${DESCRIPTION_MAX_LENGTH}`}
              InputLabelProps={{ sx: { fontWeight: 'bold', fontSize: '0.95rem' } }}
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClear} disabled={submitting}>
          Clear
        </Button>
        <Button onClick={onClose} disabled={submitting}>
          Cancel
        </Button>
        <Button onClick={onCreate} variant="contained" disabled={submitting}>
          {submitting ? 'Saving...' : 'OK'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
