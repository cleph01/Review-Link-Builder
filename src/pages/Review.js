// import { Link } from "react-router";
import React, { useState } from "react";

import { useParams, useLocation } from "react-router-dom";

import { CopyToClipboard } from "react-copy-to-clipboard";

import { isChrome } from "react-device-detect";

import "../styles/review-page.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ToolTip from "../components/ToolTip";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function Review() {
    const { placeId } = useParams();

    const query = useQuery();

    const businessName = query.get("b").replace("-", " ");

    const reviewLink = `https://ThankYou.SmartSeed.com/${query.get("l")}`;

    const googleUrl = `https://search.google.com/local/writereview?placeid=${placeId}`;

    const [clipboardValue, setClipboardValue] = useState({
        reviewLink: reviewLink,
    });

    console.log("Is Chrome: ", isChrome);
    return (
        <div className="container">
            <div className="header">
                <div className="btn">
                    <CopyToClipboard
                        text={clipboardValue.reviewLink}
                        // text="boo"
                        onCopy={() => {
                            setClipboardValue({
                                ...clipboardValue,
                                copied: true,
                            });

                            console.log("Copied", clipboardValue);
                        }}
                    >
                        <div>
                            <ToolTip
                                content="Copied!"
                                direction="top"
                                link={reviewLink}
                            >
                                {/* <FontAwesomeIcon icon="link" /> */}
                                Copy Link
                            </ToolTip>
                        </div>
                    </CopyToClipboard>
                </div>
                <div className="btn">
                    <a
                        href={`sms:&body=Here%27s%20Your%20Link:%20${
                            " " + reviewLink
                        }`}
                    >
                        Send Text
                    </a>
                    {/* <a href={`sms:&body=link`}>Send Text</a> */}
                </div>
            </div>

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
