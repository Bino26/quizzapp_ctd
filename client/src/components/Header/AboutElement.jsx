import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Tooltip, Link } from '@mui/material';
import {
  ABOUT,
  FAVORITES,
  HOME,
  LIBRARY,
  NOTES,
  QUIZ,
  QUIZZES,
  ACCOUNT_SETTINGS,
} from '../../App';
import customColors, { defaultTheme } from '../../assets/styles';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const AboutElement = () => {
  const location = useLocation();
  const [visibility, setVisibility] = useState({
    link: false,
    icon: false,
  });

  useEffect(() => {
    const isQuizRoute = location.pathname.startsWith(QUIZ);

    setVisibility({
      link: location.pathname === HOME,
      icon:
        location.pathname === QUIZZES ||
        isQuizRoute ||
        location.pathname === NOTES ||
        location.pathname === FAVORITES ||
        location.pathname === ACCOUNT_SETTINGS ||
        location.pathname === LIBRARY,
    });
  }, [location.pathname]);

  return (
    <>
      <Tooltip title="About">
        <Link
          href={ABOUT}
          sx={{
            color: customColors.white,
          }}
        >
          <InfoOutlinedIcon
            sx={{
              margin: '0 20px',
              display: visibility.icon ? 'block' : 'none',
              color: customColors.white,
              [defaultTheme.breakpoints.down('sm')]: {
                margin: '0 10px',
              },
            }}
          />
        </Link>
      </Tooltip>
      <Link
        href={ABOUT}
        sx={[
          {
            color: customColors.white,
            textDecoration: 'none',
            mr: 2,
            display: visibility.link ? 'block' : 'none',
          },
          {
            '&:hover': {
              textDecoration: 'underline',
            },
          },
        ]}
      >
        About
      </Link>
    </>
  );
};

export default AboutElement;
