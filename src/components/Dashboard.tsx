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
  TextField
  ,Snackbar, Alert
} from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

export default function Dashboard() {
  const [rows, setRows] = useState<RecordItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
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
      setNewRecord({ name: '', email: '', status: '' })
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

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'itemcontents', headerName: 'Item Contents', width: 200 },
    { field: 'status', headerName: 'Status', width: 120 },
    {
      field: 'createdAt',
      headerName: 'Created',
      width: 200,
      valueFormatter: (params) => {
        return params.value ? new Date(params.value as string).toLocaleString() : ''
      }
    }
  ]

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
          <Box sx={{ height: 520, width: '100%', p: 2, boxSizing: 'border-box' }}>
            <Box sx={{ height: '100%', width: '100%', border: '2px solid black', borderRadius: 1, overflow: 'hidden' }}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={rowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
                onPageSizeChange={(newSize) => setRowsPerPage(newSize)}
                pagination
                sx={{
                  height: '100%',
                  '& .MuiDataGrid-row:nth-of-type(odd)': {
                    backgroundColor: (theme) => theme.palette.action.hover
                  },
                  '& .MuiDataGrid-row:nth-of-type(even)': {
                    backgroundColor: 'transparent'
                  },
                  '& .MuiDataGrid-main': {
                    backgroundColor: 'transparent'
                  },
                  '& .MuiDataGrid-columnHeaders': {
                    borderBottom: '1px solid black'
                  }
                }}
              />
            </Box>
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
