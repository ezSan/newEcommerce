import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText, 
  Paper
} from "@mui/material";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useTheme } from "@mui/material/styles";

export default function Ventas() {
  const [orders, setOrders] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "orders"));
        const ordersList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          // Aquí asumo que el cliente está referenciado en el documento de orden
          cliente: doc.data().cliente // Ajusta esta línea según cómo esté estructurada tu base de datos
        }));
        console.log("Orders fetched:", ordersList);
        setOrders(ordersList);
      } catch (e) {
        console.error("Error fetching orders: ", e);
      }
    };

    fetchOrders();
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Gestión de ventas
      </Typography>
      <Paper style={{ padding: theme.spacing(2), marginTop: theme.spacing(2) }}>
        <List>
          {orders.map(order =>
            <ListItem key={order.id}>
              <ListItemText
                
                primary={` ${order.cliente.nombre} ${order.cliente.apellido}`}
                secondary={`${order.invoiceType}`}
              />
              <Typography>
                ${order.total}
              </Typography>
              {/* Aquí puedes agregar más detalles de la orden si es necesario */}
            </ListItem>
          )}
        </List>
      </Paper>
    </Container>
  );
}
