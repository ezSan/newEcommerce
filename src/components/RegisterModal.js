import React, { useState } from 'react';
import { TextField, Button, Box, Typography, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useTheme } from '@mui/material/styles';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import bcrypt from 'bcryptjs';

const RegisterModal = ({ open, onClose }) => {
  const theme = useTheme();
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    lastName: '',
    address: '',
    city: '',
    phoneNumber: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const resetForm = () => {
    setForm({
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      lastName: '',
      address: '',
      city:'',
      phoneNumber: ''
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      // Verificar si el usuario ya existe
      const q = query(collection(db, 'clients'), where('email', '==', form.email));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        setError('El usuario ya existe');
        return;
      }

      // Encriptar la contraseña y agregar el usuario a la colección
      const hashedPassword = await bcrypt.hash(form.password, 10);
      await addDoc(collection(db, 'clients'), {
        email: form.email,
        password: hashedPassword,
        name: form.name,
        lastName: form.lastName,
        address: form.address,
        phoneNumber: form.phoneNumber
      });

      resetForm();
      onClose();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Registro</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            label="Nombre"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Apellido"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
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
            type={showPassword ? 'text' : 'password'}
            value={form.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <TextField
            label="Confirmar Contraseña"
            name="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            value={form.confirmPassword}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowConfirmPassword}>
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <TextField
            label="Dirección"
            name="address"
            value={form.address}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Ciudad"
            name="city"
            value={form.city}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Teléfono"
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          {error && <Typography color="error">{error}</Typography>}
          <DialogActions>
            <Button onClick={onClose} color="secondary">Cancelar</Button>
            <Button type="submit" variant="contained" color="primary">Registrar</Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterModal;
