import React, { useState, useEffect } from "react";
import { Container, Typography, Box } from "@mui/material";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import SalesTable from "./SalesTable";

export default function SalesManagement() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const fetchSales = async () => {
      const salesSnapshot = await getDocs(collection(db, "sales"));
      const salesList = salesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setSales(salesList);
    };

    fetchSales();
  }, []);

  return (
    <Container maxWidth="lg">
      <Box mt={4}>
            <SalesTable sales={sales} />
      </Box>
    </Container>
  );
}
