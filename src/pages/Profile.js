import React, { useContext } from "react";

import { useHistory } from "react-router-dom";

import UserContext from "../context/user";

import "../styles/profile.scss";

// Takes visitor to map page
// https://www.google.com/maps/search/?api=1&query=<address>&query_place_id=<placeId>

// Take visitor to write a review interface
// https://search.google.com/local/writereview?placeid=<place_id>

import LinkResult from "../components/LinkResult";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const links = [
    {
        businessName: "ACME",
        address: "123 Main St., Stamford, CT 06830",
        placeId: "placeId-1",
        mapLink: "map-link-1",
        photoUrl:
            "https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sATtYBwIVMhiJKwhlpKR24Vyl0vnfoGJrAXvzpkNiRuMtDj-iCR5vRXAQYEyZX5-8mqEKvZuZaejq0GKkKq4eF7mUa-zd6L8oCYMHBtCQRl8QBvLLw4Bd8S5OuoEjpA3w05EdYaWuqz4UKVesugvaETRrbBYTvuhUyV3-AZtmj8VX-_LRiL7S&3u350&4u350&5m1&2e1&callback=none&key=AIzaSyDk80PqHyEMq3a1Ow8vNusNPw1yn5vMNoE&token=48067",
    },
    {
        businessName: "Fratellis",
        address: "345 South St., Stamford, CT 06830",
        placeId: "placeId-2",
        mapLink: "map-link-2-jklajflkasjflkjsdfljsfjlsajfljsdfljsfljslfkj",
        photoUrl:
            "https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sATtYBwIVMhiJKwhlpKR24Vyl0vnfoGJrAXvzpkNiRuMtDj-iCR5vRXAQYEyZX5-8mqEKvZuZaejq0GKkKq4eF7mUa-zd6L8oCYMHBtCQRl8QBvLLw4Bd8S5OuoEjpA3w05EdYaWuqz4UKVesugvaETRrbBYTvuhUyV3-AZtmj8VX-_LRiL7S&3u350&4u350&5m1&2e1&callback=none&key=AIzaSyDk80PqHyEMq3a1Ow8vNusNPw1yn5vMNoE&token=48067",
    },
];

function Profile() {
    const history = useHistory();

    const { user } = useContext(UserContext);

    console.log("Context User: ", user);

    return (
        <div className="container">
            <div className="header">
                <FontAwesomeIcon
                    className="search-icon"
                    icon="search"
                    onClick={() => history.push("/search")}
                />
            </div>
            <div className="link-list">
                {links.map((link) => {
                    return <LinkResult business={link} />;
                })}
            </div>
        </div>
    );
}

export default Profile;
