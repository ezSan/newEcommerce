import React, { useState } from "react";
import { Grid, Box, Typography } from "@mui/material";
import ProductCard from "./ProductCard";
import Sidebar from "./Sidebar";
import { useTheme } from "@mui/material/styles";

const ProductGrid = ({ products, categories = [] }) => {
  const theme = useTheme();
  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products;

  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ width: "20%", p: 2 }}>
        <Sidebar
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />
      </Box>
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Grid container spacing={4}>
          {filteredProducts.map(product =>
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default ProductGrid;
