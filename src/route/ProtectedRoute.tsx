import {Navigate, Outlet} from "react-router-dom";

export default function ProtectedRoute() {
    const isAuth = true;

    if (!isAuth) {
        return <Navigate to="/login"/>;
    }
    return <Outlet />;
}