/* eslint-disable eqeqeq */
import React, { Fragment, useState } from "react";
import { Col, Input, Row, message } from "antd";
import axios from "axios";
import { config } from "../../App";
import Login from "../Login/Login";
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showLogin, setShowLogin] = useState(false);

  const validateInput = (data) => {
    if (data.username.trim() === "") {
      message.error("Username is a required field");
      return false;
    }
    if (data.email.trim() === "") {
      message.error("Email is a required field");
      return false;
    }
    if (data.password.length > 6) {
      message.error("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const register = async (data) => {
    if (!validateInput(data)) return;

    try {
      const response = await axios.post(`${config.endpoint}/users/register`, {
        username: data.username,
        email: data.email,
        password: data.password,
      });
      if (response.status === 201) {
        message.success("Registration successful");
        setFormData({ username: "", email: "", password: "" });
        setShowLogin(true);
      } else {
        message.error("Registration failed");
      }
    } catch (err) {
      message.error("An error occurred during registration");
    }
  };

  return (
    <Fragment>
      {!showLogin ? (
        <div className="register-container">
          <div className="header-text">
            <h1>Register</h1>
          </div>
          <Row gutter={[24, 24]}>
            <Col sx={24} md={16}>
              <Input
                placeholder="Username"
                onChange={(e) => {
                  setFormData({ ...formData, username: e.target.value });
                }}
              />
            </Col>
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
            <button onClick={() => register(formData)}>Register</button>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </Fragment>
  );
};

export default Register;
