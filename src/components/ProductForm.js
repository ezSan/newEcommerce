import React, { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Box,
  IconButton,
  Typography,
  Switch,
  FormControlLabel,
  FormGroup,
  Checkbox
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
  images: [],
  available: false,
  offer: false,
  ram: "", // RAM
  rom: "", // ROM
  battery: "", // Batería
  screen: "", // Pantalla
  fastCharge: false, // Carga rápida
  watts: "", // Watts para carga rápida
  sensors: [], // Sensores
  description: "", // Descripción
  camera:"",
  selfie:"",
});
  const [newBrand, setNewBrand] = useState("");
  const theme = useTheme();

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith("sensor_")) {
      const sensorName = name.split("sensor_")[1];
      setProduct(prev => ({
        ...prev,
        sensors: {
          ...prev.sensors,
          [sensorName]: checked
        }
      }));
    } else {
      setProduct(prev => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value
      }));
    }
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
      images: [],
      available: false,
      offer: false,
      fastCharge: false,
      wattage: "",
      camera:"",
      selfie:"",
      sensors: {
        accelerometer: false,
        barometer: false,
        gyroscope: false,
        gps: false,
        pedometer: false,
        nfc: false,
        fingerprint: false,
      }
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
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
        label="Nombre del Producto"
        name="name"
        value={product.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

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
      <FormControlLabel
        control={
          <Switch
            checked={product.available}
            onChange={handleChange}
            name="available"
            color="primary"
          />
        }
        label="Disponible"
      />
      <FormControlLabel
        control={
          <Switch
            checked={product.offer}
            onChange={handleChange}
            name="offer"
            color="primary"
          />
        }
        label="Oferta"
      />

      {product.category === "Smartphones" && (
  <>
    <TextField
      label="RAM"
      name="ram"
      value={product.ram}
      onChange={handleChange}
      fullWidth
      margin="normal"
    />
    <TextField
      label="ROM"
      name="rom"
      value={product.rom}
      onChange={handleChange}
      fullWidth
      margin="normal"
    />
    <TextField
      label="Batería"
      name="battery"
      value={product.battery}
      onChange={handleChange}
      fullWidth
      margin="normal"
    />
    <TextField
      label="Pantalla"
      name="screen"
      value={product.screen}
      onChange={handleChange}
      fullWidth
      margin="normal"
    />
    <TextField
      label="Camara Frontal"
      name="selfie"
      value={product.selfie}
      onChange={handleChange}
      fullWidth
      margin="normal"
    />
    <TextField
      label="Camara Principal"
      name="camera"
      value={product.camera}
      onChange={handleChange}
      fullWidth
      margin="normal"
    />
    <FormControlLabel
      control={
        <Switch
          checked={product.fastCharge}
          onChange={handleChange}
          name="fastCharge"
          color="primary"
        />
      }
      label="Carga Rápida"
    />
    {product.fastCharge && (
      <TextField
        label="Watts"
        name="watts"
        value={product.watts}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
    )}
    <Typography variant="subtitle1" gutterBottom>
      Sensores
    </Typography>
    <Box>
      {["Acelerómetro", "Barómetro","Brújula", "Giroscopio", "GPS", "Podómetro", "NFC", "Huella dactilar"].map(sensor => (
        <FormControlLabel
          control={
            <Switch
              checked={product.sensors.includes(sensor)}
              onChange={() => {
                const updatedSensors = product.sensors.includes(sensor)
                  ? product.sensors.filter(s => s !== sensor)
                  : [...product.sensors, sensor];
                setProduct(prev => ({ ...prev, sensors: updatedSensors }));
              }}
              name={sensor}
              color="primary"
            />
          }
          label={sensor}
          key={sensor}
        />
      ))}
    </Box>
    <TextField
      label="Descripción"
      name="description"
      value={product.description}
      onChange={handleChange}
      fullWidth
      multiline
      rows={4}
      margin="normal"
    />
  </>
)}

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
