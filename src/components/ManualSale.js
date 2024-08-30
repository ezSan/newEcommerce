import React, { useState, useEffect } from "react";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  Paper,
  Grid,
  Typography,
  IconButton,
  Snackbar,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useTheme } from "@mui/material/styles";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ManualSale = ({ onSaleAdded }) => {
  const theme = useTheme();
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([
    { productId: "", quantity: 1 }
  ]);
  const [date, setDate] = useState(null);
  const [status, setStatus] = useState("En Proceso");
  const [paymentMethod, setPaymentMethod] = useState("Pendiente");
  const [totalAmount, setTotalAmount] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    const fetchClients = async () => {
      const querySnapshot = await getDocs(collection(db, "clients"));
      const clientsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setClients(clientsList);
    };

    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productsList);
    };

    fetchClients();
    fetchProducts();
  }, []);

  useEffect(
    () => {
      const calculateTotalAmount = () => {
        let total = 0;
        selectedProducts.forEach(({ productId, quantity }) => {
          const product = products.find(p => p.id === productId);
          if (product) {
            total += product.price * quantity;
          }
        });
        setTotalAmount(total);
      };

      calculateTotalAmount();
    },
    [selectedProducts, products]
  );

  const handleAddSale = async () => {
    const items = selectedProducts.map(({ productId, quantity }) => {
      const product = products.find(p => p.id === productId);
      return {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity,
        currency: product.currency || "USD"
      };
    });

    const saleData = {
      userId: selectedClient,
      items: items,
      createdAt: date || new Date(),
      status,
      paymentMethod,
      totalAmount
    };

    try {
      await addDoc(collection(db, "sales"), saleData);
      onSaleAdded();
      setSelectedClient("");
      setSelectedProducts([{ productId: "", quantity: 1 }]);
      setDate(null);
      setStatus("En Proceso");
      setPaymentMethod("Pendiente");
      setTotalAmount(0);
      setSuccessSnackbarOpen(true);
    } catch (error) {
      console.error("Error adding sale: ", error);
    }
  };

  const handleProductChange = (index, field, value) => {
    const newProducts = [...selectedProducts];
    newProducts[index][field] = value;
    setSelectedProducts(newProducts);
  };

  const addProductField = () => {
    setSelectedProducts([...selectedProducts, { productId: "", quantity: 1 }]);
  };

  const removeProductField = index => {
    const newProducts = selectedProducts.filter((_, i) => i !== index);
    setSelectedProducts(newProducts);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Accordion style={{ marginBottom: "6px" }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6">Agregar Venta Manual</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Paper style={{ padding: 16, width: "100%" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Select
                value={selectedClient}
                onChange={e => setSelectedClient(e.target.value)}
                fullWidth
                displayEmpty
              >
                <MenuItem value="" disabled>
                  Seleccionar Cliente
                </MenuItem>
                {clients.map(client =>
                  <MenuItem key={client.id} value={client.id}>
                    {`${client.name} ${client.lastName}`}
                  </MenuItem>
                )}
              </Select>
            </Grid>
            <Grid item xs={12}>
              <DatePicker
                selected={date}
                onChange={newDate => setDate(newDate)}
                dateFormat="dd/MM/yyyy"
                placeholderText="Seleccionar Fecha"
                customInput={<TextField fullWidth />}
                popperPlacement="top-end"
                popperModifiers={{
                  preventOverflow: {
                    enabled: true
                  },
                  hide: {
                    enabled: false
                  },
                  flip: {
                    enabled: true
                  }
                }}
              />
            </Grid>
            {selectedProducts.map((selectedProduct, index) =>
              <React.Fragment key={index}>
                <Grid item xs={6}>
                  <Select
                    value={selectedProduct.productId}
                    onChange={e =>
                      handleProductChange(index, "productId", e.target.value)}
                    fullWidth
                    displayEmpty
                  >
                    <MenuItem value="" disabled>
                      Seleccionar Producto
                    </MenuItem>
                    {products.map(product =>
                      <MenuItem key={product.id} value={product.id}>
                        {product.name}
                      </MenuItem>
                    )}
                  </Select>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    type="number"
                    label="Cantidad"
                    value={selectedProduct.quantity}
                    onChange={e =>
                      handleProductChange(index, "quantity", e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={2}>
                  <IconButton
                    onClick={() => removeProductField(index)}
                    disabled={selectedProducts.length === 1}
                  >
                    <RemoveIcon />
                  </IconButton>
                  {index === selectedProducts.length - 1 &&
                    <IconButton onClick={addProductField}>
                      <AddIcon />
                    </IconButton>}
                </Grid>
              </React.Fragment>
            )}
            <Grid item xs={12}>
              <TextField
                label="Monto Total"
                value={totalAmount.toFixed(2)}
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <Select
                value={status}
                onChange={e => setStatus(e.target.value)}
                fullWidth
              >
                <MenuItem value="En Proceso">En Proceso</MenuItem>
                <MenuItem value="Abonado">Abonado</MenuItem>
                <MenuItem value="Enviado">Enviado</MenuItem>
                <MenuItem value="Recibido">Recibido</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={6}>
              <Select
                value={paymentMethod}
                onChange={e => setPaymentMethod(e.target.value)}
                fullWidth
              >
                <MenuItem value="Pendiente">Pendiente</MenuItem>
                <MenuItem value="Efectivo">Efectivo</MenuItem>
                <MenuItem value="Transferencia">Transferencia</MenuItem>
                <MenuItem value="Dólares">Dólares</MenuItem>
                <MenuItem value="BinancePay">BinancePay</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="accordionContained"
                onClick={handleAddSale}
                fullWidth
              >
                Agregar Venta
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </AccordionDetails>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="Venta cargada exitosamente"
      />
    </Accordion>
  );
};

export default ManualSale;
