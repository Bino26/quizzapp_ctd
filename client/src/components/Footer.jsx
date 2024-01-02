import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Copyright from './Copyright';
import customColors from 'assets/styles';
import { LOGIN, RESET_PASSWORD, SIGNUP } from '../App';
import { useMediaQuery } from '@mui/material';
import { useLocation } from 'react-router-dom';

export default function Footer() {
  const isMdScreenAndUp = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const location = useLocation();
  const isAuthPages = [LOGIN, SIGNUP, RESET_PASSWORD].includes(
    location.pathname
  );

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? customColors.blackLight
            : theme.palette.grey[800],
        bottom: 0,
        left: 0,
        right: 0,
        position: isAuthPages ? 'fixed' : 'relative',
      }}
    >
      <Container maxWidth="sm">
        {!isMdScreenAndUp && isAuthPages && (
          <Copyright color={customColors.white} />
        )}
        {!isAuthPages && <Copyright color={customColors.white} />}
      </Container>
    </Box>
  );
}
