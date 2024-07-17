// src/components/ProductManagement.js
import React, { useState, useEffect } from "react";
import { Container, Typography, Grid, Paper, Box, Button } from "@mui/material";
import { db } from "../firebaseConfig";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc
} from "firebase/firestore";
import { useTheme } from "@mui/material/styles";
import EditProductForm from "./EditProductForm";

const ProductManagement = ({ categories, brands }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productsList);
    };

    fetchProducts();
  }, []);

  const handleUpdateProduct = async updatedProduct => {
    const productRef = doc(db, "products", updatedProduct.id);
    await updateDoc(productRef, updatedProduct);
    setProducts(
      products.map(
        product => (product.id === updatedProduct.id ? updatedProduct : product)
      )
    );
  };

  const handleDeleteProduct = async id => {
    const productRef = doc(db, "products", id);
    await deleteDoc(productRef);
    setProducts(products.filter(product => product.id !== id));
  };

  const handleEditOpen = product => {
    setSelectedProduct(product);
    setIsEditOpen(true);
  };

  const handleEditClose = () => {
    setIsEditOpen(false);
    setSelectedProduct(null);
  };

  return (
    <Container maxWidth="lg">
      <Box mt={4}>
        <Grid container spacing={4}>
          {products.map(product =>
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Paper sx={{ padding: theme.spacing(2) }}>
                <Typography variant="h6">
                  {product.name}
                </Typography>
                <Typography variant="body1">
                  Marca: {product.brand}
                </Typography>
                <Typography variant="body1">
                  Categoría: {product.category}
                </Typography>
                <Typography variant="body1">
                  Precio: ${product.price}
                </Typography>
                <Box mt={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEditOpen(product)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDeleteProduct(product.id)}
                    sx={{ ml: 2 }}
                  >
                    Eliminar
                  </Button>
                </Box>
              </Paper>
            </Grid>
          )}
        </Grid>
      </Box>
      {selectedProduct &&
        <EditProductForm
          open={isEditOpen}
          onClose={handleEditClose}
          product={selectedProduct}
          categories={categories}
          brands={brands}
          onSave={handleUpdateProduct}
        />}
    </Container>
  );
};

export default ProductManagement;
