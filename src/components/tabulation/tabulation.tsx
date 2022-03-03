import React, { ReactElement, useContext, useEffect, useState } from "react";
import FoodFavoriteTab from "./all-tabs/food-tab";
import RecipeFavoriteCard from "./all-tabs/recipe-tab";
import TabComponent from "./all-tabs/tab-component";

interface TabsContentProps {
    tabs: ReactElement[];
    activeIndex: number;
}

const TabsContent = ({ activeIndex, tabs }: TabsContentProps) => {
    return <>{tabs.find((tab, index) => index === activeIndex)}</>;
};

const Tabulation = () => {
    const [activeTab, setActiveTab] = useState(0);

    const tabs = ["Рецепты", "Пища"];
    return (
        <div className="tabs">
            <TabComponent tabs={tabs} onActiveChange={(idx) => setActiveTab(idx)} activeTab={activeTab} />
            <TabsContent tabs={[<RecipeFavoriteCard />, <FoodFavoriteTab />]} activeIndex={activeTab} />
        </div>
    );
};

export default Tabulation;
