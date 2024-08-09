import React, { useState } from 'react';
import { IconButton, Menu, MenuItem, Typography, Box } from '@mui/material';
import { AccountCircle, Notifications as NotificationsIcon, Favorite as FavoriteIcon, Dashboard as DashboardIcon } from '@mui/icons-material';
import { useRouter } from 'next/router';

const UserMenu = ({ user, onLogout }) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    onLogout();
    handleClose();
  };

  return (
    <Box display="flex" alignItems="center">
      <Typography color="inherit" sx={{ marginRight: 2 }}>
        Hola, {user.name}
      </Typography>
     
      <IconButton color="inherit" onClick={handleMenu}>
        <AccountCircle />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {user.isAdmin && (
          <MenuItem onClick={() => { handleClose(); router.push('/PanelAdmin'); }}>
            <DashboardIcon style={{ marginRight: '10px' }} /> Panel Admin
          </MenuItem>
        )}
        <MenuItem onClick={() => { handleClose(); router.push('/notifications'); }}>
          <NotificationsIcon style={{ marginRight: '10px' }} /> Notificaciones
        </MenuItem>
        <MenuItem onClick={() => { handleClose(); router.push('/wishlist'); }}>
          <FavoriteIcon style={{ marginRight: '10px' }} /> Wishlist
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <Typography color="error">Cerrar sesión</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserMenu;
