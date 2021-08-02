import React, { useState, useContext } from "react";

import UserContext from "../context/user";

// Paypal Checkout package
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

import { useHistory, Link } from "react-router-dom";

import axios from "axios";

import Logo from "../images/logo_w_name.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

        // Simple Form Validation
        if (userData.email === "" || userData.password === "") {
            setUserData({
                ...userData,
                errorMessage: "Fields Cannot Be Empty",
            });
        } else {
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
        }
        // history.push("/search");
    };

    console.log("User Signup: ", userData);

    const [{ isPending }] = usePayPalScriptReducer();

    console.log("isPending", isPending);

    const [capturedDetails, setCapture] = useState();

    const [isPurchasing, setPurchasing] = useState(false);

    return (
        <div className="form__container">
            <div className="logo__container">
                <img src={Logo} alt="logo" />
            </div>
            <div>Signup</div>
            {/* Error Message */}
            {userData.errorMessage && (
                <div className="error__msg">
                    <FontAwesomeIcon
                        className="error-icon"
                        icon="exclamation-triangle"
                    />
                    {"  " + userData.errorMessage}
                </div>
            )}
            <div className="form__group field">
                <input
                    type="input"
                    className="form__field"
                    placeholder="First Name"
                    name="name"
                    id="name"
                    required
                    onChange={handleInputChange}
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

            <div
                className="auth__btn"
                disabled={userData.isSubmitting ? true : false}
                onClick={handleSignup}
            >
                {userData.isSubmitting ? "Loading..." : "Signup"}
            </div>

            <div className="redirect__link">
                <Link className="link" to="/login">
                    Already have an account? Login
                </Link>
            </div>
            <div className="copyright">{Copyright()}</div>

            {isPurchasing ? (
                <div>Processing Payment...</div>
            ) : (
                <PayPalButtons
                    style={{ layout: "vertical" }}
                    createOrder={(data, actions) => {
                        return actions.order.create({
                            purchase_units: [
                                {
                                    amount: {
                                        value: "2.00",
                                    },
                                },
                            ],
                        });
                    }}
                    onApprove={async (data, actions) => {
                        return await actions.order
                            .capture()
                            .then((approvedDetails) => {
                                setCapture(approvedDetails);

                                console.log(
                                    "Transaction Complete: ",
                                    approvedDetails
                                );

                                console.log(
                                    "Approved Details: ",
                                    approvedDetails
                                );
                            });
                    }}
                />
            )}
        </div>
    );
}

export default Signup;
