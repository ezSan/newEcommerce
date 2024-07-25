import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useRouter } from 'next/router';
import RegisterModal from './RegisterModal';
import { useTheme } from '@mui/material/styles';

export default function NavBar() {
  const theme = useTheme();
  const router = useRouter();
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const handleOpenRegister = () => {
    setIsRegisterOpen(true);
  };

  const handleCloseRegister = () => {
    setIsRegisterOpen(false);
  };

  return (
    <AppBar position="static">
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button color="inherit" onClick={() => router.push('/')}>
          <Typography variant="h6">wildTech</Typography>
        </Button>

        <div>
          <Button color="inherit" onClick={() => router.push('/Questions')}>
            Preguntas frecuentes
          </Button>
          <Button color="inherit" onClick={() => router.push('/PanelAdmin')}>
            Administrador
          </Button>
          <Button color="inherit" onClick={handleOpenRegister}>
            Registrarse
          </Button>
        </div>
      </Toolbar>
      <RegisterModal open={isRegisterOpen} onClose={handleCloseRegister} />
    </AppBar>
  );
}
