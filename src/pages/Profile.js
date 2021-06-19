import React, { useState, useContext, useEffect } from "react";

import { useHistory } from "react-router-dom";

import UserContext from "../context/user";

import axios from "axios";

import "../styles/profile.scss";

// Takes visitor to map page
// https://www.google.com/maps/search/?api=1&query=<address>&query_place_id=<placeId>

// Take visitor to write a review interface
// https://search.google.com/local/writereview?placeid=<place_id>

import LinkResult from "../components/LinkResult";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// const links = [
//     {
//         businessName: "ACME",
//         address: "123 Main St., Stamford, CT 06830",
//         placeId: "placeId-1",
//         mapLink: "map-link-1",
//         photoUrl:
//             "https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sATtYBwJ091Jg9VGemPe0kKA8OE28td_HKC9pipGwbFesRZxHvTdQDNCd9MUTYAJWMrs2P7W8vPFzFKhrpJ1itttuhMLlE0ju38qX1ACs3W6CS8DBxVb_-UsgQxqAvLicL4tnmClcyqQ-xRquyC-Qxzby0HkPmRmPKxQnRwdu3fAEw-KlWw8H&3u350&4u350&5m1&2e1&callback=none&key=AIzaSyDk80PqHyEMq3a1Ow8vNusNPw1yn5vMNoE&token=123839",
//     },
//     {
//         businessName: "Fratellis",
//         address: "345 South St., Stamford, CT 06830",
//         placeId: "placeId-2",
//         mapLink: "map-link-2-jklajflkasjflkjsdfljsfjlsajfljsdfljsfljslfkj",
//         photoUrl:
//             "https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sATtYBwLjCMfnJ6_hVZE5jE_XyNOTqiYeObt_rj9bLUb3wpssw2egK6xbpfxrm9xUP5X7Rp6QxQmZxElpO_2RKn9U7EMeizxLddo21eNZP2OjJZf_L60AfH09ck2OB0h3gFB6rrmLjPUxbLyf9henQE-mwglpqKcAj5Zii1ZtW-X3iF9KKveQ&3u350&4u350&5m1&2e1&callback=none&key=AIzaSyDk80PqHyEMq3a1Ow8vNusNPw1yn5vMNoE&token=63891",
//     },
// ];

const initialLinkState = {
    links: null,
    isFetching: false,
    errorMessage: null,
};

function Profile() {
    const history = useHistory();

    const userId = localStorage.getItem("user");

    const { user } = useContext(UserContext);

    const [linkState, setLinkState] = useState(initialLinkState);

    console.log("Context User: ", user);

    // Fetch Links by User Id
    useEffect(() => {
        setLinkState({
            ...linkState,
            isFetching: true,
            errorMessage: null,
        });

        axios
            .get(`http://localhost:5000/api/links/${userId}`)
            .then((res) => {
                if (res.status === 200) {
                    return res.data;
                } else {
                    console.log("Response Error: ", res);
                    throw res;
                }
            })
            .then((responseData) => {
                console.log("Succes Message: ", responseData);

                setLinkState({
                    ...linkState,
                    isFetching: false,
                    links: responseData,
                });
            })
            .catch((error) => {
                console.log("Axiox error: ", error.response.data);

                if (error.response.status === 401) {
                    setLinkState({
                        ...linkState,
                        isFetching: false,
                        errorMessage: error.response.data,
                    });
                } else {
                    setLinkState({
                        ...linkState,
                        isFetching: false,
                        errorMessage: error.message || error.statusText,
                    });
                }
            });
    }, []);

    console.log("Link State: ", linkState);
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
                {linkState.links &&
                    linkState.links.map((link) => {
                        return <LinkResult business={link} />;
                    })}
            </div>
        </div>
    );
}

export default Profile;
