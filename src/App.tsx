import React, { useState } from 'react'
import { Container, CssBaseline, AppBar, Toolbar, Typography, Box, MenuItem, Select, ThemeProvider, createTheme } from '@mui/material'
import Dashboard from './components/Dashboard'
import CopyrightFooter from './components/CopyrightFooter'

export default function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('light')

  const theme = createTheme({
    palette: {
      mode,
      ...(mode === 'light' ? {
        background: { default: '#fafafa', paper: '#fff' },
        primary: { main: '#1976d2' }
      } : {
        background: { default: '#121212', paper: '#1e1e1e' },
        primary: { main: '#90caf9' }
      })
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">My Collectibles</Typography>
          <Box>
            <Select
              value={mode}
              onChange={(e) => setMode(e.target.value as 'light' | 'dark')}
              size="small"
              sx={{ color: 'inherit', '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.3)' } }}
            >
              <MenuItem value="light">Light Mode</MenuItem>
              <MenuItem value="dark">Dark Mode</MenuItem>
            </Select>
          </Box>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4, minHeight: 'calc(100vh - 200px)' }}>
        <Dashboard />
      </Container>
      <CopyrightFooter />
    </ThemeProvider>
  )
}
