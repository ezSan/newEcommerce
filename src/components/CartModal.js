import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, IconButton, Box, List, ListItem, ListItemText, ListItemSecondaryAction } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { removeFromCart } from '../store/actions/cartActions';

const CartModal = ({ open, onClose }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item));
  };

  const handleCheckout = () => {
    if (user) {
      const orderDetails = cartItems.map(item => `${item.name} (x${item.quantity})`).join(', ');
      const whatsappMessage = `Hola, me gustaría realizar el siguiente pedido: ${orderDetails}. Total: ${totalAmount.toFixed(2)}`;
      const whatsappLink = `https://wa.me/1234567890?text=${encodeURIComponent(whatsappMessage)}`;
      window.location.href = whatsappLink;
    } else {
      alert('Debes iniciar sesión para finalizar la compra');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Carrito de Compras
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
          style={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers style={{ overflowX: 'hidden' }}>
        {cartItems.length === 0 ? (
          <Typography variant="body1">Tu carrito está vacío.</Typography>
        ) : (
          <List>
            {cartItems.map((item) => (
              <ListItem key={item.id}>
                <ListItemText
                  primary={`${item.name} (x${item.quantity})`}
                  secondary={`${item.currency} ${item.price * item.quantity}`}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveFromCart(item)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>
      <DialogActions>
        <Box display="flex" justifyContent="space-between" width="100%">
          <Typography variant="h6">Total: {totalAmount.toFixed(2)}</Typography>
          <Box display="flex" alignItems="center">
            {!user && (
              <Typography variant="body2" color="error" style={{ marginRight: '8px' }}>
                Debes iniciar sesión para finalizar la compra
              </Typography>
            )}
            <Button onClick={handleCheckout} color="primary" variant="contained" disabled={!user}>
              Finalizar Compra
            </Button>
            <Button onClick={onClose} color="secondary" variant="outlined" style={{ marginLeft: '8px' }}>
              Cerrar
            </Button>
          </Box>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default CartModal;
