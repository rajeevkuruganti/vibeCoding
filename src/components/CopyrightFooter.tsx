import React from 'react'
import { Container, Typography, Link } from '@mui/material'

export default function CopyrightFooter() {
  return (
    <Container maxWidth={'sm'} sx={{ mt: 4, mb: 4 }}>
      <Typography variant={'subtitle2'} color={'darkcyan'} align="center" gutterBottom>
        ___________________________________________________________________________________________
        <div>
          Collectibles Application
          <p></p>
          {'Copyright © '}
          <Link color="inherit" href="https://collections.4circlesllc.com/">
            4 Circles LLC
          </Link>{' '}
          {new Date().getFullYear() - 1}
          {'.'}
        </div>
      </Typography>
    </Container>
  )
}
