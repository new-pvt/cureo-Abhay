import React, {
    memo,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import {
    ErrorSpan,
    FormLable,
    FormSpan,
    H4,
} from "../../../../Common/Components/Text/Textt";
import { Input1, Input2 } from "../../../../Common/Components/Inputs/Inputs";
import PrimaryButton from "../../../../Common/Components/Buttons/PrimaryButton";
import AuthContext from "../../../../Utils/Context/Patients/AuthContext";
import { axiosClient } from "../../../../Utils/axiosClient";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../../Utils/Store/authSlice";
import {
    KEY_ACCESS_TOKEN,
    setItem,
} from "../../../../Utils/localStorageManager";
import { useNavigate } from "react-router-dom";
import OtpInput from "../../../../Common/Components/Inputs/OtpInput";
import toast from "react-hot-toast";
const EnterPassword = ({ setCurrentDialog, setForgetPasswordDialog }) => {
    const { signInInfo, setSignInInfo } = useContext(AuthContext);
    const { getAuthenticate } = useSelector((state) => state.auth);
    const [otp, setOtp] = useState(new Array(5).fill(""));
    const [showPassword, setShowPassword] = useState(false);
    const [incorrectPassword, setIncorrectPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [timeInSeconds, setTimeInSeconds] = useState(2 * 60); // 2 minutes
    const [resend, setResend] = useState(0); // 2 minutes
    const [resendLoading, setResendLoading] = useState(false); // 2 minutes
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isFilled = otp.every((element) => element !== "");
    
    const handleChange = useCallback(
        (e) => {
            const { name, value } = e.target;

            setSignInInfo({ ...signInInfo, [name]: value });
            setIncorrectPassword(false);
        },
        [signInInfo.password]
    );

    const handleSignIn = async () => {
        try {
            setLoading(true);
            const response = await axiosClient.post(
                "/v2/FindUserByNameAndPassword",
                {
                    email: signInInfo?.emailOrPhone.includes("@")
                        ? signInInfo.emailOrPhone
                        : Number(signInInfo.emailOrPhone),
                    password: signInInfo.password,
                    role: getAuthenticate?.role,
                }
            );

            if (response.status === "ok") {
                switch (getAuthenticate?.role) {
                    case "PATIENT":
                        dispatch(login(response.result.ispatient));
                        setItem(KEY_ACCESS_TOKEN, response.result.accessToken);

                        break;
                    case "DOCTOR":
                        navigate("/doctor/select-hospital");
                        dispatch(login(response.result.isdoctor));
                        setItem(KEY_ACCESS_TOKEN, response.result.accessToken);

                        break;
                    case "MASTER":
                        console.log("hospital");
                        dispatch(login(response.result.ishospital));
                        setItem(KEY_ACCESS_TOKEN, response.result.accessToken);

                        break;
                }
            }
        } catch (error) {
            if (error.statusCode === 403) {
                setIncorrectPassword(true);
                return;
            }
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    const handleSignUp = async () => {
        setLoading(true);
        try {
            const response = await axiosClient.post("/v2/varifyOtpController", {
                emailOrPhone: signInInfo?.emailOrPhone.includes("@")
                    ? signInInfo.emailOrPhone
                    : Number(signInInfo.emailOrPhone),
                otp: otp.join(""),
                role: getAuthenticate?.role,
                password: signInInfo.password,
            });
            if (response.status == "ok") {
                dispatch(login(response.result.user));
                setItem(KEY_ACCESS_TOKEN, response.result.accessToken);
                switch (getAuthenticate?.role) {
                    case "PATIENT":
                        navigate("/patient/create-profile");
                        break;
                    case "DOCTOR":
                        navigate("/doctor/create-profile");
                        break;
                    case "MASTER":
                        navigate("/hospital/create-profile");
                        break;
                }
            }
        } catch (error) {
            setError(error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            setError(null);
            if (getAuthenticate?.authType == "signIn") {
                await handleSignIn();
            } else {
                await handleSignUp();
            }
        },
        [signInInfo.password, otp]
    );

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

    const handleForgetPassword = () => {
        setForgetPasswordDialog("EMAIL_OR_PHONE");
        setCurrentDialog(null);
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

        return () => clearInterval(intervalId); // Cleanup function to clear interval on component unmount
    }, [resend]);

    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;

    return (
        <div>
            <H4
                content={
                    getAuthenticate?.authType == "signIn"
                        ? "To Sign in, "
                        : "To Sign Up"
                }
                className="mb-1"
            />
            <H4
                content={
                    getAuthenticate?.authType == "signIn"
                        ? "Enter your Password"
                        : `Enter OTP Sent to ${signInInfo?.emailOrPhone}`
                }
                className="mb-[25px]"
            />
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {getAuthenticate?.authType == "signIn" ? (
                    <div className="flex flex-col gap-4">
                        <Input2
                            name="password"
                            autoFocus={true}
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter Password"
                            classname="w-full"
                            divClasses={"rounded-[5px]"}
                            inputClasses={"rounded-[5px]"}
                            required={true}
                            icon={
                                showPassword
                                    ? "/Forms/Eye open.svg"
                                    : "/Forms/Eye close.svg"
                            }
                            value={signInInfo.password}
                            onchange={handleChange}
                            iconClasses={"w-[21px] h-[21px] cursor-pointer"}
                            iconClick={() => setShowPassword(!showPassword)}
                        />
                        {incorrectPassword && (
                            <ErrorSpan
                                content={"Wrong Password"}
                                className={"-my-[5px] ml-2 text-c24"}
                            />
                        )}
                        {error && (
                            <ErrorSpan
                                content={error}
                                className={"-my-[5px] ml-2 text-c24"}
                            />
                        )}
                        <div className="flex justify-between">
                            <div className="flex gap-[5px]">
                                <input
                                    type="radio"
                                    name="rememberMe"
                                    id="rememberMe"
                                />
                                <FormLable
                                    htmlFor="rememberMe"
                                    content="Remember me?"
                                />
                            </div>
                            <FormSpan
                                onclick={handleForgetPassword}
                                content="Forgot Password?"
                            />
                        </div>
                    </div>
                ) : (
                    <>
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
                                className="text-center text-c1 font-f2 disabled:text-c23 font-w1"
                            >
                                Resend OTP
                            </button>
                        ) : (
                            <p className="text-center text-c1 font-f2 font-w2">
                                {minutes.toString().padStart(2, "0")}:
                                {seconds.toString().padStart(2, "0")}
                            </p>
                        )}
                    </>
                )}

                <PrimaryButton
                    type="submit"
                    loading={loading}
                    className={`${!signInInfo.password && !isFilled ? "bg-c23" : "bg-c1"} font-f2 w-full`}
                    w={"145px"}
                    h={"45px"}
                    bg={"c1"}
                    color={"white"}
                    radius={"44px"}
                    content={
                        getAuthenticate?.authType == "signIn"
                            ? "Sign In"
                            : "Sign Up"
                    }
                    disabled={
                        loading
                            ? true
                            : getAuthenticate?.authType == "signIn"
                              ? !signInInfo.password
                              : !isFilled
                    }
                />
            </form>
        </div>
    );
};

export default memo(EnterPassword);
