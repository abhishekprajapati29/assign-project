import React from "react";
import PropTypes from "prop-types";
import arrow from "../img/arrow.svg";
import styled from "styled-components";
import blob1 from "../img/blob_top.svg";
import blob2 from "../img/blob_bottom.svg";
import { useNavigate } from "react-router-dom";

function AnimatedButton({ name, route }) {
  const navigate = useNavigate();
  return (
    <AnimatedButtonStyled onClick={() => navigate(route)}>
      {name}
      <img src={arrow} alt="" className="arrow" />
      <img src={blob1} alt="" className="blob1" />
      <img src={blob2} alt="" className="blob2" />
    </AnimatedButtonStyled>
  );
}

const AnimatedButtonStyled = styled.button`
  background-color: #16194f;
  padding: 1rem 2rem;
  font-family: inherit;
  font-size: inherit;
  color: white;
  border-radius: 20px;
  outline: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  transition: all 0.4s ease-in-out;
  .arrow {
    padding-left: 0.9rem;
    transition: all 0.4s ease-in-out;
  }

  &:hover {
    transition: all 0.4s ease-in-out;
    color: white;
    .blob1 {
      transition: all 0.4s ease-in-out;
      transform: translateX(-100px);
    }
    .blob2 {
      transition: all 0.4s ease-in-out;
      transform: translateX(140px);
    }

    .arrow {
      padding-left: 1.4rem;
    }
  }

  .blob1,
  .blob2 {
    position: absolute;
    pointer-events: none;
    transition: all 0.4s ease-in-out;
  }
  .blob1 {
    top: 0;
    right: 0;
  }
  .blob2 {
    bottom: 0;
    left: 0;
  }
`;

AnimatedButton.propTypes = {
  name: PropTypes.any,
  route: PropTypes.any,
};

export default AnimatedButton;
