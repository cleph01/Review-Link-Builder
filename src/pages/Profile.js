import React from "react";

// Takes visitor to map page
// https://www.google.com/maps/search/?api=1&query=<address>&query_place_id=<placeId>

// Take visitor to write a review interface
// https://search.google.com/local/writereview?placeid=<place_id>

import LinkResult from "../components/LinkResult";

const links = [
    {
        businessName: "ACME",
        address: "123 Main St., Stamford, CT 06830",
        placeId: "placeId-1",
    },
    {
        businessName: "Fratellis",
        address: "345 South St., Stamford, CT 06830",
        placeId: "placeId-2",
    },
];

function Profile() {
    return (
        <div className="container">
            <div className="link-list">
                {links.map((link) => {
                    return <LinkResult business={link} />;
                })}
            </div>
        </div>
    );
}

export default Profile;
