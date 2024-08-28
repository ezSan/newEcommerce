import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  MenuItem
} from '@mui/material';

const EditProductForm = ({ open, onClose, product, categories, brands, onSave }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct({ ...updatedProduct, [name]: value });
  };

  const handleSave = () => {
    onSave(updatedProduct);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
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
          onChange={handleChange}
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
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleSave} color="primary">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProductForm;
