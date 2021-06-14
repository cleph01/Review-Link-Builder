import { lazy, Suspense, useReducer } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import UserContext from "./context/user";

// START import protected Routes
import {
    SearchRoute,
    ProfileRoute,
} from "./protected-routes/protected-routes.js";
// END import protected Routes

// START FontAwesome
import { library } from "@fortawesome/fontawesome-svg-core";

import {
    faCheckSquare,
    faCoffee,
    faSearch,
    faBars,
} from "@fortawesome/free-solid-svg-icons";

library.add(faBars, faSearch);
// END FontAwesome

// START Lazy Rendering functions
const Home = lazy(() => import("./pages/Home.js"));
const Search = lazy(() => import("./pages/Search.js"));
const NotFound = lazy(() => import("./pages/Not-Found.js"));
const Login = lazy(() => import("./pages/Login.js"));
const Signup = lazy(() => import("./pages/Signup.js"));
const Profile = lazy(() => import("./pages/Profile.js"));
// END Lazy Rendering functions

// START Reducer function
const reducer = (state, action) => {
    switch (action.type) {
        case "SIGNUP":
            localStorage.setItem("user", JSON.stringify(action.payload.id[0]));
            localStorage.setItem("token", JSON.stringify(action.payload.token));

            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
                token: action.payload.token,
            };

        case "LOGIN":
            console.log("LOGIN PAYLOAD: ", action.payload);

            localStorage.setItem("user", JSON.stringify(action.payload.id));
            localStorage.setItem("token", JSON.stringify(action.payload.token));

            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
                token: action.payload.token,
            };

        case "LOGOUT":
            localStorage.clear();
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            };

        default:
            return state;
    }
};
// END Reducer function

const initialState = {
    isAuthenticated: false,
    user: null,
    token: null,
};

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);

    console.log("Load up: ", state);

    return (
        <UserContext.Provider value={{ state, dispatch }}>
            <Router>
                <Suspense fallback={<p>Loading...</p>}>
                    <Switch>
                        <Route exact path={ROUTES.HOME} component={Home} />
                        <Route path={ROUTES.LOGIN} component={Login} />
                        <Route path={ROUTES.SIGN_UP} component={Signup} />

                        <SearchRoute path={ROUTES.SEARCH} component={Search} />
                        <ProfileRoute
                            path={ROUTES.PROFILE}
                            component={Profile}
                        />

                        {/* <Route path={ROUTES.SEARCH} component={Search} />
                        <Route path={ROUTES.PROFILE} component={Profile} /> */}

                        <Route component={NotFound} />
                    </Switch>
                </Suspense>
            </Router>
        </UserContext.Provider>
    );
}

export default App;
