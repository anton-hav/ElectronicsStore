import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

import CategoriesBar from "../categories-bar/categories-bar.component";
import PriceFilterBar from "../price-filter/price-filter.component";

import "./aside-menu.component.css";

export default function AsideMenuSection(props) {
  const { component, title } = props;
  return (
    <Box>
      <Box className="section">
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <Divider variant="middle" />
        {component}
      </Box>
    </Box>
  );
}
