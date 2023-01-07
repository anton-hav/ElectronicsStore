import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Import services
import UserService from "../services/user.service";
// Import custom types and utils
import useToken from "../utils/hooks/useToken";

const _userService = new UserService();

export default function AuthGuard(props) {
  const { component, role } = props;
  const { token, setToken } = useToken();

  const navigate = useNavigate();

  useEffect(() => {
    const validateToken = async (accessToken) => {
      let isTokenValid = await _userService.validateToken(accessToken);
      if (isTokenValid) {
        if (token.role !== role) {
          navigate("/login");
        }
      } else {
        navigate("/login");
      }
    };

    if (token.accessToken) {
      validateToken(token.accessToken);
    } else {
      navigate("/login");
    }

    console.log("Auth guard");
  }, [token]);

  return component;
}
