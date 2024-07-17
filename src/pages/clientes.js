import React, { useState, useEffect } from "react";
import { Container, Typography, List, ListItem, ListItemText } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebaseConfig.js';

export default function Clientes() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "clients"));
        const clientsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        console.log("Clients fetched:", clientsList);
        setClientes(clientsList);
      } catch (e) {
        console.error("Error fetching clients: ", e);
      }
    };

    fetchClientes();
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Gestión de Clientes
      </Typography>
      <List>
        {clientes.map((cliente) => (
          <ListItem key={cliente.id}>
            <ListItemText primary={`Cliente ID: ${cliente.id}`} secondary={`Nombre: ${cliente.nombre}`} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
