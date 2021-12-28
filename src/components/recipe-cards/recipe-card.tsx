import React from "react";
// import Imgpump from "./pumkins-edit.png";
// const Pumpimg = require("./pumpkins.png");

interface RecipeCardProps {
    title?: string;
    desc?: string;
    header?: string;
    image?: SVGRectElement;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ image }) => {
    return (
        <div className="recipe-card">
            {/* <img src={Imgpump}></img> */}

            <img className="image" src="https://user-images.githubusercontent.com/92730840/147400625-e55e86e1-b7ce-4629-8582-7a0edb438ef9.png"></img>

            <h1>The pumpkin secret</h1>
            <p>The pump secrets</p>
        </div>
    );
};

export default RecipeCard;
