import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Import custom components
import LoginComponent from "../components/login/login.component";
// Import services
import UserService from "../services/user.service";
// Import custom types and utils
import TokenDto from "../types/dto/token.dto";
import useToken from "../utils/hooks/useToken";

const _userService = new UserService();

export default function Login() {
  const { token, setToken } = useToken();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const accessToken = await _userService.login(email, password);
    if (accessToken instanceof TokenDto) {
      setToken(accessToken);
      navigate(-1);
    }
  };

  return (
    <div>
      <LoginComponent
        setEmail={setEmail}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
