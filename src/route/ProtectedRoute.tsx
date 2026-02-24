import {Outlet} from "react-router-dom";

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
    // const token = localStorage.getItem('accessToken');

    return <Outlet />;

    isTokenExpired("")

    // if (!token) {
    //     return <Navigate to="/login" replace />;
    // }
    //
    //
    //
    // if (isTokenExpired(token)) {
    //     localStorage.removeItem('accessToken');
    //     return <Navigate to="/login" replace />;
    // }
}