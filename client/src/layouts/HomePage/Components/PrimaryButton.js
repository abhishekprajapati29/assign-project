import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

function PrimaryButton({ name, onClick }) {
  return <ButtonStyled onClick={onClick}>{name}</ButtonStyled>;
}

const ButtonStyled = styled.button`
  background-color: #f44e77;
  padding: 0.7rem 2rem;
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  border-radius: 20px;
  outline: none;
  border: none;
  cursor: pointer;
`;

PrimaryButton.propTypes = {
  name: PropTypes.any,
  onClick: PropTypes.any,
};

export default PrimaryButton;
