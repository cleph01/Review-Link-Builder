import React, { useState, useContext } from "react";

import UserContext from "../context/user";

import { Link, useHistory } from "react-router-dom";

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

function Login() {
    const history = useHistory();

    const { state, dispatch } = useContext(UserContext);

    const initialState = {
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

    const handleLogin = async (e) => {
        e.preventDefault();

        setUserData({
            ...userData,
            isSubmitting: true,
            errorMessage: null,
        });

        await axios
            .post("http://localhost:5000/api/auth/login", {
                email: userData.email,
                password: userData.password,
            })
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

                dispatch({
                    type: "LOGIN",
                    payload: responseData,
                });

                history.push("/search");
            })
            .catch((error) => {
                console.log("Axiox error: ", error.response.data);

                if (error.response.status === 401) {
                    setUserData({
                        ...userData,
                        isSumbitting: false,
                        errorMessage: error.response.data,
                    });
                } else {
                    setUserData({
                        ...userData,
                        isSumbitting: false,
                        errorMessage: error.message || error.statusText,
                    });
                }
            });
    };

    console.log("State: ", state);

    return (
        <div className="form__container">
            <div className="logo__container">
                <img src={Logo} alt="logo" />
            </div>
            <div>Login</div>
            <div className="form__group field">
                <input
                    type="input"
                    className="form__field"
                    placeholder="Email"
                    name="email"
                    id="email"
                    required
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
                />
                <label htmlFor="password" className="form__label">
                    Password
                </label>
            </div>
            <div className="auth__btn" onClick={handleLogin}>
                {userData.isSubmitting ? "Loading..." : "Login"}
            </div>
            <div className="redirect__link">
                <Link className="link" to="/signup">
                    Don't have an account? Signup
                </Link>
            </div>
            <div className="copyright">{Copyright()}</div>
        </div>
    );
}

export default Login;
