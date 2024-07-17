// src/components/Sidebar.js
import React from "react";
import { List, ListItem, ListItemText } from "@mui/material";

const Sidebar = ({ categories, selectedCategory, onCategorySelect }) => {
  return (
    <List component="nav">
      {categories.map((category) => (
        <ListItem
          button
          key={category}
          selected={category === selectedCategory}
          onClick={() => onCategorySelect(category)}
        >
          <ListItemText primary={category} />
        </ListItem>
      ))}
    </List>
  );
};

export default Sidebar;
