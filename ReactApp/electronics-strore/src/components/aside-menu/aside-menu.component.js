import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

import CategoriesBar from "../categories-bar/categories-bar.component";
import PriceFilterBar from "../price-filter/price-filter.component";
import AsideMenuSection from "./aside-menu-section.component";

import "./aside-menu.component.css";

export default function AsideMenu(props) {
  const { category } = props;

  const categoriesSection = <CategoriesBar category={category} />;
  const priceFilterSection = <PriceFilterBar />;

  // return (
  //   <Box>
  //     <Box className="section">
  //       <Typography variant="h6" component="div">
  //         Select category
  //       </Typography>
  //       <Divider variant="middle" />
  //       <CategoriesBar category={category} />
  //     </Box>
  //     <Box className="section">
  //       <PriceFilterBar />
  //     </Box>
  //   </Box>
  // );

  return (
    <Box>
      <AsideMenuSection
        component={categoriesSection}
        title={"Select category"}
      />
      <AsideMenuSection component={priceFilterSection} title={"Price"} />
    </Box>
  );
}
