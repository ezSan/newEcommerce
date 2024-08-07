import React, { useState, useEffect } from "react";
import { Container, Grid, Paper, Tabs, Tab } from "@mui/material";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebaseConfig";
import ProductForm from "../components/ProductForm";
import ItemsReadyToPushIntoFirebase from "../components/ItemsReadyToPushIntoFirebase";
import ProductManagement from "../components/ProductManagement";
import SalesManagement from "../components/SalesManagement";
import ClientsManagement from "../components/ClientsManagement";
import { useTheme } from "@mui/material/styles";
import jwt from "jsonwebtoken";
import { parseCookies } from "nookies";

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

  const handleAddProduct = (product) => {
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
        const imageUrls = await Promise.all(
          product.images.map(async (image) => {
            const storageRef = ref(storage, `products/${image.name}`);
            await uploadBytes(storageRef, image);
            const url = await getDownloadURL(storageRef);
            return url;
          })
        );

        const productWithImageURLs = {
          ...product,
          images: imageUrls,
        };

        const productsRef = collection(db, "products");
        await addDoc(productsRef, productWithImageURLs);
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
              <ItemsReadyToPushIntoFirebase products={products} onConfirm={handleConfirm} />
            </Paper>
          </Grid>
        </Grid>
      )}
      {selectedTab === 1 && (
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Paper style={{ padding: theme.spacing(2) }}>
              <ProductManagement products={dbProducts} categories={categories} brands={brands} />
            </Paper>
          </Grid>
        </Grid>
      )}
      {selectedTab === 2 && (
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Paper style={{ padding: theme.spacing(2) }}>
              <SalesManagement />
            </Paper>
          </Grid>
        </Grid>
      )}
      {selectedTab === 3 && (
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Paper style={{ padding: theme.spacing(2) }}>
              <ClientsManagement />
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export async function getServerSideProps(context) {
  console.log("getServerSideProps is running");

  const { req } = context;
  const cookies = parseCookies({ req });
  const token = cookies.token;

  console.log('Cookies received:', cookies);
  console.log('Token from cookies:', token);

  if (!token) {
    console.log('No token found, redirecting...');
    return {
      redirect: {
        destination: "/Unauthorized",
        permanent: false,
      },
    };
  }

  try {
    const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
    console.log('Decoded JWT:', decoded);

    if (!decoded.isAdmin) {
      console.log('User is not admin, redirecting...');
      return {
        redirect: {
          destination: "/Unauthorized",
          permanent: false,
        },
      };
    }

    return {
      props: {},
    };
  } catch (error) {
    console.error('JWT verification error:', error);
    return {
      redirect: {
        destination: "/Unauthorized",
        permanent: false,
      },
    };
  }
}



export default PanelAdmin;
