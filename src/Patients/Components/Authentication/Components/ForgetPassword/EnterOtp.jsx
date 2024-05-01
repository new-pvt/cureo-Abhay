import React, { useContext, useEffect, useState } from "react";
import { ErrorSpan, H4 } from "../../../../../Common/Components/Text/Textt";
import { useDispatch, useSelector } from "react-redux";
import { Input2 } from "../../../../../Common/Components/Inputs/Inputs";
import OtpInput from "../../../../../Common/Components/Inputs/OtpInput";
import PrimaryButton from "../../../../../Common/Components/Buttons/PrimaryButton";
import AuthContext from "../../../../../Utils/Context/Patients/AuthContext";
import { axiosClient } from "../../../../../Utils/axiosClient";
import toast from "react-hot-toast";

const EnterOtp = ({setForgetPasswordDialog}) => {
    const { getAuthenticate } = useSelector((state) => state.auth);
    const { signInInfo, setSignInInfo, setAuthDialog } =
        useContext(AuthContext);
    const [otp, setOtp] = useState(new Array(5).fill(""));
    const [timeInSeconds, setTimeInSeconds] = useState(2 * 60); // 2 minutes
    const [resendLoading, setResendLoading] = useState(false); // 2 minutes
    const [resend, setResend] = useState(0); // 2 minutes
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const isFilled = otp.every((element) => element !== "");
    const handleResendOtp = async () => {
        setResendLoading(true);
        try {
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
                setResend((prevVal) => prevVal + 1);
                toast.success("OTP Sent Successfully");
                setTimeInSeconds(180);
                return;
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setResendLoading(false);
        }
    };

    const handleOptVarify = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axiosClient.post(
                "/v2/varifyOtpForForgotPassword",
                {
                    emailOrPhone: signInInfo?.emailOrPhone.includes("@")
                        ? signInInfo.emailOrPhone
                        : Number(signInInfo.emailOrPhone),
                    otp: otp.join(""),
                    role: getAuthenticate?.role,
                    password: signInInfo.password,
                }
            );
            if (response.status == "ok") {
                setForgetPasswordDialog("SET_NEW_PASSWORD");
            }
        } catch (error) {
            setError(error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimeInSeconds((prevTime) => {
                if (prevTime > 0) {
                    return prevTime - 1;
                } else {
                    clearInterval(intervalId);
                    return 0;
                }
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, [resend]);

    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;

    return (
        <form onSubmit={handleOptVarify} className="space-y-2">
            <H4 content={"To Reset Password,"} className="mb-1" />
            <H4 content={"Enter Email or Phone Number"} className="mb-[25px]" />
            <OtpInput
                numberOfDigits={5}
                name={"otp"}
                otp={otp}
                setOtp={setOtp}
            />
            {timeInSeconds == 0 ? (
                <button
                    disabled={resendLoading}
                    onClick={handleResendOtp}
                    className="text-center text-c1 w-fit block mx-auto font-f2 disabled:text-c23 font-w1"
                >
                    Resend OTP
                </button>
            ) : (
                <p className="text-center text-c1 font-f2 font-w2">
                    {minutes.toString().padStart(2, "0")}:
                    {seconds.toString().padStart(2, "0")}
                </p>
            )}
            <PrimaryButton
                className={`${isFilled ? "bg-c1" : "bg-c23"} font-f2 font-w1 w-full`}
                type="submit"
                h={"40px"}
                bg={"c1"}
                color={"white"}
                radius={"44px"}
                content={"Continue"}
                loading={loading}
                disabled={!isFilled || loading}
            />
        </form>
    );
};

export default EnterOtp;
