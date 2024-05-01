import React, { useCallback, useState } from "react";
import AddStaffContext from "./AddStaffContext";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { axiosClient } from "../../axiosClient";
import { useNavigate } from "react-router-dom";

const AddStaffContextProvider = ({ children }) => {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [staffsData, setStaffsData] = useState([]);
    const [staff, setStaff] = useState(false);
    const [loading, setLoading] = useState(false);
    const [addStaffForm, setAddStaffForm] = useState(false);
    const [inputValue, setInputValue] = useState({
        nameOfStaff: "",
        designation: "",
        email: "",
        phone: "",
        gender: "",
        dateOfBirth: "",
        hospitalId: user?._id,
    });

    const [inputImage, setInputImage] = useState("");

    const handleChange = useCallback(
        (e, val) => {
            const { name, value, id } = e.target;
            if (name === "dateOfBirth") {
                console.log(name, val);
                return setInputValue((prevState) => ({
                    ...prevState,
                    [name]: val,
                }));
            }
            if (id === "gender") {
                setInputValue((prevState) => ({
                    ...prevState,
                    [id]: val,
                }));
            } else {
                setInputValue((prevState) => ({
                    ...prevState,
                    [name]: value,
                }));
            }
        },
        [inputValue]
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = new FormData();
        data.append("nameOfStaff", inputValue.nameOfStaff);
        data.append("designation", inputValue.designation);
        data.append("email", inputValue.email);
        data.append("phone", inputValue.phone);
        data.append("gender", inputValue.gender);
        data.append("dateOfBirth", inputValue.dateOfBirth);
        data.append("image", inputImage);
        data.append("hospitalId", user?._id);

        // console.log(data);
        try {
            const response = await axiosClient.post("/v2/addstaff", data);
            console.log(response.result);
            if (response.status === "ok") {
                toast.success(`${response.result.nameOfStaff} added`);
                await getStaffsData();
                setAddStaffForm(false);
                return;
            }
        } catch (e) {
            toast.error(e.message);
            // setDisableButton(false);
            // toast.error(e.message);
        } finally {
            setLoading(false);
        }
    };
    const handleUpdateStaff = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = new FormData();
        data.append("nameOfStaff", inputValue.nameOfStaff);
        data.append("designation", inputValue.designation);
        data.append("email", inputValue.email);
        data.append("phone", inputValue.phone);
        data.append("gender", inputValue.gender);
        data.append("dateOfBirth", inputValue.dateOfBirth);
        data.append("image", inputImage || inputValue?.imgurl);
        data.append("hospitalId", user?._id);

        // console.log(data);
        try {
            const response = await axiosClient.put(
                `/v2/editstaff/${inputValue?._id}`,
                data
            );
            console.log(response.result);
            if (response.status === "ok") {
                toast.success("Updated");
                navigate("/hospital/mangement");
                return;
            }
        } catch (e) {
            toast.error(e.message);
            // setDisableButton(false);
            // toast.error(e.message);
        } finally {
            setLoading(false);
        }
    };

    const getStaffsData = async () => {
        try {
            const response = await axiosClient.get(
                `/v2/getallstaffinhospital/${user?._id}`
            );
            console.log(response);
            if (response.status === "ok") {
                return setStaffsData(response.result);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <AddStaffContext.Provider
            value={{
                inputValue,
                setInputValue,
                inputImage,
                setInputImage,
                loading,
                setLoading,
                handleChange,
                staffsData,
                setStaffsData,
                addStaffForm,
                setAddStaffForm,
                handleSubmit,
                getStaffsData,
                staff,
                setStaff,
                handleUpdateStaff
            }}
        >
            {children}
        </AddStaffContext.Provider>
    );
};

export default AddStaffContextProvider;
