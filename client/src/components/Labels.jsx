import { Chip, useMediaQuery } from '@mui/material';
import customColors from '../assets/styles';

const Labels = ({ labels, isFilterActive }) => {
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  return (
    <>
      {labels.map((label, index) => (
        <Chip
          style={{
            borderRadius: '4px',
            fontWeight: 'bold',
            backgroundColor: isFilterActive('labels', label)
              ? customColors.blueMedium
              : customColors.grey,
            color: isFilterActive('labels', label)
              ? customColors.grey
              : customColors.blueMedium,
          }}
          size={isSmallScreen ? 'medium' : 'small'}
          key={index}
          label={label}
        />
      ))}
    </>
  );
};

export default Labels;
