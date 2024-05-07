import React, { useState } from "react";
import SettingsContext from "./SettingsContext";
import { useSelector } from "react-redux";

const SettingContextProvider = ({ children }) => {
    const { doctor } = useSelector((state) => state.doctorsData);
    console.log(doctor?.acceptAppointments);
    const [appointmentBy, setAppointmentBy] = useState(
        doctor?.acceptAppointments == "bySlot" ? "slot" : "token"
    );

    return (
        <SettingsContext.Provider value={{ appointmentBy, setAppointmentBy }}>
            {children}
        </SettingsContext.Provider>
    );
};

export default SettingContextProvider;
