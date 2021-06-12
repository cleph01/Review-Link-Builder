import React from "react";

// Takes visitor to map page
// https://www.google.com/maps/search/?api=1&query=<address>&query_place_id=<placeId>

// Take visitor to write a review interface
// https://search.google.com/local/writereview?placeid=<place_id>

import LinkResult from "../components/LinkResult";

const links = [
    {
        businessName: "ACME",
        address: "123 Main St., Stamford, CT 06830",
        placeId: "placeId-1",
        mapLink: "map-link-1",
        photUrl:
            "https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sATtYBwIbQNX62gzaDPB8Mvrv4YVsQS2P2O1JkigQVyAbPqdKe3SHDv4c05znH2IS2u1j22JZIBsT2BR6ZQTMxFXAnoOFQ79GLR7boizHOEwyoaorCMa4mfuCgooOvbSxZCTA1NaUYZBUL4XqF6PwLe--_Pd6Z1eEwiJp6Y9zLqxq5MmhBU76&amp;3u350&amp;4u350&amp;5m1&amp;2e1&amp;callback=none&amp;key=AIzaSyDk80PqHyEMq3a1Ow8vNusNPw1yn5vMNoE&amp;token=87838",
    },
    {
        businessName: "Fratellis",
        address: "345 South St., Stamford, CT 06830",
        placeId: "placeId-2",
        mapLink: "map-link-2",
        photoUrl:
            "https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sATtYBwIbQNX62gzaDPB8Mvrv4YVsQS2P2O1JkigQVyAbPqdKe3SHDv4c05znH2IS2u1j22JZIBsT2BR6ZQTMxFXAnoOFQ79GLR7boizHOEwyoaorCMa4mfuCgooOvbSxZCTA1NaUYZBUL4XqF6PwLe--_Pd6Z1eEwiJp6Y9zLqxq5MmhBU76&amp;3u350&amp;4u350&amp;5m1&amp;2e1&amp;callback=none&amp;key=AIzaSyDk80PqHyEMq3a1Ow8vNusNPw1yn5vMNoE&amp;token=87838",
    },
];

function Profile() {
    return (
        <div className="container">
            <div className="link-list">
                {links.map((link) => {
                    return <LinkResult business={link} />;
                })}
            </div>
        </div>
    );
}

export default Profile;
