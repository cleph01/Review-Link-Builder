import React, { useState, useContext } from "react";

import UserContext from "../context/user";

import { useHistory } from "react-router-dom";

import axios from "axios";

// START Material-UI imports
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
// END Material-UI imports

import "../styles/auth.scss";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https://smartseedtech.com/">
                SmartSeed LLC
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function Login() {
    const classes = useStyles();

    const history = useHistory();

    const { dispatch } = useContext(UserContext);

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

                history.push('/search');
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

    console.log("User: ", userData);

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar} alt="User"></Avatar>
                <Typography component="h1" variant="h5">
                    Log in
                </Typography>
                <form className={classes.form} noValidate>
                    {userData.errorMessage && (
                        <div className="form-error">
                            {userData.errorMessage}
                        </div>
                    )}
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={handleInputChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={handleInputChange}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleLogin}
                        disabled={userData.isSubmitting}
                    >
                        {userData.isSubmitting ? "Loading..." : "Login"}
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/signup" variant="body2">
                                Don't have an account? Sign Up
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}

export default Login;
