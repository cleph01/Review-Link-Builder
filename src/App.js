import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import UserContext from "./context/user";

const Home = lazy(() => import("./pages/Home.js"));
const Search = lazy(() => import("./pages/Search.js"));
const NotFound = lazy(() => import("./pages/Not-Found.js"));
const Login = lazy(() => import("./pages/Login.js"));
const Signup = lazy(() => import("./pages/Signup.js"));

function App() {
    return (
        <Router>
            <Suspense fallback={<p>Loading...</p>}>
                <Switch>
                    <Route exact path={ROUTES.HOME} component={Home} />
                    <Route exact path={ROUTES.LOGIN} component={Login} />
                    <Route exact path={ROUTES.SIGN_UP} component={Signup} />
                    <Route path={ROUTES.SEARCH} component={Search} />
                    <Route component={NotFound} />
                </Switch>
            </Suspense>
        </Router>
    );
}

export default App;
