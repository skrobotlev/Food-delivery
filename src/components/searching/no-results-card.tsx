import React, { ReactElement } from "react";
import NoResCardImage from "../images/no-res-card";

interface NoResultsCardProps {
    icon?: ReactElement;
    header?: string;
    desc?: string;
}

const NoResultsCard: React.FC<NoResultsCardProps> = ({ header, desc, icon }) => {
    return (
        <div className="no-results-card">
            {/* <NoResCardImage /> */}
            <div>{icon}</div>
            <h1>{header}</h1>
            <p>{desc}</p>
        </div>
    );
};

export default NoResultsCard;