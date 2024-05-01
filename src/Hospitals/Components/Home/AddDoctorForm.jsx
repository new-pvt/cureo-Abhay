import React, { useContext, useEffect, useState } from "react";
// import { FormSpan, H7, Span } from "../../Common/Components/Text/Textt";
import Avatar from "../../../Common/Components/Avatar/Avatar";
import { Input1 } from "../.../../../../Common/Components/Inputs/Inputs";
import PrimaryButton from "../.../../../../Common/Components/Buttons/PrimaryButton";
import { useDispatch, useSelector } from "react-redux";
import Select from "../.../../../../Common/Components/Inputs/Select";
import MultiSelect from "../.../../../../Common/Components/Inputs/MultiSelect";
import { axiosClient } from "../../../Utils/axiosClient";
import AddDoctorContext from "../../../Utils/Context/Hospital/AddDoctorContext";

const AddDoctorForm = () => {
    const { user } = useSelector((state) => state.auth);
    // const { doctorsInfo } = useSelector((state) => state.doctorsInfosData);
    
    const [preview, setPreview] = useState("");
    const dispatch = useDispatch();

    const { inputValue, handleChange, handleRemoveOption, handleSubmit, inputImage, setInputImage, loading } = useContext(AddDoctorContext);

    console.log(inputValue?.imgurl);

    const formInputs = [
        {
            type: "text",
            placeholder: "Ex. John Doe",
            name: "nameOfTheDoctor",
            classname: "",
            autofocus: false,
            value: inputValue?.nameOfTheDoctor || "",
        },
        {
            type: "email",
            placeholder: "Ex. johndoe@gmail.com",
            name: "email",
            classname: "",
            autofocus: false,
            value: inputValue?.email || "",
        },
        {
            type: "number",
            placeholder: "Phone",
            name: "phone",
            classname: "",
            autofocus: false,
            value: inputValue?.phone || "",
        },
        {
            type: "text",
            placeholder: "Gender",
            name: "gender",
            classname: "",
            autofocus: false,
            value: inputValue?.gender || "",
            options: ["Male", "Female", "Other"],
        },

        {
            type: "text",
            placeholder: "Qualification",
            name: "qulification",
            classname: "",
            autofocus: false,
            value: inputValue?.qulification || "",
        },
        {
            type: "number",
            placeholder: "Ex. 5",
            name: "yearOfExprience",
            classname: "",
            autofocus: false,
            value: inputValue?.yearOfExprience || "",
        },
        {
            type: "text",
            placeholder: "Ex. 500",
            name: "connsultationFee",
            classname: "",
            autofocus: false,
            value: inputValue?.connsultationFee || "",
        },
        {
            type: "text",
            placeholder: "Ex. Root Canal, Root Planning",
            name: "services",
            classname: "",
            autofocus: false,
            value: inputValue?.services || "",
        },
        {
            type: "text",
            placeholder: "Enter Description",
            name: "description",
            classname: "",
            autofocus: false,
            value: inputValue?.description || "",
        },
    ];

    useEffect(() => {
        if (inputImage) {
            setPreview(URL.createObjectURL(inputImage));
        }
    }, [inputImage]);

   
    return (
        <div className="w-full h-full flex justify-center items-center ">
            <div className="w-full md:w-[43.34%] p-5 rounded-[5px] border-[1.5px] border-[#D9D9D980] bg-c2">
                <h6 className="font-f2 font-w2 text-[15px] leading-[15.6px] mb-[5px] text-c11">
                    Add Doctor
                </h6>
                <p className="font-f3 font-w1 leading-[15.6px] text-[13px] text-c4">
                    Enter Doctor’s details to Add to Hospital
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
                                readOnly
                                key={input.name}
                                options={input.options}
                                value={inputValue.gender}
                                setSelect={handleChange}
                                id={"gender"}
                                placeholder="Gender"
                                divClasses="w-full"
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
                                    readOnly={input.name == "connsultationFee" || input.name == "services"  ? false : true}
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

                    <PrimaryButton
                        content={"Add Doctor"}
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

export default AddDoctorForm;
