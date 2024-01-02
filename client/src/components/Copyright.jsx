import React from 'react';
import { Link, Typography } from '@mui/material';
import { HOME } from 'App';

const Copyright = ({ color }) => {
  return (
    <Typography variant="body2" color={color} align="center">
      {'Copyright © '}
      <Link color="inherit" href={HOME}>
        JSQuiz
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

export default Copyright;
