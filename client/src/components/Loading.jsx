import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';

export default function Loading({ type = 'linear', ...props }) {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      {type === 'linear' ? (
        <LinearProgress {...props} />
      ) : (
        <CircularProgress {...props} sx={{ mt: 3 }} />
      )}
    </Box>
  );
}
