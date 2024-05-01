import React, {
    memo,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import { FcGoogle } from "react-icons/fc";
import { BiLogoFacebookCircle } from "react-icons/bi";
import {
    ErrorSpan,
    FormSpan,
    H4,
    Span2,
} from "../../../../Common/Components/Text/Textt";
import { Input2 } from "../../../../Common/Components/Inputs/Inputs";
import PrimaryButton from "../../../../Common/Components/Buttons/PrimaryButton";
import ButtonWithIcon from "../../../../Common/Components/Buttons/ButtonWithIcon";
import AuthContext from "../../../../Utils/Context/Patients/AuthContext";
import { axiosClient } from "../../../../Utils/axiosClient";
import { useDispatch, useSelector } from "react-redux";
import {
    doctorAuth,
    hospitalAuth,
    patientAuth,
} from "../../../../Utils/Store/authSlice";
import { IoLogIn } from "react-icons/io5";

const EnterMailOrPhone = ({ setCurrentDialog }) => {
    const dispatch = useDispatch();
    const [signUp, setSignUp] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [isValidPhone, setIsValidPhone] = useState(false);
    const { signInInfo, setSignInInfo } = useContext(AuthContext);
    const [anotherUser, setAnotherUser] = useState(null);
    const [error, setError] = useState(null);
    const { getAuthenticate } = useSelector((state) => state.auth);

    console.log(isValidEmail || isValidPhone ? true : false);

    const handleClickHere = useCallback((role, authType) => {
        if (role == "PATIENT") {
            dispatch(patientAuth(authType));
        } else if (role == "MASTER") {
            dispatch(hospitalAuth(authType));
        } else {
            dispatch(doctorAuth(authType));
        }
    }, []);

    const IsValidEmail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value.trim());
    };

    const IsValidPhone = (value) => {
        return /^\d{10}$/.test(value.trim());
    };

    useEffect(() => {
        setIsValidEmail(IsValidEmail(signInInfo?.emailOrPhone));
        setIsValidPhone(IsValidPhone(signInInfo?.emailOrPhone));
    }, []);

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

    const handleSignIn = async () => {
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
                if (response.result.toUpperCase() == getAuthenticate?.role) {
                    setCurrentDialog("PASSWORD_OR_OTP");
                    return;
                } else {
                    setAnotherUser(response.result);
                    return;
                }
            }
        } catch (error) {
            if (error.statusCode === 404) {
                setNotFound(true);
                return;
            }
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    const handleSignUp = async () => {
        try {
            setLoading(true);
            const response = await axiosClient.post("/v2/isUserExist", {
                emailOrPhone: signInInfo?.emailOrPhone.includes("@")
                    ? signInInfo.emailOrPhone
                    : Number(signInInfo.emailOrPhone),
            });

            if (response.status === "ok") {
                return setCurrentDialog("SET_PASSWORD");
                //send otp wala function
                // const sendOtp = await axiosClient.post(
                //     "/v2/sendOtpToEmailOrPhone",
                //     {
                //         emailOrPhone: signInInfo?.emailOrPhone.includes("@")
                //             ? signInInfo.emailOrPhone
                //             : Number(signInInfo.emailOrPhone),
                //     }
                // );
                // if (
                //     sendOtp.status === "ok" &&
                //     sendOtp.result.message[0] == "SMS sent successfully."
                // ) {
                //     return setEnterPassword(true);
                // }
            }
        } catch (error) {
            if (error.statusCode === 404) {
                setNotFound(true);
                return;
            }
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const toCapitalize = (word) => {
        const capitalize = word
            .split(" ")
            .map(
                (word) =>
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            )
            .join(" ");
        return capitalize;
    };

    const handleContinue = useCallback(
        async (e) => {
            e.preventDefault();
            if (!signInInfo.emailOrPhone) {
                console.log("email or phone required");
                console.log(signInInfo);
            }
            setAnotherUser(false);
            setNotFound(false);
            setError(null);
            if (getAuthenticate?.authType == "signIn") {
                await handleSignIn();
            } else {
                await handleSignUp();
            }
        },
        [signInInfo.emailOrPhone, getAuthenticate?.authType]
    );

    return (
        <div>
            <span className="flex items-center gap-1 font-f2 font-w1 text-[10px] px-2.5 py-[7px] rounded-[5px]  leading-[13.88px] w-fit bg-c3 text-c2">
                <IoLogIn size={20} />{" "}
                {getAuthenticate?.authType == "signUp"
                    ? `${getAuthenticate?.role == "MASTER" ? "Hospital" : toCapitalize(getAuthenticate?.role)} Sign Up`
                    : `${getAuthenticate?.role == "MASTER" ? "Hospital" : toCapitalize(getAuthenticate?.role)} Sign In`}
            </span>
            <H4
                content={
                    getAuthenticate?.authType == "signUp"
                        ? "To Sign Up,"
                        : "To Sign In"
                }
                className="mb-1 mt-2.5"
            />
            <H4 content="Enter your Number or Email" className="mb-[25px]" />
            <form onSubmit={handleContinue} className="flex flex-col gap-5">
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
                        notFound || anotherUser ? "/Forms/errorIcon.png" : null
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
                <PrimaryButton
                    className={`${isValidEmail || isValidPhone ? "bg-c1" : "bg-c23"} font-f2 font-w1 w-full`}
                    h={"40px"}
                    bg={"c1"}
                    color={"white"}
                    radius={"44px"}
                    content={"Continue"}
                    type={"submit"}
                    loading={loading}
                    disabled={loading ? true : !isValidEmail && !isValidPhone}
                />
            </form>
            <div className="flex items-center gap-[36px] my-[20px]">
                <span className="w-full h-[1.5px] bg-c18"></span>
                <span className="">Or</span>
                <span className="w-full h-[1.5px] bg-c18"></span>
            </div>
            <div className="flex gap-2.5 md:gap-[11px]">
                <ButtonWithIcon>
                    <FcGoogle size={24} /> Google
                </ButtonWithIcon>
                <ButtonWithIcon>
                    <BiLogoFacebookCircle size={24} color="#1877F2" /> Facebook
                </ButtonWithIcon>
            </div>
            <Span2 className="mt-4 text-center flex gap-[5px] justify-center items-center">
                {getAuthenticate?.authType == "signUp"
                    ? "Already Have An Account"
                    : "Don’t have an account?"}
                <FormSpan
                    content="Click here"
                    onclick={() =>
                        handleClickHere(
                            getAuthenticate?.role,
                            getAuthenticate?.authType == "signUp"
                                ? "signIn"
                                : "signUp"
                        )
                    }
                />
            </Span2>
        </div>
    );
};

export default memo(EnterMailOrPhone);
