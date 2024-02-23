import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Form, Button } from "react-bootstrap";

const Profile = () => {
  const [editedData, setEditedData] = useState({
    name: "",
    email: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:7000/api/users/getdetails",
          {
            userId: localStorage.getItem("userId"),
          }
        );
        setEditedData(response.data.user); // Assuming the response contains user data
      } catch (err) {
        console.error("Error fetching user details:", err);
      }
    };

    fetchData();
  }, []);
  const handleInputChange = () => {
    console.log("handleinputchange");
  };
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    // setEditedData({ ...userData });
  };

  const handleSaveClick = () => {
    // Perform validation if needed before updating
    // onUpdate(editedData);
    setIsEditing(false);
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
            <Button variant="success" onClick={handleSaveClick}>
              Save
            </Button>{" "}
            <Button variant="secondary" onClick={handleCancelClick}>
              Cancel
            </Button>
          </Form>
        ) : (
          <>
            {editedData && (
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
              </>
            )}
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default Profile;
