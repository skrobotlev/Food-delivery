import React, { ReactElement, useState } from "react";
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

    const tabs = ["Food", "Recipes"];
    return (
        <div className="Tabs">
            {/* <ul className="nav">
                <li className={activeTab === "tab1" ? "active" : ""}
                    onClick={handleTab1}>Food</li>
                <li className={activeTab === "tab2" ? "active" : ""}
                    onClick={handleTab2}>Recipes</li>
            </ul>
            <div className="outlet">
                {activeTab === "tab1" ? <FoodFavoriteTab /> : <RecipeFavoriteCard />}
            </div> */}
            <TabComponent tabs={tabs} onActiveChange={(idx) => setActiveTab(idx)} activeTab={activeTab} />
            <TabsContent tabs={[<FoodFavoriteTab />, <RecipeFavoriteCard />]} activeIndex={activeTab} />

        </div>
    );
};

export default Tabulation;
