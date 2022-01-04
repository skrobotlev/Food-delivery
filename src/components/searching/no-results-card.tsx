import React, { DetailedHTMLProps, HTMLAttributes, ReactElement } from "react";

// тоже обернуть divhtmlprops
interface NoResultsCardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    icon?: ReactElement;
    header?: string;
    desc?: string;
}

const NoResultsCard: React.FC<NoResultsCardProps> = ({ header, desc, icon }) => {
    return (
        <div className="no-results-card">
            <div>{icon}</div>
            <h1>{header}</h1>
            <p>{desc}</p>
        </div>
    );
};

export default NoResultsCard;