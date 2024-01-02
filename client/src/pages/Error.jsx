import React from 'react';
import { Alert, AlertTitle, Box, Button, Container } from '@mui/material';
import customColors from '../assets/styles';
import { Link } from 'react-router-dom';
import { HOME } from '../App';

export default function Error() {
  return (
    <Container
      sx={{
        minHeight: '85vh',
        backgroundColor: customColors.backgroundLight,
        maxWidth: 'none !important',
        pt: 6,
        pb: 2,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box
          sx={{
            maxWidth: '1200px',
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          <Alert severity="error">
            <AlertTitle>404 Error :(</AlertTitle>
            Let's find a better place for you to go.
          </Alert>
          <Button
            component={Link}
            to={HOME}
            size={'large'}
            variant="contained"
            sx={[
              {
                '&:hover': {
                  backgroundColor: customColors.blackMedium,
                  border: `3px solid ${customColors.blackLight}`,
                  fontWeight: 'bold',
                },
              },
              {
                mt: 3,
                mb: 2,
                backgroundColor: customColors.blackLight,
                color: customColors.greyLight,
                border: `3px solid ${customColors.blackLight}`,
                width: '200px',
                fontWeight: 'bold',
              },
            ]}
          >
            Home
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
