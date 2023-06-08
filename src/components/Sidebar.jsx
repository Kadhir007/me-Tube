import React from "react";
import { Stack } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import { categories } from "../utils/constants";
import { Typography } from "@mui/material";
const Sidebar = ({selectedCategory,setSelectedCategory}) => {

  return (
    <Stack
     direction = {useMediaQuery('(max-width: 899px)') ? 'row' : 'column'}
      sx={{
        overflowY: "auto",
        height: { sx: "auto", md: "95%" },
        flexDirection: { md: "colummn" },
      }}
    >
      {categories.map((category) => (
        <button
        className="category-btn"
        onClick={() => setSelectedCategory(category.name)}
        style={{
          background: category.name === selectedCategory && "#FC1503",
          color: "white",
          whiteSpace: "nowrap" // Update the property name to whiteSpace
        }}
        key={category.name}
      >
          <span
            style={{
              color: category.name === selectedCategory ? "white" : "red",
              marginRight: "15px",
            }}
          >
            {category.icon}
          </span>
          <span style={{opacity:category.name===selectedCategory?'1':'0.8'}}>{category.name}</span>
        </button>
      ))}
     
    </Stack>
    
    
  );
};

export default Sidebar;
