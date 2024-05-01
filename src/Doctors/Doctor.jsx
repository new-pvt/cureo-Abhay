import React, { useEffect, useState } from "react";
import {
    Navigate,
    Route,
    Routes,
    useLocation,
    useNavigate,
} from "react-router-dom";
import SelectHospital from "./Pages/SelectHospital";
import Dashboard from "./Pages/Dashboard";
import { useSelector } from "react-redux";
import { KEY_ACCESS_TOKEN, getItem } from "../Utils/localStorageManager";
import SideMenu from "./Components/SideMenu/SideMenu";
import Appointments from "./Pages/Appointments";
import Settings from "./Pages/Settings";
import EditProfile from "./Pages/EditProfile";
import SettingContextProvider from "../Utils/Context/Doctor/SettingContextProvider";
import { Toaster } from "react-hot-toast";
import MobileNav from "./Components/Nav/MobileNav";
import NotFound from "../Common/Components/NotFound/NotFound";
import CreateProfile from "./Pages/CreateProfile";
import RequireVerified from "./Components/RequireVerified/RequireVerified";

const Doctor = () => {
    const { pathname } = useLocation();
    // const { user, isLoggedIn } = useSelector((state) => state.auth);
    const accessToken = getItem(KEY_ACCESS_TOKEN);
    const [hideAside, setHideAside] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        if (
            pathname == "/doctor/select-hospital" ||
            pathname == "/doctor/create-profile"
        ) {
            setHideAside(true);
        } else {
            setHideAside(false);
        }
    }, [pathname]);
    return (
        <>
            {/* <Header /> */}
            <SettingContextProvider>
                {hideAside ? null : <MobileNav />}
                <div
                    className={`flex gap-4 w-full ${hideAside ? "p-0" : "py-0 px-4 md:py-[30px] "} `}
                >
                    {hideAside ? null : (
                        <aside className="hidden md:block relative w-[15.43%]">
                            {<SideMenu />}
                        </aside>
                    )}

                    <main
                        className={`w-full ${hideAside ? "md:w-full p-0" : "md:w-[81.60%]  p-5"} bg-[#108ED624] min-h-[calc(100vh-60px)]  rounded-[9px]`}
                    >
                        <Routes>
                            <Route element={<RequireVerified />}>
                                <Route
                                    path="/"
                                    element={
                                        <Navigate
                                            to={"/doctor/select-hospital"}
                                        />
                                    }
                                />
                                <Route
                                    path="/doctor/dashboard"
                                    element={<Dashboard />}
                                />
                                <Route
                                    path="/doctor/appointments"
                                    element={<Appointments />}
                                />
                                <Route
                                    path="/doctor/settings"
                                    element={<Settings />}
                                />
                                <Route
                                    path="/doctor/edit-profile"
                                    element={<EditProfile />}
                                />
                                <Route path="/" element={<Dashboard />} />
                                <Route
                                    path="/doctor/select-hospital"
                                    element={<SelectHospital />}
                                />
                                <Route path="*" element={<NotFound />} />
                            </Route>
                            <Route
                                path="/doctor/create-profile"
                                element={<CreateProfile />}
                            />
                        </Routes>
                    </main>
                </div>
            </SettingContextProvider>
        </>
    );
};

export default Doctor;
