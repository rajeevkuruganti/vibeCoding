import React from 'react'
import { Container, CssBaseline, AppBar, Toolbar, Typography } from '@mui/material'
import Dashboard from './components/Dashboard'

export default function App() {
  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">My Collectibles</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Dashboard />
        </Container>
        
    </>
    
  )
}
