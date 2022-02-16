import React, { ReactElement, DetailedHTMLProps, HTMLAttributes } from "react";
import styled from "styled-components";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";

interface FavoriteRecipeCardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  title?: string;
  calories?: string;
  icon?: ReactElement;
  category?: any;
  likeIcon?: ReactElement;
  bzhu?: any;
  image?: string;
  timeToCook?: any;
  favKey?: any;
  recipeId?: any;
}

const RecipeElement = styled.div<FavoriteRecipeCardProps>`
  position: relative;
  width: 313px;
  height: 120px;
  border-radius: 2rem;
  margin: 10px;
  background-color: #eff7ee;
  font-family: "Balsamiq Sans";
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  h1 {
    // display: flex;
    position: absolute;
    top: 45px;
    left: 150px;
    font-size: 15px;
    font-weight: 600;
  }
  h2 {
    // display: flex;
    position: absolute;
    bottom: 80px;
    left: 150px;
    font-size: 12px;
    color: #6cb663;
    font-weight: 600;
  }
  h3 {
    // display: flex;
    position: absolute;
    bottom: -5px;
    left: 150px;
    font-size: 15px;
    /* color:#6CB663; */
    font-weight: 600;
  }
  p {
    position: absolute;
    bottom: 10px;
    left: 150px;
    font-size: 12px;
    color: #646464;
    font-weight: 550;
  }
  /* svg {
  position: absolute;
  top: 10px;
  left: 280px;
  } */
`;
const LikeIcon = styled.i`
  /* display: flex;
  justify-content: flex-end; */
  // flex-direction: row-reverse;
  position: absolute;
  top: 10px;
  left: 280px;
`;

// const ImageCard = styled.div`
//   display: flex;
//   position: relative;
//   bottom: 15px;
//   left: 30px;
//   img{
//     width: 60px;
//   height: 90px;
//   }

// `;

const ImageCard = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  width: 120px;
  height: 90px;
  border-radius: 100px;
  margin-top: 15px;
  margin-left: 15px;
  img {
    width: 120px;
    height: 90px;
    border-radius: 100px;
  }
`;

const FavoriteRecipeCard: React.FC<FavoriteRecipeCardProps> = ({ title, calories, likeIcon, image, icon, category, bzhu, timeToCook }) => {
  return (
    <RecipeElement>
      <LikeIcon> {likeIcon}</LikeIcon>
      <h1>{title}</h1>
      <ImageCard>
        <img src={image} />
      </ImageCard>
      <h2>{calories}</h2>
      <p>{bzhu}</p>
      <h3>
        <AccessAlarmsIcon fontSize="small" />
        {timeToCook}
      </h3>
    </RecipeElement>
  );
};

export default FavoriteRecipeCard;
