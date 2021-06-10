import React from "react";

import { useHistory } from "react-router-dom";

import "../styles/home.scss";

import logo from "../images/logo_w_name.png";
import salesman from "../images/salesman.jpg";

function Home() {
    const history = useHistory();

    return (
        <div className="container">
            <div className="header">
                <div className="logo">
                    <img src={logo} alt="logo" />
                </div>
                <div className="menu-wrapper">
                    <ul className="menu">
                        <li>Why?</li>
                        <li>FAQ</li>
                        <li>Testimonials</li>
                    </ul>
                </div>
            </div>
            <div className="body-wrapper">
                <div className="left-wrapper">
                    <h3>Win a Prospects Trust With Value</h3>
                    <p>
                        Smartseed's Review Link Builder helps build rapport from
                        the jump. Show them you care enough about their business
                        to put their interests first.
                    </p>
                    <div className="auth-buttons">
                        <button onClick={() => history.push("/login")}>
                            Login
                        </button>
                        <button onClick={() => history.push("/signup")}>
                            Signup
                        </button>
                    </div>
                </div>
                <div className="right-wrapper">
                    <img src={salesman} alt="Salesman" />{" "}
                </div>
            </div>
        </div>
    );
}

export default Home;
