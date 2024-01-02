import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  Container,
  Divider,
  Button,
} from '@mui/material';
import jsQuizLogo from '../../assets/images/logo.svg';
import customColors, { defaultTheme } from 'assets/styles';
import SearchComponent from './Search';
import AboutElement from './AboutElement';
import {
  HOME,
  LOGIN,
  SIGNUP,
  RESET_PASSWORD,
  QUIZZES,
  FAVORITES,
  NOTES,
  ERROR,
  LIBRARY,
  ABOUT,
  ACCOUNT_SETTINGS,
  QUIZ,
} from '../../App';

export default function Header({
  profileSettings,
  userData,
  auth,
  onSearchChange,
}) {
  const [headerState, setHeaderState] = useState({
    anchorElUser: null,
    isLoginButtonVisible: false,
    isUserMenuVisible: false,
    isLogoVisible: false,
  });

  const location = useLocation();
  const {
    anchorElUser,
    isLoginButtonVisible,
    isUserMenuVisible,
    isLogoVisible,
  } = headerState;

  useEffect(() => {
    const isQuizRoute = location.pathname.startsWith(QUIZ);

    setHeaderState((prevState) => ({
      ...prevState,
      isLoginButtonVisible: location.pathname === HOME,
      isLogoVisible:
        [
          QUIZZES,
          QUIZ,
          FAVORITES,
          NOTES,
          ACCOUNT_SETTINGS,
          LOGIN,
          SIGNUP,
          RESET_PASSWORD,
          ERROR,
          ABOUT,
          LIBRARY,
        ].includes(location.pathname) || isQuizRoute,
      isUserMenuVisible:
        [QUIZZES, QUIZ, FAVORITES, NOTES, ACCOUNT_SETTINGS, LIBRARY].includes(
          location.pathname
        ) || isQuizRoute,
    }));
  }, [location.pathname]);

  // user menu
  const handleOpenUserMenu = (e) => {
    setHeaderState((prevState) => ({
      ...prevState,
      anchorElUser: e.currentTarget,
    }));
  };
  const handleCloseUserMenu = () => {
    setHeaderState((prevState) => ({ ...prevState, anchorElUser: null }));
  };

  // user icon
  const stringAvatar = (name) => {
    const initials = name
      .split(' ')
      .map((part) => part[0]?.toUpperCase())
      .join('');
    return {
      sx: {
        backgroundColor: 'primary.main',
        color: customColors.white,
      },
      children: initials,
    };
  };

  const isLogoOnRight = [LOGIN, SIGNUP, RESET_PASSWORD].includes(
    location.pathname
  );

  return (
    <AppBar position="static" sx={{ backgroundColor: customColors.blackLight }}>
      <Container
        sx={{
          maxWidth: '1200px',
          [defaultTheme.breakpoints.up('xl')]: {
            padding: 0,
          },
        }}
      >
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          {isLogoOnRight && <Box sx={{ flexGrow: 1 }} />}
          <Link to={HOME}>
            <Avatar
              src={jsQuizLogo}
              variant="square"
              sx={{
                width: '100px',
                height: '100%',
                flexGrow: 0,
                display: isLogoVisible ? 'flex' : 'none',
                justifyContent: isLogoOnRight ? 'end' : 'space-between',
                marginLeft: 'auto',
                [defaultTheme.breakpoints.up('md')]: isLogoOnRight && {
                  display: 'none',
                },
                [defaultTheme.breakpoints.down('sm')]: {
                  width: '85px',
                },
              }}
            />
          </Link>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              marginLeft: '350px',
              [defaultTheme.breakpoints.down('md')]: {
                ml: 0,
              },
            }}
          >
            <SearchComponent onSearchChange={onSearchChange} />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AboutElement />
            <Box
              sx={{ flexGrow: 0, display: isUserMenuVisible ? 'flex' : 'none' }}
            >
              <Tooltip title="Account info">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="User avatar"
                    {...stringAvatar(
                      `${userData.firstName} ${userData.lastName}`
                    )}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '40px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <Typography
                  variant={'body1'}
                  sx={{
                    fontWeight: 'bold',
                    margin: '0 16px',
                    color: customColors.blackLight,
                  }}
                >{`${userData.firstName} ${userData.lastName}`}</Typography>
                <Typography
                  variant={'body2'}
                  sx={{
                    margin: '0 0 10px 16px',
                    color: customColors.greyDark,
                  }}
                >
                  {userData.email}
                </Typography>
                <Divider />
                {profileSettings.map((setting) => (
                  <MenuItem
                    key={setting.title}
                    component={Link}
                    to={setting.path}
                    onClick={() => {
                      handleCloseUserMenu();
                      if (setting.onClick) setting.onClick();
                    }}
                  >
                    {setting.icon}
                    <Typography
                      textAlign="center"
                      sx={{
                        ml: 1,
                        textTransform: 'uppercase',
                        fontSize: '14px',
                        color: customColors.greyMedium,
                      }}
                    >
                      {setting.title}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            {auth.loggedIn ? (
              <Button
                component={Link}
                to={QUIZZES}
                variant="outlined"
                sx={[
                  {
                    '&:hover': {
                      borderColor: customColors.white,
                      backgroundColor: '#3f3f3f',
                    },
                  },
                  {
                    borderColor: customColors.white,
                    color: customColors.white,
                    height: '30px',
                    display: isLoginButtonVisible ? 'flex' : 'none',
                  },
                ]}
              >
                QUIZZES
              </Button>
            ) : (
              <Button
                component={Link}
                to={LOGIN}
                variant="outlined"
                id="loginButton"
                sx={[
                  {
                    '&:hover': {
                      borderColor: customColors.white,
                      backgroundColor: '#3f3f3f',
                    },
                  },
                  {
                    borderColor: customColors.white,
                    color: customColors.white,
                    height: '30px',
                    display: isLoginButtonVisible ? 'flex' : 'none',
                  },
                ]}
              >
                Sign in
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
