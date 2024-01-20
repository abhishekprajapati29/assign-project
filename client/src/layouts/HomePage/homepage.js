import Box from "@mui/material/Box";
import CardSection from "./Components/CardSection";
import Header from "./Components/Header";
import { OuterLayout } from "./styles/Layouts";
import styled from "styled-components";
import ChartSection from "./Components/ChartSection";
import MessagingSection from "./Components/MessagingSection";
import InvitationSection from "./Components/InvitationSection";
import { Fade } from "react-reveal";

const HomePage = () => {
  return (
    <Box component="div">
      <Header />
      <OuterLayout>
        <MainStyled>
          <Fade left>
            <CardSection />
          </Fade>
          <Fade right>
            <ChartSection />
          </Fade>
          <Fade left>
            <MessagingSection />
          </Fade>
          <Fade right>
            <InvitationSection />
          </Fade>
        </MainStyled>
      </OuterLayout>
    </Box>
  );
};

const MainStyled = styled.main``;

export default HomePage;
