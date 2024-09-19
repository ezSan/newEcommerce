import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Card, CardContent, CardMedia, Typography, Button, IconButton, Box,
  Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { addToCart } from '../store/actions/cartActions';
import { useTheme } from "@mui/material/styles";

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const theme = useTheme();

  const handleAdd = () => setQuantity(quantity + 1);
  const handleRemove = () => quantity > 1 && setQuantity(quantity - 1);

  const handleNextImage = () => setCurrentImageIndex((prevIndex) => (prevIndex + 1) % (product.images?.length || 1));
  const handlePrevImage = () => setCurrentImageIndex((prevIndex) => prevIndex === 0 ? (product.images?.length || 1) - 1 : prevIndex - 1);

  const handleAddToCart = () => dispatch(addToCart({ ...product, quantity }));
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <fragment>
      <Card sx={{ borderRadius: 4, overflow: 'hidden', boxShadow: 3, textAlign: 'center' }}>
        <Box sx={{ position: 'relative', height: '250px' }}>
          {product.images && product.images.length > 1 && (
            <fragment>
              <IconButton
                sx={{
                  position: 'absolute', top: '50%', left: 8, transform: 'translateY(-50%)',
                  backgroundColor: 'rgba(255, 255, 255, 0.7)', zIndex: 1
                }}
                onClick={handlePrevImage}
              >
                <ArrowBackIosIcon />
              </IconButton>
              <IconButton
                sx={{
                  position: 'absolute', top: '50%', right: 8, transform: 'translateY(-50%)',
                  backgroundColor: 'rgba(255, 255, 255, 0.7)', zIndex: 1
                }}
                onClick={handleNextImage}
              >
                <ArrowForwardIosIcon />
              </IconButton>
            </fragment>
          )}
          <CardMedia
            component="img"
            height="250"
            image={product.images ? product.images[currentImageIndex] : 'https://lucari.com.ar/Imagenes/ArticuloPublic?name=AC-06%20D.PNG'}
            alt={product.name}
            sx={{ width: '100%', objectFit: 'cover' }}
          />
        </Box>
        <CardContent sx={{ padding: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {product.name}
          </Typography>
          <Typography variant="body3" color="text.secondary" sx={{ marginBottom: 1 , fontWeight: 'bold'}}>
            {product.brand}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
          {product.rom} ROM / {product.ram} RAM 
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 2 }}>
            ${product.price}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, marginBottom: 2 }}>
            <IconButton onClick={handleRemove} color="primary" sx={{ borderRadius: 1, backgroundColor: '#e0e0e0' }}>
              <RemoveIcon />
            </IconButton>
            <Typography variant="body1">{quantity}</Typography>
            <IconButton onClick={handleAdd} color="primary" sx={{ borderRadius: 1, backgroundColor: '#e0e0e0' }}>
              <AddIcon />
            </IconButton>
          </Box>
          <Button variant="contained" color="primary" fullWidth onClick={handleAddToCart}>
            Añadir al Carrito
          </Button>
          <Button variant="text" color="secondary" fullWidth onClick={handleClickOpen} sx={{ marginTop: 1 }}>
            Ver más información
          </Button>
        </CardContent>
      </Card>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>{product.name} - u${product.price}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
            <Box sx={{ position: 'relative', width: '100%' }}>
              <IconButton
                sx={{
                  position: 'absolute', top: '50%', left: 8, transform: 'translateY(-50%)',
                  backgroundColor: 'rgba(255, 255, 255, 0.7)', zIndex: 1
                }}
                onClick={handlePrevImage}
              >
                <ArrowBackIosIcon />
              </IconButton>
              <IconButton
                sx={{
                  position: 'absolute', top: '50%', right: 8, transform: 'translateY(-50%)',
                  backgroundColor: 'rgba(255, 255, 255, 0.7)', zIndex: 1
                }}
                onClick={handleNextImage}
              >
                <ArrowForwardIosIcon />
              </IconButton>
              <CardMedia
                component="img"
                image={product.images ? product.images[currentImageIndex] : 'https://lucari.com.ar/Imagenes/ArticuloPublic?name=AC-06%20D.PNG'}
                alt={product.name}
                sx={{ width: '100%', maxHeight: '400px', objectFit: 'contain' }}
              />
            </Box>
            <Box>
              <Typography variant="body1" sx={{ marginBottom: 1 }}><strong>Marca:</strong> {product.brand}</Typography>
              <Typography variant="body1" sx={{ marginBottom: 1 }}><strong>RAM:</strong> {product.ram}</Typography>
              <Typography variant="body1" sx={{ marginBottom: 1 }}><strong>ROM:</strong> {product.rom}</Typography>
              <Typography variant="body1" sx={{ marginBottom: 1 }}><strong>Batería:</strong> {product.battery}</Typography>
              <Typography variant="body1" sx={{ marginBottom: 1 }}><strong>Pantalla:</strong> {product.screen}</Typography>
              <Typography variant="body1" sx={{ marginBottom: 1 }}><strong>Cámara</strong> {product.camera}</Typography>
              <Typography variant="body1" sx={{ marginBottom: 1 }}><strong>Cámara Frontal:</strong> {product.selfie}</Typography>
              <Typography variant="body1" sx={{ marginBottom: 1 }}><strong>Sensores:</strong></Typography>
              <List sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {product.sensors.map((sensor, index) => (
                  <ListItem key={index} sx={{ width: 'auto', padding: 0 }}>
                    <Box sx={{ padding: '4px 8px', backgroundColor: '#f0f0f0', borderRadius: 1 }}>
                      {sensor}
                    </Box>
                  </ListItem>
                  
                ))}
              </List>
              <ListItem>
              <Typography
                sx={{
                  padding: '4px 8px',
                  backgroundColor: product.includesCharger ? 'primary.main' : 'error.main',
                  borderRadius: 1,
                  color: '#fff', //
                }}
              >
              {product.includesCharger ? 'Incluye cargador de fábrica' : 'SIN CARGADOR DE FÁBRICA'}
              </Typography>
              {product.isDualSim && (
              <Typography
                sx={{
                  padding: '4px 8px',
                  backgroundColor: 'primary.main',
                  borderRadius: 1,
                  color: '#fff',
                  margin:'6px'
                }}
              >
                DUAL SIM
              </Typography>
)}
              
            </ListItem>
              <Typography variant="body1" sx={{ marginTop: 2 }}><strong>Descripción:</strong></Typography>
              <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>{product.description}</Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Cerrar</Button>
          <Button onClick={handleAddToCart} variant="contained" color="primary">Añadir al Carrito</Button>
        </DialogActions>
      </Dialog>
    </fragment>
  );
};

export default ProductCard;
