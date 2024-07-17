import React from "react";
import { List, ListItem, ListItemText, Button } from "@mui/material";

const ItemsReadyToPushIntoDB = ({ products, onConfirm }) => {
  return (
    <div>
      <List>
        {products.map((product, index) =>
          <ListItem key={index}>
            <ListItemText
              primary={`${product.name} - ${product.brand}`}
              secondary={`Familia: ${product.family}, Precio: ${product.price}, Empaque: ${product.packaging}`}
            />
          </ListItem>
        )}
      </List>
      <Button variant="contained" color="primary" onClick={onConfirm}>
        Confirmar Carga de Productos
      </Button>
    </div>
  );
};

export default ItemsReadyToPushIntoDB;
