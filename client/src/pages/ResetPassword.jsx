import * as React from 'react';
import {
  Button,
  TextField,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
  useMediaQuery,
  Avatar,
  Container,
} from '@mui/material';
import customColors, { defaultTheme } from 'assets/styles';
import { LOGIN, RESET_PASSWORD, SIGNUP } from 'App';
import { useLocation } from 'react-router-dom';
import backgroundAuth from '../assets/images/background-auth.svg';
import jsQuizLogo from '../assets/images/logo.svg';
import Copyright from '../components/Copyright';

export default function ResetPassword() {
  const isMdScreenAndUp = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const location = useLocation();
  const isAuthPages = [LOGIN, SIGNUP, RESET_PASSWORD].includes(
    location.pathname
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    /*//debugging code for testing receiving data from the form, delete when adding functionality
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
        })*/
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '90vh',
      }}
    >
      <Grid container component="main" sx={{ height: '100%' }}>
        <Grid
          item
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${backgroundAuth})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Avatar
            src={jsQuizLogo}
            variant="square"
            sx={{
              width: '311px',
              height: '139px',
              [defaultTheme.breakpoints.down('md')]: {
                display: 'none',
              },
            }}
          ></Avatar>
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography component="h1" variant="h5" mb={3}>
              Forgot password
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{
                mt: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={[
                  {
                    '&:hover': { backgroundColor: customColors.greyDark },
                  },
                  {
                    mt: 3,
                    mb: 2,
                    backgroundColor: customColors.blackLight,
                  },
                ]}
              >
                Send reset link
              </Button>
              <Grid
                item
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'self-end',
                }}
              >
                <Link href={LOGIN} variant="body2" color="primary.main">
                  Go to Sign in page
                </Link>
              </Grid>
              <Container maxWidth="sm" sx={{ mt: 6 }}>
                {isMdScreenAndUp && isAuthPages && (
                  <Copyright color={customColors.blackMedium} />
                )}
              </Container>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
