import React, { useState } from "react";
import FirstTab from "./all-tabs/first-tab";
import SecondTab from "./all-tabs/second-tab";

const Tabs = () => {
    const [activeTab, setActiveTab] = useState("tab1");

    const handleTab1 = () => {
        // update the state to tab1
        setActiveTab("tab1");
    };
    const handleTab2 = () => {
        // update the state to tab2
        setActiveTab("tab2");
    };


    return (
        <div className="Tabs">
            {/* Tab nav */}
            <ul className="nav">
                <li className={activeTab === "tab1" ? "active" : ""}
                    onClick={handleTab1}>Food</li>
                <li className={activeTab === "tab2" ? "active" : ""}
                    onClick={handleTab2}>Recipes</li>
            </ul>
            <div className="outlet">
                {activeTab === "tab1" ? <FirstTab /> : <SecondTab />}
                {/* content will be shown here */}
            </div>
        </div>
    );
};

export default Tabs;
