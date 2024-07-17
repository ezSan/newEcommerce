import React from 'react';
import { IconButton, Badge, Drawer, List, ListItem, ListItemText, Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const MiniCart = ({ cartItems, isOpen, toggleCart }) => (
  <>
    <IconButton color="inherit" onClick={toggleCart}>
      <Badge badgeContent={cartItems.length} color="secondary">
        <ShoppingCartIcon />
      </Badge>
    </IconButton>
    <Drawer anchor="right" open={isOpen} onClose={toggleCart}>
      <List>
        {cartItems.map((item, index) => (
          <ListItem key={index}>
            <ListItemText primary={item.name} secondary={`Cantidad: ${item.quantity}`} />
          </ListItem>
        ))}
      </List>
      <Button variant="contained" color="primary" sx={{ m: 2 }}>Checkout</Button>
    </Drawer>
  </>
);

export default MiniCart;
