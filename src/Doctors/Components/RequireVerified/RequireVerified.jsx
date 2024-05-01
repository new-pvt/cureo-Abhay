import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const RequireVerified = () => {
    const { user } = useSelector((state) => state.auth);

    console.log(user?.verification?.status == "verified");

    return user?.verification?.status == "verified" ? (
        <Outlet />
    ) : (
        <Navigate to="/doctor/create-profile" />
    );
};

export default RequireVerified;
