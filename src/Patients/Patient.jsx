import React, { memo, useCallback, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./Pages/Home";
import FindDoctors from "./Pages/FindDoctors";
import Appointments from "./Pages/Appointments";
import Records from "./Pages/Records";
import ContactUs from "./Pages/ContactUs";
import OurTeam from "./Pages/OurTeam";
import Blogs from "./Pages/Blogs";
import Footer from "../Common/Footer/Footer";
import DoctorDetails from "./Pages/DoctorDetails";
import BookAppointment from "./Pages/BookAppointment";
import AuthContextProvider from "../Utils/Context/Patients/AuthContextProvider";
import EditPatientProfile from "./Pages/EditPatientProfile";
import {
    KEY_ACCESS_TOKEN,
    getItem,
    removeItem,
} from "../Utils/localStorageManager";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Utils/Store/authSlice";
import AppointmentContextProvider from "../Utils/Context/Patients/AppointmentContextProvider";
import UpcomingAppointmentDetails from "./Pages/UpcomingAppointmentDetails";
import ContactUsContextProvider from "../Utils/Context/Patients/ContactUs/ContactUsContextProvider";
import { AxiosInterceptor } from "../Utils/axiosClient";
import Navbar from "../Common/Navbar/Navbar";
import CreateProfile from "./Pages/CreateProfile";
import NotFound from "../Common/Components/NotFound/NotFound";
import CancelledAppointmentDetails from "./Pages/CancelledAppointmentDetails";
import TermsAndCondition from "./Pages/TermsAndCondition";
import Privacy from "./Pages/Privacy";
import CancellationPolicy from "./Pages/CancellationPolicy";
import Practice from "./Pages/Practice";
// import PrivacyPolicy from "./Pages/PrivacyPolicy";
// import PrivacyPolicy from "./Pages/PrivacyPolicy";

const Patient = () => {
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const { user, isLoggedIn } = useSelector((state) => state.auth);

    // {(isLoggedIn && user?.role == "DOCTOR" && <></>) ||

    const accessToken = getItem(KEY_ACCESS_TOKEN);

    useEffect(() => {
        if (!accessToken) {
            //   removeItem(KEY_ACCESS_TOKEN);

            dispatch(logout());
        }
    }, [accessToken]);

    return (
        <div>
            <AppointmentContextProvider>
                <ContactUsContextProvider>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/practice" element={<Practice />} />
                        <Route path="/find-doctors" element={<FindDoctors />} />
                        <Route
                            path="/patient/doctor-details/:doctorId"
                            element={<DoctorDetails />}
                        />
                        <Route
                            path="/patient/doctor/:doctorId/book_appointment"
                            element={<BookAppointment />}
                        />
                        <Route
                            path="/patient/appointments"
                            element={<Appointments />}
                        />
                        <Route
                            path="/patient/appointments/:appointmentId/upcoming"
                            element={<UpcomingAppointmentDetails />}
                        />
                        <Route
                            path="/patient/appointments/:appointmentId/cancelled"
                            element={<CancelledAppointmentDetails />}
                        />
                        <Route path="/patient/records" element={<Records />} />
                        <Route path="/contact-us" element={<ContactUs />} />
                        <Route path="/our-team" element={<OurTeam />} />
                        <Route path="/blogs" element={<Blogs />} />
                        <Route path="/medidek/privacy" element={<Privacy />} />
                        <Route
                            path="/medidek/termsAndCondition"
                            element={<TermsAndCondition />}
                        />
                        <Route
                            path="/medidek/cancellation-policy"
                            element={<CancellationPolicy />}
                        />
                        <Route path="/medidek/privacy" element={<Blogs />} />
                        <Route
                            path="/patient/create-profile"
                            element={<CreateProfile />}
                        />
                        <Route
                            path="/patient/edit-profile"
                            element={<EditPatientProfile />}
                        />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </ContactUsContextProvider>
                {pathname !== "/patient/create-profile" && <Footer />}
            </AppointmentContextProvider>
        </div>
    );
};

export default Patient;
