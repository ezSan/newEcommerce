import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useRouter } from "next/router";

export default function NavBar() {
  const router = useRouter();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <Button color="inherit" onClick={() => router.push("/")}>
            Ez-Commerce
          </Button>
        </Typography>

        <Button color="inherit" onClick={() => router.push("/Questions")}>
          Preguntas frecuentes
        </Button>

        <Button color="inherit" onClick={() => router.push("/PanelAdmin")}>
          Administrador
        </Button>
      </Toolbar>
    </AppBar>
  );
}
