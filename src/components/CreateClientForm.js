import React, { useState } from "react";
import {
  TextField,
  Button,
  Paper,
  Grid,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useTheme } from "@mui/material/styles";

const CreateClientForm = ({ onClientAdded }) => {
  const theme = useTheme();
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");

  const handleAddClient = async () => {
    const clientData = {
      name,
      lastName,
      email,
      phoneNumber,
      address,
      city,
      createdAt: new Date()
    };

    try {
      await addDoc(collection(db, "clients"), clientData);
      onClientAdded();
      setName("");
      setLastName("");
      setEmail("");
      setPhoneNumber("");
      setAddress("");
      setCity("");
    } catch (error) {
      console.error("Error adding client: ", error);
    }
  };

  return (
    <Accordion style={{ marginTop: 16 }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant="h6">Crear Cliente</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Paper style={{ padding: 16, width: "100%" }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Nombre"
                value={name}
                onChange={e => setName(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Apellido"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Teléfono"
                value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Ciudad"
                value={city}
                onChange={e => setCity(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Dirección"
                value={address}
                onChange={e => setAddress(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="accordionContained" fullWidth onClick={handleAddClient}>
                Agregar Cliente
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </AccordionDetails>
    </Accordion>
  );
};

export default CreateClientForm;
