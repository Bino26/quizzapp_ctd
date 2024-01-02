import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useState } from 'react';
import customColors, { defaultTheme } from '../assets/styles';
import { Box, Divider } from '@mui/material';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  '& .MuiToggleButtonGroup-grouped': {
    margin: theme.spacing(0.5),
    border: 0,
    paddingLeft: 4,
    marginLeft: 0,
    flexWrap: 'wrap',
    [defaultTheme.breakpoints.down('sm')]: {
      margin: theme.spacing(0.3),
      padding: '4px 4px 4px 0',
    },
    '&.Mui-disabled': {
      border: 0,
    },
    '&:not(:first-of-type)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-of-type': {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));
const filterOptions = {
  levels: [
    { value: 'basic', label: 'basic' },
    { value: 'intermediate', label: 'intermediate' },
    { value: 'advanced', label: 'advanced' },
  ],
  categories: [
    { value: 'react', label: 'react' },
    { value: 'javascript', label: 'javascript' },
    { value: 'nodejs', label: 'node.js' },
  ],
  labels: [
    { value: 'frontend', label: 'frontend' },
    { value: 'backend', label: 'backend' },
  ],
};

const Fieldset = ({ label, children }) => {
  let legendContent;
  switch (label) {
    case 'levels':
      legendContent = 'Level';
      break;
    case 'categories':
      legendContent = 'Category';
      break;
    case 'labels':
      legendContent = 'Stack';
      break;
    default:
      legendContent = label;
  }

  return (
    <Box
      component="fieldset"
      sx={{
        border: 'none',
        borderRadius: '4px',
        padding: 0,
      }}
    >
      <legend
        style={{
          color: '#D1D1D1',
          textTransform: 'uppercase',
          fontSize: '13px',
        }}
      >
        {legendContent}
        <Divider flexItem orientation="horizontal" />
      </legend>
      {children}
    </Box>
  );
};

const ToggleButtonFilterGroup = ({
  value,
  onChange,
  options,
  ariaLabel,
  label,
}) => {
  return (
    <Fieldset label={label}>
      <StyledToggleButtonGroup
        size="small"
        value={value}
        onChange={onChange}
        aria-label={ariaLabel}
      >
        {options.map((option) => (
          <ToggleButton
            key={option.value}
            value={option.value}
            aria-label={option.label}
            disabled={option.disabled}
          >
            {option.label}
          </ToggleButton>
        ))}
      </StyledToggleButtonGroup>
    </Fieldset>
  );
};

const FilterButtonGroup = ({ changeFilter }) => {
  const [filters, setFilters] = useState({
    levels: [],
    categories: [],
    labels: [],
  });

  const handleFilter = (filterType, newValue, filter) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: newValue,
    }));

    changeFilter(filterType, filter);
  };

  const filterTypes = Object.entries(filterOptions);

  return (
    <Paper
      id={'filter button group'}
      elevation={0}
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        backgroundColor: customColors.backgroundLight,
        [defaultTheme.breakpoints.down('md')]: {
          justifyContent: 'start',
        },
      }}
    >
      {filterTypes.map(([filterType, options]) => (
        <React.Fragment key={filterType}>
          <ToggleButtonFilterGroup
            value={filters[filterType]}
            onChange={(e, newValue) =>
              handleFilter(filterType, newValue, e.target.value)
            }
            options={options}
            ariaLabel={`filtration by ${filterType}`}
            label={filterType}
          />
        </React.Fragment>
      ))}
    </Paper>
  );
};

export default FilterButtonGroup;
