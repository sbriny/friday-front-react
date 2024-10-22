import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from '../themes/theme';

const CustomThemeProvider = ({ children, isDarkMode }) => {
  const theme = isDarkMode ? darkTheme : lightTheme;
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default CustomThemeProvider;