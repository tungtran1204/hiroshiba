import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import LoginBox from "../organisms/LoginBox";

const LoginTemplate = ({
  email,
  password,
  setEmail,
  setPassword,
  error,
  onSubmit,
}) => (
  <Container
    className="d-flex justify-content-center align-items-center"
    style={{ minHeight: "100vh" }}
  >
    <Row>
      <Col>
        <LoginBox
          email={email}
          password={password}
          setEmail={setEmail}
          setPassword={setPassword}
          error={error}
          onSubmit={onSubmit}
        />
      </Col>
    </Row>
  </Container>
);

export default LoginTemplate;
