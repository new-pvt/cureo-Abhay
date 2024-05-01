import React, { useState } from "react";
import AppointmentSettingContext from "./AppointmentSettingsContext";
import moment from "moment";
import {useParams} from 'react-router-dom'

const AppointmentSettingContextProvider = ({ children }) => {
    const { doctorId } = useParams();
    // console.log(doctorId)
    const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
    const [doctor, setDoctor] = useState({});
    const [appointmentBy, setAppointmentBy] = useState("token");
   
    return (
        <AppointmentSettingContext.Provider
            value={{ appointmentBy, setAppointmentBy, doctor, setDoctor, date, setDate }}
        >
            {children}
        </AppointmentSettingContext.Provider>
    );
};

export default AppointmentSettingContextProvider;
