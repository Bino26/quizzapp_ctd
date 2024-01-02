import React from 'react';
import { CircularProgress } from '@mui/material';
import customColors from '../assets/styles';

const Progress = ({ progress }) => {
  return (
    <>
      <CircularProgress
        size={120}
        variant="determinate"
        value={100}
        sx={{
          color: customColors.greyLight,
          position: 'absolute',
        }}
      />
      <CircularProgress
        size={120}
        variant="determinate"
        value={progress}
        sx={{
          color: customColors.greenMedium,
          position: 'absolute',
          zIndex: 1,
        }}
      />
    </>
  );
};

export default Progress;
