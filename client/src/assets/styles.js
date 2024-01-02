import { createTheme } from '@mui/material/styles';

const customColors = {
  blackMedium: '#1D2126',
  blackLight: '#323232',
  backgroundLight: '#FAFAFA',
  grey: '#E8E8E8',
  greyDark: '#565656',
  greyMedium: '#8F8F8F',
  greyLight: '#F3F3F3',
  white: '#FFFFFF',
  blueDark: '#0057B2',
  blueMedium: '#1976D2',
  orangeDark: '#F1662A',
  greenMedium: '#3BB98A',
  redMedium: '#CF6256',
};

export const defaultTheme = createTheme({
  palette: {
    background: {
      default: customColors.blackLight,
    },
  },
});

export default customColors;
