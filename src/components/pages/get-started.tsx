import styled from "styled-components";
import React from "react";
import ReactSlickDemo from "../slider/slider";
import RectangleButton from "../buttons/rectangle-button";

const StartPage = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  button {
      margin-top: 40px;
  }
`;

const StartPageH1 = styled.h1`
  color: #91c788;
  font-size: 22px;
  line-height: 24px;
  font-family: "Nunito";
  margin-bottom: 42px;
`;

const LoginLink = styled.div`
  font-family: Signika;
  font-style: normal;
  font-weight: normal;
  font-size: 17px;
  line-height: 21px;
  /* identical to box height */
  color: #7c7c7c;
  span {
    color: #91c788;
  }
`;

const GetStartedPage = () => {
    return (
        <StartPage>
            <StartPageH1>Kcal</StartPageH1>
            <ReactSlickDemo />
            <RectangleButton size="md" title="Get Started"></RectangleButton>
            <LoginLink>
                Already Have An Acount? <span>Log In</span>
            </LoginLink>
        </StartPage>
    );
};

export default GetStartedPage;