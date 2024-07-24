import React, { useState, useEffect } from "react";
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Box, Switch, Typography } from "@mui/material";
import { db } from "../firebaseConfig";
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { useTheme } from "@mui/material/styles";
import EditProductForm from "./EditProductForm";
import SearchInput from "./SearchInput";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Image from "next/image";

const ProductManagement = ({ categories, brands }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Marca</TableCell>
                <TableCell>Categoría</TableCell>
                <TableCell>Precio</TableCell>
                <TableCell>Imagen 1</TableCell>
                <TableCell>Imagen 2</TableCell>
                <TableCell>Imagen 3</TableCell>
                <TableCell>Disponible</TableCell>
                <TableCell>Oferta</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProducts.map(product => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.brand}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.currency} {product.price}</TableCell>
                  <TableCell>
                    <Image src={product.images[0]} alt={product.name} width={50} height={50} />
                  </TableCell>
                  <TableCell>
                    <Image src={product.images[1]} alt={product.name} width={50} height={50} />
                  </TableCell>
                  <TableCell>
                    <Image src={product.images[2]} alt={product.name} width={50} height={50} />
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={product.available}
                      color="primary"
                      disabled
                    />
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={product.offer}
                      color="primary"
                      disabled
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton edge="end" aria-label="edit" onClick={() => handleEditOpen(product)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteProduct(product.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      {selectedProduct && (
        <EditProductForm
          open={isEditOpen}
          onClose={handleEditClose}
          product={selectedProduct}
          categories={categories}
          brands={brands}
          onSave={handleUpdateProduct}
        />
      )}
    </Container>
  );
};

export default ProductManagement;
