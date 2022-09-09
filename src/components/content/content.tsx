import React from "react";
import { Box } from "@mui/material";
import { Filter } from "./filter/filter";
import { Cards } from "./cards/cards";

export const Content = () => {
  return (
    <Box sx={{
      display: 'grid',
      gridTemplateColumns: "290px auto",
      width: '100%',
      maxWidth: '2000px',
      margin: 'auto',
    }}
    >
      <Filter></Filter>
      <Cards></Cards>
    </Box>
  );
}