import React, { useEffect, useState } from "react";
import { FormSpan, H7, Span } from "../../Common/Components/Text/Textt";
import Avatar from "../../Common/Components/Avatar/Avatar";
import { Input1 } from "../../Common/Components/Inputs/Inputs";
import PrimaryButton from "../../Common/Components/Buttons/PrimaryButton";
import { useDispatch, useSelector } from "react-redux";
import Select from "../../Common/Components/Inputs/Select";
import MultiSelect from "../../Common/Components/Inputs/MultiSelect";
import ChangePassword from "../Components/Edit/ChangePassword";
import { updateDoctorsData } from "../../Utils/Store/doctorDataSlice";
import { axiosClient } from "../../Utils/axiosClient";
import toast from "react-hot-toast";
import DatePicker from "../../Common/Components/Inputs/DatePicker";

const EditProfile = () => {
    const { user } = useSelector((state) => state.auth);
    const { doctor } = useSelector((state) => state.doctorsData);
    const [changePassword, seChangePassword] = useState(false);
    const [inputImage, setInputImage] = useState("");
    const [preview, setPreview] = useState("");
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const [inputValue, setInputValue] = useState({
        nameOfTheDoctor: doctor?.nameOfTheDoctor || "",
        qulification: doctor?.qulification || "",
        speciality: doctor?.speciality || "",
        yearOfExprience: doctor?.yearOfExprience || "",
        email: doctor?.email || "",
        phone: doctor?.phone || "",
        gender: doctor?.gender || "",
        dateOfBirth: doctor?.dateOfBirth || "",
        connsultationFee: doctor?.connsultationFee || "",
        description: doctor?.description || "",
        location: doctor?.location || "",
        landmark: doctor?.landmark || "",
        enterFullAddress: doctor?.enterFullAddress || "",
        services: doctor?.services || [],
    });

    const formInputs = [
        {
            type: "text",
            placeholder: "Ex. John Doe",
            name: "nameOfTheDoctor",
            classname: "",
            autofocus: false,
            value: inputValue?.nameOfTheDoctor,
        },
        {
            type: "email",
            placeholder: "Ex. johndoe@gmail.com",
            name: "email",
            classname: "",
            autofocus: false,
            value: inputValue?.email,
        },
        {
            type: "number",
            placeholder: "Phone",
            name: "phone",
            classname: "",
            autofocus: false,
            value: inputValue?.phone,
        },
        {
            type: "text",
            placeholder: "Gender",
            name: "gender",
            classname: "",
            autofocus: false,
            value: inputValue?.gender,
            options: ["Male", "Female", "Other"],
        },
        {
            type: "text",
            placeholder: "Date of birth",
            name: "dateOfBirth",
            classname: "",
            autofocus: false,
            value: inputValue?.dateOfBirth,
        },

        {
            type: "text",
            placeholder: "Qualification",
            name: "qulification",
            classname: "",
            autofocus: false,
            value: inputValue?.qulification,
        },
        {
            type: "number",
            placeholder: "Ex. 5",
            name: "yearOfExprience",
            classname: "",
            autofocus: false,
            value: inputValue?.yearOfExprience,
        },
        {
            type: "text",
            placeholder: "Ex. 500",
            name: "connsultationFee",
            classname: "",
            autofocus: false,
            value: inputValue?.connsultationFee,
        },
        {
            type: "text",
            placeholder: "Ex. Root Canal, Root Planning",
            name: "services",
            classname: "",
            autofocus: false,
            value: inputValue?.services,
        },
        {
            type: "text",
            placeholder: "Enter Description",
            name: "description",
            classname: "",
            autofocus: false,
            value: inputValue?.description,
        },
        {
            type: "text",
            placeholder: "Enter location",
            name: "location",
            classname: "",
            autofocus: false,
            value: inputValue?.location,
        },
        {
            type: "text",
            placeholder: "Enter landmark",
            name: "landmark",
            classname: "",
            autofocus: false,
            value: inputValue?.landmark,
        },
        {
            type: "text",
            placeholder: "Enter full address",
            name: "enterFullAddress",
            classname: "",
            autofocus: false,
            value: inputValue?.enterFullAddress,
        },
    ];

    useEffect(() => {
        if (inputImage) {
            setPreview(URL.createObjectURL(inputImage));
        }
    }, [inputImage]);

    const handleChange = (e, val) => {
        const { id } = e.target;
        console.log(val);
        if (id === "services") {
            // Toggle the selection of the service
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
                return setInputValue((prevState) => ({
                    ...prevState,
                    [id]: val,
                }));
            }
            if (name === "dateOfBirth") {
                console.log(name, val);
                return setInputValue((prevState) => ({
                    ...prevState,
                    [name]: val,
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
                (option) => option !== optionToRemove
            ),
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
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
        data.append("location", inputValue.location);
        data.append("landmark", inputValue.landmark);
        data.append("enterFullAddress", inputValue.enterFullAddress);
        data.append("gender", inputValue.gender);
        data.append("dateOfBirth", inputValue.dateOfBirth);
        data.append("acceptAppointments", doctor?.acceptAppointments);
        data.append("image", inputImage || doctor?.imgurl);
        inputValue.services.forEach((service) => {
            data.append("services", service);
        });

        // console.log(data);
        try {
            const response = await axiosClient.put(
                `/v2/editDoctorfile/${doctor?._id}`,
                data
            );

            if (response.status === "ok") {
                toast.success("Updated");
                dispatch(updateDoctorsData(response.result));
                return;
            }
        } catch (e) {
            toast.error(e.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="w-full md:w-[43.34%] p-5 rounded-[5px] bg-c2">
                {changePassword ? (
                    <ChangePassword seChangePassword={seChangePassword} />
                ) : (
                    <>
                        <h6 className="font-f2 font-w2 text-[15px] leading-[15.6px] mb-[5px] text-c11">
                            Edit Profile
                        </h6>
                        <p className="font-f3 font-w1 leading-[15.6px] text-[13px] text-c4">
                            Enter your details to Edit Profile
                        </p>

                        <form
                            onSubmit={handleSubmit}
                            className="mt-[25px] flex flex-col items-center gap-[21px]"
                        >
                            <label htmlFor="uploadImg" className="relative">
                                <input
                                    id="uploadImg"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) =>
                                        setInputImage(e.target.files[0])
                                    }
                                />
                                <Avatar
                                    src={
                                        preview
                                            ? preview
                                            : doctor?.imgurl
                                              ? doctor.imgurl
                                              : "/EditProfile/Profile.png"
                                    }
                                    className={"w-[66.97px] h-[66.97px]"}
                                />
                                <div className="bg-c3 absolute z-10 -bottom-2 -right-2 p-2 rounded-full">
                                    <img
                                        src="/EditProfile/Camera.svg"
                                        alt="icon"
                                        className=""
                                    />
                                </div>
                            </label>
                            {formInputs?.map((input, i) =>
                                input.name == "gender" ? (
                                    <Select
                                        key={input.name}
                                        options={input.options}
                                        value={inputValue.gender}
                                        setSelect={handleChange}
                                        name={input.name}
                                        placeholder="Gender"
                                        divClasses="w-full"
                                    />
                                ) : input.name == "dateOfBirth" ? (
                                    <DatePicker
                                        key={input.name}
                                        name={input.name}
                                        value={input.value}
                                        callback={handleChange}
                                        required
                                        divClasses="w-full"
                                        icon
                                        inputClasses={
                                            "w-full outline-none border read-only:bg-[#ECF0F9] disabled:bg-[#5D5E61BD] disabled:text-white read-only:cursor-not-allowed border-c18 h-[40px] px-4 rounded-[5px] placeholder:text-c22 placeholder:font-f3 font-[500]"
                                        }
                                        placeholder={input.placeholder}
                                    />
                                ) : input.name == "services" ? (
                                    <MultiSelect
                                        key={input.name}
                                        handleChange={handleChange}
                                        handleRemoveOption={handleRemoveOption}
                                        divClasses="w-full"
                                        placeholder="Enter Services"
                                        selectedOptions={inputValue.services}
                                        options={formInputs.map(
                                            (option) => option.name
                                        )}
                                    />
                                ) : (
                                    <div
                                        key={input.name}
                                        className="flex w-full flex-col gap-[10px]"
                                    >
                                        <Input1
                                            type={input.type}
                                            placeholder={input.placeholder}
                                            name={input.name}
                                            autofocus={input.autofocus}
                                            value={input.value}
                                            onchange={handleChange}
                                            required={true}
                                            classname={`bg-white w-full`}
                                        />
                                    </div>
                                )
                            )}
                            {/* <div className="flex items-center w-full -mt-2.5 gap-2">
                        <img src="/EditProfile/Location.svg" alt="icon" />
                        <FormSpan content="Use Current Location" />
                    </div> */}
                            <div className="flex w-full gap-[9px] md:gap-[15px]">
                                <PrimaryButton
                                    content={"Change Password"}
                                    onclick={() => seChangePassword(true)}
                                    loading={false}
                                    className={`bg-[#EDF1F9] text-[#353535] font-f2 font-w1 text-[13px] leading-[19.5px] w-full mx-auto`}
                                    h={"40px"}
                                    bg={"c1"}
                                    radius={"44px"}
                                    // disabled={!signInInfo.password}
                                />
                                <PrimaryButton
                                    content={"Save Changes"}
                                    type="submit"
                                    loading={loading}
                                    className={`bg-c1 font-f2 font-w1 text-[13px] leading-[19.5px] w-full mx-auto`}
                                    h={"40px"}
                                    bg={"c1"}
                                    color={"white"}
                                    radius={"44px"}
                                    // disabled={!signInInfo.password}
                                />
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default EditProfile;
