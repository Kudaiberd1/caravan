import {Navigate, Outlet} from "react-router-dom";

function isTokenExpired(token: string): boolean {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const exp = payload?.exp;

        if (typeof exp !== 'number') return false;

        return exp <= Math.floor(Date.now() / 1000);
    } catch {
        return true;
    }
}

export default function ProtectedRoute() {
    const token = localStorage.getItem('accessToken');
    const auth=true;

    if (!token && !auth) {
        return <Navigate to="/login" replace />;
    }



    if (isTokenExpired(token) && !auth) {
        localStorage.removeItem('accessToken');
        return <Navigate to="/login" replace />;
    }
    return <Outlet />;
}