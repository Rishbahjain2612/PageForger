import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
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
          "https://pageforger.onrender.com/api/users/check_login",
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
        "https://pageforger.onrender.com/api/users/login",
        formData
      );
      const newToken = response.data.token;
      localStorage.setItem("userId", response.data.id);
      const saved_data = await axios.get(
        "https://pageforger.onrender.com/api/users/get",
        { userId: localStorage.getItem("userId") }
      );
      // here to render data into localStorage after getting data with userId is also included into saved_data

      console.log(saved_data);
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
        <Container className="mx-auto mt-8 p-4 max-w-md">
          <Form
            onSubmit={submitHandler}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                placeholder="Password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </Form.Group>

            <Button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 w-full"
            >
              Submit
            </Button>

            <p className="text-center mt-4">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-500">
                Register
              </Link>
            </p>
          </Form>
        </Container>
      )}
    </>
  );
};

export default Login;
