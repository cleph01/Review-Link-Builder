import React, { useState, useContext } from "react";

import UserContext from "../context/user";

import { useHistory, Link } from "react-router-dom";

import axios from "axios";

import Logo from "../images/logo_w_name.png";

import "../styles/auth.scss";

function Copyright() {
    return (
        <div>
            {"Copyright © "}
            <a href="https://smartseedtech.com/">SmartSeed LLC</a>{" "}
            {new Date().getFullYear()}
            {"."}
        </div>
    );
}

function Signup() {
    const history = useHistory();

    const { dispatch } = useContext(UserContext);

    const initialState = {
        name: "",
        email: "",
        password: "",
        isSubmitting: false,
        errorMessage: null,
    };

    const [userData, setUserData] = useState(initialState);

    const handleInputChange = (event) => {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        setUserData({
            ...userData,
            isSubmitting: true,
            errorMessage: null,
        });

        await axios
            .post("http://localhost:5000/api/auth/signup", {
                name: userData.name,
                email: userData.email,
                password: userData.password,
            })
            .then((res) => {
                if (res.status === 201) {
                    return res.data;
                } else {
                    console.log("Response Error: ", res);
                    throw res;
                }
            })
            .then((responseData) => {
                const { message } = responseData;

                console.log("Succes Message: ", message);

                dispatch({
                    type: "SIGNUP",
                    payload: message,
                });

                history.push("/search");
            })
            .catch((error) => {
                console.log("Axios Post Error: ", error);
                setUserData({
                    ...userData,
                    isSumbitting: false,
                    errorMessage: error.message || error.statusText,
                });
            });

        // history.push("/search");
    };

    console.log("User Signup: ", userData);

    return (
        <div className="form__container">
            <div className="logo__container">
                <img src={Logo} alt="logo" />
            </div>
            <div>Signup</div>
            <div className="form__group field">
                <input
                    type="input"
                    className="form__field"
                    placeholder="First Name"
                    name="name"
                    id="name"
                    required
                />
                <label htmlFor="email" className="form__label">
                    First Name
                </label>
            </div>
            <div className="form__group field">
                <input
                    type="input"
                    className="form__field"
                    placeholder="Email"
                    name="email"
                    id="email"
                    required
                />
                <label htmlFor="email" className="form__label">
                    Email
                </label>
            </div>
            <div className="form__group field">
                <input
                    type="input"
                    className="form__field"
                    placeholder="Password"
                    name="password"
                    id="password"
                    required
                />
                <label htmlFor="password" className="form__label">
                    Password
                </label>
            </div>

            <div className="auth__btn">
                {userData.isSubmitting ? "Loading..." : "Signup"}
            </div>

            <div className="redirect__link">
                <Link className="link" to="/login">
                    Already have an account? Login
                </Link>
            </div>
            <div className="copyright">{Copyright()}</div>
        </div>
    );
}

export default Signup;
