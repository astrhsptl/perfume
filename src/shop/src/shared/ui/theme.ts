'use client';

import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    mode: 'dark',
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderColor: 'none',
        },
      },
    },
  },
});
