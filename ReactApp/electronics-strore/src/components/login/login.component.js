import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
// Import services
import UserService from "../../services/user.service";
// Import data transfer objects and utils
import TokenDto from "../../types/dto/token.dto";
import useToken from "../../utils/hooks/useToken";

import "./login.component.css";

const _userService = new UserService();

export default function Login() {
  const {setToken} = useToken();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const accessToken = await _userService.login(email, password);
    if (accessToken instanceof TokenDto) {
      setToken(accessToken);
    }
  };

  return (
    <Box className="login-wrapper">
      <Typography varian="h2" component="div">
        Please Log In
      </Typography>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </Box>
  );
}
