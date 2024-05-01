import React, { useCallback, useEffect, useState } from "react";
import Stepper from "../../Hospitals/Components/Stepper/Stepper";
import Avatar from "../../Common/Components/Avatar/Avatar";
import Select from "../../Common/Components/Inputs/Select";
import MultiSelect from "../../Common/Components/Inputs/MultiSelect";
import { Input1 } from "../../Common/Components/Inputs/Inputs";
import PrimaryButton from "../../Common/Components/Buttons/PrimaryButton";
import { useDispatch, useSelector } from "react-redux";
import { logout, updateUserData } from "../../Utils/Store/authSlice";
import toast from "react-hot-toast";
import UploadDocument from "../Components/UploadDocument/UploadDocument";
import { axiosClient } from "../../Utils/axiosClient";
import { Outlet, useNavigate } from "react-router-dom";
import useClickAwayToClose from "../../Utils/Hooks/useClickAwayToClose";
import { TextButton } from "../../Common/Components/Text/Textt";
import { logOutDoctor } from "../../Utils/Store/doctorDataSlice";
import { KEY_ACCESS_TOKEN, removeItem } from "../../Utils/localStorageManager";

const CreateProfile = () => {
    const { user } = useSelector((state) => state.auth);
    const [inputImage, setInputImage] = useState("");
    const [preview, setPreview] = useState("");
    const [loading, setLoading] = useState(false);
    const [profileDropDown, setProfileDropDown] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log(user?.verification);

    const menuRef = useClickAwayToClose(() => setProfileDropDown(false));

    useEffect(() => {
        if (inputImage) {
            setPreview(URL.createObjectURL(inputImage));
        }
    }, [inputImage]);

    const handleChange = (e, val) => {
        const { name, value } = e.target;
        setInputValue((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const checkStatus = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axiosClient.get(
                `/v2/singledoctor/${user?._id}`
            );
            if (response.status == "ok") {
                dispatch(updateUserData(response.result));
                toast.success("Checked");
                return;
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }, [user]);

    const logoutUser = () => {
        removeItem(KEY_ACCESS_TOKEN);
        dispatch(logout());
        dispatch(logOutDoctor());
        window.location.replace("/");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        let formData = new FormData();
        formData.append(
            "nameOfhospitalOrClinic",
            inputValue.nameOfhospitalOrClinic
        );
        formData.append("hospitalType", inputValue.hospitalType);
        formData.append("enterFullAddress", inputValue.enterFullAddress);
        formData.append("location", inputValue.location);
        formData.append("landmark", inputValue.landmark);
        formData.append("image", inputImage);

        try {
            const response = await axiosClient.put(
                `/v2/master/${user?._id}`,
                formData
            );
            console.log(response);
            if (response.status === "ok") {
                dispatch(updateUserData(response.result));
                toast.success("Profile Created Successfully");
                // navigate(`/master/user/home/${hospital_id}`);
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const [inputValue, setInputValue] = useState({
        nameOfTheDoctor: user?.nameOfTheDoctor || "",
        qulification: user?.qulification || "",
        speciality: user?.speciality || "",
        yearOfExprience: user?.yearOfExprience || "",
        email: user?.email || "",
        phone: user?.phone || "",
        gender: user?.gender || "",
        dateOfBirth: user?.dateOfBirth || "",
        connsultationFee: user?.connsultationFee || "",
        description: user?.description || "",
        location: user?.location || "",
        landmark: user?.landmark || "",
        enterFullAddress: user?.enterFullAddress || "",
        services: user?.services || [],
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
        if (user?.verification?.status == "verified") return navigate("/");
    }, [user?.verification?.status]);

    return (
        <main className="w-full overflow-x-hidden relative min-h-[100vh] px-4 md:px-[50px] py-[30px] ">
            <div className="md:w-[40%] h-[50%] blur-[120px] fixed bottom-0 right-0 -z-20 bg-gradient-to-l from-[#1F51C626] via-[#108ED638] to-[#1F51C638]"></div>
            <div className="md:w-[40%] h-[50%] blur-[120px] fixed left-0 bottom-0 -z-20 bg-gradient-to-b from-[#1F51C638] via-[#108ED638] to-[#1F51C626]"></div>
            <div className="flex justify-between items-center">
                <img
                    src="/Home/IMG_20240127_122502.png"
                    alt="logo"
                    className="w-[88px] md:w-[136px] h-[27px] md:h-[43px]"
                />
                <div ref={menuRef} className="relative w-fit block">
                    <Avatar
                        onclick={() => setProfileDropDown(!profileDropDown)}
                        src={user?.imgurl ? user?.imgurl : "/Navbar/human.png"}
                        className={"w-10 md:w-[52px] h-10 md:h-[52px]"}
                    />
                    {profileDropDown && (
                        <div className=" flex flex-col items-start z-20 bg-white border border-[#D9D9D980] absolute right-0 mt-3 w-[127px] rounded-[5px] ">
                            <TextButton
                                content={"Logout"}
                                onclick={logoutUser}
                                className="p-[10px] w-full text-left"
                            />
                        </div>
                    )}
                </div>
            </div>
            <div className="w-full h-full flex justify-center mt-4">
                <div className="w-full md:w-[35.37%]">
                    <Stepper
                        createdProfile={user?.nameOfTheDoctor ? true : false}
                        verified={user?.verified ? true : false}
                    />
                    {user?.verification.status == "Not Applied Yet" &&
                    user?.nameOfTheDoctor ? (
                        <UploadDocument />
                    ) : user?.verification?.status == "Not Applied Yet" &&
                      !user?.nameOfTheDoctor ? (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="w-full border border-[#D9D9D980] p-5 rounded-[5px] mt-[59px]">
                                <h6 className="font-f2 font-w2 text-[15px] leading-[15.6px] mb-[5px] text-c11">
                                    Create Hospital Profile
                                </h6>
                                <p className="font-f3 font-w1 leading-[15.6px] text-[13px] text-c4">
                                    Enter your details to Complete Profile
                                </p>
                                <div className="mt-[25px] flex flex-col items-center gap-[21px]">
                                    <label
                                        htmlFor="uploadImg"
                                        className="relative"
                                    >
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
                                                    : user?.imgurl
                                                      ? user.imgurl
                                                      : "/EditProfile/Profile.png"
                                            }
                                            className={
                                                "w-[66.97px] h-[66.97px]"
                                            }
                                        />
                                        <div className="bg-c3 absolute z-10 -bottom-2 -right-2 p-2 rounded-full">
                                            <img
                                                src="/EditProfile/Camera.svg"
                                                alt="icon"
                                                className=""
                                            />
                                        </div>
                                    </label>
                                    {formInputs?.map((input, i) => (
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
                                    ))}
                                    {/* <div className="flex items-center w-full -mt-2.5 gap-2">
                    <img src="/EditProfile/Location.svg" alt="icon" />
                    <FormSpan content="Use Current Location" />
                </div> */}
                                </div>
                            </div>

                            <PrimaryButton
                                content={"Continue"}
                                type="submit"
                                loading={loading}
                                className={`bg-c1 font-f2 w-[calc(100%-40px)] block mx-auto`}
                                h={"40px"}
                                bg={"c1"}
                                color={"white"}
                                radius={"44px"}
                                disabled={loading}
                            />
                        </form>
                    ) : user?.verification?.status == "rejected" ? (
                        <div>
                            <h2 className="text-center mt-5 font-f2 font-w2 text-c24">
                                Your Application is Rejected The reason is
                                mentioned below
                            </h2>
                            <h3 className="text-center mt-5 font-f2 font-w2 text-c24">
                                Reason :- {user?.verification?.message}
                            </h3>
                            <UploadDocument />
                        </div>
                    ) : (
                        <div>
                            <h2 className="font-f2 font-w2 text-center mt-5">
                                Your Verifcation is in Process kindly Wait Until
                                Your Verification Complete.
                            </h2>
                            <PrimaryButton
                                disabled={loading}
                                loading={loading}
                                content="Check Status"
                                onclick={checkStatus}
                                className="bg-c1 w-[130px] h-10 rounded-md text-c2 mx-auto block mt-3"
                            />
                            <div className="w-full h-[600px] mt-[25px]">
                                <img
                                    src={user?.verification?.proof}
                                    // type="application/pdf"
                                    width="100%"
                                    height="100%"
                                />
                            </div>
                            {/* <iframe src={user?.proof} className="absolute" width="100%" height="600px" /> */}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default CreateProfile;
