import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Switch,
  Button,
  TextField,
  MenuItem,
  Box,
  IconButton,
  Typography, DialogContentText, FormControlLabel
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Image from "next/image"
import { useTheme } from "@mui/material/styles";

const EditProductForm = ({ open, onClose, product, categories, brands, onSave }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const theme = useTheme();

  const handleConfirmSave = () => {
    onSave(updatedProduct);
    setConfirmOpen(false);
    onClose();
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const normalizedValue = type === 'number' ? Number(value) : value;
    setUpdatedProduct({ ...updatedProduct, [name]: normalizedValue });
  };

  const handleSwitchChange = (event) => {
    setUpdatedProduct({ ...updatedProduct, includesCharger: event.target.checked });
  };

  const handleSave = () => {
    setConfirmOpen(true);
  };

  const handleNextImage = () =>
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % (updatedProduct.images?.length || 1));

  const handlePrevImage = () =>
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? (updatedProduct.images?.length || 1) - 1 : prevIndex - 1
    );

  const handleSelectMainImage = () => {
    const updatedImages = [...updatedProduct.images];
    const [selectedImage] = updatedImages.splice(currentImageIndex, 1);
    updatedImages.unshift(selectedImage);
    setUpdatedProduct({ ...updatedProduct, images: updatedImages });
    setCurrentImageIndex(0);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Editar Producto</DialogTitle>
      <DialogContent>
      
        <TextField
          margin="dense"
          label="Nombre"
          type="text"
          name="name"
          value={updatedProduct.name}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Marca"
          type="text"
          name="brand"
          value={updatedProduct.brand}
          onChange={handleChange}
          fullWidth
          select
        >
          {brands.map((brand) => (
            <MenuItem key={brand.id} value={brand.name}>
              {brand.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          margin="dense"
          label="Categoría"
          type="text"
          name="category"
          value={updatedProduct.category}
          onChange={handleChange}
          fullWidth
          select
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.name}>
              {category.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
  margin="dense"
  label="Precio"
  type="number"
  name="price"
  value={updatedProduct.price}
  onChange={(e) => handleChange({ target: { name: 'price', value: Number(e.target.value) } })}
  fullWidth
/>
        <TextField
          margin="dense"
          label="Proveedor"
          type="text"
          name="supplier"
          value={updatedProduct.supplier}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="RAM"
          type="text"
          name="ram"
          value={updatedProduct.ram}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="ROM"
          type="text"
          name="rom"
          value={updatedProduct.rom}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Batería"
          type="text"
          name="battery"
          value={updatedProduct.battery}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Pantalla"
          type="text"
          name="screen"
          value={updatedProduct.screen}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Cámara"
          type="text"
          name="camera"
          value={updatedProduct.camera}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Cámara Frontal"
          type="text"
          name="selfie"
          value={updatedProduct.selfie}
          onChange={handleChange}
          fullWidth
        />
       <TextField
  margin="dense"
  label="Sensores"
  type="text"
  name="sensors"
  value={updatedProduct.sensors.join(', ')}
  onChange={(e) =>
    setUpdatedProduct({
      ...updatedProduct,
      sensors: e.target.value.split(',').map((sensor) => sensor.trim()), 
    })
  }
  fullWidth
/>
       
        <TextField
          margin="dense"
          label="Descripción"
          type="text"
          name="description"
          value={updatedProduct.description}
          onChange={handleChange}
          fullWidth
          multiline
          rows={3}
        />

<FormControlLabel
          control={
            <Switch
              checked={updatedProduct.includesCharger}
              onChange={handleSwitchChange}
              name="includesCharger"
              color="primary"
            />
          }
          label="Incluye cargador de fábrica"
        />

        
<Box sx={{ textAlign: 'center', my: 2 }}>
          <Typography variant="subtitle1">Seleccionar imagen principal</Typography>
          <Box sx={{ position: 'relative', display: 'inline-block', border: '2px solid #3f51b5', borderRadius: 2, p: 1 }}>
            <IconButton onClick={handlePrevImage} sx={{ position: 'absolute', left: -30, top: '50%', transform: 'translateY(-50%)' }}>
              <ArrowBackIosIcon />
            </IconButton>
            <Image
              width='150'
              height='150'
              src={updatedProduct.images?.[currentImageIndex] || "/path/to/default-image.jpg"}
              alt="Imagen del producto"
              style={{ maxHeight: '150px', maxWidth: '150px', objectFit: 'cover' }}
            />
            <IconButton onClick={handleNextImage} sx={{ position: 'absolute', right: -30, top: '50%', transform: 'translateY(-50%)' }}>
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>
          <Button onClick={handleSelectMainImage} variant="outlined" sx={{ mt: 1 }}>
            Establecer como principal
          </Button>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Cancelar</Button>
        <Button onClick={handleSave} color="primary">Guardar</Button>
      </DialogActions>
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirmar cambios</DialogTitle>
        <DialogContent>
          <DialogContentText>¿Desea confirmar los cambios realizados?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)} color="primary">Cancelar</Button>
          <Button onClick={handleConfirmSave} color="primary" autoFocus>Confirmar</Button>
        </DialogActions>
      </Dialog>
    </Dialog>
  
  );
};

export default EditProductForm;
