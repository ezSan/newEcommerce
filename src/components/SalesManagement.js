import React, { useState, useEffect } from "react";
import { Container, Typography, Grid, Paper, Box, Button } from "@mui/material";
import { db } from "../firebaseConfig";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc
} from "firebase/firestore";
import { useTheme } from "@mui/material/styles";

export default function SalesManagement() {
  return (<Container maxWidth="lg">
    <Box mt={4}>
      <Typography variant="h6">
      Ventas
      </Typography>
    </Box>
   
  </Container>
  
  )
}
