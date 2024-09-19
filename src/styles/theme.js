import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3CB371', // Medium Sea Green
      light: '#66CDAA',
      dark: '#2E8B57',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#9B59B6', // Amethyst
      light: '#BB8FCE',
      dark: '#6C3483',
      contrastText: '#ffffff',
    },
    accent: {
      main: '#FF7F50', // Coral
      light: '#FFA07A',
      dark: '#CD5C5C',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
      secondary: '#4f4f4f',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#3CB371', // Primary color
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#9B59B6', // Secondary color
    },
    h5: {
      fontSize: '24px',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
      color: '#333333',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          padding: '10px 20px',
        },
        containedPrimary: {
          backgroundColor: '#3CB371',
          '&:hover': {
            backgroundColor: '#2E8B57',
          },
        },
        containedSecondary: {
          backgroundColor: '#9B59B6',
          '&:hover': {
            backgroundColor: '#6C3483',
          },
        },
        containedAccent: {
          backgroundColor: '#FF7F50',
          '&:hover': {
            backgroundColor: '#CD5C5C',
          },
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: '#3CB371',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          '&.MuiTableCell-head': {
            color: '#fff',
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: '12px',
          padding: '20px',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h6: {
          fontSize: '1.5rem',
          fontWeight: 500,
          color: '#FF7F50', // Accent color for headings
        },
      },
    },
  },
});

export default theme;
