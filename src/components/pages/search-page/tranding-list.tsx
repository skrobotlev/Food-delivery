import React from "react";
import styled from "styled-components";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import MovingIcon from "@mui/icons-material/Moving";

const TrandingListDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;

const TrandingListH1 = styled.h1`
font-size: 16px;
font-family: "Balsamiq Sans";
width: 327px;
font-weight: 400;
color: #FF8473;
padding-top: 16px;
/* border-bottom: 2px black ; */
border-bottom: 2px solid #f5f5f5;
padding-bottom: 10px;
`;

const TrandingList = () => {
    return (
        <TrandingListDiv>
            <TrandingListH1>лучшие рецепты с овощами<MovingIcon style={{ color: "#FF8473" }} /></TrandingListH1>
            <TrandingListH1>крутые сезонные овощи<MovingIcon style={{ color: "#FF8473" }} /></TrandingListH1>
            <TrandingListH1>куриные рецепты с яйцами<MovingIcon style={{ color: "#FF8473" }} /></TrandingListH1>
            <TrandingListH1>супы<MovingIcon style={{ color: "#FF8473" }} /></TrandingListH1>
        </TrandingListDiv>
    );
};

export default TrandingList;