
import React from "react";
import { TextField, Box } from "@mui/material";

const SearchInput = ({ searchQuery, setSearchQuery }) => {
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Box mb={2}>
      <TextField
        label="Buscar"
        value={searchQuery}
        onChange={handleSearchChange}
        fullWidth
        variant="outlined"
      />
    </Box>
  );
};

export default SearchInput;
