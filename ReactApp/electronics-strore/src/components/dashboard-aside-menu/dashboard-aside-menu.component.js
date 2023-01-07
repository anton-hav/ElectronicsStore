import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
// Import custom components
import AsideMenuSection from "../aside-menu/aside-menu-section.component";
import DashboardAsideMenuItem from "./dashboard-aside-menu-item.component";

export default function DashboardAsideMenu(props) {
  const { menuItems, selected, onClick } = props;

  const menu = (
    <Box>
      <List component="nav" aria-label="main dashboard menu">
        {menuItems.map((item) => (
          <DashboardAsideMenuItem
            selected={selected === item.title}
            key={item.title}
            title={item.title}
            iconComponent={item.iconComponent}
            onClick={onClick}
          />
        ))}
      </List>
    </Box>
  );

  return (
    <Box>
      <AsideMenuSection component={menu} title={"Dashboard menu"} />
    </Box>
  );
}
