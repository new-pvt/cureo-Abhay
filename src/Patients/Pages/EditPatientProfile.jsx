import React, { useCallback, useEffect, useState } from "react";
import { FormSpan, H7, Span } from "../../Common/Components/Text/Textt";
import Avatar from "../../Common/Components/Avatar/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { Input1 } from "../../Common/Components/Inputs/Inputs";
import PrimaryButton from "../../Common/Components/Buttons/PrimaryButton";
import ChangePassword from "../Components/EditProfile/ChangePassword";
import {
    DateField,
    LocalizationProvider,
    MobileDatePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { styled } from "@mui/material";
import dayjs from "dayjs";
import moment from "moment";
import Select from "../../Common/Components/Inputs/Select";
import { axiosClient } from "../../Utils/axiosClient";
import toast from "react-hot-toast";
import { updateUserData } from "../../Utils/Store/authSlice";
import DatePicker from "../../Common/Components/Inputs/DatePicker";

const DatePickerStyleForMobile = styled(MobileDatePicker)({
    color: "red",
    width: "100%",
    [`& input`]: {
        color: "#383838",
        fontFamily: "Poppins",
        fontWeight: "500",
        fontSize: "13px",
        // textAlign: "center",
        marginTop: "3px",
        outline: "none",
        width: "100%",
    },

    [`& input:focus div`]: {
        color: "red",
        border: "red",
        outline: "none",
    },
    [`& div`]: {
        height: "38.02px",
        width: "100%",
    },
    [`& fieldset`]: {
        // borderRadius: "80px",
    },
});

const EditPatientProfile = () => {
    const { user, isLoggedIn } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [changePassword, setChangePassword] = useState(false);
    const [date, setDate] = useState("");
    const [inputImage, setInputImage] = useState("");
    const [preview, setPreview] = useState("");
    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState({
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        gender: user?.gender || "",
        dateOfBirth: user?.dateOfBirth || "",
        bloodgroup: user?.bloodgroup || "",
        location: user?.location || "",
    });
    const [formDirty, setFormDirty] = useState(false);

    console.log(inputValue);

    const formInputs = [
        {
            type: "text",
            placeholder: "Enter Name",
            name: "name",
            classname: "",
            autofocus: false,
            value: inputValue?.name,
        },
        {
            type: "email",
            placeholder: "Enter Email",
            name: "email",
            classname: "",
            autofocus: false,
            value: inputValue?.email,
        },
        {
            type: "number",
            placeholder: "Enter Phone",
            name: "phone",
            classname: "",
            autofocus: false,
            value: inputValue?.phone,
        },
        {
            type: "text",
            placeholder: "Select Gender",
            name: "gender",
            classname: "",
            autofocus: false,
            value: inputValue?.gender,
            options: ["Male", "Female", "Other"],
        },
        {
            type: "text",
            placeholder: "Ex. 25",
            name: "dateOfBirth",
            classname: "",
            autofocus: false,
            value: inputValue?.dateOfBirth,
        },
        {
            type: "text",
            placeholder: "Ex. A+ve",
            name: "bloodgroup",
            classname: "",
            autofocus: false,
            value: inputValue?.bloodgroup,
            options: [
                "Not Available",
                "A+",
                "A-",
                "B+",
                "B-",
                "AB+",
                "AB-",
                "O+",
                "O-",
            ],
        },
        {
            type: "text",
            placeholder: "Enter Full Address",
            name: "location",
            classname: "",
            autofocus: false,
            value: inputValue?.location,
        },
    ];
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
            }
            if (id === "bloodgroup") {
                setInputValue((prevState) => ({
                    ...prevState,
                    [id]: val,
                }));
            }

            setInputValue((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        },
        [inputValue]
    );

    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            setLoading(true);
            const data = new FormData();
            data.append("name", inputValue.name);
            data.append("email", inputValue.email);
            data.append("phone", inputValue.phone);
            data.append("gender", inputValue.gender);
            data.append("dateOfBirth", inputValue.dateOfBirth);
            data.append("bloodgroup", inputValue.bloodgroup);
            data.append("location", inputValue.location);
            data.append("image", inputImage || user?.imgurl);

            // console.log(data);
            try {
                const response = await axiosClient.put(
                    `/v2/updateuserpatient/${user?._id}`,
                    data
                );

                if (response.status === "ok") {
                    toast.success("Updated");
                    dispatch(updateUserData(response.result));
                    setFormDirty(false);
                    return;
                }
            } catch (e) {
                toast.error(e.message);
            } finally {
                setLoading(false);
            }
        },
        [inputValue]
    );

    useEffect(() => {
        if (inputImage) {
            setPreview(URL.createObjectURL(inputImage));
        }
    }, [inputImage]);

    useEffect(() => {
        if (user) {
            const isFormDirty = Object.keys(inputValue)?.some(
                (key) => inputValue[key] !== user[key]
            );
            setFormDirty(isFormDirty);
        }
    }, [inputValue]);

    return (
        <main className="overflow-x-hidden w-full flex justify-center no-scrollbar gap-5 relative min-h-[calc(100vh-108px)] my-[40px] px-4 md:px-[32.36%]">
            {changePassword ? (
                <ChangePassword setChangePassword={setChangePassword} />
            ) : (
                <div className="p-5 border w-full rounded-[5px] border-c17 ">
                    <H7 content="Edit Profile" />
                    <Span content="Enter your details to Edit Profile" />
                    <form
                        onSubmit={handleSubmit}
                        className="mt-[25px] flex flex-col items-center gap-[21px]"
                    >
                        <label htmlFor="uploadImage" className="relative">
                            <input
                                type="file"
                                className="hidden"
                                onChange={(e) =>
                                    setInputImage(e.target.files[0])
                                }
                                id="uploadImage"
                                accept="image/png, image/jpeg"
                            />
                            <Avatar
                                src={
                                    preview
                                        ? preview
                                        : user?.imgurl
                                          ? user.imgurl
                                          : "/EditProfile/Profile.png"
                                }
                                className={"w-[66.97px] h-[66.97px] border"}
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
                                    id={"gender"}
                                    placeholder="Gender"
                                    divClasses="w-full"
                                />
                            ) : input.name == "dateOfBirth" ? (
                                <DatePicker
                                    key={input.name}
                                    value={inputValue.dateOfBirth}
                                    callback={handleChange}
                                    name={"dateOfBirth"}
                                    icon
                                    placeholder="Date Of Birth"
                                    divClasses="w-full border rounded-[5px]"
                                    inputClasses="outline-none read-only:bg-[#ECF0F9] read-only:cursor-not-allowed disabled:bg-[#D9D9D961] disabled:cursor-not-allowed disabled:text-[#706D6D] border font-f2 leading-[18.04px]  text-c19 border-c18 w-full h-full pr-[24%] md:pr-[14%] px-[15px] placeholder:text-c22 placeholder:font-f3 font-[500] border-none"
                                />
                            ) : input.name == "bloodgroup" ? (
                                <Select
                                    key={input.name}
                                    options={input.options}
                                    value={inputValue.bloodgroup}
                                    setSelect={handleChange}
                                    id={"bloodgroup"}
                                    placeholder="Blood Group"
                                    divClasses="w-full"
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
                        <h1>{dayjs(user?.dateOfBirth)[0]}</h1>
                        {/* <div className="flex items-center w-full -mt-2.5 gap-2">
                            <img src="/EditProfile/Location.svg" alt="icon" />
                            <FormSpan content="Use Current Location" />
                        </div> */}
                        <div className="flex w-full gap-[15px]">
                            <PrimaryButton
                                content={"Change Password"}
                                onclick={() => setChangePassword(true)}
                                loading={false}
                                className={`bg-[#EDF1F9] text-[#353535] font-f2 w-full mx-auto text-[13px]`}
                                h={"40px"}
                                bg={"c1"}
                                radius={"44px"}
                                // disabled={!signInInfo.password}
                            />
                            <PrimaryButton
                                content={"Save Changes"}
                                type="submit"
                                loading={loading}
                                className={`bg-c1 font-f2 w-full mx-auto text-[13px]`}
                                h={"40px"}
                                bg={"c1"}
                                color={"white"}
                                radius={"44px"}
                               disabled={loading ? true : preview ? false : !formDirty ? true  : false }
                            />
                        </div>
                    </form>
                </div>
            )}
        </main>
    );
};

export default EditPatientProfile;
