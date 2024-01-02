import React, { useCallback, useState, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import useAuth from 'auth/useAuth';
import { CssBaseline, ThemeProvider } from '@mui/material';
import customColors, { defaultTheme } from 'assets/styles';
import Login from 'pages/Login';
import SignUp from 'pages/SignUp';
import ResetPassword from 'pages/ResetPassword';
import Footer from 'components/Footer';
import Error from 'pages/Error';
import Home from 'pages/Home/Home';
import QuizContent from 'pages/Quiz/QuizContent';
import LogoutModal from 'components/LogoutModal';
import highlight_1 from './assets/images/highlight_effective_knowledge_testing.svg';
import highlight_2 from './assets/images/highlight_preparing_for_a_job_interview.svg';
import highlight_3 from './assets/images/highlight_improving_coding_skills.svg';
import highlight_4 from './assets/images/highlight_notes_for_productive_studying.svg';
import CustomizedSnackbars from 'components/Snackbar';
import Header from './components/Header/Header';
import SettingsRoundedIcon from '@mui/icons-material/Settings';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { Quizzes } from './pages/Main/Quizzes';
import { Favorites } from './pages/Main/Favorites';
import About from './pages/About/About';
import NavBar from './components/NavBar';
import Library from './pages/Library';
import AccountSettings from './pages/AccountSettings';
import useFilterState from './components/filterState';
import Box from '@mui/material/Box';
import {
  backendApiCall,
  authenticateUser,
  handleLogout,
} from './functions/exportFunctions';
import Notes from 'pages/Notes/notesPage';
import { BASE_URL } from './config';

const PATH = {
  HOME: '/home',
  LOGIN: '/login',
  SIGNUP: '/signup',
  RESET_PASSWORD: '/reset-password',
  ACCOUNT_SETTINGS: '/settings',
  ABOUT: '/about',
  QUIZZES: '/quiz-app',
  ERROR: '/error',
  FAVORITES: '/favorites',
  NOTES: '/notes',
  LIBRARY: '/library',
  QUIZ: '/quiz',
};

export const {
  HOME,
  LOGIN,
  SIGNUP,
  RESET_PASSWORD,
  QUIZZES,
  ACCOUNT_SETTINGS,
  ABOUT,
  ERROR,
  FAVORITES,
  NOTES,
  LIBRARY,
  QUIZ,
} = PATH;

export const severities = {
  ERROR: 'error',
  SUCCESS: 'success',
};

export const highlights = [
  {
    id: 'highlight 1',
    text: 'Effective knowledge testing',
    image: highlight_1,
  },
  {
    id: 'highlight 2',
    text: 'Preparing for a job interview',
    image: highlight_2,
  },
  {
    id: 'highlight 3',
    text: 'Improving coding skills',
    image: highlight_3,
  },
  {
    id: 'highlight 4',
    text: 'Notes for productive studying',
    image: highlight_4,
  },
];

export default function App() {
  const { auth, setAuth } = useAuth();
  const [snackbar, setSnackbar] = useState({
    isOpened: false,
    severity: '',
    message: '',
  });
  const [loading, setLoading] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const userData = {
    firstName: auth.firstName,
    lastName: auth.lastName,
    email: auth.email,
  };
  const [searchTerm, setSearchTerm] = useState('');
  const profileSettings = [
    {
      title: 'Account',
      icon: <SettingsRoundedIcon sx={{ color: customColors.blackLight }} />,
      path: ACCOUNT_SETTINGS,
    },
    {
      title: 'Logout',
      icon: <LogoutRoundedIcon sx={{ color: customColors.blackLight }} />,
      onClick: () => handleLogout(backendApiCall, setAuth, setShowLogoutModal),
      path: HOME,
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      return await authenticateUser(backendApiCall, setAuth, setLoading);
    };

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.loggedIn]);

  const { activeFilters, setActiveFilter } = useFilterState();

  const changeFilter = useCallback(
    (filterType, filter) => {
      setActiveFilter(filterType, filter);
    },
    [setActiveFilter]
  );

  const onSearchChange = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
  };

  const updateUserInfo = async (formValues, passwordFormValues) => {
    let payload = {};
    if (formValues) {
      payload = {
        firstname: formValues.firstName,
        lastname: formValues.lastName,
        email: formValues.email,
      };
    }
    if (
      passwordFormValues.newPassword !== '' &&
      passwordFormValues.currentPassword !== ''
    ) {
      payload = {
        currentPassword: passwordFormValues.currentPassword,
        newPassword: passwordFormValues.newPassword,
      };
    }

    const url = `${BASE_URL}/updateuser`;
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(payload),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update account information');
      }

      if (formValues) {
        setAuth((prevAuth) => ({
          ...prevAuth,
          firstName: formValues.firstName,
          lastName: formValues.lastName,
          email: formValues.email,
        }));
      }
      setSnackbar({
        isOpened: true,
        severity: severities.SUCCESS,
        message: 'Your data was successfully updated.',
      });
    } catch (error) {
      setSnackbar({
        isOpened: true,
        severity: severities.ERROR,
        message: 'Failed to update account information.',
      });
    }
  };

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <CustomizedSnackbars
          open={snackbar.isOpened}
          severity={snackbar.severity}
          variant="filled"
          onClose={() =>
            setSnackbar((prevSnackbar) => ({
              ...prevSnackbar,
              isOpened: false,
            }))
          }
          dismissible
          message={snackbar.message}
        ></CustomizedSnackbars>
        <Header
          profileSettings={profileSettings}
          userData={userData}
          auth={auth}
          onSearchChange={onSearchChange}
        />
        <NavBar />
        {!loading && (
          <Box sx={{ height: '100vh' }}>
            <Routes>
              {/* protected route */}
              <Route
                path={LOGIN}
                element={
                  auth.loggedIn ? (
                    <Navigate to="/"></Navigate>
                  ) : (
                    <Login setSnackbar={setSnackbar} />
                  )
                }
              />
              <Route
                path={QUIZZES}
                element={
                  auth.loggedIn ? (
                    <Quizzes
                      changeFilter={changeFilter}
                      activeFilters={activeFilters}
                      searchValue={searchTerm}
                      setSnackbar={setSnackbar}
                    />
                  ) : (
                    <Navigate to={LOGIN}></Navigate>
                  )
                }
              />
              <Route
                path={`${QUIZ}/:quizId`}
                element={
                  auth.loggedIn ? (
                    <QuizContent setSnackbar={setSnackbar} />
                  ) : (
                    <Navigate to={LOGIN}></Navigate>
                  )
                }
              />
              <Route
                path={SIGNUP}
                element={
                  auth.loggedIn ? (
                    <Navigate to="/"></Navigate>
                  ) : (
                    <SignUp setSnackbar={setSnackbar} />
                  )
                }
              />
              <Route
                path={RESET_PASSWORD}
                element={
                  auth.loggedIn ? (
                    <Navigate to="/"></Navigate>
                  ) : (
                    <ResetPassword />
                  )
                }
              />
              <Route
                path={FAVORITES}
                element={
                  auth.loggedIn ? (
                    <Favorites
                      changeFilter={changeFilter}
                      activeFilters={activeFilters}
                      searchValue={searchTerm}
                      setSnackbar={setSnackbar}
                    />
                  ) : (
                    <Navigate to={LOGIN}></Navigate>
                  )
                }
              />
              <Route
                path={NOTES}
                element={
                  auth.loggedIn ? (
                    <Notes setSnackbar={setSnackbar} />
                  ) : (
                    <Navigate to={LOGIN}></Navigate>
                  )
                }
              />
              <Route
                path={LIBRARY}
                element={
                  auth.loggedIn ? <Library /> : <Navigate to={LOGIN}></Navigate>
                }
              />
              <Route
                path={ACCOUNT_SETTINGS}
                element={
                  auth.loggedIn ? (
                    <AccountSettings
                      userData={userData}
                      setSnackbar={setSnackbar}
                      updateUserInfo={updateUserInfo}
                    />
                  ) : (
                    <Navigate to={LOGIN}></Navigate>
                  )
                }
              />
              {/* non-protected routes */}
              <Route path={'/'} element={<Navigate to={HOME} />} />
              <Route
                path={HOME}
                element={
                  <Home setSnackbar={setSnackbar} highlights={highlights} />
                }
              />
              <Route path={ABOUT} element={<About />} />
              <Route path={ERROR} element={<Error />} />
              <Route path="/*" element={<Navigate to={ERROR}></Navigate>} />
            </Routes>
            {showLogoutModal && (
              <LogoutModal
                showLogoutModal={showLogoutModal}
                setShowLogoutModal={setShowLogoutModal}
              />
            )}
            <Footer />
          </Box>
        )}
      </ThemeProvider>
    </>
  );
}
