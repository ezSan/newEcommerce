import React, { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Box,
  IconButton,
  Typography
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@mui/material/styles";

const ProductForm = ({ categories, brands, setBrands, onAddProduct }) => {
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    category: "",
    price: "",
    currency: "$",
    images: []
  });
  const [newBrand, setNewBrand] = useState("");
  const theme = useTheme();

  const handleChange = e => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddBrand = () => {
    if (newBrand && !brands.includes(newBrand)) {
      setBrands([...brands, newBrand]);
      setNewBrand("");
    }
  };

  const onDrop = acceptedFiles => {
    setProduct(prev => ({
      ...prev,
      images: [
        ...prev.images,
        ...acceptedFiles.slice(0, 3 - prev.images.length)
      ]
    }));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxFiles: 3
  });

  const handleSubmit = e => {
    e.preventDefault();
    onAddProduct(product);
    setProduct({
      name: "",
      brand: "",
      category: "",
      price: "",
      currency: "$",
      images: []
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        label="Nombre del Producto"
        name="name"
        value={product.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        select
        label="Marca"
        name="brand"
        value={product.brand}
        onChange={handleChange}
        fullWidth
        margin="normal"
      >
        {brands.map(brand =>
          <MenuItem key={brand.id} value={brand.name}>
            {brand.name}
          </MenuItem>
        )}
        <MenuItem>
          <Box display="flex" alignItems="center">
            <TextField
              label="Nueva Marca"
              value={newBrand}
              onChange={e => setNewBrand(e.target.value)}
              fullWidth
              margin="normal"
            />
            <IconButton onClick={handleAddBrand} color="primary">
              <AddIcon />
            </IconButton>
          </Box>
        </MenuItem>
      </TextField>
      <TextField
        select
        label="Categoría"
        name="category"
        value={product.category}
        onChange={handleChange}
        fullWidth
        margin="normal"
      >
        {categories.map(category =>
          <MenuItem key={category.id} value={category.name}>
            {category.name}
          </MenuItem>
        )}
      </TextField>
      <Box display="flex" gap={2} alignItems="center">
        <TextField
          label="Precio"
          name="price"
          value={product.price}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          select
          label="Moneda"
          name="currency"
          value={product.currency}
          onChange={handleChange}
          margin="normal"
          sx={{ width: "100px" }}
        >
          <MenuItem value="$">$</MenuItem>
          <MenuItem value="u$">u$</MenuItem>
        </TextField>
      </Box>
      <Box
        {...getRootProps()}
        sx={{
          border: "2px dashed #ccc",
          padding: theme.spacing(2),
          marginTop: theme.spacing(2)
        }}
      >
        <input {...getInputProps()} />
        <Typography>
          Arrastra hasta 3 imágenes aquí, o haz clic para seleccionar
        </Typography>
      </Box>
      <Box mt={2}>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Agregar Producto
        </Button>
      </Box>
    </Box>
  );
};

export default ProductForm;
