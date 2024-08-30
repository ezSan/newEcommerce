import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#63cade',
      light: '#6ab7ff',
      dark: '#005cb2',
      contrastText: '#fff',
    },
    secondary: {
      main: '#f44336',
      light: '#ff7961',
      dark: '#ba000d',
      contrastText: '#fff',
    },
    background: {
      default: '#f5f5f5',
      paper: '#fff',
    },
    text: {
      primary: '#333',
      secondary: '#666',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2rem',
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
      variants: [
        {
          props: { variant: 'accordionContained' },
          style: {
            backgroundColor: '#F08080',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#ba000d',
            },
          },
        },
      ],
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          padding: '10px 20px',
        },
        containedPrimary: {
          backgroundColor: '#63cade',
          '&:hover': {
            backgroundColor: '#005cb2',
          },
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          marginBottom: '6px',
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          backgroundColor: '#F08080',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: '#63cade',
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
    MuiTableSortLabel: {
      styleOverrides: {
        root: {
          '&.Mui-active': {
            color: '#fff',
          },
          '&:hover': {
            color: '#fff',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          margin: '8px 0',
          padding: '10px',
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
        },
      },
    },
  },
});

export default theme;
