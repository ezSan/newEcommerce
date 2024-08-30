import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";

const ClientTable = ({ clients }) => {
  return (
    <Paper style={{ marginTop: 16 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Cliente</TableCell>

            <TableCell>Ciudad</TableCell>
            <TableCell>Teléfono</TableCell>
            <TableCell>Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.map(client =>
            <TableRow key={client.id}>
              <TableCell>
                {client.name} {client.lastName}
              </TableCell>

              <TableCell>
                {client.city}
              </TableCell>
              <TableCell>
                {client.phoneNumber}
              </TableCell>
              <TableCell>
                {client.email}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default ClientTable;
