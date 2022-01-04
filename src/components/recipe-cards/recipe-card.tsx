import React, { DetailedHTMLProps, HTMLAttributes } from "react";


// обернуть divhtmlporps
interface RecipeCardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    title?: string;
    desc?: string;
    image?: SVGRectElement;
}

// сделать как и задумано пропсамм
const RecipeCard: React.FC<RecipeCardProps> = ({ image, title, desc }) => {
    return (
        <div className="recipe-card">
            <img className="image" src="https://user-images.githubusercontent.com/92730840/147400625-e55e86e1-b7ce-4629-8582-7a0edb438ef9.png"></img>
            <h1>{title}</h1>
            <p>{desc}</p>
        </div>
    );
};

export default RecipeCard;
