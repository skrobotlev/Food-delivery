import React from "react";
import styled from "styled-components";

interface HomePageHeaderProps {
    name: string;
    desc: string;
}

const HomePageHeaderDiv = styled.div`
 
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 55px;
  width: 250px;
  height: 59px;
  font-family: "Balsamiq Sans";
  font-style: normal;
  color: #696969;
  font-weight: 400;
  font-size: 18px;
  line-height: 20px;
  text-align: center;
  h1 {
    font-weight: 600;
    color: #91c788;
    font-size: 25px;
    line-height: 28px;
  }
  @media screen and (min-width: 450px) {
    width: 100%;
    font-weight: 500;
    font-size: 25px;
    h1 {
      font-weight: 600;
      color: #91c788;
      font-size: 30px;
      line-height: 28px;
    }
    p{
        font-size: 30px;
    }
  }
`;

const HomePageHeader: React.FC<HomePageHeaderProps> = ({ name, desc }) => {
    return (
        <HomePageHeaderDiv>
            <h1>Привет, {name}!</h1>
            <p>{desc}</p>
        </HomePageHeaderDiv>
    );
};

export default HomePageHeader;
