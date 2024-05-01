import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import HospitalHome from "./Pages/HospitalHome";
import HospitalNavbar from "./Components/Navbar/HospitalNavbar";
import CreateProfile from "./Pages/CreateProfile";
import Verification from "./Pages/Verification";
import Management from "./Pages/Management";
import Doctors from "./Pages/Doctors";
import Appointments from "./Pages/Appointments";
import AddDoctorContextProvider from "../Utils/Context/Hospital/AddDoctorContextProvider";
import AddStaffContextProvider from "../Utils/Context/Hospital/AddStaffContextProvider";
import MangementContextProvider from "../Utils/Context/Hospital/Management/MangementContextProvider";
import EditDoctor from "./Pages/EditDoctor";
import BookAppoitment from "./Pages/BookAppoitment";
import AppointmentContextProvider from "../Utils/Context/Hospital/BookAppointment/AppointmentContextProvider";
import DoctorDetails from "./Pages/DoctorDetails";
import NotFound from "../Common/Components/NotFound/NotFound";
import AppointmentSettings from "./Pages/AppointmentSettings";
import AppointmentSettingContextProvider from "../Utils/Context/Hospital/AppointmentSettings/AppointmentSettingContextProvider";
import EditProfile from "./Pages/EditProfile";
import RequireVerified from "./Components/RequireVerified/RequireVerified";
import EditStaff from "./Pages/EditStaff";

const Hospital = () => {
    return (
        <AddDoctorContextProvider>
            <AddStaffContextProvider>
                <MangementContextProvider>
                    <AppointmentContextProvider>
                        <AppointmentSettingContextProvider>
                            <HospitalNavbar />

                            <Routes>
                                <Route element={<RequireVerified />}>
                                    <Route
                                        path="/"
                                        element={<HospitalHome />}
                                    />

                                    <Route
                                        path="/hospital/mangement"
                                        element={<Management />}
                                    />
                                    <Route
                                        path="/hospital/doctors"
                                        element={<Doctors />}
                                    />
                                    <Route
                                        path="/hospital/doctor/:doctorId/details"
                                        element={<DoctorDetails />}
                                    />
                                    <Route
                                        path="/hospital/doctor/:doctorName/:doctorId/appointment-settings"
                                        element={<AppointmentSettings />}
                                    />
                                    <Route
                                        path="/hospital/doctor/:doctorId/book-appointment"
                                        element={<BookAppoitment />}
                                    />
                                    <Route
                                        path="/hospital/doctor/edit/:doctorId"
                                        element={<EditDoctor />}
                                    />
                                    <Route
                                        path="/hospital/staff/edit/:staffId"
                                        element={<EditStaff />}
                                    />
                                    <Route
                                        path="/hospital/appointments"
                                        element={<Appointments />}
                                    />
                                    
                                    <Route
                                        path="/hospital/edit-profile"
                                        element={<EditProfile />}
                                    />
                                    <Route
                                        path="/hospital/verification"
                                        element={<Verification />}
                                    />
                                    <Route path="*" element={<NotFound />} />
                                </Route>
                                <Route
                                        path="/hospital/create-profile"
                                        element={<CreateProfile />}
                                    />
                            </Routes>
                        </AppointmentSettingContextProvider>
                    </AppointmentContextProvider>
                </MangementContextProvider>
            </AddStaffContextProvider>
        </AddDoctorContextProvider>
    );
};

export default Hospital;
