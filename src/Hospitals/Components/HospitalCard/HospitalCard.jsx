import React, { memo, useCallback, useRef } from "react";
import Avatar from "../../../Common/Components/Avatar/Avatar";
import { FormSpan, H8, P2, Span } from "../../../Common/Components/Text/Textt";
import PrimaryButton from "../../../Common/Components/Buttons/PrimaryButton";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const HospitalCard = ({
    visible,
    className = "",
    discreption,
    fullDiscreption,
    clickble,
    sm,
    hideInSm,
    verified,
}) => {
    const ref = useRef();
    const { user } = useSelector((state) => state.auth);
    
    const navigate = useNavigate();
    const handleClick = useCallback((e) => {
        if (!clickble) return;
        if (e.target != ref.current) {
            navigate(`/patient/doctor-details/${user?._id}`);
            return;
        }
        navigate(`/patient/doctor/${user?._id}/book_appointment`);
    }, []);
    return (
        <div
            onClick={handleClick}
            className={`px-5 py-5 border border-[#D9D9D980] flex flex-col gap-3 md:gap-0 md:flex-row justify-between md:items-center ${!clickble ? "cursor-default" : "cursor-pointer"} rounded-[5px] ${className}`}
        >
            <div className="flex gap-[14px]">
                <Avatar src={user?.imgurl} className={"w-[88px] h-[88px]"} />
                <div className="flex flex-col gap-[2px]">
                    <div className="flex flex-wrap gap-[5px] items-center">
                        <H8 content={user?.nameOfhospitalOrClinic} />
                        {verified && (
                            <div
                                className={
                                    "flex items-center gap-1 bg-c7 top-[15px] right-[15px] px-2 py-[5px] rounded-[5px]"
                                }
                            >
                                <img
                                    src="/Find Doctors/AppointmentVerified.svg"
                                    alt="img"
                                    className="w-[11.08px]"
                                />
                                <FormSpan
                                    content={"Verified"}
                                    className={
                                        "font-w1 whitespace-nowrap text-[10px]"
                                    }
                                />
                            </div>
                        )}
                    </div>
                    <p
                        className={`text-[#263238] font-f3 font-w1 leading-[15.6px] text-[13px] `}
                    >
                        {user?.enterFullAddress}
                    </p>
                    <p
                        className={`text-[#263238] font-f3 font-w1 leading-[15.6px] text-[13px] `}
                    >
                        {user?.location}
                    </p>
                   
                    <div
                        className={`flex ${hideInSm && "hidden"} items-center gap-[5px]`}
                    >
                        <img src="/Find Doctors/Location-1.svg" alt="img" />
                        <p
                            className={`text-[#263238] font-f3 font-w1 leading-[15.6px] text-[13px] `}
                        >
                            {user?.landmark}
                        </p>
                    </div>
                    <Span content="114 Ratings" />
                    {discreption && (
                        <P2
                            content={user?.description}
                            className={`text-c16 w-[90%] mt-1 font-w1 ${sm ? "block" : "hidden"} md:block`}
                        />
                    )}
                </div>
            </div>
            {fullDiscreption && (
                <P2
                    content={user?.description}
                    className={"text-c16 w-[90%] font-w1 block md:hidden"}
                />
            )}
            {/* {visible && ( */}
                <PrimaryButton
                onclick={()=>navigate('/hospital/edit-profile')}
                    className={"bg-c1 font-f2 w-full md:w-[168px]"}
                    w={"145px"}
                    h={"40px"}
                    bg={"c1"}
                    color={"white"}
                    radius={"44px"}
                    content={"Edit Profile"}
                    reff={ref}
                />
            {/* )} */}
        </div>
    );
};

export default memo(HospitalCard);
