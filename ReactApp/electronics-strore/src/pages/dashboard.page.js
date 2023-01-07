import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
// Import custom components
import DashboardAsideMenu from "../components/dashboard-aside-menu/dashboard-aside-menu.component";
import AdminPanelMainItem from "../components/admin-panel-main/admin-panel-main.component";
import AdminPanelOrdersItem from "../components/admin-panel-orders/admin-panel-orders.component";
// Import custom types and utils
import { formatter } from "../utils/formatter";

const menuItems = [
  { title: "Main", iconComponent: <DashboardIcon fontSize="small" /> },
  { title: "Orders", iconComponent: <AssignmentIcon fontSize="small" /> },
];

export default function DashboardPage() {
  const [selectedMenu, setSelectedMenu] = useState(menuItems[0].title);
  const [isSnackActive, setIsSnackActive] = useState(false);

  const totalOrderNumber = 555;
  const mostExpensiveOrderValue = 1234;
  const todayOrders = 3;

  /**
   * Handles click event on selected menu item.
   * @param {*} selected - title of the selected menu item.
   */
  const handleAsideMenuClick = (selected) => {
    setSelectedMenu(selected);
  };

  /**
   * Handles click event on total order number widget.
   * It demonstrates all props of flash-info-widgets component.
   */
  const handleTotalOrderNumberClick = () => {
    setIsSnackActive(true);
  };

  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsSnackActive(false);
  };

  /**
   * Dynamically rendered dashboard panel.
   * @returns React Component instance.
   */
  const PanelItem = () => {
    if (selectedMenu === menuItems[0].title) {
      return (
        <AdminPanelMainItem
          totalOrderNumber={totalOrderNumber}
          onTotalOrderNumberClick={handleTotalOrderNumberClick}
          mostExpensiveOrderValue={`${formatter.format(
            mostExpensiveOrderValue
          )}`}
          todayOrders={todayOrders}
        />
      );
    } else {
      return <AdminPanelOrdersItem />;
    }
  };

  return (
    <Box>
      <Grid container>
        <Grid item xs={3}>
          <DashboardAsideMenu
            menuItems={menuItems}
            selected={selectedMenu}
            onClick={handleAsideMenuClick}
          />
        </Grid>
        <Grid item xs={9}>
          <PanelItem />
        </Grid>
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={isSnackActive}
        onClose={handleSnackClose}
      >
        <MuiAlert
          onClose={handleSnackClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          <div>Successfully success.</div>
          <div>
            This message is a stub. It's just a demonstration of what the widget
            can do.
          </div>
        </MuiAlert>
      </Snackbar>
    </Box>
  );
}
