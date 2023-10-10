import { Route, Routes } from "react-router-dom";
import Home from "../screens/Home";
import ROUTE_URL from "./routeUrl";

interface IRouteProps {
    path: string;
    component: JSX.Element;
}

const routes: IRouteProps[] = [
    { path: ROUTE_URL.HOME, component: <Home />, },
    { path: ROUTE_URL.WILDCARD, component: <Home />, },
];

function ConfigureRoute() {
    return (
        <Routes>
            {routes.map((route, index) => <Route key={index} path={route.path} element={route.component} />)}
        </Routes>
    );
}

export default ConfigureRoute;
