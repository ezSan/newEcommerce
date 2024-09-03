import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setDollarValue } from "../store/actions/dollarActions";

const DollarRate = () => {
  const dispatch = useDispatch();
  const rate = useSelector(state => state.dollar.value);

  useEffect(
    () => {
      const fetchDollarRate = async () => {
        try {
          const response = await fetch("https://dolarapi.com/v1/dolares/blue");
          const data = await response.json();
          dispatch(setDollarValue(data.venta));
        } catch (error) {
          console.error("Error fetching dollar rate:", error);
        }
      };

      fetchDollarRate();
    },
    [dispatch]
  );

  return (
    <Box textAlign="center">
      <Typography variant="body1" color="inherit">
        Dólar hoy {rate !== null ? `$${rate}` : "Cargando..."}
      </Typography>
    </Box>
  );
};

export default DollarRate;
