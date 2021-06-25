import React, { useState } from "react";

import "../styles/tool-tip.scss";

function ToolTip(props) {
    let timeOut;

    const [active, setActive] = useState(false);

    const showTip = () => {
        timeOut = setTimeout(() => {
            setActive(true);
        }, props.delay || 400);
    };

    const hideTip = () => {
        clearInterval(timeOut);

        setActive(false);
    };

    return (
        <div
            className="Tooltip-Wrapper"
            // When to show the tooltip
            onMouseEnter={showTip}
            onMouseLeave={hideTip}
        >
            {/* Wrapping */}
            {props.children}
            {active && (
                <div className={`Tooltip-Tip ${props.direction || "top"}`}>
                    {/* Content */}
                    {props.content}
                </div>
            )}
        </div>
    );
}

export default ToolTip;
