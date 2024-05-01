import React, { useCallback, useContext, useEffect, useState } from "react";
import { ErrorSpan, H4 } from "../../../../../Common/Components/Text/Textt";
import { useDispatch, useSelector } from "react-redux";
import { Input2 } from "../../../../../Common/Components/Inputs/Inputs";
import OtpInput from "../../../../../Common/Components/Inputs/OtpInput";
import PrimaryButton from "../../../../../Common/Components/Buttons/PrimaryButton";
import AuthContext from "../../../../../Utils/Context/Patients/AuthContext";
import { axiosClient } from "../../../../../Utils/axiosClient";
import {
    doctorAuth,
    hospitalAuth,
    patientAuth,
} from "../../../../../Utils/Store/authSlice";
import SetNewPassword from "./SetNewPassword";
import toast from "react-hot-toast";
import EnterOtp from "./EnterOtp";

const ForgotPassword = ({ forgetPasswordDialog, setForgetPasswordDialog }) => {
    const { getAuthenticate } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const { signInInfo, setSignInInfo, setAuthDialog } =
        useContext(AuthContext);

    const [notFound, setNotFound] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [isValidPhone, setIsValidPhone] = useState(false);
    const [anotherUser, setAnotherUser] = useState(null);
    const [error, setError] = useState(null);

    const IsValidEmail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value.trim());
    };

    const IsValidPhone = (value) => {
        return /^\d{10}$/.test(value.trim());
    };

    const handleChange = useCallback(
        (e) => {
            const { name, value } = e.target;
            const trimmedValue = value.trim();
            setSignInInfo({ ...signInInfo, [name]: trimmedValue });
            setIsValidEmail(IsValidEmail(trimmedValue));
            setIsValidPhone(IsValidPhone(trimmedValue));
            setNotFound(false);
            setAnotherUser(false);
        },
        [signInInfo.emailOrPhone]
    );

    useEffect(() => {
        setIsValidEmail(IsValidEmail(signInInfo?.emailOrPhone));
        setIsValidPhone(IsValidPhone(signInInfo?.emailOrPhone));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axiosClient.post(
                "/v2/findPatientByEmailOrPhone",
                {
                    emailOrPhone: signInInfo?.emailOrPhone.includes("@")
                        ? signInInfo.emailOrPhone
                        : Number(signInInfo.emailOrPhone),
                }
            );

            if (response.status === "ok") {
                if (response.result.toUpperCase() == "PATIENT") {
                    dispatch(patientAuth("signIn"));
                } else if (response.result.toUpperCase() == "MASTER") {
                    dispatch(hospitalAuth("signIn"));
                } else {
                    dispatch(doctorAuth("signIn"));
                }

                const sendOtp = await axiosClient.post(
                    "/v2/sendOtpToEmailOrPhone",
                    {
                        emailOrPhone: signInInfo?.emailOrPhone.includes("@")
                            ? signInInfo.emailOrPhone
                            : Number(signInInfo.emailOrPhone),
                    }
                );
                if (
                    sendOtp.status === "ok" &&
                    sendOtp.result.message[0] == "SMS sent successfully."
                ) {
                    return setForgetPasswordDialog("ENTER_OTP");
                }
            }
        } catch (error) {
            if (error.statusCode === 404) {
                setNotFound(true);
                return;
            }
            toast.error(error.message);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (forgetPasswordDialog == "EMAIL_OR_PHONE") {
        return (
            <div>
                <H4 content={"To Reset Password,"} className="mb-1" />
                <H4
                    content={"Enter Email or Phone Number"}
                    className="mb-[25px]"
                />
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-4">
                        <Input2
                            placeholder="Enter Email address or Phone Number"
                            classname="w-full"
                            name="emailOrPhone"
                            type="text"
                            required={true}
                            value={signInInfo?.emailOrPhone}
                            onchange={handleChange}
                            autofocus={true}
                            icon={
                                notFound || anotherUser
                                    ? "/Forms/errorIcon.png"
                                    : null
                            }
                            divClasses={"rounded-[5px]"}
                            inputClasses={"rounded-[5px]"}
                            iconClasses={"w-[21px] h-[21px]"}
                        />
                        {notFound && (
                            <ErrorSpan
                                content={"User Not Found"}
                                className={"-my-[10px] ml-2 text-c24"}
                            />
                        )}
                        {anotherUser && (
                            <ErrorSpan
                                content={`This user is registered as ${anotherUser}, kindly login as ${anotherUser} `}
                                className={"-my-[10px] ml-2 text-c24"}
                            />
                        )}
                        {error && (
                            <ErrorSpan
                                content={error}
                                className={"-my-[10px] ml-2 text-c24"}
                            />
                        )}
                    </div>
                    <PrimaryButton
                        className={`${isValidEmail || isValidPhone ? "bg-c1" : "bg-c23"} font-f2 font-w1 w-full`}
                        h={"40px"}
                        bg={"c1"}
                        color={"white"}
                        radius={"44px"}
                        content={"Continue"}
                        type={"submit"}
                        loading={loading}
                        disabled={
                            loading ? true : !isValidEmail && !isValidPhone
                        }
                    />
                </form>
            </div>
        );
    }

    if (forgetPasswordDialog == "ENTER_OTP") {
        return (
            <EnterOtp setForgetPasswordDialog={setForgetPasswordDialog}/>
            // <div className="space-y-2">
            //     <H4 content={"To Reset Password,"} className="mb-1" />
            //     <H4
            //         content={"Enter Email or Phone Number"}
            //         className="mb-[25px]"
            //     />
            //     <OtpInput
            //         numberOfDigits={5}
            //         name={"otp"}
            //         otp={otp}
            //         setOtp={setOtp}
            //     />
            //     {timeInSeconds == 0 ? (
            //         <button
            //             disabled={resendLoading}
            //             onClick={handleResendOtp}
            //             className="text-center text-c1 w-fit block mx-auto font-f2 disabled:text-c23 font-w1"
            //         >
            //             Resend OTP
            //         </button>
            //     ) : (
            //         <p className="text-center text-c1 font-f2 font-w2">
            //             {minutes.toString().padStart(2, "0")}:
            //             {seconds.toString().padStart(2, "0")}
            //         </p>
            //     )}
            //     <PrimaryButton
            //         className={`${isFilled ? "bg-c1" : "bg-c23"} font-f2 font-w1 w-full`}
            //         onclick={handleOptVarify}
            //         h={"40px"}
            //         bg={"c1"}
            //         color={"white"}
            //         radius={"44px"}
            //         content={"Continue"}
            //         loading={loading}
            //         disabled={!isFilled}
            //     />
            // </div>
        );
    }

    if (forgetPasswordDialog == "SET_NEW_PASSWORD") {
        return <SetNewPassword setForgetPasswordDialog={setForgetPasswordDialog}/>;
    }
};

export default ForgotPassword;
