import React from "react";
import { Box, Typography, TextField, Button, Paper } from "@mui/material";

import "./login.component.css";

export default function Login(props) {
  const { setEmail, setPassword, handleSubmit } = props;

  return (
    <Box className="login-wrapper">
      <Paper>
        <Box className="login-paper">
          <Typography variant="h5">Please Log In</Typography>
          <form onSubmit={handleSubmit}>
            <Box className="login-form">
              <Box className="login-form__email">
                <TextField
                  sx={{ width: 450, maxWidth: "100%" }}
                  required
                  id="standard-required"
                  label="Email"
                  defaultValue=""
                  variant="standard"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Box>

              <Box className="login-form__password">
                <TextField
                  sx={{ width: 450, maxWidth: "100%" }}
                  required
                  id="password-input"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  variant="standard"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Box>
              <Box className="login-form__button">
                <Button type="submit">Login</Button>
              </Box>
            </Box>
          </form>
        </Box>
      </Paper>
    </Box>
  );
}
