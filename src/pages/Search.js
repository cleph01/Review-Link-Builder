import { useState, useEffect } from "react";

import GOOGLE_API_KEY from "../constants/key";

function Search() {
    const [loaded, setLoaded] = useState(false);
    const [query, setQuery] = useState("");
    const autoCompleteRef = useRef(null);

    const handleOnChange = (event) => {
        setQuery(event.target.value);
    };

    const handlePlaceSelect = async setQuery => {

        const businessObject = await autoComplete.getPlace();


    }

    useEffect(() => {
        const scriptTag = document.createElement("script");
        scriptTag.src = GOOGLE_API_KEY;
        scriptTag.addEventListener("load", () => setLoaded(true));
        document.body.appendChild(scriptTag);
    }, []);

    useEffect(() => {
        if (!loaded) return;

        // Script is Loaded
        // Perform Google API call here
        const autoComplete = new window.google.maps.places.Autocomplete(
            autoCompleteRef.current,
            { fields: ['place_id', 'name', 'formatted_address', 'formatted_phone_number', ] }
          );
          autoComplete.setFields(["address_components", "formatted_address"]);
          autoComplete.addListener("place_changed", () =>
            handlePlaceSelect(updateQuery)
          );

    }, [loaded]);

    return (
        <div>
            <input
                ref={autoCompleteRef}
                onChange={handleOnChange}
                placeholder="Enter a Business Name"
                value={query}
            />
            <p>Search Page! {GOOGLE_API_KEY}</p>
        </div>
    );
}

export default Search;
