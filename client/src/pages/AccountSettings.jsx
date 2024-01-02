import React, { useCallback, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import customColors, { defaultTheme } from '../assets/styles';
import { LOGIN, severities } from '../App';
import { deleteUser } from '../functions/exportFunctions';
import { useNavigate } from 'react-router-dom';
import useAuth from '../auth/useAuth';

const UserInfoSection = ({
  formValues,
  setFormValues,
  changeProfileInfoHandler,
  setSnackbar,
}) => {
  const [lastValidValues, setLastValidValues] = useState(formValues);
  const validateInput = () => {
    if (!formValues.firstName.trim() || !formValues.lastName.trim()) {
      setSnackbar({
        isOpened: true,
        severity: severities.ERROR,
        message: 'First name and last name are required.',
      });
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formValues.email)) {
      setSnackbar({
        isOpened: true,
        severity: severities.ERROR,
        message: 'Invalid email address.',
      });
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateInput()) {
      setFormValues(lastValidValues);
      return;
    }
    setLastValidValues(formValues);
    changeProfileInfoHandler();
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit}
      sx={{ mt: 3, mb: 2 }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            autoComplete="given-name"
            name="firstName"
            value={formValues.firstName}
            onChange={(e) =>
              setFormValues({
                ...formValues,
                firstName: e.target.value,
              })
            }
            required
            fullWidth
            id="firstName"
            label="First Name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="lastName"
            value={formValues.lastName}
            onChange={(e) =>
              setFormValues({
                ...formValues,
                lastName: e.target.value,
              })
            }
            label="Last Name"
            name="lastName"
            autoComplete="family-name"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="email"
            value={formValues.email}
            onChange={(e) =>
              setFormValues({
                ...formValues,
                email: e.target.value,
              })
            }
            label="Email Address"
            name="email"
            autoComplete="email"
          />
        </Grid>
      </Grid>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
        Save changes
      </Button>
    </Box>
  );
};

const PasswordSection = ({
  passwordFormValues,
  setPasswordFormValues,
  changePasswordHandler,
}) => {
  const isChangePasswordButtonDisabled =
    !passwordFormValues.currentPassword || !passwordFormValues.newPassword;

  const handlePasswordChange = (field, value) => {
    setPasswordFormValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    changePasswordHandler();
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit}
      sx={{ mt: 3, mb: 2 }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="currentPassword"
            value={passwordFormValues.currentPassword}
            onChange={(e) =>
              handlePasswordChange('currentPassword', e.target.value)
            }
            label="Current password"
            type="password"
            id="currentPassword"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="password"
            value={passwordFormValues.newPassword}
            onChange={(e) =>
              handlePasswordChange('newPassword', e.target.value)
            }
            label="New password"
            type="password"
            id="newPassword"
          />
        </Grid>
      </Grid>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 5 }}
        disabled={isChangePasswordButtonDisabled}
      >
        Change password
      </Button>
    </Box>
  );
};

const AccountSettings = ({ userData, setSnackbar, updateUserInfo }) => {
  const [formValues, setFormValues] = useState({
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
  });
  const [passwordFormValues, setPasswordFormValues] = useState({
    currentPassword: '',
    newPassword: '',
  });

  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const [confirmAccountDelete, setConfirmAccountDelete] = useState(false);

  const updateUserInfoHandler = useCallback(() => {
    updateUserInfo(formValues, passwordFormValues);
    setFormValues((prevValues) => ({ ...prevValues }));
    setPasswordFormValues({
      currentPassword: '',
      newPassword: '',
    });
  }, [formValues, passwordFormValues, updateUserInfo]);

  const handleDeleteAccount = useCallback(async () => {
    if (confirmAccountDelete) {
      try {
        await deleteUser(setSnackbar, setAuth);
        navigate(LOGIN);
      } catch (error) {
        console.error(error);
      }
    }
  }, [confirmAccountDelete, navigate, setSnackbar, setAuth]);

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
        Account Settings
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <UserInfoSection
              formValues={formValues}
              setFormValues={setFormValues}
              changeProfileInfoHandler={updateUserInfoHandler}
              setSnackbar={setSnackbar}
            />
            <PasswordSection
              passwordFormValues={passwordFormValues}
              setPasswordFormValues={setPasswordFormValues}
              changePasswordHandler={updateUserInfoHandler}
            />
          </Box>
          <Grid item>
            <FormControlLabel
              control={
                <Checkbox
                  value="confirmAccountDelete"
                  color="primary"
                  checked={confirmAccountDelete}
                  onChange={(e) => setConfirmAccountDelete(e.target.checked)}
                />
              }
              label="I want to delete my account."
            />
          </Grid>
          <Button
            fullWidth
            variant="contained"
            sx={{ mb: 2 }}
            onClick={handleDeleteAccount}
            disabled={!confirmAccountDelete}
          >
            Delete account
          </Button>
        </Container>
      </Box>
    </Container>
  );
};

export default AccountSettings;
