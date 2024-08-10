import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

const DollarRate = () => {
  const [rate, setRate] = useState(null);

  useEffect(() => {
    const fetchDollarRate = async () => {
      try {
        const response = await fetch('https://dolarapi.com/v1/dolares/blue');
        const data = await response.json();
        setRate(data.venta);
      } catch (error) {
        console.error('Error fetching dollar rate:', error);
      }
    };

    fetchDollarRate();
  }, []);

  return (
    <Box textAlign="right"  sx={{marginRight:'24px', mt:'6px'}}>
      <Typography variant="body2" color="inherit">
        Dolar hoy
      </Typography>
      <Typography variant="h5" color="inherit">
        {rate ? `$${rate}` : 'Cargando...'}
      </Typography>
    </Box>
  );
};

export default DollarRate;
