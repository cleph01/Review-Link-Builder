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

const initialLinkState = {
    links: null,
    isFetching: false,
    errorMessage: null,
};

function Profile() {
    const history = useHistory();

    const userId = localStorage.getItem("user");

    const { state, dispatch } = useContext(UserContext);

    const [linkState, setLinkState] = useState(initialLinkState);

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

    const handleLogout = () => {
        dispatch({
            type: "LOGOUT",
        });

        history.push("/login");
    };

    return (
        <div className="container">
            <div className="header">
                <FontAwesomeIcon
                    className="search-icon"
                    icon="search"
                    onClick={() => history.push("/search")}
                />
                <div className="logout-btn" onClick={handleLogout}>
                    Logout
                </div>
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
