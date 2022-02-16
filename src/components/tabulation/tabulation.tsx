import { currentSnapRecipes, updateRecipes } from "../../api/favorite-recipes";
import { auth } from "../../firebase";
import React, { ReactElement, useContext, useEffect, useState } from "react";
import NoResCardImage from "../images/no-results";
import NoResultsCard from "../pages/search-page/searching/no-results-card";
import FoodFavoriteTab from "./all-tabs/food-tab";
import RecipeFavoriteCard from "./all-tabs/recipe-tab";
import TabComponent from "./all-tabs/tab-component";
import { useHistory } from "react-router-dom";
import { Context } from "../../";

interface TabsContentProps {
    tabs: ReactElement[];
    activeIndex: number;
}

const TabsContent = ({ activeIndex, tabs }: TabsContentProps) => {
    return <>{tabs.find((tab, index) => index === activeIndex)}</>;
};

const Tabulation = () => {
    const [activeTab, setActiveTab] = useState(0);
    const { uid } = auth.currentUser;
    const history = useHistory();
    const { userStore } = useContext(Context);
    let setr = userStore.dbResponse;


    // useEffect(() => {
    //     setr ? setActiveTab(1) : null;
    // }, [setr]);

    const tabs = ["Пища", "Рецепты"];
    return (
        <div className="tabs">
            <TabComponent tabs={tabs} onActiveChange={(idx) => setActiveTab(idx)} activeTab={activeTab} />
            <TabsContent tabs={[<FoodFavoriteTab />, <RecipeFavoriteCard />]} activeIndex={activeTab} />
        </div>
    );
};

export default Tabulation;
