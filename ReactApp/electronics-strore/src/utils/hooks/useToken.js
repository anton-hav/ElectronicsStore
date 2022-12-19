import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToken as setTokenToStore } from "../../storage/slices/token.slice";

/**
 * Custom React Hook for storing access token.
 * The hook encapsulates the logic of interaction with the Redux store.
 * @returns an object that contains the token and setToken
 */
export default function useToken() {
  const [token, setToken] = useState(useSelector((state) => state.token.token));

  const dispatch = useDispatch();
  const saveToken = (accessToken) => {
    dispatch(setTokenToStore(accessToken));
    setToken(accessToken);
  };

  return {
    setToken: saveToken,
    token
  };
}