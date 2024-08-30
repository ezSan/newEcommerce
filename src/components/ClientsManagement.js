import React, { useState, useEffect } from "react";
import { Container, Typography, Box, CircularProgress } from "@mui/material";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import CreateClientForm from "./CreateClientForm";
import ClientTable from "./ClientTable";

export default function ClientsManagement() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchClients = async () => {
    try {
      const salesSnapshot = await getDocs(collection(db, "clients"));
      const clientsList = salesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setClients(clientsList);
    } catch (error) {
      console.error("Error fetching clients: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleClientAdded = () => {
    fetchClients(); 
  };

  return (
    <Container maxWidth="lg">
      <Box mt={4}>
        <Typography variant="h6">Clientes</Typography>
        <CreateClientForm onClientAdded={handleClientAdded} />
        {loading ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : (
          <ClientTable clients={clients} />
        )}
      </Box>
    </Container>
  );
}
