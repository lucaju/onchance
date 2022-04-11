import { colors, createTheme } from '@mui/material';

const theme = (darkMode = true) =>
  createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: colors.blue,
      secondary: {
        main: colors.orange[800],
      },
    },
  });

export default theme;
