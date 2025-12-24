import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { fetchAllRecords, createRecord } from '../api/api'
import { RecordItem } from '../types'
import {
  Box,
  CircularProgress,
  Paper,
  Toolbar,
  Typography,
  Button,
  Snackbar,
  Alert
} from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh'
import RecordGrid from './RecordGrid'
import NewRecordDialog from './NewRecordDialog'

const IMAGES_URL = 'http://localhost:8080/collection/images'

export default function Dashboard() {
  // Data state
  const [rows, setRows] = useState<RecordItem[]>([])
  const [images, setImages] = useState<string[]>([])
  const [slideIndices, setSlideIndices] = useState<{ [key: number]: number }>({})

  // UI state
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(0)
  const [rowsPerPage] = useState(6)

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [newRecord, setNewRecord] = useState({ name: '', itemcontents: '', year_released: '', description: '' })

  // Notification state
  const [successOpen, setSuccessOpen] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorOpen, setErrorOpen] = useState(false)

  // Load records and images on mount
  useEffect(() => {
    load()
    loadImages()
  }, [])

  // Load all records
  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchAllRecords()
      setRows(data)
    } catch (err: any) {
      setError(err?.message || 'Failed to fetch')
      setErrorOpen(true)
    } finally {
      setLoading(false)
    }
  }, [])

  // Load images from server
  const loadImages = useCallback(async () => {
    try {
      const response = await fetch(IMAGES_URL)
      const data = await response.json()
      setImages(data || [])
    } catch (err: any) {
      console.error('Failed to fetch images:', err)
    }
  }, [])

  // Create new record
  const handleCreate = useCallback(async () => {
    setSubmitting(true)
    try {
      const created = await createRecord(newRecord)
      setRows((prev) => [created, ...prev])
      setPage(0)
      setDialogOpen(false)
      setNewRecord({ name: '', itemcontents: '', year_released: '', description: '' })
      setSuccessMessage(`Created record ${created.id}`)
      setSuccessOpen(true)
    } catch (err: any) {
      setError(err?.message || 'Failed to create')
      setErrorOpen(true)
    } finally {
      setSubmitting(false)
    }
  }, [newRecord])

  // Handle slide navigation
  const nextSlide = useCallback((recordId: number) => {
    setSlideIndices((prev) => ({
      ...prev,
      [recordId]: ((prev[recordId] || 0) + 1) % images.length
    }))
  }, [images.length])

  const prevSlide = useCallback((recordId: number) => {
    setSlideIndices((prev) => ({
      ...prev,
      [recordId]: ((prev[recordId] || 0) - 1 + images.length) % images.length
    }))
  }, [images.length])

  // Delete record
  const handleDelete = useCallback(async (recordId: number) => {
    try {
      const response = await fetch(`https://localhost:8080/collection/cs`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: recordId })
      })

      if (!response.ok) {
        throw new Error('Failed to delete record')
      }

      setRows((prev) => prev.filter((r) => r.id !== recordId))
      setSuccessMessage(`Deleted record ${recordId}`)
      setSuccessOpen(true)
    } catch (err: any) {
      setError(err?.message || 'Failed to delete record')
      setErrorOpen(true)
    }
  }, [])

  // Update new record fields
  const handleRecordChange = useCallback((field: string, value: string) => {
    setNewRecord((prev) => ({ ...prev, [field]: value }))
  }, [])

  // Memoize error notification callback
  const handleCloseError = useCallback(() => {
    setErrorOpen(false)
    setError(null)
  }, [])

  return (
    <Box p={2} sx={{ backgroundColor: 'darkgreen' }}>
      <Paper elevation={2} sx={{ backgroundColor: 'white' }}>
        {/* Header */}
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">Records</Typography>
          <Box>
            <Button sx={{ mr: 1 }} variant="contained" onClick={() => setDialogOpen(true)}>
              New
            </Button>
            <Button startIcon={<RefreshIcon />} onClick={load} disabled={loading} variant="outlined">
              Refresh
            </Button>
          </Box>
        </Toolbar>

        {/* Content */}
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" p={4}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box p={3}>
            <Typography color="error">{error}</Typography>
          </Box>
        ) : (
          <RecordGrid
            records={rows}
            images={images}
            slideIndices={slideIndices}
            onSlidePrevious={prevSlide}
            onSlideNext={nextSlide}
            onDelete={handleDelete}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={setPage}
          />
        )}

        {/* Dialogs and Notifications */}
        <NewRecordDialog
          open={dialogOpen}
          submitting={submitting}
          record={newRecord}
          onClose={() => setDialogOpen(false)}
          onCreate={handleCreate}
          onRecordChange={handleRecordChange}
        />

        <Snackbar
          open={successOpen}
          autoHideDuration={4000}
          onClose={() => setSuccessOpen(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert onClose={() => setSuccessOpen(false)} severity="success" sx={{ width: '100%' }}>
            {successMessage}
          </Alert>
        </Snackbar>

        <Snackbar
          open={errorOpen}
          autoHideDuration={6000}
          onClose={handleCloseError}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
          </Paper>
        </Box>
      )
    }
  
