import React, { useState } from "react";
import FoodFavoriteTab from "./all-tabs/food-tab";
import RecipeFavoriteCard from "./all-tabs/recipe-tab";

const Tabs = () => {
    const [activeTab, setActiveTab] = useState("tab1");

    const handleTab1 = () => {
        setActiveTab("tab1");
    };
    const handleTab2 = () => {
        setActiveTab("tab2");
    };


    return (
        <div className="Tabs">
            <ul className="nav">
                <li className={activeTab === "tab1" ? "active" : ""}
                    onClick={handleTab1}>Food</li>
                <li className={activeTab === "tab2" ? "active" : ""}
                    onClick={handleTab2}>Recipes</li>
            </ul>
            <div className="outlet">
                {activeTab === "tab1" ? <FoodFavoriteTab /> : <RecipeFavoriteCard />}
            </div>
        </div>
    );
};

export default Tabs;
