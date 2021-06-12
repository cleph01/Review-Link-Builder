import React from "react";

import "../styles/link-list.scss";

function LinkResult(props) {
    console.log("Props: ", props);

    return (
        <div className="container">
            <div className="card-wrapper">
                <div className="left-wrapper">
                    <h2>{props.business.businessName}</h2>
                    <p>{props.business.address}</p>
                    <p> Review Link: {props.business.placeId}</p>
                    <p> Map Link: {props.business.mapLink}</p>
                </div>
                <div className="right-wrapper">
                    <div className="link-list-image">
                    <img src={props.business.photoUrl} alt="1" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LinkResult;
