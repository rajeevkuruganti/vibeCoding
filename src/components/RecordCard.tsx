import React, { useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  MenuItem
} from '@mui/material'
import { ExpandMore, Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material'
import { RecordItem } from '../types'
import Slideshow from './Slideshow'

interface RecordCardProps {
  record: RecordItem
  images: string[]
  slideIndex: number
  onSlidePrevious: () => void
  onSlideNext: () => void
  onDelete: (record: RecordItem) => void
}

export default function RecordCard({ record, images, slideIndex, onSlidePrevious, onSlideNext, onDelete }: RecordCardProps) {
  const [editOpen, setEditOpen] = useState(false)
  const [editData, setEditData] = useState<Record<string, string>>({})

  // Parse itemcontents JSON if it exists
  const parseItemContents = (itemcontents: string | undefined) => {
    try {
      if (!itemcontents) return null
      return JSON.parse(itemcontents)
    } catch (e) {
      return null
    }
  }

  const itemContentsData = parseItemContents(record.itemcontents)

  const handleEditOpen = () => {
    if (itemContentsData) {
      setEditData({
        name: record.name,
        ...itemContentsData
      })
      setEditOpen(true)
    }
  }

  const handleEditClose = () => {
    setEditOpen(false)
  }

  const handleEditChange = (key: string, value: string) => {
    setEditData((prev: any) => ({ ...prev, [key]: value }))
  }

  const handleEditSave = () => {
    console.log('Updated item contents:', editData)
    // Here you would call an API to update the record
    setEditOpen(false)
  }

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
          {record.status && <Chip label={record.status} size="small" variant="outlined" />}
        </Box>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          {record.name}
        </Typography>

        {itemContentsData && (
          <Accordion sx={{ mb: 1, '&:before': { display: 'none' } }}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                Item Contents
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {Object.entries(itemContentsData).map(([key, value]) => (
                  <Box key={key} sx={{ display: 'flex', gap: 2 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, minWidth: '120px' }}>
                      {key}:
                    </Typography>
                    <Typography variant="body2">{String(value)}</Typography>
                  </Box>
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>
        )}

        {record.year_released && (
          <Accordion sx={{ mb: 1, '&:before': { display: 'none' } }}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                Year Released
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">{record.year_released}</Typography>
            </AccordionDetails>
          </Accordion>
        )}

        {record.description && (
          <Accordion sx={{ '&:before': { display: 'none' } }}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                Description
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">{record.description}</Typography>
            </AccordionDetails>
          </Accordion>
        )}
      </CardContent>

      {images.length > 0 && (
        <Slideshow
          images={images}
          currentIndex={slideIndex}
          onPrevious={onSlidePrevious}
          onNext={onSlideNext}
        />
      )}

      {record.createdAt && (
        <CardActions>
          <Typography variant="caption" color="textSecondary">
            Created: {new Date(record.createdAt as string).toLocaleDateString()}
          </Typography>
        </CardActions>
      )}
      <CardActions sx={{ gap: 1 }}>
        <Button 
          size="small" 
          color="error" 
          startIcon={<EditIcon />}
          onClick={handleEditOpen}
          disabled={!itemContentsData}
        >
          Edit
        </Button>
        <Button 
          size="small" 
          color="error" 
          startIcon={<DeleteIcon />}
          onClick={() => onDelete(record)}
        >
          Delete
        </Button>
      </CardActions>

      {/* Edit Dialog */}
      <Dialog open={editOpen} onClose={handleEditClose} fullWidth maxWidth="md">
        <DialogTitle>Edit Book Record</DialogTitle>
        <DialogContent sx={{ display: 'grid', gap: 2, mt: 1 }}>
          {/* Row 1: Name */}
          <TextField
            label="Name (Title)"
            value={editData.name || ''}
            onChange={(e: any) => handleEditChange('name', e.target.value)}
            fullWidth
            size="small"
            InputLabelProps={{ sx: { fontWeight: 'bold', fontSize: '0.95rem' } }}
          />

          {/* Row 2: Author */}
          <TextField
            label="Author"
            value={editData.author || ''}
            onChange={(e: any) => handleEditChange('author', e.target.value)}
            fullWidth
            size="small"
            InputLabelProps={{ sx: { fontWeight: 'bold', fontSize: '0.95rem' } }}
          />

          {/* Row 3: ISBN, Edition, Autographed */}
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, alignItems: 'start' }}>
            <TextField
              label="ISBN"
              value={editData.isbn || ''}
              onChange={(e: any) => handleEditChange('isbn', e.target.value)}
              fullWidth
              size="small"
              InputLabelProps={{ sx: { fontWeight: 'bold', fontSize: '0.95rem' } }}
            />
            <TextField
              label="Edition"
              value={editData.edition || ''}
              onChange={(e: any) => handleEditChange('edition', e.target.value)}
              fullWidth
              size="small"
              InputLabelProps={{ sx: { fontWeight: 'bold', fontSize: '0.95rem' } }}
            />
            <FormControl size="small" fullWidth sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}>
              <FormLabel sx={{ fontSize: '0.95rem', mb: 0, fontWeight: 'bold' }}>Autographed:</FormLabel>
              <RadioGroup
                row
                value={editData.autographed || 'No'}
                onChange={(e: any) => handleEditChange('autographed', e.target.value)}
                sx={{ gap: 0 }}
              >
                <FormControlLabel value="No" control={<Radio size="small" />} label="No" sx={{ mr: 1 }} />
                <FormControlLabel value="Yes" control={<Radio size="small" />} label="Yes" />
              </RadioGroup>
            </FormControl>
          </Box>

          {/* Date Acquired, Cost, Condition */}
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
            <TextField
              label="Date Acquired"
              type="date"
              value={editData.dateAcquired || ''}
              onChange={(e: any) => handleEditChange('dateAcquired', e.target.value)}
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true, sx: { fontWeight: 'bold', fontSize: '0.95rem' } }}
            />
            <TextField
              label="Cost"
              type="number"
              value={editData.cost || ''}
              onChange={(e: any) => handleEditChange('cost', e.target.value)}
              fullWidth
              size="small"
              inputProps={{ step: '0.01' }}
              InputLabelProps={{ sx: { fontWeight: 'bold', fontSize: '0.95rem' } }}
            />
            <TextField
              select
              label="Condition"
              value={editData.condition || 'Good'}
              onChange={(e: any) => handleEditChange('condition', e.target.value)}
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
          <TextField
            label="Description (max 3000 characters)"
            value={editData.description || ''}
            onChange={(e: any) => handleEditChange('description', e.target.value.slice(0, 3000))}
            fullWidth
            multiline
            rows={4}
            size="small"
            helperText={`${(editData.description || '').length}/3000`}
            InputLabelProps={{ sx: { fontWeight: 'bold', fontSize: '0.95rem' } }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleEditSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Card>
  )
}
