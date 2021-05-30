import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as ROUTES from "./constants/routes";

const Search = lazy(() => import("./pages/Search.js"));
const NotFound = lazy(() => import("./pages/Not-Found.js"));

function App() {
    return (
        <Router>
            <Suspense fallback={<p>Loading...</p>}>
                <Switch>
                    <Route path={ROUTES.SEARCH} component={Search} />
                    <Route component={NotFound} />
                </Switch>
            </Suspense>
        </Router>
    );
}

export default App;
