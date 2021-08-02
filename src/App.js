import { lazy, Suspense, useReducer } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import UserContext from "./context/user";
import BusinessContext from "./context/business";

// START import protected Routes
import {
    SearchRoute,
    ProfileRoute,
    ReviewRoute,
} from "./protected-routes/protected-routes.js";
// END import protected Routes

import AuthReducer from "./reducers/auth-reducer/auth-reducer.js";
import BusinessReducer from "./reducers/business-reducer/business-reducer.js";

// Paypal Checkout package
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

// START FontAwesome
import { library } from "@fortawesome/fontawesome-svg-core";

import {
    faCheckSquare,
    faCoffee,
    faSearch,
    faBars,
    faLink,
    faExclamationTriangle,
    faCheckCircle,
    faSpinner
} from "@fortawesome/free-solid-svg-icons";

library.add(faBars, faSearch, faLink, faExclamationTriangle, faCheckCircle, faSpinner);
// END FontAwesome

// START Lazy Rendering functions
const Home = lazy(() => import("./pages/Home.js"));
const Search = lazy(() => import("./pages/Search.js"));
const NotFound = lazy(() => import("./pages/Not-Found.js"));
const Login = lazy(() => import("./pages/Login.js"));
const Signup = lazy(() => import("./pages/Signup.js"));
const Profile = lazy(() => import("./pages/Profile.js"));
const Review = lazy(() => import("./pages/Review.js"));
// END Lazy Rendering functions

const initialState = {
    isAuthenticated: false,
    id: null,
    token: null,
    name: null,
};

function App() {
    const [state, dispatch] = useReducer(AuthReducer, initialState);

    console.log("Load up: ", state);

    const initialOptions = {
        "client-id":
            "ARaJiZis6nTJDNMxvi4MmqTIFLH0Bo3f9x3jbovK3fgcfDYcnbUhh7RUAdPbPXlUvtH6NmcluqsAawLn",
        currency: "USD",
        intent: "capture",
    };

    return (
        <PayPalScriptProvider options={initialOptions}>
            <UserContext.Provider value={{ state, dispatch }}>
                <Router>
                    <Suspense fallback={<p>Loading...</p>}>
                        <Switch>
                            <Route exact path={ROUTES.HOME} component={Home} />
                            <Route path={ROUTES.LOGIN} component={Login} />
                            <Route path={ROUTES.SIGN_UP} component={Signup} />

                            <SearchRoute
                                path={ROUTES.SEARCH}
                                component={Search}
                            />
                            <ProfileRoute
                                path={ROUTES.PROFILE}
                                component={Profile}
                            />
                            <ReviewRoute
                                path={ROUTES.REVIEW_PAGE}
                                component={Review}
                            />
                            {/* <Route path={ROUTES.SEARCH} component={Search} />
                        <Route path={ROUTES.PROFILE} component={Profile} /> */}

                            <Route component={NotFound} />
                        </Switch>
                    </Suspense>
                </Router>
            </UserContext.Provider>
        </PayPalScriptProvider>
    );
}

export default App;
