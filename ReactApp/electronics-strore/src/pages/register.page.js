import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// Import custom components
import RegisterComponent from "../components/register/register.component";
// Import services
import UserService from "../services/user.service";
// Import custom types and utils
import TokenDto from "../types/dto/token.dto";
import ConflictError from "../types/errors/conflict.error";
import useToken from "../utils/hooks/useToken";

const _userService = new UserService();

export default function Register() {
  const { setToken } = useToken();
  const [ existingEmails, setExistingEmails ] = useState([]);
  //   const [email, setEmail] = useState();
  //   const [password, setPassword] = useState();
  //   const [passwordConfirmation, setPasswordConfirmation] = useState();

  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const accessToken = await _userService.register(
        values.email,
        values.password,
        values.passwordConfirmation
      );

      if (accessToken instanceof TokenDto) {
        setToken(accessToken);
        navigate("/");
      }
    } catch (error) {
        if (error instanceof ConflictError){
            let existing = existingEmails.slice();
            existing.push(values.email);
            setExistingEmails(existing);
        }
    }
  };

  return (
    <div>
      <RegisterComponent
        // setEmail={setEmail}
        // setPassword={setPassword}
        existingEmails={existingEmails}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
