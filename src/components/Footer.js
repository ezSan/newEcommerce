import React from 'react';
import { Box, Link, Typography } from '@mui/material';
import { useRouter } from 'next/router';

const Footer = () => {
  const router = useRouter();

  return (
    <Box component="footer" sx={{ py: 2, textAlign: 'center', backgroundColor: '#f5f5f5' }}>
      <Typography variant="body2" color="textSecondary">
        © {new Date().getFullYear()} wildTech. Todos los derechos reservados.
      </Typography>
      <Box mt={1}>
        <Link href="#" onClick={() => router.push('/Faq')} color="inherit">
          Preguntas frecuentes
        </Link>
        {' | '}
        <Link href="#" onClick={() => router.push('/AboutUs')} color="inherit">
          Sobre nosotros
        </Link>
      </Box>
    </Box>
  );
};

export default Footer;
