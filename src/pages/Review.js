// import { Link } from "react-router";
import { useParams, useLocation } from "react-router-dom";

import "../styles/review-page.scss";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function Review() {
    const { placeId } = useParams();

    const query = useQuery();

    const businessName = query.get("b").replace("-", " ");

    const googleUrl = `https://search.google.com/local/writereview?placeid=${placeId}`;

    return (
        <div className="container">
            <h2 className="business-name">{businessName}</h2>
            <p>Would Like to thank you for being an amazing customer</p>
            <div className="smiley">😃</div>
            <p>Please Click Below To leave a Google Review</p>
            <a
                className="review-button"
                target="_blank"
                rel="noreferrer noopener"
                href={googleUrl}
            >
                <div>Google Review Button</div>
            </a>
        </div>
    );
}

export default Review;
