import styled from "styled-components";
import React from "react";
import ReactSlickDemo from "@/components/slider/slider";
import { RectBut } from "@/components/buttons/rectangle-button";
import { Link } from "react-router-dom";

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
  font-family: Balsamiq Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 17px;
  line-height: 21px;
  /* identical to box height */
  color: #7c7c7c;
  link {
    color: #91c788;
    text-decoration: none;
  }
`;

const StyledLink = styled.link`
  text-decoration: none;
`;

const GetStartedPage = () => {
  return (
    <StartPage>

      <StartPageH1>Kcal</StartPageH1>
      <ReactSlickDemo />
      <Link to="/registration" className="router-link">
        <RectBut size="md" title="Get Started">
          Начать
        </RectBut>
      </Link>
      <LoginLink>
        Уже есть аккаунт? <Link to="/login" className="router-link">Войдите</Link>
      </LoginLink>
    </StartPage >
  );
};

export default GetStartedPage;
