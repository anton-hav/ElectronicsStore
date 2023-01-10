import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Import services
import UserService from "../services/user.service";
// Import custom types and utils
import useToken from "../utils/hooks/useToken";
import UnauthorizedError from "../types/errors/unauthorized.error";

const _userService = new UserService();

export default function AuthGuard(props) {
  const { component, role } = props;
  const { token, setToken } = useToken();

  const navigate = useNavigate();

  useEffect(() => {
    const validateToken = async () => {
      let isTokenValid;
      try {
        isTokenValid = await _userService.validateToken(token.accessToken);
      } catch (error) {
        if (error instanceof UnauthorizedError) {
          let newToken = await _userService.getTokenByRefreshToken(
            token.refreshToken
          );
          if (newToken) {
            isTokenValid = await _userService.validateToken(
              newToken.accessToken
            );
            setToken(newToken);
          }
        }
      }

      if (isTokenValid) {
        if (!role.includes(token.role)) {
          navigate("/login");
        }
      } else {
        navigate("/login");
      }
    };

    if (token.accessToken) {
      validateToken(token);
    } else {
      navigate("/login");
    }
  }, [token]);

  return component;
}
