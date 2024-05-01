import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const RequireVerified = () => {
    const { user } = useSelector((state) => state.auth);

    return user?.verification?.status == "verified" ? (
        <Outlet />
    ) : (
        <Navigate to="/hospital/create-profile" />
    );
};

export default RequireVerified;
