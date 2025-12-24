import React from 'react'
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
  Button
} from '@mui/material'
import { ExpandMore } from '@mui/icons-material'
import { RecordItem } from '../types'
import Slideshow from './Slideshow'

interface RecordCardProps {
  record: RecordItem
  images: string[]
  slideIndex: number
  onSlidePrevious: () => void
  onSlideNext: () => void
}

export default function RecordCard({ record, images, slideIndex, onSlidePrevious, onSlideNext }: RecordCardProps) {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
          <Typography color="textSecondary" variant="body2">
            ID: {record.id}
          </Typography>
          {record.status && <Chip label={record.status} size="small" variant="outlined" />}
        </Box>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          {record.name}
        </Typography>

        <Accordion sx={{ mb: 1, '&:before': { display: 'none' } }}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
              Item Contents
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2">{record.itemcontents || 'N/A'}</Typography>
          </AccordionDetails>
        </Accordion>

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
      <CardActions>
                {/* <Button size="small" onClick={() => handleDisplayOpen(item)}>Details</Button> */}
                {/* <Button size="small">Edit</Button> */}
                <Button size="small" onClick= {() => alert("Delete clicked")}>Delete</Button>
            </CardActions>
    </Card>
  )
}
