import React from "react";
import styled from "styled-components";
import Secondarybutton from "./SecondaryButton";
import ring1 from "../img/ring_orange.svg";
import message1 from "../img/message_pink.svg";
import message2 from "../img/message_blue.svg";
import { Bounce, Fade } from "react-reveal";
import AnimatedButton from "./AnimatedButton";
import MainDashboard from "layouts/MainDashboard";
import Projects from "layouts/dashboard/components/Projects";

function HeaderContent() {
  return (
    <HeaderContentStyled>
      <Fade left cascade>
        <div className="left-content">
          <div className="left-text-container">
            <h1>Smart Project Management for Success</h1>
            <p className="white">
              Empower Your Projects, Unleash Your Potential: Seamlessly
              Collaborate, Streamline Tasks, and Elevate Success with Our
              Dynamic Project Management Platform
            </p>
            <Bounce right>
              <AnimatedButton name={"Register"} route={"/register"} />
            </Bounce>
          </div>
        </div>
      </Fade>
      <Fade right>
        <div className="right-content">
          <Projects />
          <img src={ring1} alt="" className="ring1" />
          <img src={message1} alt="" className="message1" />
          <img src={message2} alt="" className="message2" />
        </div>
      </Fade>
    </HeaderContentStyled>
  );
}

const HeaderContentStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding-top: 3rem;
  @media screen and (max-width: 700px) {
    grid-template-columns: repeat(1, 1fr);
  }
  .left-content {
    display: flex;
    align-items: center;
    padding-right: 3rem;
    .white {
      color: white;
    }
    h1 {
      font-size: 4rem;
      font-weight: 600;
      @media screen and (max-width: 700px) {
        font-size: 3rem;
      }
    }

    .white {
      padding: 1.4rem 0;
      line-height: 1.8rem;
    }
  }

  .right-content {
    position: relative;
    display: flex;
    justify-content: center;
    .phone {
      width: 80%;
    }
    .ring1 {
      position: absolute;
      bottom: 10%;
      right: 0;
      left: auto;
      animation: move2 20s infinite;
      transition: all 0.4s ease-in-out;
    }
    .message1 {
      position: absolute;
      top: 0;
      right: 0;
      left: auto;
      animation: move 5s infinite;
      transition: all 0.4s ease-in-out;
    }
    .message2 {
      position: absolute;
      bottom: 15%;
      left: 0;
      transition: all 0.4s ease-in-out;
      animation: move 8s infinite;
      animation-delay: 0.5s;
      transition: all 0.4s ease-in-out;
    }
  }

  //Header Animations
  .message1 {
    @keyframes move {
      0% {
        transform: translateY(0) rotate(0) scale(1) translateX(0);
      }
      50% {
        transform: translateY(-10px) rotate(20deg) scale(1.1) translateX(10px);
      }
      100% {
        transform: translateY(0) rotate(0deg) scale(1) translateX(0);
      }
    }
    @keyframes move2 {
      0% {
        transform: translateY(0) rotate(0) scale(1) translateX(0);
      }
      50% {
        transform: translateY(-10px) rotate(60deg) scale(1.1) translateX(10px);
      }
      100% {
        transform: translateY(0) rotate(0deg) scale(1) translateX(0);
      }
    }
  }
`;

export default HeaderContent;
