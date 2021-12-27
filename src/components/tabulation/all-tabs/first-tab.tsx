import React from "react";
import { SquareBut } from "../../buttons/square-button";
import { BurgerSVG } from "../../../icons/burger";


const FirstTab = () => {
    return (
        <div className="FirstTab">
            <p>Favorite food page</p>
            <SquareBut size="md" backgroundColor="#FFF8EE">
                <BurgerSVG />
            </SquareBut>
            {/* First tab content will go here */}
        </div>
    );
};

export default FirstTab;