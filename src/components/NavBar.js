import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useRouter } from "next/router";
import { useTheme } from "@mui/material/styles";

export default function NavBar() {
  const theme = useTheme();
  const router = useRouter();

  return (
    <AppBar position="static">
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <Button color="inherit" onClick={() => router.push("/")}>
          <Typography variant="h6">wildTech</Typography>
        </Button>

        <div>
          <Button color="inherit" onClick={() => router.push("/Questions")}>
            Preguntas frecuentes
          </Button>

          <Button color="inherit" onClick={() => router.push("/PanelAdmin")}>
            Administrador
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}
