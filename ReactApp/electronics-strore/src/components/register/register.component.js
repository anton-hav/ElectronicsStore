import React from "react";
import { Box, Typography, TextField, Button, Paper } from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";

import "./register.component.css";

export default function Register(props) {
  const { existingEmails, handleSubmit } = props;

  const validationSchema = yup.object({
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required")
      .test("existing", "Email is already exist.", function (value) {
        return !existingEmails.includes(value);
      }),
    password: yup
      .string("Enter your password")
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
    passwordConfirmation: yup
      .string("Enter your password")
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required")
      .test("passwords-match", "Password must match", function (value) {
        return this.parent.password === value;
      }),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  return (
    <Box className="register-wrapper">
      <Paper>
        <Box className="register-paper">
          <Typography variant="h5">Please Sign Up</Typography>

          <form onSubmit={formik.handleSubmit}>
            <Box className="register-form">
              <Box className="register-form__field">
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  variant="standard"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Box>
              <Box className="register-form__field">
                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  variant="standard"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Box>
              <Box className="register-form__field">
                <TextField
                  fullWidth
                  id="password-confirmation"
                  name="passwordConfirmation"
                  label="Password confirmation"
                  type="password"
                  variant="standard"
                  value={formik.values.passwordConfirmation}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.passwordConfirmation &&
                    Boolean(formik.errors.passwordConfirmation)
                  }
                  helperText={
                    formik.touched.passwordConfirmation &&
                    formik.errors.passwordConfirmation
                  }
                />
              </Box>
              <Box className="register-form__button">
                <Button type="submit">Submit</Button>
              </Box>
            </Box>
          </form>
        </Box>
      </Paper>
    </Box>
  );
}
