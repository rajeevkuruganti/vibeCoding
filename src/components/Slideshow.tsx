import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import { ChevronLeft, ChevronRight } from '@mui/icons-material'

interface SlideshowProps {
  images: string[]
  currentIndex: number
  onPrevious: () => void
  onNext: () => void
}

export default function Slideshow({ images, currentIndex, onPrevious, onNext }: SlideshowProps) {
  if (!images.length) return null

  return (
    
    <Box sx={{ position: 'relative', width: '100%', height: 300, backgroundColor: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <img
        src={images[currentIndex].url}
        alt={`Slide ${currentIndex + 1}`}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      {images.length > 1 && (
        <>
          <Button
            onClick={onPrevious}
            sx={{
              position: 'absolute',
              left: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              minWidth: 40,
              height: 40,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)' }
            }}
          >
            <ChevronLeft />
          </Button>
          <Button
            onClick={onNext}
            sx={{
              position: 'absolute',
              right: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              minWidth: 40,
              height: 40,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)' }
            }}
          >
            <ChevronRight />
          </Button>
          <Typography
            sx={{
              position: 'absolute',
              bottom: 8,
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              padding: '4px 8px',
              borderRadius: 1,
              fontSize: '0.75rem'
            }}
          >
            {currentIndex + 1} / {images.length}
          </Typography>
        </>
      )}
    </Box>
  )
}
