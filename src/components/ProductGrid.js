import React, { useState } from "react";
import { Grid, Box, Typography } from "@mui/material";
import ProductCard from "./ProductCard";
import Sidebar from "./Sidebar";
import SearchInput from "./SearchInput";
import { useTheme } from "@mui/material/styles";
import { useSelector } from 'react-redux';

const ProductGrid = ({ products, categories = [] }) => {
  const theme = useTheme();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const user = useSelector((state) => state.user);

  const filteredProducts = products
    .filter(product =>
      product.available === true && 
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(
      product =>
        selectedCategory ? product.category === selectedCategory : true
    );

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
        <SearchInput
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
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
