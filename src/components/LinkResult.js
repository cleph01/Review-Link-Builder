import React from "react";

function LinkResult(props) {
    return (
        <div className="container">
            <div className="card-wrapper">
                <h2>{props.business.businessName}</h2>
                <p>{props.business.placeId}</p>
            </div>
        </div>
    );
}

export default LinkResult;
