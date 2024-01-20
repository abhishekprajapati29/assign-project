import React from "react";
import styled from "styled-components";
import { InnerLayout } from "../styles/Layouts";
import ChartStats from "./ChartStats";
import chart from "../img/chart.svg";
import message1 from "../img/message_blue.svg";
import message2 from "../img/message_pink.svg";
import { Bounce, Roll } from "react-reveal";
import RubberBand from "react-reveal/RubberBand";
import MDSnackbar from "components/MDNotificationCard";

function InvitationSection() {
  return (
    <ChartStyled>
      <InnerLayout>
        <div className="chart-con">
          <div className="chart-left">
            <div className="stats">
              <MDSnackbar
                icon="notifications"
                title="Project Joining Request"
                content="Hello, world! This is a notification message"
                dateTime="11 mins ago"
                open={true}
                status={"Accepted"}
              />
              <img src={message1} alt="" className="message1" />
              <img src={message2} alt="" className="message2" />
            </div>
          </div>
          <div className="chart-right">
            <h2 className="secondary-heading">User Invitations</h2>
            <Roll right>
              <p>
                Invite team members and collaborators with ease. Ensure everyone is on board by
                sending personalized invitations to join your projects.
              </p>
            </Roll>
          </div>
        </div>
      </InnerLayout>
    </ChartStyled>
  );
}

const ChartStyled = styled.section`
  .chart-con {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    @media screen and (max-width: 1347px) {
      grid-template-columns: repeat(1, 1fr);
    }
    .chart-left {
      width: 80%;
      @media screen and (max-width: 1347px) {
        width: 100%;
      }
      .stats {
        position: relative;
        display: flex;
        justify-content: center;
        .phone {
          width: 80%;
        }
        width: "3rem" img {
          box-shadow: 0px 25px 50px rgba(22, 25, 79, 0.05);
          border-radius: 62px;
          width: 100%;
        }
        .stats-money {
          display: flex;
          padding-bottom: 1.3rem;
          justify-content: space-between;
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
    }

    .chart-right {
      padding-left: 2rem;
      p {
        padding: 1.3rem 0;
      }
    }
  }
`;

export default InvitationSection;
