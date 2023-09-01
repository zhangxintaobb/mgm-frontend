import React from "react";
import { Col, Container } from "reactstrap";
import LoginBox from "./LoginBox";
import "./login-page.scss";

const Login = () => {
  return (
    <>
      <Container fluid id="login-page" className="d-flex p-l h-100 bg-gray-100">
        <Col xs={7} className="login-left">
          <img
            src={"http://123.57.31.206/illustration/mgm_customized.svg"}
            className="login-illustration"
            alt=""
          />
        </Col>
        <Col
          xs={5}
          className="d-flex justify-content-center align-items-center"
        >
          <LoginBox />
        </Col>
      </Container>
    </>
  );
};

export default Login;
