import React from "react";

import "../../global.scss";

interface RectangleButtonProps {
    color?: 'primary' | 'error' | 'warning' | 'interest'
    title: string,
    icon?: 'product card' | 'arrow',
    size: 'lg' | 'md' | 'sm'
}

const RectangleButton: React.FC<RectangleButtonProps> = ({ title, size }) => {
    return (
        <div >
            <button className={`rectangle-button-${size}`} >
                {title}
            </button>

        </div>
    )
}

export default RectangleButton;