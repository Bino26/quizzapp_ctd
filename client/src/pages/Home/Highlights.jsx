import { Box, Typography } from '@mui/material';
import s from './Highlights.module.css';
import customColors from '../../assets/styles';
import React from 'react';

const HighlightsSection = ({ highlights }) => (
  <Box className={s.highlights}>
    {highlights.map((highlight) => (
      <Box key={highlight.id} className={s.highlightWrapper}>
        <img src={highlight.image} alt={`Highlight ${highlight.text}`} />
        <Typography
          sx={{
            fontWeight: 600,
            color: customColors.blueDark,
            fontSize: 14,
          }}
        >
          {highlight.text}
        </Typography>
      </Box>
    ))}
  </Box>
);

export default HighlightsSection;
