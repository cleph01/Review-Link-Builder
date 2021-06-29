import React, { useState } from "react";

import "../styles/tool-tip.scss";

function ToolTip(props) {
    let timeOut;

    const [active, setActive] = useState(false);

    const showTip = () => {
        setActive(true);

        timeOut = setTimeout(() => {
            setActive(false);
        }, props.delay || 1000);
    };

    // const hideTip = () => {
    //     clearInterval(timeOut);

    //     setActive(false);
    // };

    return (
        <div
            className="Tooltip-Wrapper"
            // When to show the tooltip
            onClick={showTip}
            // onMouseLeave={hideTip}
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
