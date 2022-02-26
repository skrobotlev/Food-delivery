import React, { useContext, useEffect, useState } from "react";
import cn from "classnames";
import { Context } from "@/store";

interface TabComponentProps {
    tabs: string[];
    onActiveChange: (index: number) => void;
    activeTab: number;
}

const Tab = ({ title, index, activeTab, onActiveChange }) => {
    const [active, setActive] = useState<boolean>(false);

    useEffect(() => {
        if (active) onActiveChange(index);
    }, [active]);

    useEffect(() => {
        if (activeTab === index) setActive(true);
        else setActive(false);
    }, [activeTab]);

    return (
        <li className={cn("tab", {
            active: active
        })}
            onClick={() => setActive(true)}>{title}</li>
    );
};

const TabComponent: React.FC<TabComponentProps> = ({ tabs, onActiveChange, activeTab }) => {
    return (
        <div>
            <ul className="nav">
                {tabs && tabs.map((tab, index) => {
                    return <Tab title={tab} index={index} activeTab={activeTab} key={index} onActiveChange={onActiveChange} />;
                })}
            </ul>
        </div>
    );
};

export default TabComponent;
