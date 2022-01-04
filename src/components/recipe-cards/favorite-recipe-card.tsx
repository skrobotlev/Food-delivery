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
  height: 140px;
  border-radius: 2rem;
  margin: 30px;
  background-color: #eff7ee;
//   display: flex;
//   justify-content: center;
//   align-items: center;
`;
const LikeIcon = styled.div`
    display: flex;
	justify-content: flex-end;
    padding-top: 12px;
    padding-right: 16px;
`;

const Title = styled.h1`
display: flex;
	justify-content: flex-end;
    align-items: flex-end;
    padding-top: 12px;
    padding-right: 16px;
    font-size: 10px;
    margin: 10px;
`;


const FavoriteRecipeCard: React.FC<FavoriteRecipeCardProps> =
    ({ title, calories, likeIcon, icon, category }) => {
        return (
            <div className="recipe-element">
                <i className="like-icon">{likeIcon}</i>
                <h1>
                    {title}
                </h1>
                <div className="fv-rc-cd-img">{icon}</div>
                <h2>{calories}</h2>
                <p className="fv-rc-cd-category">{category}</p>
            </div>
        );
    };

export default FavoriteRecipeCard;
