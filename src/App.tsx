import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login.tsx";
import ForgotPassword from "./pages/ForgotPassword.tsx";
import VerificationCode from "./pages/VerificationCode.tsx";
import ResetPassword from "./pages/ResetPassword.tsx";
import SuccessReset from "./pages/SuccessReset.tsx";

function App() {

  return (
    <Routes>
        <Route path={"/login"} element={<Login />} />
        <Route path={"/forgot-password"} element={<ForgotPassword />} />
        <Route path={"/verification-code"} element={<VerificationCode />} />
        <Route path={"/reset-password"} element={<ResetPassword />} />
        <Route path={"/success-reset"} element={<SuccessReset />} />
    </Routes>
  )
}

export default App
