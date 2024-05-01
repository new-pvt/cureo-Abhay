import React, { memo, useCallback, useRef } from "react";
import Avatar from "../../../Common/Components/Avatar/Avatar";
import { FormSpan, H8, P2, Span } from "../../../Common/Components/Text/Textt";
import PrimaryButton from "../../../Common/Components/Buttons/PrimaryButton";
import { Link, useNavigate } from "react-router-dom";

const StaffCard = ({
    staffInfo,
    className = "",
    discreption,
    fullDiscreption,
    clickble,
    sm,
    hideInSm,
    verified,
    doctorDetails,
    appointments
}) => {
    const ref = useRef();
    const navigate = useNavigate();
    // const handleClick = useCallback((e) => {
    //     if (!clickble) return;
    //     if (e.target != ref.current) {
    //         navigate(`/hospital/doctors/${doctorInfo?._id}/book-appointment`);
    //         return;
    //     }
    //     navigate(`/hospital/doctors/${doctorInfo?._id}/book-appointment`);
    // }, []);
    return (
        <div
            className={`p-5 flex border flex-col gap-3 md:gap-0 md:flex-row justify-between md:items-center rounded-[5px] ${className}`}
        >
            <div className="flex gap-[14px]">
                <Avatar
                    src={staffInfo?.imgurl}
                    className={"w-[88px] h-[88px]"}
                />
                <div className="flex flex-col gap-[2px]">
                    <div className="flex flex-wrap gap-[5px] items-center">
                        <H8 content={staffInfo?.nameOfStaff} />
                        <Span content="|" />{" "}
                        <Span content={staffInfo?.designation} />
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
                    <Span
                        content={staffInfo?.email}
                    />
                    <Span
                        content={staffInfo?.phone}
                    />
                    <Span
                        content={staffInfo?.dateOfBirth}
                    />
                    {/* <div
                        className={`flex ${hideInSm && "hidden"} items-center gap-[5px]`}
                    >
                        <img
                            src="/patient/Find Doctors/Location-2.svg"
                            alt="img"
                        />
                        <Span content={doctorInfo?.location} />
                    </div> */}
                    {/* <Span content="114 Ratings" /> */}
                    {discreption && (
                        <P2
                            content={doctorInfo?.description}
                            className={`text-c16 w-[90%] mt-1 font-w1 ${sm ? "block" : "hidden"} md:block`}
                        />
                    )}
                </div>
            </div>
            {/* {fullDiscreption && (
                <P2
                    content={doctorInfo?.description}
                    className={"text-c16 w-[90%] font-w1 block md:hidden"}
                />
            )} */}
            {/* {visible && (
                <div className="flex items-center gap-2.5">
                    <PrimaryButton
                        onclick={() =>
                            navigate(
                                `/hospital/doctor/${doctorInfo?._id}/details`
                            )
                        }
                        className={"bg-c3 font-f2  w-full md:w-[100px] h-10"}
                        bg={"c1"}
                        color={"white"}
                        radius={"44px"}
                        content={"View"}
                        reff={ref}
                    />
                    <PrimaryButton
                        className={"bg-c1 font-f2 w-full md:w-[145px] h-10"}
                        onclick={() =>
                            navigate(
                                `/hospital/doctor/${doctorInfo?._id}/book-appointment`
                            )
                        }
                        w={"145px"}
                        bg={"c1"}
                        color={"white"}
                        radius={"44px"}
                        content={"Book Now"}
                        reff={ref}
                    />
                </div>
            )}
            {doctorDetails && (
                <div className="flex items-center gap-2.5">
                    <PrimaryButton
                        className={"bg-c1 font-f2 w-full md:w-[145px] h-10"}
                        onclick={() =>
                            navigate(
                                `/hospital/doctor/${doctorInfo?._id}/book-appointment`
                            )
                        }
                        w={"145px"}
                        bg={"c1"}
                        color={"white"}
                        radius={"44px"}
                        content={"Book Now"}
                        reff={ref}
                    />
                    <PrimaryButton
                        onclick={() =>
                            navigate(
                                `/hospital/doctor/${doctorInfo?.nameOfTheDoctor}/${doctorInfo?._id}/appointment-settings`
                            )
                        }
                        className={"bg-c3 font-f2  w-full md:w-[100px] h-10"}
                        bg={"c1"}
                        color={"white"}
                        radius={"44px"}
                        content={"Settings"}
                        reff={ref}
                    />
                </div>
            )}
            {appointments && (
                <div className="flex items-center gap-2.5">
                    <PrimaryButton
                        onclick={() =>
                            navigate(
                                `/hospital/doctor/${doctorInfo?.nameOfTheDoctor}/${doctorInfo?._id}/appointment-settings`
                            )
                        }
                        className={"bg-c3 font-f2 w-full md:w-[172px] h-10"}
                        bg={"c1"}
                        color={"white"}
                        radius={"44px"}
                        content={"Change Settings"}
                        reff={ref}
                    />
                    <PrimaryButton
                        className={"bg-c1 font-f2 w-full md:w-[145px] h-10"}
                        onclick={() =>
                            navigate(
                                `/hospital/doctor/${doctorInfo?._id}/book-appointment`
                            )
                        }
                        w={"145px"}
                        bg={"c1"}
                        color={"white"}
                        radius={"44px"}
                        content={"Book Now"}
                        reff={ref}
                    />
                    
                </div>
            )} */}
        </div>
    );
};

export default memo(StaffCard);
