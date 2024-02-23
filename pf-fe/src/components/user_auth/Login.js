import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Dashboard from "../../pages/dashboard";

const Login = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const checkToken = async () => {
      try {
        await axios.post(
          "http://localhost:7000/api/users/check_login",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log("user logged in ");
        navigate("/");
      } catch (error) {
        console.error("User is not logged in:", error.response);
        // If token is not valid or user not logged in, remove the token
        setToken("");
        localStorage.removeItem("token");
      }
    };

    // Check token when the component mounts
    if (token) {
      checkToken();
    }
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:7000/api/users/login",
        formData
      );
      const newToken = response.data.token;
      localStorage.setItem("userId", response.data.id);
      setToken(newToken);
      console.log(newToken);
      localStorage.setItem("token", newToken);
      console.log("user logged in ");
    } catch (err) {
      console.log("Error at Login:", err);
    }
  };

  return (
    <>
      {token ? (
        <Dashboard />
      ) : (
        <Container>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button type="submit" style={{ marginTop: "10px" }}>
              Submit
            </Button>
          </Form>
        </Container>
      )}
    </>
  );
};

export default Login;
