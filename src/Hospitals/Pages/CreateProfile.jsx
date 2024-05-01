import React, { useEffect, useState } from "react";
import Stepper from "../Components/Stepper/Stepper";
import Avatar from "../../Common/Components/Avatar/Avatar";
import Select from "../../Common/Components/Inputs/Select";
import MultiSelect from "../../Common/Components/Inputs/MultiSelect";
import { Input1 } from "../../Common/Components/Inputs/Inputs";
import PrimaryButton from "../../Common/Components/Buttons/PrimaryButton";
import { useDispatch, useSelector } from "react-redux";
import { updateUserData } from "../../Utils/Store/authSlice";
import toast from "react-hot-toast";
import UploadDocument from "../Components/UploadDocument/UploadDocument";
import { axiosClient } from "../../Utils/axiosClient";

const CreateProfile = () => {
    const { user } = useSelector((state) => state.auth);
    const [inputImage, setInputImage] = useState("");
    const [preview, setPreview] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
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
        nameOfhospitalOrClinic: user?.nameOfhospitalOrClinic || "",
        email: user?.email || "",
        phone: user?.phone || "",
        location: user?.location || "",
        landmark: user?.landmark || "",
        enterFullAddress: user?.enterFullAddress || "",
    });

    console.log(user?.verification?.status);

    // console.log("hello");

    // const readFile = () => {
    //     const fr = new FileReader();
    //     const bl = new Blob([user.proof], { type: "image/jpg" });
    //     console.log(bl);
    //     const b = fr.readAsDataURL(bl);

    //     console.log(b)
    //     // fr.readAsDataURL(user.proof);

    //     // fr.onload = () => {
    //     //     console.log(fr.result);
    //     // };
    // };

    // readFile();

    const formInputs = [
        {
            type: "text",
            placeholder: "Enter Hospital Name",
            name: "nameOfhospitalOrClinic",
            classname: "",
            autofocus: false,
            value: inputValue?.nameOfhospitalOrClinic,
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

    return (
        <main className="overflow-x-hidden relative min-h-[calc(100vh-98px)] px-4 md:px-[50px] py-[30px] ">
            <div className="md:w-[40%] h-[50%] blur-[120px] fixed bottom-0 right-0 -z-20 bg-gradient-to-l from-[#1F51C626] via-[#108ED638] to-[#1F51C638]"></div>
            <div className="md:w-[40%] h-[50%] blur-[120px] fixed left-0 bottom-0 -z-20 bg-gradient-to-b from-[#1F51C638] via-[#108ED638] to-[#1F51C626]"></div>
            <div className="w-full h-full flex justify-center ">
                <div className="w-full md:w-[35.37%]">
                    <Stepper
                        createdProfile={
                            user?.nameOfhospitalOrClinic ? true : false
                        }
                        verified={user?.verified ? true : false}
                    />
                    {user?.user?.verification?.proof &&
                    user?.verification?.status == "rejected" ? (
                        <div></div>
                    ) : user?.verification?.proof &&
                      user?.verification?.status == "pending" ? (
                        <div>
                            <h2 className="font-f2 font-w2 text-center mt-5">
                                Your Verifcation is in Process kindly Wait Until
                                Your Verification Complete.
                            </h2>
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
                    ) : user?.nameOfhospitalOrClinic &&
                      !user?.verification?.proof ? (
                        <UploadDocument />
                    ) : (
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
                    )}
                </div>
            </div>
        </main>
    );
};

export default CreateProfile;
