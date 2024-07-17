import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, MenuItem } from "@mui/material";

const EditProductForm = ({ open, onClose, product, categories, brands, onSave }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);

  useEffect(() => {
    setUpdatedProduct(product);
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
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
          label="Nombre del Producto"
          name="name"
          value={updatedProduct.name || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          select
          label="Marca"
          name="brand"
          value={updatedProduct.brand || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
        >
          {brands.map((brand) => (
            <MenuItem key={brand.id} value={brand.name}>
              {brand.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Categoría"
          name="category"
          value={updatedProduct.category || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.name}>
              {category.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Precio"
          name="price"
          value={updatedProduct.price || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        {/* Añadir otros campos según sea necesario */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
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
