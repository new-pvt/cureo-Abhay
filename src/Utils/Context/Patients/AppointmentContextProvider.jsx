import React, { memo, useState } from "react";
import AppointmentContext from "./AppointmentContext";
import { useSelector } from "react-redux";
import moment from "moment";
import {
    SELECTED_HOSPITAL,
    getSessionItem,
} from "../../SessionStorage/appointmentForm";

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
        name: user?.name ? user.name : "",
        age: user?.age ? user.age : "",
        gender: user?.gender ? user.gender : "",
        phone: user?.phone ? user.phone : "",
        email: user?.email ? user.email : "",
        userid: user?._id,
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
