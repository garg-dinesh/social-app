import React, { useEffect } from "react";
import { Button, Alert } from "react-bootstrap";
import { getUsers } from "../services/AppService";
import Form from "react-bootstrap/Form";
import { Formik, ErrorMessage } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { setLocalStorageItem, getLocalStorageItem } from "../utils";
import { toast } from "react-toastify";
import "../styles/containers/login.css";

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    getUsers()
      .then((res) => {
        if (res.status === 200) {
          setLocalStorageItem("users", res.data);
        }
      })
      .catch((error) => console.log("error", error));
  }, []);

  const initialValues = { email: "" };
  const validationSchema = yup.object({
    email: yup.string().required("This is required field"),
  });

  const onSubmit = (value) => {
    const users = getLocalStorageItem("users");

    if (
      users
        .map((user) => user.email.toLowerCase())
        .includes(value.email.toLowerCase())
    ) {
      const user = users.find(
        (element) => element.email.toLowerCase() === value.email.toLowerCase()
      );
      setLocalStorageItem("user", user);
      navigate("/posts");
    } else {
      toast.error("This is not registered email", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="login-container">
      <Alert key={"primary"} variant={"primary"} className="field">
        Please login Here...
      </Alert>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit, handleChange, errors }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3 field" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={handleChange}
                  isInvalid={errors?.email}
                />
                {errors.email && (
                  <span className="error-message">
                    <ErrorMessage name="email" />
                  </span>
                )}
              </Form.Group>

              <Button variant="primary" type="submit">
                Login
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default Login;
