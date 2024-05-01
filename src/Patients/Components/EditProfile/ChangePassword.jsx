import React, { useCallback, useState } from "react";
import { ErrorSpan, FormSpan, H7 } from "../../../Common/Components/Text/Textt";
import { Input1 } from "../../../Common/Components/Inputs/Inputs";
import PrimaryButton from "../../../Common/Components/Buttons/PrimaryButton";
import { useSelector } from "react-redux";
import { axiosClient } from "../../../Utils/axiosClient";
import toast from "react-hot-toast";

const ChangePassword = ({ setChangePassword }) => {
    const [password, setPassword] = useState({
        oldPassword: "",
        newPassword: "",
    });
    const { user } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
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
        [password]
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPassword({ ...password, [name]: value });
        if (name == "newPassword")
            return setNotAStrongPassword(isStrongPassword(value));
    };

    const changePassword = async (e) => {
        e.preventDefault();
        // if (!password.oldPassword || !password.newPassword ) {
        //     return setError(true);
        // }
        setError(null);
        setLoading(true);
        try {
            const response = await axiosClient.put(
                `/v2/changepassword/${user?._id}`,
                {
                    oldpassword: password.oldPassword,
                    newpassword: password.newPassword,
                    role: user?.role,
                }
            );
            if (response.status === "ok") {
                setChangePassword(false);
                return toast.success("Password Changed successfully");
            }
        } catch (error) {
            // setOldPassword("");
            // setNewPassword("");
            // setConfirmPassword("");
            setError(error.message);
            toast.error(error.message);
            // setWrongPassword(error.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className=" w-full h-fit rounded-[5px] bg-c2">
            <H7 content="Change Password" className="mb-4" />
            <form onSubmit={changePassword} className="flex flex-col gap-4">
                <Input1
                    type="text"
                    placeholder="Enter Old Password"
                    name="oldPassword"
                    autofocus={true}
                    value={password?.oldPassword}
                    onchange={handleChange}
                    required={true}
                    classname={`bg-white w-full placeholder:text-[#242323] font-f3 font-w1`}
                />
                {error && (
                    <ErrorSpan content={error} className="-mt-2 text-c24" />
                )}

                <Input1
                    type="text"
                    placeholder="Enter New Password"
                    name="newPassword"
                    autofocus={false}
                    value={password?.newPassword}
                    onchange={handleChange}
                    required={true}
                    classname={`bg-white w-full placeholder:text-[#242323] font-f3 font-w1`}
                />
                <FormSpan content="Forgot old Password?" className="-mt-2" />
                {notAStrongPassword && (
                    <ErrorSpan
                        content={notAStrongPassword}
                        className="-mt-2 text-c24"
                    />
                )}
                <PrimaryButton
                    content={"Save Changes"}
                    type="submit"
                    // onclick={()=>null}
                    loading={loading}
                    className={`${!password.oldPassword || !password.newPassword ? "bg-[#1F51C6AD]" : "bg-c1"}  text-[#ffffff] font-f2 w-[244px] mx-auto`}
                    h={"40px"}
                    bg={"c1"}
                    radius={"44px"}
                    // disabled={!signInInfo.password}
                />
            </form>
        </div>
    );
};

export default ChangePassword;
