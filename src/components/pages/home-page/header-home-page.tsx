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
width: 234px;
height: 59px;
font-family: "Signika";
font-style: normal;
font-weight: 600;
font-size: 25px;
line-height: 28px;
text-align: center;
/* letter-spacing: -0.24px; */
h1 {
    color:#91C788;
}
`;

const HomePageHeader: React.FC<HomePageHeaderProps> = ({ name, desc }) => {
    return (
        <HomePageHeaderDiv>
            <h1>Hello, {name}</h1>
            <p>{desc}</p>
        </HomePageHeaderDiv>
    );
};

export default HomePageHeader;