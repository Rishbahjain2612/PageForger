import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [editedData, setEditedData] = useState({
    name: "",
    email: "",
  });
  const [password, setPassword] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:7000/api/users/getdetails",
        {
          userId: localStorage.getItem("userId"),
        }
      );
      setEditedData(response.data.user);
    } catch (err) {
      console.error("Error fetching user details:", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setPassword("");
    fetchData();
  };
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  const handleSaveClick = async () => {
    try {
      // const userPassword = prompt("Please enter your password:");
      if (password === null || "") {
        alert("please enter password");
        return;
      }

      await axios.post("http://localhost:7000/api/users/update", {
        userId: localStorage.getItem("userId"),
        updatedData: editedData,
        password: password,
      });

      setIsEditing(false);
      setPassword("");
      fetchData();
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>User Profile</Card.Title>

        {isEditing ? (
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="name"
                value={editedData.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={editedData.email}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="success" onClick={handleSaveClick}>
              Save
            </Button>{" "}
            <Button variant="secondary" onClick={handleCancelClick}>
              Cancel
            </Button>
          </Form>
        ) : (
          <>
            <Card.Text>
              <strong>Name:</strong> {editedData.name || ""}
            </Card.Text>
            <Card.Text>
              <strong>Email:</strong> {editedData.email || ""}
            </Card.Text>
            <Button variant="primary" onClick={handleEditClick}>
              Edit
            </Button>
            <Button variant="danger" onClick={handleLogout} className="ml-2">
              Logout
            </Button>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default Profile;
