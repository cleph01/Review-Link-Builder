import React, { useEffect } from "react";

function NotFound() {
    useEffect(() => {
        document.title = "Not Found - Review Link Builder";
    }, []);

    return <p className="text-center text-2xl">Not Found!</p>;
}

export default NotFound;
