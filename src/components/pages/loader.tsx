import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Loader = () => {
  const WelcomePage = styled.div`
    position: relative;
    height: 100vh;
    width: 100%;
    background: #91c788;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Signika";
  `;

  const WelcomeH1 = styled.h1`
    color: white;
    font-size: 50px;
  `;

  const Logo = styled.h2`
    position: absolute;
    bottom: 50px;
    width: 100%;
    text-align: center;
    /* left:  */
    font-weight: 800;
    font-size: 25px;
    line-height: 20px;
    font-family: "Nunito";
    color: #cfe7cb;
  `;

  return (
    <Link to="/start" className="router-link">
      <WelcomePage>
        <WelcomeH1>ChelFoood</WelcomeH1>
        <Logo>
          LevCHe
        </Logo>
      </WelcomePage>
    </Link>
  );
};

export default Loader;
