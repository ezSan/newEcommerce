import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const HeroSection = () => (
  <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundImage: 'url(/path/to/image.jpg)', backgroundSize: 'cover', textAlign: 'center' }}>
    <Box sx={{ color: 'white' }}>
      <Typography variant="h2">Nombre de la Tienda</Typography>
      <Typography variant="h5">Slogan de la tienda</Typography>
      <Button variant="contained" color="primary" sx={{ mt: 2 }}>Explorar Productos</Button>
    </Box>
  </Box>
);

export default HeroSection;
