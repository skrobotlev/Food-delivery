import React, { ReactElement, useState } from "react";
import NoResCardImage from "../images/no-res-card";
import NoResultsCard from "../searching/no-results-card";
import FoodFavoriteTab from "./all-tabs/food-tab";
import RecipeFavoriteCard from "./all-tabs/recipe-tab";
import TabComponent from "./all-tabs/tab-component";

interface TabsContentProps {
    tabs: ReactElement[];
    activeIndex: number;
}

const TabsContent = ({ activeIndex, tabs }: TabsContentProps) => {
    return (
        <>
            {tabs.find((tab, index) => index === activeIndex)}
        </>
    );
};



const Tabulation = () => {
    const [activeTab, setActiveTab] = useState(0);

    const tabs = ["Пища", "Рецепты"];
    return (
        <div className="tabs">
            <TabComponent tabs={tabs} onActiveChange={(idx) => setActiveTab(idx)} activeTab={activeTab} />
            <TabsContent tabs={[<FoodFavoriteTab />, <RecipeFavoriteCard />]} activeIndex={activeTab} />
        </div>
    );
};

export default Tabulation;
