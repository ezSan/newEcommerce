// pages/index.js
import { Container, Grid, Paper, Typography } from "@mui/material";
import ProductCard from "../components/ProductCard";
import React, { useEffect, useState } from "react";
import ProductGrid from "../components/ProductGrid";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const productsSnapshot = await getDocs(collection(db, "products"));
      const productsList = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productsList);

      const categoriesSnapshot = await getDocs(collection(db, "categories"));
      const categoriesList = categoriesSnapshot.docs.map(doc => doc.id); // Assuming category names are the document IDs
      setCategories(categoriesList);
    };

    fetchData();
  }, []);

  return <ProductGrid products={products} categories={categories} />;
}
