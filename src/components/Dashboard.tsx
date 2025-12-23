import React, { useEffect, useState } from 'react'
import { fetchAllRecords, createRecord } from '../api/api'
import { RecordItem } from '../types'
import {
  Box,
  CircularProgress,
  Paper,
  Toolbar,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
  Card,
  CardContent,
  CardActions,
  Grid,
  Chip
} from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh'
import { Description, InsertEmoticon } from '@mui/icons-material'

export default function Dashboard() {
  const [rows, setRows] = useState<RecordItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(6)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [newRecord, setNewRecord] = useState({ name: '', itemcontents: '', year_released: '' })
  const [successOpen, setSuccessOpen] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorOpen, setErrorOpen] = useState(false)

  useEffect(() => {
    load()
  }, [])

  async function load() {
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
  }

  async function handleCreate() {
    setSubmitting(true)
    try {
      const created = await createRecord(newRecord)
      setRows((prev) => [created, ...prev])
      setPage(0)
      setDialogOpen(false)
      setNewRecord({ name: '', itemcontents: '', description: '' , year_released: '' })
      setSuccessMessage(`Created record ${created.id}`)
      setSuccessOpen(true)
    } catch (err: any) {
      setError(err?.message || 'Failed to create')
      setErrorOpen(true)
    } finally {
      setSubmitting(false)
    }
  }

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const displayed = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  return (
    <Box p={2} sx={{ backgroundColor: 'darkgreen' }}>
      <Paper elevation={2} sx={{ backgroundColor: 'white' }}>
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

        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" p={4}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box p={3}>
            <Typography color="error">{error}</Typography>
          </Box>
        ) : (
          <Box sx={{ p: 2 }}>
            <Grid container spacing={2}>
              {displayed.map((record) => (
                <Grid item xs={12} sm={6} md={4} key={record.id}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
                        <Typography color="textSecondary" variant="body2">
                          ID: {record.id}
                        </Typography>
                        {record.status && (
                          <Chip label={record.status} size="small" variant="outlined" />
                        )}
                      </Box>
                      <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                        {record.name}
                      </Typography>
                      {record.itemcontents && (
                        <Box sx={{ mb: 1 }}>
                          <Typography variant="caption" color="textSecondary" display="block">
                            Item Contents
                          </Typography>
                          <Typography variant="body2">{record.itemcontents}</Typography>
                        </Box>
                      )}
                      {record.year_released && (
                        <Box sx={{ mb: 1 }}>
                          <Typography variant="caption" color="textSecondary" display="block">
                            Year Released
                          </Typography>
                          <Typography variant="body2">{record.year_released}</Typography>
                        </Box>
                      )}
                      {record.description && (
                        <Box>
                          <Typography variant="caption" color="textSecondary" display="block">
                            Description
                          </Typography>
                          <Typography variant="body2">{record.description}</Typography>
                        </Box>
                      )}
                    </CardContent>
                    {record.createdAt && (
                      <CardActions>
                        <Typography variant="caption" color="textSecondary">
                          Created: {new Date(record.createdAt as string).toLocaleDateString()}
                        </Typography>
                      </CardActions>
                    )}
                  </Card>
                </Grid>
              ))}
            </Grid>

            {displayed.length === 0 && (
              <Typography color="textSecondary" sx={{ textAlign: 'center', py: 4 }}>
                No records found
              </Typography>
            )}

            {rows.length > rowsPerPage && (
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 3 }}>
                <Button
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  disabled={page === 0}
                  variant="outlined"
                  size="small"
                >
                  Previous
                </Button>
                <Typography sx={{ display: 'flex', alignItems: 'center', px: 2 }}>
                  Page {page + 1} of {Math.ceil(rows.length / rowsPerPage)}
                </Typography>
                <Button
                  onClick={() => setPage((p) => Math.min(Math.ceil(rows.length / rowsPerPage) - 1, p + 1))}
                  disabled={page >= Math.ceil(rows.length / rowsPerPage) - 1}
                  variant="outlined"
                  size="small"
                >
                  Next
                </Button>
              </Box>
            )}
          </Box>
        )}

        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="sm">
          <DialogTitle>New Record</DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'grid', gap: 2, mt: 1 }}>
              <TextField
                label="Name"
                value={newRecord.name}
                onChange={(e) => setNewRecord((s) => ({ ...s, name: e.target.value }))}
                fullWidth
              />
              <TextField
                label="Item Contents"
                value={newRecord.itemcontents}
                onChange={(e) => setNewRecord((s) => ({ ...s, itemcontents: e.target.value }))}
                fullWidth
              />
              <TextField
                label="Description"
                value={newRecord.description}
                onChange={(e) => setNewRecord((s) => ({ ...s, description: e.target.value }))}
                fullWidth
              />
              <TextField
                label="Year Released"
                value={newRecord.year_released}
                onChange={(e) => setNewRecord((s) => ({ ...s, year_released: e.target.value }))}
                fullWidth
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)} disabled={submitting}>
              Cancel
            </Button>
            <Button onClick={handleCreate} variant="contained" disabled={submitting}>
              {submitting ? 'Saving...' : 'Create'}
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar open={successOpen} autoHideDuration={4000} onClose={() => setSuccessOpen(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
          <Alert onClose={() => setSuccessOpen(false)} severity="success" sx={{ width: '100%' }}>
            {successMessage}
          </Alert>
        </Snackbar>

        <Snackbar
          open={errorOpen}
          autoHideDuration={6000}
          onClose={() => {
            setErrorOpen(false)
            setError(null)
          }}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert
            onClose={() => {
              setErrorOpen(false)
              setError(null)
            }}
            severity="error"
            sx={{ width: '100%' }}
          >
            {error}
          </Alert>
        </Snackbar>
      </Paper>
    </Box>
  )
}
