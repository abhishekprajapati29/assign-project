import React from "react";
import styled from "styled-components";
import { InnerLayout } from "../styles/Layouts";
import card from "../img/creditcard.svg";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import homeDecor4 from "assets/images/home-decor-4.jpeg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

function CardSection() {
  return (
    <CardSectionStyled>
      <InnerLayout>
        <div className="card-container">
          <div className="card-left">
            <h2 className="secondary-heading">Create and Manage Projects</h2>
            <p>
              Effortlessly initiate new projects, customizing their privacy settings to be either
              private or public. Tailor each project to suit your business needs.
            </p>
          </div>
          <div className="card-right">
            <DefaultProjectCard
              image={homeDecor4}
              label="project #4"
              title="modern"
              description="As Uber works through a huge amount of internal management turmoil."
              action={{
                type: "internal",
                route: "#",
                color: "info",
                label: "view project",
              }}
              authors={[
                { image: team4, name: "Peterson" },
                { image: team3, name: "Nick Daniel" },
                { image: team2, name: "Ryan Milly" },
                { image: team1, name: "Elena Morison" },
              ]}
            />
          </div>
        </div>
      </InnerLayout>
    </CardSectionStyled>
  );
}

const CardSectionStyled = styled.section`
  .card-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    @media screen and (max-width: 845px) {
      grid-template-columns: repeat(1, 1fr);
    }
    .card-right {
      display: flex;
      justify-content: flex-end;
      img {
        filter: drop-shadow(0px 50px 100px rgba(22, 25, 79, 0.15));
      }
    }

    .card-left {
      p {
        padding: 1rem 0;
      }
    }
  }
`;

export default CardSection;
