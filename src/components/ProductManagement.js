import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
  Switch,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
} from "@mui/material";
import { db } from "../firebaseConfig";
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { useTheme } from "@mui/material/styles";
import EditProductForm from "./EditProductForm";
import SearchInput from "./SearchInput";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Image from "next/image";

const ProductManagement = ({ categories, brands }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const theme = useTheme();

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsList);
    };

    fetchProducts();
  }, []);

  const handleUpdateProduct = async (updatedProduct) => {
    const productRef = doc(db, "products", updatedProduct.id);
    await updateDoc(productRef, updatedProduct);
    setProducts(
      products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  
  const handleOpenDeleteConfirm = (product) => {
    setProductToDelete(product);
    setConfirmDeleteOpen(true);
  };

 
  const handleCloseDeleteConfirm = () => {
    setConfirmDeleteOpen(false);
    setProductToDelete(null);
  };


  const handleDeleteProduct = async () => {
    if (productToDelete) {
      const productRef = doc(db, "products", productToDelete.id);
      await deleteDoc(productRef);
      setProducts(products.filter((product) => product.id !== productToDelete.id));
      handleCloseDeleteConfirm(); 
    }
  };

  const handleEditOpen = (product) => {
    setSelectedProduct(product);
    setIsEditOpen(true);
  };

  const handleEditClose = () => {
    setIsEditOpen(false);
    setSelectedProduct(null);
  };

  const toggleAvailable = async (id, available) => {
    const productRef = doc(db, "products", id);
    await updateDoc(productRef, { available: !available });
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, available: !available } : product
      )
    );
  };

  const toggleOffer = async (id, offer) => {
    const productRef = doc(db, "products", id);
    await updateDoc(productRef, { offer: !offer });
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, offer: !offer } : product
      )
    );
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
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.brand}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>
                    {product.currency} {product.price}
                  </TableCell>
                  <TableCell>
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      width={50}
                      height={50}
                    />
                  </TableCell>
                  <TableCell>
                    <Image
                      src={product.images[1]}
                      alt={product.name}
                      width={50}
                      height={50}
                    />
                  </TableCell>
                  <TableCell>
                    <Image
                      src={product.images[2]}
                      alt={product.name}
                      width={50}
                      height={50}
                    />
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={product.available}
                      color="primary"
                      onChange={() => toggleAvailable(product.id, product.available)}
                    />
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={product.offer}
                      color="primary"
                      onChange={() => toggleOffer(product.id, product.offer)}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={() => handleEditOpen(product)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleOpenDeleteConfirm(product)}
                    >
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

      
      <Dialog open={confirmDeleteOpen} onClose={handleCloseDeleteConfirm}>
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro de que deseas eliminar este producto?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteConfirm} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDeleteProduct} color="secondary">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProductManagement;
