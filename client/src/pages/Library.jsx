import React from 'react';
import { Alert, Box, Container, Typography } from '@mui/material';
import customColors, { defaultTheme } from '../assets/styles';

const Library = () => {
  return (
    <Container
      sx={{
        minHeight: '95vh',
        backgroundColor: customColors.backgroundLight,
        maxWidth: 'none !important',
        pt: 6,
        pb: 2,
      }}
    >
      <Typography
        variant={'h5'}
        sx={{
          textTransform: 'uppercase',
          mb: 4,
          textAlign: 'center',
          fontWeight: 'bold',
          [defaultTheme.breakpoints.down('md')]: {
            fontSize: '20px',
          },
        }}
      >
        Library
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box
          sx={{
            maxWidth: '1200px',
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          <Alert severity="warning">This section is under development.</Alert>
        </Box>
      </Box>
    </Container>
  );
};

export default Library;
