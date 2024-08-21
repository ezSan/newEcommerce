import React, { useState, useEffect } from "react";
import { Container, Box } from "@mui/material";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import SalesTable from "./SalesTable";
import ManualSale from "./ManualSale";

export default function SalesManagement() {
  const [sales, setSales] = useState([]);

  const fetchSales = async () => {
    const salesSnapshot = await getDocs(collection(db, "sales"));
    const salesList = salesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setSales(salesList);
  };

  useEffect(() => {
    fetchSales();
  }, []);

  const handleSaleAdded = () => {
    fetchSales(); // Actualiza la tabla después de agregar una venta
  };

  return (
    <Container maxWidth="lg">
      <Box mt={4}>
        <ManualSale onSaleAdded={handleSaleAdded} /> {/* Pasar handleSaleAdded aquí */}
        <SalesTable sales={sales} />
      </Box>
    </Container>
  );
}
