import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import arrow from "../img/arrow.svg";
import { useNavigate } from "react-router-dom";

function Secondarybutton({ name }) {
  const navigate = useNavigate();
  return (
    <SecondaryButtonStyled onClick={() => navigate("/register")}>
      {name}
      <img src={arrow} alt="" />
    </SecondaryButtonStyled>
  );
}

const SecondaryButtonStyled = styled.button`
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
  img {
    padding-left: 0.9rem;
  }
`;

Secondarybutton.propTypes = {
  name: PropTypes.any,
};

export default Secondarybutton;
