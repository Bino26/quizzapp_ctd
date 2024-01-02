import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Button,
  TextField,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
  useMediaQuery,
  Container,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import customColors, { defaultTheme } from 'assets/styles';
import { LOGIN, RESET_PASSWORD, severities, SIGNUP } from 'App';
import Copyright from '../components/Copyright';
import { useLocation } from 'react-router-dom';
import backgroundAuth from '../assets/images/background-auth.svg';
import jsQuizLogo from '../assets/images/logo.svg';
import Loading from '../components/Loading';
import { backendApiCall } from '../functions/exportFunctions';
import { useState } from 'react';
import { FormControlComponent } from './Login';

export default function SignUp({ setSnackbar }) {
  const isMdScreenAndUp = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const location = useLocation();
  const isAuthPages = [LOGIN, SIGNUP, RESET_PASSWORD].includes(
    location.pathname
  );
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleUserDataChange = (field) => (e) => {
    setUserData((prevData) => ({ ...prevData, [field]: e.target.value }));
  };
  const handleSubmitData = async (event, userData) => {
    const registrationData = {
      firstname: userData.firstName,
      lastname: userData.lastName,
      email: userData.email,
      password: userData.password,
    };
    try {
      event.preventDefault();
      setIsLoading(true);
      await backendApiCall('POST', '/signup', registrationData);
      setIsLoading(false);
      setUserData({
        firstName: '',
        lastName: '',
        password: '',
        email: '',
      });
      navigate(LOGIN);
      setSnackbar({
        isOpened: true,
        severity: severities.SUCCESS,
        message: 'You have successfully registered!',
      });
    } catch (error) {
      setIsLoading(false);
      setSnackbar({
        isOpened: true,
        severity: severities.ERROR,
        message: `An error occurred during registration.`,
      });
      throw new Error(error.message);
    }
  };

  const onRedirect = (event) => {
    event.preventDefault();
    setUserData({
      firstName: '',
      lastName: '',
      password: '',
      email: '',
    });
    navigate(LOGIN);
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
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, backgroundColor: 'primary.main' }}>
              <LockOutlinedIcon sx={{ color: customColors.white }} />
            </Avatar>
            <Typography component="h1" variant="h5" mb={3}>
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={(e) => handleSubmitData(e, userData)}
              sx={{ mt: 3 }}
            >
              {isLoading && <Loading type="linear" />}
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    onChange={handleUserDataChange('firstName')}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    onChange={handleUserDataChange('lastName')}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={handleUserDataChange('email')}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlComponent
                    handleDataChange={handleUserDataChange}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isLoading}
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
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link
                    href={LOGIN}
                    onClick={(event) => onRedirect()}
                    variant="body2"
                  >
                    Already have an account? Sign in
                  </Link>
                </Grid>
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
