import React from "react";
import SquareButton, { SquareBut } from "../../buttons/square-button";
import { BurgerSVG } from "../../../icons/burger";


const FoodFavoriteTab = () => {
    return (
        <div className="FirstTab">
            <SquareButton size="md" backgroundColor="#FFF8EE" icon={<BurgerSVG />} />
        </div>
    );
};

export default FoodFavoriteTab;