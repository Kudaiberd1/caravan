import { Routes, Route } from "react-router-dom";
import Login from "../pages/login/Login.tsx";
import ForgotPassword from "../pages/login/ForgotPassword.tsx";
import VerificationCode from "../pages/login/VerificationCode.tsx";
import ResetPassword from "../pages/login/ResetPassword.tsx";
import SuccessReset from "../pages/login/SuccessReset.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";
import Dashboard from "../pages/Dashboard.tsx";
import Performance from "../pages/performance/Performance.tsx";
import Reports from "../pages/Reports.tsx";
import UserProfile from "../pages/UserProfile.tsx";
import SupervisorProfile from "../pages/SupervisorProfile.tsx";

function App() {

  return (
    <Routes>
        <Route path={"/login"} element={<Login />} />
        <Route path={"/forgot-password"} element={<ForgotPassword />} />
        <Route path={"/verification-code"} element={<VerificationCode />} />
        <Route path={"/reset-password"} element={<ResetPassword />} />
        <Route path={"/success-reset"} element={<SuccessReset />} />
        <Route element={<ProtectedRoute />}>
            <Route path={"/"} element={<Dashboard />} />
            <Route path={"/performance"} element={<Performance />} />
            <Route path={"/reports"} element={<Reports />} />
            <Route path={"/user/:id"} element={<UserProfile />} />
            <Route path={"/user/supervisor/:id"} element={<SupervisorProfile />} />
        </Route>
    </Routes>
  )
}

export default App
