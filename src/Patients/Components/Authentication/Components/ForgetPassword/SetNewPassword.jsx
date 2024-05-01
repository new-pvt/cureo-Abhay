import React, { useCallback, useContext, useEffect, useState } from "react";
import { ErrorSpan, H4 } from "../../../../../Common/Components/Text/Textt";
import { Input2 } from "../../../../../Common/Components/Inputs/Inputs";
import PrimaryButton from "../../../../../Common/Components/Buttons/PrimaryButton";
import AuthContext from "../../../../../Utils/Context/Patients/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { axiosClient } from "../../../../../Utils/axiosClient";
import toast from "react-hot-toast";

const SetNewPassword = ({ setForgetPasswordDialog, setCurrentDialog }) => {
    const [notMatched, setNotMatched] = useState(false);
    const { signInInfo, setSignInInfo } = useContext(AuthContext);
    const { getAuthenticate } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [notAStrongPassword, setNotAStrongPassword] = useState(null);

    const isStrongPassword = useCallback(
        (password) => {
            if (!/[A-Z]/.test(password)) {
                return "Password must contains at least one uppercase letter";
            }

            if (!/[a-z]/.test(password)) {
                return "Password must contains at least one lowercase letter";
            }

            if (password.length < 8) {
                return "Password must be At least 8 characters long";
            }

            if (!/\d/.test(password)) {
                return "Password must contains at least one digit";
            }

            if (!/[$@$!%*?&]/.test(password)) {
                return "Password must contains at least one special character";
            }

            return null;
        },
        [signInInfo]
    );
    const handleChange = useCallback(
        (e) => {
            const { name, value } = e.target;
            const trimmedValue = value.trim();
            setSignInInfo({ ...signInInfo, [name]: trimmedValue });
            if (name == "password") {
                return setNotAStrongPassword(isStrongPassword(value));
            }

            setNotMatched(signInInfo?.password != value);
        },
        [signInInfo]
    );

    const handleResetPaswword = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const sendOtp = await axiosClient.post("/v2/resetPassword", {
                emailOrPhone: signInInfo?.emailOrPhone.includes("@")
                    ? signInInfo.emailOrPhone
                    : Number(signInInfo.emailOrPhone),
                newPassword: signInInfo.password,
                role: getAuthenticate?.role,
            });
            if (sendOtp.status === "ok") {
                setSignInInfo({
                    ...signInInfo,
                    password: "",
                    confirmPassword: "",
                });
                toast.success("Password reset successfully");
                setForgetPasswordDialog(null);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <H4
                content={
                    getAuthenticate?.authType == "signUp"
                        ? "To Sign Up,"
                        : "To Sign In"
                }
                className="mb-1"
            />
            <H4 content="Set a Password" className="mb-[25px]" />
            <form
                onSubmit={handleResetPaswword}
                className="flex flex-col gap-5"
            >
                <Input2
                    name="password"
                    autoFocus={true}
                    type={showPassword ? "text" : "password"}
                    placeholder="New Password"
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
                <Input2
                    placeholder="Confirm Password"
                    classname="w-full"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    required={true}
                    value={signInInfo?.confirmPassword}
                    onchange={handleChange}
                    autofocus={true}
                    icon={notMatched ? "/Forms/errorIcon.png" : null}
                    divClasses={"rounded-[5px]"}
                    inputClasses={"rounded-[5px]"}
                    iconClasses={"w-[21px] h-[21px]"}
                />
                {notAStrongPassword && (
                    <ErrorSpan
                        content={notAStrongPassword}
                        className={"-my-[10px] ml-2 text-c24"}
                    />
                )}
                {signInInfo?.password &&
                    signInInfo?.confirmPassword &&
                    notMatched && (
                        <ErrorSpan
                            content={"Password Not Matched"}
                            className={"-my-[10px] ml-2 text-c24"}
                        />
                    )}

                <PrimaryButton
                    className={`bg-c1 disabled:bg-c23 font-f2 font-w1 w-full`}
                    h={"40px"}
                    bg={"c1"}
                    color={"white"}
                    radius={"44px"}
                    content={"Next"}
                    type={"submit"}
                    loading={loading}
                    disabled={
                        loading
                            ? true
                            : signInInfo?.password.length == 0
                              ? true
                              : signInInfo?.password !=
                                  signInInfo?.confirmPassword
                                ? true
                                : false
                    }
                />
            </form>
        </div>
    );
};

export default SetNewPassword;
