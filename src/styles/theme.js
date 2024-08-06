import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1e88e5',
    },
    secondary: {
      main: '#f44336',
    },
    background: {
      default: '#f5f5f5',
    },
  },
typography: {
  h1: {
    fontSize: '2.5rem',
    fontWeight: 700,
  },
  h2: {
    fontSize: '2rem',
    fontWeight: 600,
  },
  h6: {
    fontSize: '48px',
    fontWeight: 600,
  },
  
  h5: {
    fontSize: '24px',
    fontWeight: 600,
  },
  body1: {
    fontSize: '1rem',
  },
},

  
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          padding: '16px',
          borderRadius: '12px',
        },
      },
    },
    
  },
});

export default theme;
