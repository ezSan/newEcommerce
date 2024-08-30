import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux'; 
import { setUser } from '../store/actions/userActions';

const LoginModal = ({ open, onClose }) => {
  const theme = useTheme();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const resetForm = () => {
    setForm({ email: '', password: '' });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login response data:", data);

       
        document.cookie = `token=${data.token}; path=/; max-age=${60 * 60}`; 

        dispatch(setUser(data.user));
        resetForm();
        onClose();
        router.push('/');
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      console.error("Error during login request:", error);
      setError('Error de conexión. Inténtelo de nuevo más tarde.');
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Iniciar Sesión</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Contraseña"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          {error && <Typography color="error">{error}</Typography>}
          <DialogActions>
            <Button onClick={onClose} color="secondary">Cancelar</Button>
            <Button type="submit" variant="contained" color="primary">Iniciar Sesión</Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
