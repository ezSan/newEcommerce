import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  MenuItem,
  Menu,
} from "@mui/material";
import {
  ShoppingCart as ShoppingCartIcon,
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
} from "@mui/icons-material";
import { useRouter } from "next/router";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";
import { useTheme } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/actions/userActions";
import CartModal from "./CartModal";
import OfferAndDollarRate from "./OfferAndDollarRate";

export default function Header() {
  const theme = useTheme();
  const router = useRouter();
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
    handleDrawerToggle(); // Cierra el drawer al cerrar sesión
  };

  const handleOpenCart = () => {
    setIsCartOpen(true);
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const renderNavButtons = () => (
    <Box display="flex" alignItems="center">
      {/* Botones de Sesión */}
      {!user && (
        <Button color="inherit" onClick={handleOpenLogin}>
          Iniciar sesión
        </Button>
      )}
      {user && (
        <IconButton color="inherit" onClick={handleMenuClick}>
          <MenuIcon />
        </IconButton>
      )}
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        {user?.isAdmin && (
          <MenuItem
            onClick={() => {
              handleCloseMenu();
              router.push("/PanelAdmin");
            }}
          >
            <DashboardIcon style={{ marginRight: "10px" }} /> Panel Admin
          </MenuItem>
        )}
        {user ? (
          <MenuItem onClick={handleLogout}>
            <Typography color="error">Cerrar sesión</Typography>
          </MenuItem>
        ) : (
          <MenuItem onClick={handleOpenLogin}>Iniciar sesión</MenuItem>
        )}
      </Menu>
    </Box>
  );

  return (
    <>
      <header>
       <AppBar position="static">
          <Toolbar style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            {/* Sección Izquierda: Logo */}
            <Button color="inherit" onClick={() => router.push("/")}>
              <Typography variant="h1" sx={{color:'#f0f0f0'}}>wildTech</Typography>
            </Button>

            {/* Sección Derecha: Carrito y Menú */}
            <Box display="flex" alignItems="center">
              {/* Carrito Siempre Visible */}
              <IconButton color="inherit" onClick={handleOpenCart}>
                <Badge badgeContent={totalItems} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>

              {/* Menú Hamburguesa o Botones de Sesión */}
              {isMobile ? (
                <IconButton
                  edge="end"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleDrawerToggle}
                >
                  <MenuIcon />
                </IconButton>
              ) : (
                renderNavButtons()
              )}
            </Box>

           
            <Drawer
              anchor="right"
              open={isDrawerOpen}
              onClose={handleDrawerToggle}
            >
              <List>
                <ListItem button onClick={() => router.push("/")}>
                  <ListItemText primary="Inicio" />
                </ListItem>
             
                {user ? (
                  <>
                    {user.isAdmin && (
                      <ListItem
                        button
                        onClick={() => {
                          handleDrawerToggle();
                          router.push("/PanelAdmin");
                        }}
                      >
                        <DashboardIcon style={{ marginRight: "10px" }} /> Panel
                        Admin
                      </ListItem>
                    )}
                    <ListItem button onClick={handleLogout}>
                      <ListItemText primary="Cerrar sesión" />
                    </ListItem>
                  </>
                ) : (
                  <>
                  <ListItem button onClick={handleOpenRegister}>
                    <ListItemText primary="Registrarse" />
                  </ListItem>
                  <ListItem button onClick={handleOpenLogin}>
                    <ListItemText primary="Iniciar sesión" />
                  </ListItem>
                  </>
                )}
              </List>
            </Drawer>
          </Toolbar>
          
          <RegisterModal open={isRegisterOpen} onClose={handleCloseRegister} />
          <LoginModal open={isLoginOpen} onClose={handleCloseLogin} />
        </AppBar>
      </header>

      <Box      
      >
        <OfferAndDollarRate />
      </Box>

      {/* Modal del Carrito de Compras */}
      <CartModal open={isCartOpen} onClose={handleCloseCart} />
    </>
  );
}
