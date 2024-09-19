import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setDollarValue } from "../store/actions/dollarActions";
import { useTheme } from "@mui/material/styles";

const OfferAndDollarRate = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const rate = useSelector((state) => state.dollar.value);

  useEffect(() => {
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
  }, [dispatch]);

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.accent.main, // Light Beige for the background
        padding: "4px 16px",
        borderBottom: `1px solid ${theme.palette.divider}`,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: theme.palette.accent.contrastText, // Use contrast text color for readability
      }}
    >
      <Typography variant="overline" color="inherit">
        5% OFF COMPRANDO CON USDT!
      </Typography>

      <Typography variant="subtitle2" color="inherit">
        1u$ = {rate !== null ? `$${rate}` : "Cargando..."}
      </Typography>
    </Box>
  );
};

export default OfferAndDollarRate;
