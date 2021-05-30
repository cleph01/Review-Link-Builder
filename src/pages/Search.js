import { useState, useEffect, useRef } from "react";

import GOOGLE_API_KEY from "../constants/key";

import "../styles/google-places.css";

function Search() {
    const [loaded, setLoaded] = useState(false);
    const [query, setQuery] = useState("");
    const [pid, setPid] = useState("");
    const autoCompleteRef = useRef(null);

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
        setQuery(queryResult);
        console.log("Query Result: ", queryResult);
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
        <div>
            <input
                ref={autoCompleteRef}
                onChange={handleOnChange}
                placeholder="Enter a Business Name"
                value={query.name}
            />

            <hr />

            <p>If Business Not Found on Google API, Enter PID below</p>

            <input
                onChange={handlePidChange}
                placeholder="Enter Place ID"
                value={pid}
            />
        </div>
    );
}

export default Search;
