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
  Container,
  useMediaQuery,
  InputAdornment,
  IconButton,
  Alert,
  OutlinedInput,
  InputLabel,
  FormControl,
} from '@mui/material';
import useAuth from 'auth/useAuth';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { LOGIN, RESET_PASSWORD, SIGNUP, HOME, severities } from 'App';
import { backendApiCall } from '../functions/exportFunctions';
import customColors from 'assets/styles';
import Copyright from '../components/Copyright';
import backgroundAuth from '../assets/images/background-auth.svg';
import jsQuizLogo from '../assets/images/logo.svg';
import { useLocation } from 'react-router-dom';
import Loading from '../components/Loading';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export const FormControlComponent = ({ handleDataChange }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <FormControl fullWidth variant="outlined" margin="normal">
      <InputLabel htmlFor="password">Password</InputLabel>
      <OutlinedInput
        id="password"
        required
        fullWidth
        name="password"
        autoComplete="current-password"
        label="Password"
        type={showPassword ? 'text' : 'password'}
        onChange={handleDataChange('password')}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? (
                <Visibility sx={{ color: customColors.greyMedium }} />
              ) : (
                <VisibilityOff sx={{ color: customColors.greyMedium }} />
              )}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default function Login({ setSnackbar }) {
  const isMdScreenAndUp = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const location = useLocation();
  const isAuthPages = [LOGIN, SIGNUP, RESET_PASSWORD].includes(
    location.pathname
  );
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const { setAuth } = useAuth();
  const [loginData, setLoginData] = React.useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleLoginDataChange = (field) => (e) => {
    setLoginData((prevData) => ({ ...prevData, [field]: e.target.value }));
  };

  const handleSubmit = async (event, loginData) => {
    event.preventDefault();
    setIsLoading(true);
    const bodyData = {
      email: loginData.email,
      password: loginData.password,
    };

    try {
      const apiStatus = await backendApiCall('POST', '/login', bodyData);
      if (apiStatus.success === true) {
        setIsLoading(false);
        setLoginData({
          email: '',
          password: '',
        }); // Resetting the login data to its initial state.
        setAuth({
          loggedIn: true,
        });
        navigate(HOME);
        setSnackbar({
          isOpened: true,
          severity: severities.SUCCESS,
          message: 'Welcome to the JSQuiz Educational Platform!',
        });
      }
    } catch (error) {
      setIsLoading(false); // Ensure loading state is reset even on error.
      setErrorMessage(error.message); // Set error message to display
      setSnackbar({
        isOpened: true,
        severity: severities.ERROR,
        message: `An error occurred during login.`,
      });
    }
  };

  const onRedirect = () => {
    setLoginData({
      password: '',
      email: '',
    });
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
              display: isMdScreenAndUp ? 'flex' : 'none',
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
              Sign in
            </Typography>
            {isLoading && <Loading type="linear" />}
            <Box
              component="form"
              noValidate
              onSubmit={(e) => handleSubmit(e, loginData)}
              sx={{ mt: 1 }}
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
                onChange={handleLoginDataChange('email')}
              />
              <FormControlComponent handleDataChange={handleLoginDataChange} />
              {errorMessage && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {errorMessage}
                </Alert>
              )}
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
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link
                    href={RESET_PASSWORD}
                    onClick={onRedirect}
                    variant="body2"
                    color="primary.main"
                  >
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    href={SIGNUP}
                    onClick={onRedirect}
                    variant="body2"
                    color="primary.main"
                  >
                    Don't have an account? Sign Up
                  </Link>
                </Grid>
                <Container maxWidth="sm" sx={{ mt: 6 }}>
                  {isMdScreenAndUp && isAuthPages && (
                    <Copyright color={customColors.blackMedium} />
                  )}
                </Container>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
