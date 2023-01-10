import React from "react";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";

export default function DashboardAsideMenuItem(props) {
  const { selected, iconComponent, title, onClick } = props;

  return (
    <ListItemButton selected={selected} onClick={() => onClick(title)}>
      <ListItemIcon>{iconComponent}</ListItemIcon>
      <ListItemText primary={title} />
    </ListItemButton>
  );
}
