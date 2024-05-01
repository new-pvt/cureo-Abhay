import React, { useEffect, useState } from "react";
import ManagementContext from "./MangementContext";
import { axiosClient } from "../../../axiosClient";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const MangementContextProvider = ({ children }) => {
    const { user } = useSelector((state) => state.auth);
    const [staff, setStaff] = useState(false);
    const [doctorsData, setDoctorsData] = useState([]);
    const [staffsData, setStaffsData] = useState([]);
    const [searchDoctor, setSearchDoctor] = useState("");
    const [searchStaff, setSearchStaff] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [staffLoading, setStaffLoading] = useState(false);
    const [confirmRemove, setConfirmRemove] = useState(false);
    const [singleDoctorsData, setSingleDoctorsData] = useState({});

    const getDoctorsData = async () => {
        try {
            setLoading(true);
            const response = await axiosClient.get(
                `/v2/getAlldoctor/${user?._id}?search=${searchDoctor}`
            );

            if (response.status === "ok") {
                return setDoctorsData(response.result);
            }
        } catch (error) {
            toast.error(error.message)
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    const getStaffsData = async () => {
        try {
            setStaffLoading(true);
            const response = await axiosClient.get(
                `/v2/getallstaffinhospital/${user?._id}?search=${searchStaff}`
            );

            if (response.status === "ok") {
                return setStaffsData(response.result);
            }
        } catch (error) {
            toast.error(error.message)
            setError(error.message);
        } finally {
            setStaffLoading(false);
        }
    };

    const removeDoctor = async (doctorId) => {
        setLoading(true);
        try {
            const response = await axiosClient.put(
                `/v2/updateDoctorStatusToRemove/${doctorId}`,
                { status: "REMOVED" }
            );
            if (response.status === "ok") {
                await getDoctorsData();
                toast.success(response.result);
                setConfirmRemove(false);
            }
        } catch (error) {
            setConfirmRemove(false);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ManagementContext.Provider
            value={{
                staff,
                setStaff,
                getDoctorsData,
                searchDoctor,
                setSearchDoctor,
                doctorsData,
                setDoctorsData,
                removeDoctor,
                singleDoctorsData,
                setSingleDoctorsData,
                confirmRemove,
                setConfirmRemove,
                loading,
                getStaffsData,
                searchStaff,
                setSearchStaff,
                staffsData,
                staffLoading,
                setStaffLoading,
            }}
        >
            {children}
        </ManagementContext.Provider>
    );
};

export default MangementContextProvider;
