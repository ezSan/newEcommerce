import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Card, CardContent, CardMedia, Typography, Button, IconButton, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowForwardIos';
import { addToCart } from '../store/actions/cartActions';

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const dispatch = useDispatch();

  const handleAdd = () => {
    setQuantity(quantity + 1);
  };

  const handleRemove = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % (product.images?.length || 1));
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? (product.images?.length || 1) - 1 : prevIndex - 1
    );
  };

  const handleAddToCart = () => {
    const productWithQuantity = { ...product, quantity };
    dispatch(addToCart(productWithQuantity));
  };

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 2 }}>
      <Box sx={{ position: 'relative', width: '100%', height: '200px' }}>
        {product.images && product.images.length > 1 && (
          <>
            <IconButton
              sx={{ position: 'absolute', top: '50%', left: 0, transform: 'translateY(-50%)', zIndex: 1, padding: '8px' }}
              onClick={handlePrevImage}
            >
              <ArrowForwardIosIcon />
            </IconButton>
            <IconButton
              sx={{ position: 'absolute', top: '50%', right: 0, transform: 'translateY(-50%)', zIndex: 1, padding: '8px' }}
              onClick={handleNextImage}
            >
              <ArrowBackIosIcon />
            </IconButton>
          </>
        )}
        <CardMedia
          component="img"
          height="200"
          image={product.images ? product.images[currentImageIndex] : 'https://lucari.com.ar/Imagenes/ArticuloPublic?name=AC-06%20D.PNG'}
          alt={product.name}
          sx={{ width: '100%', objectFit: 'contain' }}
        />
      </Box>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <Typography gutterBottom variant="body4" component="div" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight:'600' }}>
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.currency} {product.price}
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
        <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleAddToCart}>
          Añadir al Carrito
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
