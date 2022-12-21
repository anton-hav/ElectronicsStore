import React from "react";

import { Box } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
// Import services
import UserService from "../../services/user.service";
// Import custom types and utils
import useToken from "../../utils/hooks/useToken";
import TokenDto from "../../types/dto/token.dto";

import "./account-tools.component.css";

const _userService = new UserService();

const authorizedSettings = ["Logout"]; // Account.. Dashboard
const nonAuthorizedSettings = ["Login", "Register"];

export default function AccountTools() {
  const { token, setToken } = useToken();
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const revokeToken = () => {
    console.log(token);
    _userService.revokeRefreshToken(token.refreshToken);
  };

  const handleCloseUserMenu = (event) => {
    setAnchorElUser(null);
    let menu = event.target.textContent;
    if (menu === "Logout") {
      //await logout();
      revokeToken();
      const newToken = new TokenDto();
      setToken(newToken);
    } else if (menu !== "") {
      navigate(`${menu}/`);
    }
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
        {(token.accessToken !== null
          ? authorizedSettings
          : nonAuthorizedSettings
        ).map((setting) => (
          <MenuItem key={setting} onClick={handleCloseUserMenu}>
            <Typography textAlign="center">{setting}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
