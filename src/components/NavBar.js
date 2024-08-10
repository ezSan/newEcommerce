import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Badge, Box } from '@mui/material';
import { ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';
import { useRouter } from 'next/router';
import RegisterModal from './RegisterModal';
import LoginModal from './LoginModal';
import UserMenu from './UserMenu';
import { useTheme } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/actions/userActions';
import CartModal from './CartModal';
import DollarRate from './DollarRate'; // Import the DollarRate component

export default function NavBar() {
  const theme = useTheme();
  const router = useRouter();
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false); 
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);
  const cartItems = useSelector((state) => state.cart.items);

  const handleOpenRegister = () => {
    setIsRegisterOpen(true);
  };

  const handleCloseRegister = () => {
    setIsRegisterOpen(false);
  };

  const handleOpenLogin = () => {
    setIsLoginOpen(true);
  };

  const handleCloseLogin = () => {
    setIsLoginOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleOpenCart = () => {
    setIsCartOpen(true);
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <AppBar position="static">
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button color="inherit" onClick={() => router.push('/')}>
            <Typography variant="h6">wildTech</Typography>
          </Button>

          <Box display="flex" alignItems="center">
            <DollarRate/>
            <IconButton color="inherit" onClick={handleOpenCart}>
              <Badge badgeContent={totalItems} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            {user ? (
              <UserMenu user={user} onLogout={handleLogout} />
            ) : (
              <Box display="flex" flexDirection="column" alignItems="center">
                <Button color="inherit" onClick={handleOpenLogin}>
                  Iniciar sesión
                </Button>
                <Button color="inherit" onClick={handleOpenRegister}>
                  Registrarse
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
        <RegisterModal open={isRegisterOpen} onClose={handleCloseRegister} />
        <LoginModal open={isLoginOpen} onClose={handleCloseLogin} />
      </AppBar>
      <CartModal open={isCartOpen} onClose={handleCloseCart} /> 
    </>
  );
}
