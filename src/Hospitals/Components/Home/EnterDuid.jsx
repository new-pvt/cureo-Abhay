import React, { memo, useContext, useState } from "react";
import Dialog from "../../../Common/Components/Dialogs/Dialog";
import { Input2 } from "../../../Common/Components/Inputs/Inputs";
import PrimaryButton from "../../../Common/Components/Buttons/PrimaryButton";
import { ErrorSpan } from "../../../Common/Components/Text/Textt";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { axiosClient } from "../../../Utils/axiosClient";
import AddDoctorContext from "../../../Utils/Context/Hospital/AddDoctorContext";

const EnterDuid = () => {
    const { user } = useSelector((state) => state.auth);
    const [err, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [duid, setDuid] = useState("");
    const {inputValue, setAddDoctor, setInputValue, setAddDoctorForm} = useContext(AddDoctorContext);

    const handleChange = (e) => {
        setError(false);
        setDuid(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false)
        setLoading(true);
        try {
            const response = await axiosClient.post("/v2/getdoctorinfo", {
                doctorid: duid,
                hospitalId: user?._id,
            });
          
            if (response.status === "ok") {
                // navigate(`/master/user/home/${uuid.id}`);
                setInputValue(response.result);
                setAddDoctor(false)
                setAddDoctorForm(true);
                // setDuidDialog(false);
                return;
            }
        } catch (e) {
                setError(e.message);
            return toast.error(e.message);
        }finally{
            setLoading(false);
        }
    };

    return (
        <Dialog title="Add Doctor" showIcon onclose={() => setAddDoctor(false)}>
            <hr className="border-[1.5px] border-[#D9D9D9] my-5" />
            <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
                <label
                    htmlFor="enterDuid"
                    className="font-f3 font-600 leading-[18px] text-[15px] text-[#383838]"
                >
                    Enter DUID
                </label>
                <Input2
                    placeholder="Enter Email address or Phone Number"
                    classname="w-full"
                    name="emailOrPhone"
                    type="number"
                    required={true}
                    value={duid}
                    onchange={handleChange}
                    autoFocus={true}
                    icon={err ? "/Forms/errorIcon.png" : null}
                    divClasses={"rounded-[5px]"}
                    inputClasses={"rounded-[5px]"}
                    iconClasses={"w-[21px] h-[21px]"}
                />
                {err && (
                    <ErrorSpan
                        content={err}
                        className={"mt-[5px] ml-2 text-c24"}
                    />
                )}
            <PrimaryButton
                content={"Next"}
                type="submit"
                loading={loading}
                className={`bg-c1 font-f2 w-full mt-2.5`}
                h={"40px"}
                bg={"c1"}
                color={"white"}
                radius={"44px"}
                // disabled={!signInInfo.password}
            />
            </form>
        </Dialog>
    );
};

export default memo(EnterDuid);
