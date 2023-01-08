import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

export default function OrdersPage() {
  return (
    <Box>
      <Typography
        variant="h4"
        marginLeft={2}
        gutterBottom
        sx={{ textAlign: "left" }}
      >
        Order history.
      </Typography>
    </Box>
  );
}
