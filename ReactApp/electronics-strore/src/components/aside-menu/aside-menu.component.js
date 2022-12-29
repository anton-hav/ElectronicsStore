import Box from "@mui/material/Box";

import CategoriesBar from "../categories-bar/categories-bar.component";

export default function AsideMenu(props) {
  const {category} = props;
  return (
    <Box>
      <CategoriesBar category = { category }/>
    </Box>
  );
}
