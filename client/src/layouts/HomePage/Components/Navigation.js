import React from "react";
import styled from "styled-components";
import PrimaryButton from "./PrimaryButton";
import logo from "assets/images/logo-ct.png";
import { Bounce, Fade } from "react-reveal";
import { useNavigate } from "react-router-dom";
import AnimatedButton from "./AnimatedButton";

function Navigation() {
  const navigate = useNavigate();
  return (
    <Fade top>
      <NavigationStyled>
        <div className="logo" style={{ display: "flex" }}>
          <img src={logo} width="40px" height="40px" alt="" />
          <h1 style={{ marginLeft: "1rem", color: "white" }}>Assign Project</h1>
        </div>
        <Bounce right>
          <AnimatedButton name={"Log in"} route={"/login"} />
        </Bounce>
      </NavigationStyled>
    </Fade>
  );
}

const NavigationStyled = styled.nav`
  display: flex;
  justify-content: space-between;
  min-height: 10vh;
  align-items: center;

  ul {
    display: flex;
    justify-content: space-between;
    width: 40%;
  }
`;
export default Navigation;
