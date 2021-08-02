import { useState, useEffect, useRef, useContext } from "react";

import { useHistory } from "react-router-dom";

import UserContext from "../context/user";

import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ToolTip from "../components/ToolTip";

import { CopyToClipboard } from "react-copy-to-clipboard";

import "../styles/google-places.css";
import "../styles/search.scss";

function Search() {
    const history = useHistory();

    const { state, dispatch } = useContext(UserContext);

    const [loaded, setLoaded] = useState(false);
    const [query, setQuery] = useState({});
    const [linkState, setLinkState] = useState({});
    const [clipboardValue, setClipboardValue] = useState({ copied: false });

    const [pid, setPid] = useState("");
    const [photoUrls, setPhotoUrl] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [website, setWebsite] = useState("");
    const autoCompleteRef = useRef(null);

    const [displayCard, setDisplayCard] = useState(false);
    const [displayReviews, setDisplayReviews] = useState(false);
    const [displayPhotos, setDisplayPhotos] = useState(false);

    const [displayManualPid, setdisplayManualPid] = useState(false);

    const handlePidChange = (event) => {
        setPid(event.target.value);
    };

    console.log("PID: ", pid);

    const handleOnChange = (event) => {
        setQuery(event.target.value);
    };

    const handlePlaceSelect = async (autoComplete) => {
        const businessObject = await autoComplete.getPlace();
        const queryResult = businessObject;

        // clear Review Link state
        setLinkState({});

        // if response status is ok
        if (queryResult.photos) {
            // Save Place Select Results to Query Variable
            setQuery(queryResult);

            const photoArray = queryResult.photos.map((photo) => {
                const newUrl = photo.getUrl({
                    maxWidth: 350,
                    maxHeight: 350,
                });

                return [...photoUrls, newUrl];
            });

            setPhotoUrl(photoArray);

            let map = new window.google.maps.Map(
                document.getElementById("map"),
                {
                    center: {
                        lat: queryResult.geometry.location.lat,
                        lng: queryResult.geometry.location.lon,
                    },
                }
            );

            let service = new window.google.maps.places.PlacesService(map);

            service.getDetails(
                {
                    placeId: queryResult.place_id,
                },
                function (place, status) {
                    if (
                        status ===
                        window.google.maps.places.PlacesServiceStatus.OK
                    ) {
                        console.log("Reviews getDetails: ", place.reviews);

                        console.log("Website getDetails: ", place.website);

                        setReviews(place.reviews);

                        setWebsite(place.website);
                    }
                }
            );

            setDisplayCard(true);
        } else {
            console.log("BAD RESPONSE OBJECT AT PHOTOS");
        }

        console.log("Query Result: ", queryResult);

        console.log("Reviews: ", reviews);
    };

    // If Script Loaded, Initialize AutoComplete Object
    useEffect(() => {
        // Script is Loaded
        // Perform Google API call here
        const autoComplete = new window.google.maps.places.Autocomplete(
            autoCompleteRef.current,
            {
                fields: [
                    "place_id",
                    "name",
                    "formatted_address",
                    "formatted_phone_number",
                    "photos",
                    "geometry",
                ],
                componentRestrictions: { country: "us" },
            }
        );

        autoComplete.addListener("place_changed", () =>
            handlePlaceSelect(autoComplete)
        );
    }, [loaded]);

    // Send Business data to backend for verification
    const handleCreateLink = (event) => {
        // const reviewLink = `https://search.google.com/local/writereview?placeid=${query.place_id}`;

        const [address, city, state] = query.formatted_address.split(",");

        const business_name = query.name.trim();

        const msgBody = {
            business_name: business_name,
            street_address: address.trim(),
            city: city.trim(),
            state: state.trim(),
            website,
            user_id: localStorage.getItem("user"),
            place_id: query.place_id,
        };

        setLinkState({
            ...linkState,
            isFetching: true,
        });

        axios
            .post(`http://localhost:5000/api/links`, msgBody)
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
                    reviewLink: responseData.review_link,
                    isFetching: false,
                });

                setClipboardValue({
                    copied: true,
                    reviewLink: `https://ThankYou.SmartSeed.com/${responseData.review_link}`,
                });
            })
            .catch((error) => {
                console.log("Axiox error: ", error);

                if (error.status === 401) {
                    setLinkState({
                        ...linkState,
                        isFetching: false,
                        errorMessage: error,
                    });
                } else {
                    setLinkState({
                        ...linkState,
                        isFetching: false,
                        errorMessage: error.message || error.statusText,
                    });
                }
            });

        console.log("Axios Body Msg: ", msgBody);
    };

    const handleShowReviewPage = (event) => {
        const business_name = query.name
            .replaceAll(" ", "-")
            .replaceAll("&", "n");

        history.push(
            `review/${query.place_id}?b=${business_name}&l=${linkState.reviewLink}`
        );
    };

    const handleLogout = () => {
        dispatch({
            type: "LOGOUT",
        });

        history.push("/login");
    };

    const userName = localStorage.getItem("name").slice(1, -1);

    console.log("Photos Array: ", photoUrls);

    console.log("State: ", state);

    console.log("Link State: ", linkState);

    console.log("Query Data: ", query);

    return (
        <div className="search__container">
            <div className="header">
                {/* <FontAwesomeIcon
                    className="hamburger-menu"
                    icon="bars"
                    onClick={() => history.push("/profile")}
                /> */}
                <div className="user-name">Welcome Back, {userName}!</div>
                <div className="logout__container">
                    <div className="logout-btn" onClick={handleLogout}>
                        Logout
                    </div>
                </div>
            </div>
            {/* Section - Google AutoComplete */}
            <div
                className="autocomplete"
                style={{ display: !displayManualPid ? "block" : "none" }}
            >
                <div className="heading">
                    <h4>Enter Name of Business below 👇</h4>
                </div>
                <label>Google Business Search Bar:</label>
                <input
                    className="container__input"
                    ref={autoCompleteRef}
                    onChange={handleOnChange}
                    placeholder="Enter a Business Name"
                    value={query.name}
                />

                <div className="no-place-id-display">
                    <p>
                        If Business Not Found on Google API,{" "}
                        <span
                            className="activate-link"
                            onClick={() => {
                                setdisplayManualPid(true);
                                setDisplayPhotos(false);
                            }}
                        >
                            <u>Click Here</u>
                        </span>
                    </p>
                </div>

                <div
                    className="card-container"
                    style={{ display: displayCard ? "flex" : "none" }}
                >
                    <div className="card-wrapper">
                        {photoUrls.length > 0 ? (
                            <img src={photoUrls[0]} alt="1" />
                        ) : (
                            "No Photo"
                        )}
                    </div>
                    <div>
                        <div>{query.name || ""}</div>
                        <div>
                            {query.formatted_address
                                ? query.formatted_address.split(",")[0]
                                : ""}
                        </div>
                        <div>
                            {query.formatted_address
                                ? query.formatted_address.split(",").slice(1, 3)
                                : ""}
                        </div>
                    </div>
                    <div className="reviews">
                        There are {reviews.length || "0"} reviews.{" "}
                        <span
                            onClick={() => {
                                setDisplayReviews(!displayReviews);
                            }}
                        >
                            <u>
                                {displayReviews
                                    ? "Close Reviews"
                                    : "See Reviews"}
                            </u>
                        </span>
                    </div>
                    <div className="create-link" onClick={handleCreateLink}>
                        {linkState.isFetching ? "Loading" : "Create Link"}
                    </div>
                    {linkState.reviewLink && (
                        <div className="clipboard__container">
                            <input
                                className="clipboard_input"
                                type="text"
                                value={clipboardValue.reviewLink}
                                readOnly
                            />
                            <CopyToClipboard
                                text={clipboardValue.reviewLink}
                                onCopy={() => {
                                    setClipboardValue({
                                        ...clipboardValue,
                                        copied: true,
                                    });

                                    console.log(
                                        "Copied",
                                        clipboardValue.reviewLink,
                                        clipboardValue.copied
                                    );
                                }}
                            >
                                <div className="copy-link-btn">
                                    <ToolTip
                                        content="Copied!"
                                        direction="top"
                                        link={clipboardValue.reviewLink}
                                    >
                                        {/* <FontAwesomeIcon icon="link" /> */}
                                        <span className="copy-tooltip">
                                            Copy
                                        </span>
                                    </ToolTip>
                                </div>
                            </CopyToClipboard>
                        </div>
                    )}
                    <div
                        disabled={!linkState.reviewLink ? true : false}
                        className="review-page"
                        onClick={handleShowReviewPage}
                    >
                        {linkState.reviewLink
                            ? "Show Review Page"
                            : "Create Link \n to show Review Page"}
                    </div>
                    <div
                        className="photos-link"
                        onClick={() => setDisplayPhotos(!displayPhotos)}
                    >
                        {!displayPhotos
                            ? "See All (" + photoUrls.length + ") Photos"
                            : "Close Photo Display"}
                    </div>
                </div>
            </div>

            {/* Section - Photo */}

            <div
                className="photos"
                style={{ display: displayPhotos ? "flex" : "none" }}
            >
                {photoUrls &&
                    photoUrls.map((photoUrl, index) => {
                        return (
                            <div>
                                <img
                                    key={index}
                                    alt="Local"
                                    src={photoUrl || ""}
                                />
                            </div>
                        );
                    })}
            </div>

            {/* Section - See Reviews */}
            <div
                className="review-container"
                style={{ display: displayReviews ? "flex" : "none" }}
            >
                {reviews &&
                    reviews.map((review, index) => {
                        return (
                            <div className="review-wrapper" key={index}>
                                <p>Author: {review.author_name}</p>
                                <p>Rating: {review.rating}</p>
                                <p>Review: {review.text}</p>
                            </div>
                        );
                    })}
            </div>

            {/* Section - Enter Manual Pid */}

            <div
                className="manual-pid"
                style={{ display: displayManualPid ? "block" : "none" }}
            >
                <h3>Business Not Found on Google API?</h3>
                <p>Enter Google Place Id (PID) Below 👇</p>

                <input
                    onChange={handlePidChange}
                    placeholder="Enter Place ID"
                    value={pid}
                />
                <p>
                    Back to AutoComplete,{" "}
                    <span
                        className="activate-link"
                        onClick={() => setdisplayManualPid(false)}
                    >
                        <u>CLICK HERE</u>
                    </span>
                </p>
            </div>
            <div id="map"></div>
        </div>
    );
}

export default Search;
