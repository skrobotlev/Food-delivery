import React from "react";
import styled from "styled-components";

interface HomePageHeaderProps {
    name: string;
    desc: string;
}

const HomePageHeaderDiv = styled.div`
/* position: absolute; */
display: flex;
justify-content: center;
flex-direction: column;
width: 250px;
height: 59px;
font-family: "Signika";
font-style: normal;
color: #696969;
font-weight: 400;
font-size: 18px;
line-height: 20px;
text-align: center;
/* letter-spacing: -0.24px; */
h1 {
    font-weight: 600;
    color:#91C788;
    font-size: 25px;
line-height: 28px;
}
`;

const HomePageHeader: React.FC<HomePageHeaderProps> = ({ name, desc }) => {
    return (
        <HomePageHeaderDiv>
            <h1>Hello {name},</h1>
            <p>{desc}</p>
        </HomePageHeaderDiv>
    );
};

export default HomePageHeader;