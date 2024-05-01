import React, { useState } from "react";
import AddDoctorContext from "./AddDoctorContext";
import toast from "react-hot-toast";
import { axiosClient } from "../../axiosClient";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddDoctorContextProvider = ({ children }) => {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [doctorsData, setDoctorsData] = useState([]);
    const [addDoctor, setAddDoctor] = useState(false);
    const [addDoctorForm, setAddDoctorForm] = useState(false);

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState({
        nameOfTheDoctor: "",
        qulification: "",
        speciality: "",
        yearOfExprience: "",
        email: "",
        phone: "",
        gender: "",
        connsultationFee: "",
        description: "",
        location: "",
        landmark: "",
        enterFullAddress: "",
        services: [],
    });
    const [inputImage, setInputImage] = useState("");
    const handleChange = (e, val) => {
        const { id } = e.target;
        if (id === "services") {
            const updatedServices = inputValue.services.includes(val)
                ? inputValue.services.filter((item) => item !== val)
                : [...inputValue.services, val];
            setInputValue((prevState) => ({
                ...prevState,
                services: updatedServices,
            }));
            e.target.value = "";
        } else {
            const { name, value, id } = e.target;
            if (id === "gender") {
                setInputValue((prevState) => ({
                    ...prevState,
                    [id]: val,
                }));
            }
            setInputValue((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const handleRemoveOption = (optionToRemove) => {
        setInputValue({
            ...inputValue,
            services: inputValue.services.filter(
                (item) => item != optionToRemove
            ),
        });
    };

    const getDoctorsData = async () => {
        const response = await axiosClient.get(`/v2/getAlldoctor/${user?._id}`);
        if (response.status === "ok") {
            return setDoctorsData(response.result);
        }
    };
    // const getStaffData = async () => {
    //     const response = await axiosClient.get(`/v2/getstaff/${user?._id}`);
    //     console.log(response);
    //     if (response.status === "ok") {
    //         return setStaffsData(response.result);
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (inputValue.services.length > 0) {
            setError("Please select services");
        }
        setLoading(true);
        const data = new FormData();
        data.append("nameOfTheDoctor", inputValue.nameOfTheDoctor);
        data.append("qulification", inputValue.qulification);
        data.append("speciality", inputValue.speciality);
        data.append("yearOfExprience", inputValue.yearOfExprience);
        data.append("email", inputValue.email);
        data.append("phone", inputValue.phone);
        data.append("connsultationFee", inputValue.connsultationFee);
        data.append("description", inputValue.description);
        data.append("location", user?.location);
        data.append("landmark", user?.landmark);
        data.append("enterFullAddress", user.enterFullAddress);
        data.append("gender", inputValue.gender);
        data.append("acceptAppointments", inputValue?.acceptAppointments);
        data.append("doctorid", inputValue?.doctorid);
        data.append("hospitalid", user?._id);
        data.append("image", inputImage || doctorsInfo?.imgurl);
        inputValue.services.forEach((service) => {
            data.append("services", service);
        });

        // console.log(data);
        try {
            const response = await axiosClient.post(
                `/v2/addDoctor/${user?._id}`,
                data
            );
            console.log(response.result.addDoctor.nameOfTheDoctor);
            if (response.status === "ok") {
                toast.success(
                    `Dr. ${response.result.addDoctor.nameOfTheDoctor} added`
                );
                await getDoctorsData();
                setAddDoctor(false);
                setAddDoctorForm(false);
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
    const handleEditDoctor = async (e) => {
        e.preventDefault();
        if (inputValue.services.length > 0) {
            setError("Please select services");
        }
        setLoading(true);
        const data = new FormData();
        data.append("nameOfTheDoctor", inputValue.nameOfTheDoctor);
        data.append("qulification", inputValue.qulification);
        data.append("speciality", inputValue.speciality);
        data.append("yearOfExprience", inputValue.yearOfExprience);
        data.append("email", inputValue.email);
        data.append("phone", inputValue.phone);
        data.append("connsultationFee", inputValue.connsultationFee);
        data.append("description", inputValue.description);
        data.append("location", user?.location);
        data.append("landmark", user?.landmark);
        data.append("enterFullAddress", user.enterFullAddress);
        data.append("gender", inputValue.gender);
        data.append("acceptAppointments", inputValue?.acceptAppointments);
        data.append("doctorid", inputValue?.doctorid);
        data.append("hospitalid", user?._id);
        data.append("image", inputImage || inputValue?.imgurl);
        inputValue.services.forEach((service) => {
            data.append("services", service);
        });

        // console.log(data);
        try {
            const response = await axiosClient.put(
                `/v2/editDoctorfile/${inputValue?._id}`,
                data
            );

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

    return (
        <AddDoctorContext.Provider
            value={{
                doctorsData,
                setDoctorsData,
                addDoctor,
                setAddDoctor,
                addDoctorForm,
                setAddDoctorForm,
                inputValue,
                setInputValue,
                handleChange,
                handleRemoveOption,
                handleSubmit,
                error,
                setError,
                inputImage,
                setInputImage,
                loading,
                getDoctorsData,
                // getStaffData,
                handleEditDoctor,
            }}
        >
            {children}
        </AddDoctorContext.Provider>
    );
};

export default AddDoctorContextProvider;
