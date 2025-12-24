import React from 'react'
import { Grid, Box, Typography, Button } from '@mui/material'
import { RecordItem } from '../types'
import RecordCard from './RecordCard'

interface RecordGridProps {
  records: RecordItem[]
  images: string[]
  slideIndices: { [key: number]: number }
  onSlidePrevious: (recordId: number) => void
  onSlideNext: (recordId: number) => void
  page: number
  rowsPerPage: number
  onPageChange: (newPage: number) => void
}

export default function RecordGrid({
  records,
  images,
  slideIndices,
  onSlidePrevious,
  onSlideNext,
  page,
  rowsPerPage,
  onPageChange
}: RecordGridProps) {
  const displayed = records.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  const totalPages = Math.ceil(records.length / rowsPerPage)

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        {displayed.map((record) => (
          <Grid item xs={12} sm={6} md={4} key={record.id}>
            <RecordCard
              record={record}
              images={images}
              slideIndex={slideIndices[record.id as unknown as number] || 0}
              onSlidePrevious={() => onSlidePrevious(record.id as unknown as number)}
              onSlideNext={() => onSlideNext(record.id as unknown as number)}
            />
          </Grid>
        ))}
      </Grid>

      {displayed.length === 0 && (
        <Typography color="textSecondary" sx={{ textAlign: 'center', py: 4 }}>
          No records found
        </Typography>
      )}

      {records.length > rowsPerPage && (
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 3 }}>
          <Button
            onClick={() => onPageChange(Math.max(0, page - 1))}
            disabled={page === 0}
            variant="outlined"
            size="small"
          >
            Previous
          </Button>
          <Typography sx={{ display: 'flex', alignItems: 'center', px: 2 }}>
            Page {page + 1} of {totalPages}
          </Typography>
          <Button
            onClick={() => onPageChange(Math.min(totalPages - 1, page + 1))}
            disabled={page >= totalPages - 1}
            variant="outlined"
            size="small"
          >
            Next
          </Button>
        </Box>
      )}
    </Box>
  )
}
