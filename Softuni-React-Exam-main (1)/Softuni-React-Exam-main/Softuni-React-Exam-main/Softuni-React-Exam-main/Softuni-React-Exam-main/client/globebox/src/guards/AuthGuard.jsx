import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Navigate, Outlet } from "react-router";

export default function AuthGuard() {
    const {accessToken} = useContext(UserContext)

    const isAuthenticated = !!accessToken;

    if(!isAuthenticated) {
        return <Navigate to="/login" />
    }

    return <Outlet />;
};