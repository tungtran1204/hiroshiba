import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate

const RegisterComponent = () => {
  const [username, setUsername] = useState(""); // Đổi userName thành username
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(""); // To display error messages

  const navigate = useNavigate(); // For navigation after successful registration

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra nếu mật khẩu và mật khẩu xác nhận không trùng khớp
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
        {
          username,
          email,
          password,
          confirmPassword,
        }
      );

      // Nếu đăng ký thành công, điều hướng người dùng tới trang đăng nhập
      navigate("/login");
    } catch (err) {
      console.log("Error:", err); // In log chi tiết lỗi
      // Kiểm tra lỗi từ API và hiển thị thông báo cụ thể
      if (err.response) {
        // Lỗi từ server, trả về mã lỗi HTTP và dữ liệu phản hồi
        console.log("Response error:", err.response);
        setError(
          err.response.data.message || "Registration failed. Please try again."
        );
      } else if (err.request) {
        // Lỗi khi gửi yêu cầu, không nhận được phản hồi từ server
        console.log("Request error:", err.request);
        setError("No response from the server. Please try again later.");
      } else {
        // Lỗi khác (cấu hình hoặc lỗi khác trong quá trình thực hiện)
        console.log("General error:", err.message);
        setError("An error occurred. Please try again.");
      }
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
            <h3 className="text-center mb-4">Register</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>User Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
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
              <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>
              {error && <p className="text-danger">{error}</p>}{" "}
              {/* Hiển thị lỗi nếu có */}
              <Button variant="success" type="submit" className="w-100">
                Register
              </Button>
            </Form>
            <div className="text-center mt-3">
              <Link to="/login" className="text-decoration-none">
                Already have an account? Login here
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterComponent;
