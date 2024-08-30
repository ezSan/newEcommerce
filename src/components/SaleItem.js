import React, { useState } from "react";
import { Box, Typography, Button, MenuItem, Select } from "@mui/material";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const SaleItem = ({ sale }) => {
  const [status, setStatus] = useState(sale.status);
  const [showDetails, setShowDetails] = useState(false);

  const handleStatusChange = async (event) => {
    const newStatus = event.target.value;
    setStatus(newStatus);

    const saleRef = doc(db, "sales", sale.id);
    await updateDoc(saleRef, { status: newStatus });
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <Box
      border={1}
      borderRadius={4}
      p={2}
      mb={2}
      display="flex"
      flexDirection="column"
      alignItems="start"
    >
      <Typography variant="body1">
        Cliente: {sale.userName} {sale.userLastName}
      </Typography>
      <Typography variant="body1">Monto: ${sale.totalAmount}</Typography>
      <Box display="flex" alignItems="center" mt={1}>
        <Typography variant="body1" mr={2}>
          Estado:
        </Typography>
        <Select
          value={status}
          onChange={handleStatusChange}
          variant="outlined"
          size="small"
        >
          <MenuItem value="pagado">Pagado</MenuItem>
          <MenuItem value="enviado">Enviado</MenuItem>
          <MenuItem value="entregado">Entregado</MenuItem>
        </Select>
      </Box>
      <Button onClick={toggleDetails} variant="text" color="primary" size="small" mt={1}>
        {showDetails ? "Ocultar Detalles" : "Ver Detalles"}
      </Button>
      {showDetails && (
        <Box mt={2} pl={2} borderLeft={1}>
          <Typography variant="body2">Dirección: {sale.userAddress}</Typography>
          <Typography variant="body2">Ciudad: {sale.userCity}</Typography>
          <Typography variant="body2">Fecha: {new Date(sale.createdAt.seconds * 1000).toLocaleDateString()}</Typography>
          {/* Add more details as needed */}
        </Box>
      )}
    </Box>
  );
};

export default SaleItem;
