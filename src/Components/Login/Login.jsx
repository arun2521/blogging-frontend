import React, { Fragment, useState } from "react";
import { Col, Input, Row, message } from "antd";
import axios from "axios";
import { config } from "../../App";
import Dashboard from "../Dashboard/Dashboard";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showDashboard, setShowDashboard] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(`${config.endpoint}/users/login`, {
      email: formData.email,
      password: formData.password,
    });
    if (res.status === 200) {
      message.success("Logged in successfully");
      localStorage.setItem("token", res.data.token);
      setShowDashboard(true);
    } else if (res.status === 404) {
      message.error("Error in logging in, please try later");
    }
  };

  return (
    <Fragment>
      {!showDashboard ? (
        <div className="login-container">
          <div className="header-text">
            <h1>Login</h1>
          </div>
          <Row gutter={[24, 24]}>
            <Col sx={24} md={16}>
              <Input
                placeholder="Email"
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                }}
              />
            </Col>
            <Col sx={24} md={16}>
              <Input.Password
                placeholder="Password"
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                }}
              />
            </Col>
          </Row>
          <div className="login-btn">
            <button type="submit" onClick={handleSubmit}>
              Login
            </button>
          </div>
        </div>
      ) : (
        <Dashboard />
      )}
    </Fragment>
  );
};

export default Login;
