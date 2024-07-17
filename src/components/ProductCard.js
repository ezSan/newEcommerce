import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, IconButton, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    setQuantity(quantity + 1);
  };

  const handleRemove = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 2 }}>
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.name}
        sx={{ width: '100%', objectFit: 'contain' }}
      />
      <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <Typography gutterBottom variant="h5" component="div" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.price}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <IconButton onClick={handleRemove} color="primary">
            <RemoveIcon />
          </IconButton>
          <Typography variant="body2" sx={{ mx: 2 }}>
            {quantity}
          </Typography>
          <IconButton onClick={handleAdd} color="primary">
            <AddIcon />
          </IconButton>
        </Box>
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
          Añadir al Carrito
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
