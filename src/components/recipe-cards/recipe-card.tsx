import React, { DetailedHTMLProps, HTMLAttributes } from "react";
import styled from "styled-components";


// обернуть divhtmlporps
interface RecipeCardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  title?: string;
  desc?: string;
  image?: SVGRectElement;
  srcImage?: string;
}

const RecipeCardDiv = styled.div`
  background-color: #fcfcfc;
  width: 200px;
  height: 231px;
  border-radius: 30px;
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  text-align: flex-start;
  font-family: "Balsamiq Sans";  
  margin-left: 15px;
  &:first-of-type {
    margin-left: 0px;
  }
  img {
    width: 200px;
  height: 160px;
  }
  h2 {
    font-size: 14px;
    margin-top: 5px;
    margin-left: 10px;
  }
  p {
      font-size: 12px;
      margin-left: 10px;
  }
`;

const RecipeCard: React.FC<RecipeCardProps> = ({ srcImage, title, desc }) => {
  return (
    <RecipeCardDiv >
      <img src={srcImage}></img>
      <h2>{title}</h2>
      <p>{desc}</p>
    </RecipeCardDiv>
  );
};

export default RecipeCard;
