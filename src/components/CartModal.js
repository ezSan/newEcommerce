import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  IconButton,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Snackbar,
  Alert
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { removeFromCart, clearCart } from "../store/actions/cartActions";
import { db } from "../firebaseConfig.js";
import { addDoc, collection } from "firebase/firestore";

const CartModal = ({ open, onClose }) => {
  const cartItems = useSelector(state => state.cart.items);
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();
  const [successMessage, setSuccessMessage] = useState(false);

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleRemoveFromCart = item => {
    dispatch(removeFromCart(item));
  };

  const handleCheckout = async () => {
    if (user) {
      const adminNumber = 2914413671;
      const orderDetails = cartItems
        .map(item => `${item.name} (x${item.quantity})`)
        .join(", ");
      const userDetails = `Nombre: ${user.name}, Localidad: ${user.city}, Dirección: ${user.address}`;
      const whatsappMessage = `Hola, me gustaría realizar el siguiente pedido: ${orderDetails}. Total: ${totalAmount.toFixed(
        2
      )}. Los datos para el envío son: ${userDetails}`;
      const whatsappLink = `https://wa.me/${adminNumber}?text=${encodeURIComponent(
        whatsappMessage
      )}`;

      console.log(user);
      if (!user.userId) {
        console.error("El ID del usuario no está definido.");
        return;
      }

      try {
        await addDoc(collection(db, "sales"), {
          userId: user.userId,
          userName: user.name,
          userLastName: user.lastName,
          userCity: user.city,
          userAddress: user.address,
          items: cartItems,
          totalAmount,
          createdAt: new Date()
        });
        console.log("Venta guardada en Firestore");
        dispatch(clearCart());
        setSuccessMessage(true);
        window.open(whatsappLink, "_blank");
      } catch (error) {
        console.error("Error guardando la venta: ", error);
      }
    } else {
      alert("Debes iniciar sesión para finalizar la compra");
    }
  };

  const handleSnackbarClose = () => {
    setSuccessMessage(false);
    onClose();
  };

  return (
    <fragment>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        sx={{ overflowX: "hidden" }}
      >
        <DialogTitle>
          Carrito de Compras
          <IconButton
            edge="end"
            color="inherit"
            onClick={onClose}
            aria-label="close"
            style={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {cartItems.length === 0
            ? <Typography variant="body1">Tu carrito está vacío.</Typography>
            : <List>
                {cartItems.map(item =>
                  <ListItem key={item.id}>
                    <ListItemText
                      primary={`${item.name} (x${item.quantity})`}
                      secondary={`${item.currency} ${item.price *
                        item.quantity}`}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleRemoveFromCart(item)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                )}
              </List>}
        </DialogContent>
        <DialogActions>
          <Box display="flex" justifyContent="space-between" width="100%">
            <Typography variant="h6">
              Total: {totalAmount.toFixed(2)}
            </Typography>
            <Box display="flex" alignItems="center">
              {!user &&
                <Typography
                  variant="body2"
                  color="error"
                  style={{ marginRight: "8px" }}
                >
                  Debes iniciar sesión para finalizar la compra
                </Typography>}
              <Button
                onClick={handleCheckout}
                color="primary"
                variant="contained"
                disabled={!user}
              >
                Finalizar Compra
              </Button>
              <Button
                onClick={onClose}
                color="secondary"
                variant="outlined"
                style={{ marginLeft: "8px" }}
              >
                Cerrar
              </Button>
            </Box>
          </Box>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={successMessage}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Compra gestionada con éxito
        </Alert>
      </Snackbar>
    </fragment>
  );
};

export default CartModal;
