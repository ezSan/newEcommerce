import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  Typography,
  IconButton,
  TableSortLabel
} from "@mui/material";
import { doc, updateDoc, getDocs, collection } from "firebase/firestore";
import { db } from "../firebaseConfig.js";
import { format } from "date-fns";
import { ExpandMore, ExpandLess } from "@mui/icons-material";

export default function SalesTable({ sales }) {
  const [selectedSale, setSelectedSale] = useState(null);
  const [status, setStatus] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Pendiente");
  const [orderBy, setOrderBy] = useState("date");
  const [orderDirection, setOrderDirection] = useState("asc");
  const [clients, setClients] = useState({});

  useEffect(() => {
    const fetchClients = async () => {
      const querySnapshot = await getDocs(collection(db, "clients"));
      const clientsMap = {};
      querySnapshot.forEach(doc => {
        clientsMap[doc.id] = doc.data();
      });
      setClients(clientsMap);
    };

    fetchClients();
  }, []);

  const handleStatusChange = async (sale, newStatus) => {
    const saleRef = doc(db, "sales", sale.id);
    await updateDoc(saleRef, { status: newStatus });
    sale.status = newStatus;
    setStatus(newStatus);
  };

  const handlePaymentMethodChange = async (sale, newMethod) => {
    const saleRef = doc(db, "sales", sale.id);
    await updateDoc(saleRef, { paymentMethod: newMethod });
    sale.paymentMethod = newMethod;
    setPaymentMethod(newMethod);
  };

  const handleSort = column => {
    const isAsc = orderBy === column && orderDirection === "asc";
    setOrderDirection(isAsc ? "desc" : "asc");
    setOrderBy(column);
  };

  const sortedSales = sales.sort((a, b) => {
    let order = orderDirection === "asc" ? 1 : -1;
    if (orderBy === "date") {
      return order * (a.createdAt.toDate() - b.createdAt.toDate());
    }
    if (orderBy === "amount") {
      return order * (a.totalAmount - b.totalAmount);
    }
    if (orderBy === "client") {
      const clientA = clients[a.userId]
        ? `${clients[a.userId].name} ${clients[a.userId].lastName}`
        : "";
      const clientB = clients[b.userId]
        ? `${clients[b.userId].name} ${clients[b.userId].lastName}`
        : "";
      return order * clientA.localeCompare(clientB);
    }
    return 0;
  });

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead style={{ backgroundColor: "#1e88e5" }}>
          <TableRow>
            <TableCell style={{ color: "#fff" }}>
              <TableSortLabel
                active={orderBy === "client"}
                direction={orderBy === "client" ? orderDirection : "asc"}
                onClick={() => handleSort("client")}
                style={{ color: "#fff" }}
              >
                Cliente
              </TableSortLabel>
            </TableCell>
            <TableCell style={{ color: "#fff" }}>
              <TableSortLabel
                active={orderBy === "date"}
                direction={orderBy === "date" ? orderDirection : "asc"}
                onClick={() => handleSort("date")}
                style={{ color: "#fff" }}
              >
                Fecha
              </TableSortLabel>
            </TableCell>
            <TableCell style={{ color: "#fff" }}>
              <TableSortLabel
                active={orderBy === "amount"}
                direction={orderBy === "amount" ? orderDirection : "asc"}
                onClick={() => handleSort("amount")}
                style={{ color: "#fff" }}
              >
                Monto de la Venta
              </TableSortLabel>
            </TableCell>
            <TableCell style={{ color: "#fff" }}>Estado</TableCell>
            <TableCell style={{ color: "#fff" }}>Método de Pago</TableCell>
            <TableCell style={{ color: "#fff" }}>Productos</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedSales.map(sale => {
            const saleDate = sale.createdAt.toDate();
            const formattedDate = format(saleDate, "dd/MM/yy");
            const client = clients[sale.userId];

            return (
              <React.Fragment key={sale.id}>
                <TableRow>
                  <TableCell>
                    {client
                      ? `${client.name} ${client.lastName}`
                      : "Cliente no encontrado"}
                  </TableCell>
                  <TableCell>
                    {formattedDate}
                  </TableCell>
                  <TableCell>{`$${sale.totalAmount}`}</TableCell>
                  <TableCell>
                    <Select
                      value={sale.status || "En Proceso"}
                      onChange={e => handleStatusChange(sale, e.target.value)}
                      fullWidth
                    >
                      <MenuItem value="En Proceso">En Proceso</MenuItem>
                      <MenuItem value="Abonado">Abonado</MenuItem>
                      <MenuItem value="Enviado">Enviado</MenuItem>
                      <MenuItem value="Recibido">Recibido</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={sale.paymentMethod || "Pendiente"}
                      onChange={e =>
                        handlePaymentMethodChange(sale, e.target.value)}
                      fullWidth
                    >
                      <MenuItem value="Pendiente">Pendiente</MenuItem>
                      <MenuItem value="Efectivo">Efectivo</MenuItem>
                      <MenuItem value="Transferencia">Transferencia</MenuItem>
                      <MenuItem value="Dólares">Dólares</MenuItem>
                      <MenuItem value="BinancePay">BinancePay</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() =>
                        setSelectedSale(
                          selectedSale === sale.id ? null : sale.id
                        )}
                    >
                      {selectedSale === sale.id
                        ? <ExpandLess />
                        : <ExpandMore />}
                    </IconButton>
                  </TableCell>
                </TableRow>
                {selectedSale === sale.id &&
                  <TableRow>
                    <TableCell colSpan={6}>
                      <Typography variant="subtitle1">Productos:</Typography>
                      <ul>
                        {sale.items.map(product =>
                          <li key={product.id}>
                            {product.name} - {product.quantity} x ${product.price}
                          </li>
                        )}
                      </ul>
                    </TableCell>
                  </TableRow>}
              </React.Fragment>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
