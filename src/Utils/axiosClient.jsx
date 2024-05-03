import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { KEY_ACCESS_TOKEN, getItem, removeItem } from "./localStorageManager";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useGetAuthenticate from "./Hooks/useGetAuthenticate";
import PatientLogIn from "../Patients/Components/Authentication/PatientLogIn";
import { useDispatch, useSelector } from "react-redux";
import {
    doctorAuth,
    hospitalAuth,
    logout,
    patientAuth,
} from "./Store/authSlice";

// export const axiosClient = axios.create({
//     baseURL: "https://cureo-backend.onrender.com",
//     // withCredentials: true
// });
export const axiosClient = axios.create({
    baseURL: "http://localhost:5001",
    // withCredentials: true
});

const AxiosInterceptor = ({ children }) => {

    const [isSet, setIsSet] = useState(false);
    const dispatch = useDispatch();

    const { isLoggedIn, needToAuthenticate } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        const requestInterceptor = axiosClient.interceptors.request.use(
            (request) => {
                const accessToken = getItem(KEY_ACCESS_TOKEN);
                request.headers["Authorization"] = `Bearer ${accessToken}`;
                return request;
            }
        );

        const responseInterceptor = axiosClient.interceptors.response.use(
            async (respon) => {
                const data = respon.data;
                if (data.status === "ok") {
                    return data;
                }
                const originalRequest = respon.config;
                const statusCode = data.statusCode;

                if (
                    statusCode === 401 &&
                    data.message === "Invalid access key" || 
                    statusCode === 401 &&
                    data.message === "'Authentication header is required'" 

                ) {
                    dispatch(logout());
                    removeItem(KEY_ACCESS_TOKEN);

                    switch (true) {
                        case window.location.pathname.startsWith("/patient"):
                            dispatch(patientAuth("signIn"));
                            break;

                        case window.location.pathname.startsWith("/doctor"):
                            dispatch(doctorAuth("signIn"));
                            break;

                        case window.location.pathname.startsWith("/patient"):
                            dispatch(hospitalAuth("signIn"));
                            break;
                    }
                }

                return Promise.reject(data);
            },
            (error) => {
                return Promise.reject(error);
            }
        );
        setIsSet(true);

        return () => {
            axiosClient.interceptors.request.eject(requestInterceptor);
            axiosClient.interceptors.response.eject(responseInterceptor);
        };
    }, []);

    return (
        <>
            {isSet && children}
            {/* {!isLoggedIn &&
                window.location.pathname.startsWith("/patient") &&
                needToAuthenticate && <PatientLogIn />}
            {!isLoggedIn &&
                window.location.pathname.startsWith("/doctor") &&
                needToAuthenticate && <PatientLogIn />} */}
        </>
    );
};

export { AxiosInterceptor };

