import { useState, useEffect, useRef } from "react";

import GOOGLE_API_KEY from "../constants/key";

import "../styles/google-places.css";
import "../styles/search.scss";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import axios from "axios";

const useStyles = makeStyles({
    root: {
        width: "90%",
    },
    media: {
        height: 340,
    },
});

function Search() {
    const classes = useStyles();

    const [loaded, setLoaded] = useState(false);
    const [query, setQuery] = useState({});
    const [pid, setPid] = useState("");
    const [photoUrls, setPhotoUrl] = useState([]);
    const [reviews, setReviews] = useState({});
    const autoCompleteRef = useRef(null);

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

        // if response status is ok
        if (queryResult.photos) {
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
                        console.log(place.reviews);

                        setReviews(place.reviews);
                    }
                }
            );
        } else {
            console.log("BAD RESPONSE OBJECT AT PHOTOS");
        }

        console.log("Query Result: ", queryResult);
        console.log("Photos Array: ", photoUrls);
        console.log("Reviews: ", reviews);
    };

    // Load Google Script
    useEffect(() => {
        const scriptTag = document.createElement("script");
        scriptTag.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places`;
        scriptTag.addEventListener("load", () => setLoaded(true));
        document.body.appendChild(scriptTag);
    }, []);

    // If Script Loaded, Initialize AutoComplete Object
    useEffect(() => {
        if (!loaded) return;

        console.log("Loaded: ", loaded);
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

        // autoComplete.setFields(["address_components", "formatted_address"]);

        autoComplete.addListener("place_changed", () =>
            handlePlaceSelect(autoComplete)
        );
    }, [loaded]);

    return (
        <div className="container">
            {/* Section - Google AutoComplete */}
            <div
                className="autocomplete"
                style={{ display: !displayManualPid ? "block" : "none" }}
            >
                <div>
                    <h3>Enter Name of Business below 👇</h3>
                </div>
                <label>Google Business Search Bar:</label>
                <input
                    className="container__input"
                    ref={autoCompleteRef}
                    onChange={handleOnChange}
                    placeholder="Enter a Business Name"
                    value={query.name}
                />

                <div>
                    <p>
                        If Business Not Found on Google API,{" "}
                        <span
                            style={{ onHover: "pointer" }}
                            onClick={() => setdisplayManualPid(true)}
                        >
                            <u>Click Here</u>
                        </span>
                    </p>
                </div>
                <div>
                    <Card className={classes.root}>
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image={
                                    photoUrls[0] ||
                                    "https://lh3.googleusercontent.com/EbXw8rOdYxOGdXEFjgNP8lh-YAuUxwhOAe2jhrz3sgqvPeMac6a6tHvT35V6YMbyNvkZL4R_a2hcYBrtfUhLvhf-N2X3OB9cvH4uMw=w1064-v0"
                                }
                                title="Contemplative Reptile"
                            />
                            <CardContent>
                                <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="h2"
                                >
                                    <div>{query.name || "Business Name"}</div>
                                    <div>
                                        {query.formatted_address ||
                                            "Business Address"}
                                    </div>
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    component="p"
                                >
                                    There are {reviews.length || "0"} reviews.
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary">
                                Create Link
                            </Button>
                            <Button
                                size="small"
                                color="primary"
                                onClick={() => setDisplayPhotos(!displayPhotos)}
                            >
                                See All ({photoUrls.length}) Photos
                            </Button>
                        </CardActions>
                    </Card>
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
            <hr />

            {/* Section - Enter Manual Pid */}

            <div
                className="manual-pid"
                style={{ display: displayManualPid ? "block" : "none" }}
            >
                <p>Enter Google Place Id (PID) Below:</p>

                <input
                    onChange={handlePidChange}
                    placeholder="Enter Place ID"
                    value={pid}
                />
                <p>
                    Back to AutoComplete,{" "}
                    <span onClick={() => setdisplayManualPid(false)}>
                        <u>CLICK HERE</u>
                    </span>
                </p>
            </div>
            <div id="map"></div>
        </div>
    );
}

export default Search;
