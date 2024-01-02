import React from 'react';
import { FormControlLabel, Radio, Checkbox, Box } from '@mui/material';

import Grid from '@mui/material/Unstable_Grid2';

export default function checkRadioRender(
  options,
  questionType,
  selected,
  setSelected,
  isCurrentQuestionAnswered,
  correctnessInfo,
  setSelectedOption
) {
  const checkbox = 'check-box';
  const handleOptionClick = (option) => {
    if (!isCurrentQuestionAnswered) {
      if (questionType === checkbox) {
        const newSelected = selected.includes(option)
          ? selected.filter((item) => item !== option) // Remove the option if it's already selected
          : [...selected, option]; // Add the option if it's not already selected
        setSelected(newSelected);
        setSelectedOption(newSelected);
      } else {
        // Radio button logic: set `selected` to the clicked option
        setSelected(option);
        setSelectedOption(option); // Update the state in the parent component
      }
    }
  };

  return options.map((option, index) => {
    const isOptionSelected =
      questionType === checkbox
        ? selected.includes(option)
        : selected === option;

    return (
      <Grid xs={12} key={index}>
        <Box
          component="div"
          onClick={() => handleOptionClick(option)}
          sx={{
            pl: 2,
            border: '2px solid rgb(223, 221, 221)',
            width: '100%',
            borderRadius: 1,
            boxSizing: 'border-box',
            cursor: 'pointer',
            backgroundColor:
              correctnessInfo && isOptionSelected
                ? correctnessInfo.isCorrect
                  ? '#dbefdc'
                  : '#fcd9d6'
                : 'none',
          }}
        >
          <FormControlLabel
            control={
              questionType === checkbox ? (
                <Checkbox
                  checked={isOptionSelected}
                  value={option}
                  disabled={isCurrentQuestionAnswered}
                />
              ) : (
                <Radio
                  checked={isOptionSelected}
                  value={option}
                  disabled={isCurrentQuestionAnswered}
                />
              )
            }
            label={option}
            sx={{
              width: '100%',
              userSelect: 'none',
              '.MuiFormControlLabel-label': {
                fontWeight:
                  isCurrentQuestionAnswered && isOptionSelected
                    ? 'bold'
                    : 'normal',
                color: isCurrentQuestionAnswered ? 'darkslategray' : '',
              },
              '&.Mui-disabled .MuiFormControlLabel-label': {
                color: 'darkslategray', // Ensure label color is dark even when disabled
              },
            }}
          />
        </Box>
      </Grid>
    );
  });
}
