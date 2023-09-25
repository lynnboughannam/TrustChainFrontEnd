import React from "react";
import { Navigate } from "react-router-dom";

const AuthGuard = ({ children, allowedRoles }) => {
    const userRole = localStorage.getItem("userRole");

    if (!userRole || !allowedRoles.includes(userRole)) {
        return <Navigate to="/" />;
    }

    return children;
};

export default AuthGuard;
