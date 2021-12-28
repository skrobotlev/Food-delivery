import React from "react";
import { SquareBut } from "../../buttons/square-button";
import { BurgerSVG } from "../../../icons/burger";


const FoodFavoriteTab = () => {
    return (
        <div className="FirstTab">
            <SquareBut size="md" backgroundColor="#FFF8EE">
                <BurgerSVG />
            </SquareBut>
        </div>
    );
};

export default FoodFavoriteTab;