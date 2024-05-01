import React, { memo, useState } from "react";
import AppointmentContext from "./AppointmentContext";
import { useSelector } from "react-redux";
import moment from "moment";


const AppointmentContextProvider = ({ children }) => {
    const { user } = useSelector((state) => state.auth);

    const [appointmentBookingDetails, setAppointmentBookingDetails] = useState({
        nameOfTheDoctor: "",
        doctorsId: "",
        appointmentDate: moment().format("DD MMM, ddd"),
        selectedHospital: "",
        acceptAppointments: null,
        consultingTime: "",
        hospitalId: "",
        doctorid: "",
        AppointmentNotes: "",
        AppointmentTime: "",
        imgurl: "",
        connsultationFee: "",
        location: "",
        hospitalName: "",
        name: "",
        age: "",
        gender: "",
        phone: "",
        email: "",
        userid: "",
        role: user?.role,
    });

    return (
        <AppointmentContext.Provider
            value={{ appointmentBookingDetails, setAppointmentBookingDetails }}
        >
            {children}
        </AppointmentContext.Provider>
    );
};

export default memo(AppointmentContextProvider);
