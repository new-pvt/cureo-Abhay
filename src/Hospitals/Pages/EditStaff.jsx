import React, { useContext, useEffect, useState } from "react";
// import { FormSpan, H7, Span } from "../../Common/Components/Text/Textt";
import Avatar from "../../Common/Components/Avatar/Avatar";
import { Input1 } from "../../Common/Components/Inputs/Inputs";
import PrimaryButton from "../../Common/Components/Buttons/PrimaryButton";
import { useDispatch, useSelector } from "react-redux";
import Select from "../../Common/Components/Inputs/Select";
import { axiosClient } from "../../Utils/axiosClient";

import AddStaffContext from "../../Utils/Context/Hospital/AddStaffContext";
import DatePicker from "../../Common/Components/Inputs/DatePicker";
import { useParams } from "react-router-dom";

const EditStaff = () => {
    const { user } = useSelector((state) => state.auth);
    const { staffId } = useParams();

    const [preview, setPreview] = useState("");
    const dispatch = useDispatch();

    const {
        inputValue,
        setInputValue,
        handleChange,
        handleUpdateStaff,
        inputImage,
        setInputImage,
        loading,
    } = useContext(AddStaffContext);

    const getStaffDetails = async () => {
        try {
            const response = await axiosClient.get(
                `/v2/singlestaff/${staffId}`
            );
            setInputValue(response.result);
        } catch (error) {
            toast.error(error.message);
        }
    };
    useEffect(() => {
        getStaffDetails();
        return () => {
            setInputValue({
                ...inputValue,
                nameOfStaff: "",
                designation: "",
                email: "",
                phone: "",
                gender: "",
                dateOfBirth: "",
            });
            setInputImage("");
        };
    }, []);

    const formInputs = [
        {
            type: "text",
            placeholder: "Enter Staff Name",
            name: "nameOfStaff",
            classname: "",
            autofocus: false,
            value: inputValue?.nameOfStaff,
        },
        {
            type: "email",
            placeholder: "Email address",
            name: "email",
            classname: "",
            autofocus: false,
            value: inputValue?.email,
        },
        {
            type: "number",
            placeholder: "Phone Number",
            name: "phone",
            classname: "",
            autofocus: false,
            value: inputValue?.phone,
        },
        {
            type: "date",
            placeholder: "Birth",
            name: "dateOfBirth",
            classname: "",
            autofocus: false,
            value: inputValue?.dateOfBirth,
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
            placeholder: "Enter Designation",
            name: "designation",
            classname: "",
            autofocus: false,
            value: inputValue?.designation,
        },
    ];

    useEffect(() => {
        if (inputImage) {
            setPreview(URL.createObjectURL(inputImage));
        }
    }, [inputImage]);

    return (
        <div className="w-full min-h-full flex justify-center items-center ">
            <div className="w-full md:w-[43.34%] p-5 rounded-[5px] border-[1.5px] border-[#D9D9D980] bg-c2">
                <h6 className="font-f2 font-w2 text-[15px] leading-[15.6px] mb-[5px] text-c11">
                    Edit Staff
                </h6>
                <p className="font-f3 font-w1 leading-[15.6px] text-[13px] text-c4">
                    Enter Staff Details
                </p>

                <form
                    onSubmit={handleUpdateStaff}
                    className="mt-[25px] flex flex-col items-center gap-[21px]"
                >
                    <label htmlFor="uploadImg" className="relative">
                        <input
                            id="uploadImg"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => setInputImage(e.target.files[0])}
                        />
                        <Avatar
                            src={
                                preview
                                    ? preview
                                    : inputValue?.imgurl
                                      ? inputValue.imgurl
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
                                id={"gender"}
                                placeholder="Gender"
                                divClasses="w-full"
                            />
                        ) : input.name == "dateOfBirth" ? (
                            <DatePicker
                                key={input.name}
                                value={inputValue?.dateOfBirth}
                                callback={handleChange}
                                name={"dateOfBirth"}
                                placeholder="Date Of Birth"
                                divClasses="w-full border rounded-[5px]"
                                inputClasses="outline-none read-only:bg-[#ECF0F9] read-only:cursor-not-allowed disabled:bg-[#D9D9D961] disabled:cursor-not-allowed disabled:text-[#706D6D] border font-f2 leading-[18.04px]  text-c19 border-c18 w-full h-full pr-[24%] md:pr-[14%] px-[15px] placeholder:text-c22 placeholder:font-f3 font-[500] border-none"
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
                    {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePickerStyle sx={{outline:"none",}} onChange={(e)=>console.log(e)} name="dateOfBirth" format="DD-MM-YYYY" />
                    </LocalizationProvider> */}
                    <PrimaryButton
                        content={"Update Staff"}
                        type="submit"
                        loading={loading}
                        className={`bg-c1 font-f2 w-full mx-auto`}
                        h={"40px"}
                        bg={"c1"}
                        color={"white"}
                        radius={"44px"}
                        // disabled={!signInInfo.password}
                    />
                </form>
            </div>
        </div>
    );
};

export default EditStaff;
