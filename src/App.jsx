import React, { memo } from "react";
import { useSelector } from "react-redux";
import Patient from "./Patients/Patient";
import Doctor from "./Doctors/Doctor";
import { Toaster } from "react-hot-toast";
import Hospital from "./Hospitals/Hospital";

const App = () => {
    const { user, isLoggedIn } = useSelector((state) => state.auth);

    return (
        <div className="">
            <Toaster toastOptions={{
                success:{
                    duration:5000
                }
            }} />
            {isLoggedIn && user?.role == "DOCTOR" && <Doctor />}
            {isLoggedIn && user?.role == "MASTER" && <Hospital />}
            {isLoggedIn && user?.role == "PATIENT" && <Patient />}
            {!isLoggedIn && !user && <Patient />}
        </div>
    );
};

export default memo(App);
