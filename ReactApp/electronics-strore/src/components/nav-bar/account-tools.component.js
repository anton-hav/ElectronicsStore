import * as React from "react";
import { Box } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

import "./account-tools.component.css";

const settings = ["Login", "Account", "Dashboard", "Logout"];

export default function AccountTools() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 1 }}>
          {/* <Avatar alt="User Charp" src="/static/images/avatar/2.jpg" /> */}
          <AccountCircleIcon fontSize="large" sx={{ color: "white" }} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) => (
          <Link className="menu-item__link" key={setting} to={`${setting}/`}>
            <MenuItem  onClick={handleCloseUserMenu}>
              <Typography textAlign="center">{setting}</Typography>
            </MenuItem>
          </Link>
        ))}
      </Menu>
    </Box>
  );
}
