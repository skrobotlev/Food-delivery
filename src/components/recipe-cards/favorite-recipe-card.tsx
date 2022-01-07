import React, { ReactElement, DetailedHTMLProps, HTMLAttributes } from "react";
import styled from "styled-components";

interface FavoriteRecipeCardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  title?: string;
  calories?: string;
  icon?: ReactElement;
  category?: string;
  likeIcon?: ReactElement;
}

const RecipeElement = styled.div<FavoriteRecipeCardProps>`
  width: 313px;
  height: 120px;
  border-radius: 2rem;
  margin: 10px;
  background-color: #eff7ee;
  font-family: "Signika";
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  h1 {
    // display: flex;
    position: relative;
    top: 35px;
    left: 150px;
    font-size: 15px;
    font-weight: 600;
  }
  h2 {
    // display: flex;
    position: relative;
    bottom: 80px;
    left: 150px;
    font-size: 12px;
    color:#6CB663;
    font-weight: 600;
  }
  p {
    position: relative;
    bottom: 50px;
    left: 150px;
    font-size: 12px;
    color: #646464;
    font-weight: 550;
  }
`;
const LikeIcon = styled.i`
  display: flex;
  justify-content: flex-end;
  // flex-direction: row-reverse;
  position: relative;
  top: 10px;
  right: 20px;
`;

const ImageCard = styled.div`
  display: flex;
  position: relative;
  bottom: 15px;
  left: 30px;
`;

const FavoriteRecipeCard: React.FC<FavoriteRecipeCardProps> = ({ title, calories, likeIcon, icon, category }) => {
  return (
    <RecipeElement>
      <LikeIcon>{likeIcon}</LikeIcon>
      <h1>{title}</h1>
      <ImageCard>{icon}</ImageCard>
      <h2>{calories}</h2>
      <p>{category}</p>
    </RecipeElement>
  );
};

export default FavoriteRecipeCard;
