import React, { useEffect, useRef, useState } from 'react';
import {
  Paper,
  Box,
  BottomNavigation,
  BottomNavigationAction,
} from '@mui/material';
import { FAVORITES, LIBRARY, NOTES, QUIZZES, ACCOUNT_SETTINGS } from 'App';
import SchoolIcon from '@mui/icons-material/School';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import { Link, useLocation } from 'react-router-dom';

const NAVIGATION_ROUTES = {
  QUIZZES: 0,
  FAVORITES: 1,
  NOTES: 2,
  LIBRARY: 3,
};

export default function NavBar() {
  const [value, setValue] = useState(localStorage.getItem('selectedPage'));
  const ref = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const route = location.pathname;
    switch (route) {
      case QUIZZES:
        setValue(NAVIGATION_ROUTES.QUIZZES);
        break;
      case FAVORITES:
        setValue(NAVIGATION_ROUTES.FAVORITES);
        break;
      case NOTES:
        setValue(NAVIGATION_ROUTES.NOTES);
        break;
      case LIBRARY:
        setValue(NAVIGATION_ROUTES.LIBRARY);
        break;
      default:
        setValue(localStorage.getItem('selectedPage'));
    }
  }, [location.pathname]);

  useEffect(() => {
    localStorage.setItem('selectedPage', value);
  }, [value]);

  return (
    <Box ref={ref} position={'relative'}>
      <Paper elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          sx={{
            display:
              location.pathname === QUIZZES ||
              location.pathname === NOTES ||
              location.pathname === FAVORITES ||
              location.pathname === LIBRARY ||
              location.pathname === ACCOUNT_SETTINGS
                ? 'flex'
                : 'none',
          }}
        >
          <BottomNavigationAction
            component={Link}
            to={QUIZZES}
            label="Quizzes"
            icon={<SchoolIcon />}
          />
          <BottomNavigationAction
            component={Link}
            to={FAVORITES}
            label="Favorites"
            icon={<FavoriteIcon />}
          />
          <BottomNavigationAction
            component={Link}
            to={NOTES}
            label="Notes"
            icon={<SpeakerNotesIcon />}
          />
          <BottomNavigationAction
            component={Link}
            to={LIBRARY}
            label="Library"
            icon={<LocalLibraryIcon />}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
