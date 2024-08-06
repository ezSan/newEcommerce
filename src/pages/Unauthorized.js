import React from "react";
import { Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function Unauthorized() {
  const theme = useTheme();
  return <Container maxWidth="lg">Usuario sin autorización</Container>;
}
