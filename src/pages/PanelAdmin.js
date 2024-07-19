import React, { useState, useEffect } from "react";
import { Container, Typography, Grid, Paper, Box, Tabs, Tab } from "@mui/material";
import { db, storage } from "../firebaseConfig";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import ProductForm from "../components/ProductForm";
import ItemsReadyToPushIntoDB from "../components/ItemsReadyToPushIntoDB";
import ProductManagement from "../components/ProductManagement";
import SalesManagement from "../components/SalesManagement"
import ClientsManagement from "../components/ClientsManagement"
import { useTheme } from "@mui/material/styles";

const PanelAdmin = () => {
  const [products, setProducts] = useState([]);
  const [dbProducts, setDbProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const theme = useTheme();

  useEffect(() => {
    const fetchCategories = async () => {
      const querySnapshot = await getDocs(collection(db, "categories"));
      const categoriesList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCategories(categoriesList);
    };

    const fetchBrands = async () => {
      const querySnapshot = await getDocs(collection(db, "brands"));
      const brandsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setBrands(brandsList);
    };

    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setDbProducts(productsList);
    };

    fetchCategories();
    fetchBrands();
    fetchProducts();
  }, []);

  const handleAddProduct = product => {
    setProducts([...products, product]);
  };

  const uploadImageAndGetURL = async (file) => {
    const storageRef = ref(storage, `products/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  };

  const handleConfirm = async () => {
    try {
      for (const product of products) {
        const imageUrl = await uploadImageAndGetURL(product.image);
        const productWithImageURL = {
          ...product,
          image: imageUrl,
        };
        const productsRef = collection(db, "products");
        await addDoc(productsRef, productWithImageURL);
      }
      setProducts([]);
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setDbProducts(productsList);
    } catch (error) {
      console.error("Error adding products: ", error);
    }
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Container maxWidth="lg">
      <Tabs value={selectedTab} onChange={handleTabChange} aria-label="Panel de administración">
        <Tab label="Cargar Producto" />
        <Tab label="Administrar Productos" />
        <Tab label="Ventas" />
        <Tab label="Clientes" />
      </Tabs>
      {selectedTab === 0 && (
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper style={{ padding: theme.spacing(2) }}>
              <ProductForm categories={categories} brands={brands} setBrands={setBrands} onAddProduct={handleAddProduct} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper style={{ padding: theme.spacing(2) }}>
              <ItemsReadyToPushIntoDB products={products} onConfirm={handleConfirm} />
            </Paper>
          </Grid>
        </Grid>
      )}
      {selectedTab === 1 && <ProductManagement categories={categories} brands={brands} />}
      {selectedTab === 2 && <SalesManagement/>}
      {selectedTab === 3 && <ClientsManagement/>}
    </Container>
  );
};

export default PanelAdmin;
