import React, { Fragment, useState } from "react";
import { Button, Col, Row } from "antd";
import blogImg from "../../Assets/image.png";
import Login from "../Login/Login";
import Register from "../Register/Register";
import "./NavBar.css";

const NavBar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
    setShowRegister(false);
  };

  const handleRegisterClick = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  return (
    <Fragment>
      <div className="nav_header">
        <div className="text-header-div">
          <h1>
            <span className="gradient-text">Blog </span>
          </h1>
        </div>
        <div className="inner-div">
          <div>
            <Button type="primary" onClick={handleLoginClick}>
              Login
            </Button>
          </div>
          <div>
            <Button type="primary" onClick={handleRegisterClick}>
              Register
            </Button>
          </div>
        </div>
      </div>
      <Row>
        <Col sx={24} md={16}>
          <div className="content-div">
            <div>
              <div className="inner-content-text">
                <h1>
                  <span className="gradient-text">Create a </span>
                  Unique
                  <span className="gradient-text"> and Beautiful </span>
                  Blog
                </h1>
              </div>
              <div className="para-text">
                <p>
                  There's other place that combines such an excellent level of
                  writing with a trules engaged and active community. Blog is
                  trully where ideas are born, shared and spread.
                </p>
              </div>
              <button onClick={handleLoginClick}>Get Started</button>
            </div>
            <div style={{ width: "82%" }}>
              <img
                style={{
                  width: "100%",
                  marginTop: "145px",
                  borderRadius: "25px",
                }}
                src={blogImg}
                alt="blog"
              />
            </div>
          </div>
        </Col>
        <Col sx={24} md={8}>
          {showLogin && <Login />}
          {showRegister && <Register />}
        </Col>
      </Row>
    </Fragment>
  );
};

export default NavBar;
