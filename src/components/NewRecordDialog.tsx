import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box
} from '@mui/material'

interface NewRecordDialogProps {
  open: boolean
  submitting: boolean
  record: Record<string, string>
  onClose: () => void
  onCreate: () => void
  onRecordChange: (field: string, value: string) => void
}

export default function NewRecordDialog({
  open,
  submitting,
  record,
  onClose,
  onCreate,
  onRecordChange
}: NewRecordDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>New Record</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'grid', gap: 2, mt: 1 }}>
          <TextField
            label="Name"
            value={record.name}
            onChange={(e) => onRecordChange('name', e.target.value)}
            fullWidth
          />
          <TextField
            label="Item Contents"
            value={record.itemcontents}
            onChange={(e) => onRecordChange('itemcontents', e.target.value)}
            fullWidth
          />
          <TextField
            label="Description"
            value={record.description}
            onChange={(e) => onRecordChange('description', e.target.value)}
            fullWidth
          />
          <TextField
            label="Year Released"
            value={record.year_released}
            onChange={(e) => onRecordChange('year_released', e.target.value)}
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={submitting}>
          Cancel
        </Button>
        <Button onClick={onCreate} variant="contained" disabled={submitting}>
          {submitting ? 'Saving...' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
