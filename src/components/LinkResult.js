import React from "react";

import "../styles/link-list.scss";

function LinkResult(props) {
    console.log("Link as Props: ", props);

    return (
        <div className="link-item-container">
            <div className="card-wrapper">
                <div className="body-wrapper">
                    <div className="left-wrapper">
                        <h2>{props.business.business_name}</h2>
                        <p>{props.business.address}</p>
                        <p>
                            {props.business.city}, {props.business.state}
                        </p>
                    </div>
                </div>
                <div className="footer">
                    <p> Review Link: {props.business.review_link}</p>
                    <p> Map Link:</p>
                </div>
            </div>
        </div>
    );
}

export default LinkResult;
