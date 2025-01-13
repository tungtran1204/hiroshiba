import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; // Sử dụng useNavigate thay vì useHistory

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // To display error messages

  const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng sau khi login thành công

  const handleSubmit = async (e) => {
    e.preventDefault();

    // In ra giá trị email và password trong console
    console.log("Email:", email);
    console.log("Password:", password);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          email: email,
          password: password,
        }
      );

      // Lưu token vào localStorage
      localStorage.setItem("token", response.data.token);

      // Chuyển hướng đến trang profile
      navigate("/profile");
    } catch (err) {
      // In ra lỗi để kiểm tra
      console.error("Error during login:", err.response || err.message);

      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Row>
        <Col>
          <div
            className="p-4 shadow rounded"
            style={{
              backgroundColor: "#f8f9fa",
              width: "400px",
              margin: "auto",
            }}
          >
            <h3 className="text-center mb-4">Login</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              {error && <p className="text-danger">{error}</p>}

              <Button variant="success" type="submit" className="w-100">
                Login
              </Button>
            </Form>
            <div className="text-center mt-3">
              <Link to="/register" className="text-decoration-none">
                Click here to Register
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginComponent;
