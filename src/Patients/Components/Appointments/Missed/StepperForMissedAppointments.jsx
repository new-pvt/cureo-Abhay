import React from "react";
import "./style.css";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { IoCheckmark } from "react-icons/io5";
import { LuPlus } from "react-icons/lu";

import { Span } from "../../../../Common/Components/Text/Textt";
import moment from "moment";

const StepperForMissedAppointments = ({ stepperData }) => {
    console.log(stepperData.remark);
    return (
        <>
            {/* Stepper For Web */}
            <div className="hidden md:flex justify-between mt-[33px] ">
                <div className={`step-item`}>
                    <div className="bg-c24 rounded-full p-2.5 z-10">
                        <LuPlus
                            size={25}
                            color="#ffffff"
                            className="z-10 rotate-45"
                        />
                    </div>

                    <p className="font-f3 font-w1">Appointment Confirm</p>
                </div>
                <div className={`step-item`}>
                    <div className="bg-c24 rounded-full p-2.5 z-10">
                        <LuPlus
                            size={25}
                            color="#ffffff"
                            className="z-10 rotate-45"
                        />
                    </div>
                    <p className="font-f3 font-w1 text-[13px] mt-2 capitalize">
                        Appointment {stepperData?.status}{" "}
                        {stepperData?.remark == "by patient"
                            ? "by you"
                            : stepperData?.remark}
                    </p>
                </div>
                <div className={`step-item`}>
                    <div className="bg-c24 rounded-full p-2.5 z-10">
                        <LuPlus
                            size={25}
                            color="#ffffff"
                            className="z-10 rotate-45"
                        />
                    </div>
                    <p className="font-f3 font-w1">Appointment Completed</p>
                </div>
            </div>
            {/* Stepper for Mobile View*/}

            <div className="block md:hidden mt-6 ml-4">
                <div className="flex gap-2">
                    <div className="flex flex-col items-center">
                        <div className="bg-c24 w-fit p-2 rounded-full">
                            <LuPlus
                                size={25}
                                color="#ffffff"
                                className="z-10 rotate-45"
                            />
                        </div>
                        <div className="w-[2px] h-[60px] bg-c24"></div>
                    </div>
                    <p className="font-f3 font-w1 text-[13px] mt-2">
                        Appointment Confirm
                    </p>
                </div>
                <div className="flex gap-2">
                    <div className="flex flex-col items-center">
                        <div className="bg-c24 w-fit p-2 rounded-full">
                            <LuPlus
                                size={25}
                                color="#ffffff"
                                className="z-10 rotate-45"
                            />
                        </div>
                        <div className="w-[2px] h-[60px] bg-c24"></div>
                    </div>
                    <div>
                        <p className="font-f3 font-w1 text-[13px] mt-2 capitalize">
                            Appointment {stepperData?.status}{" "}
                            {stepperData?.remark == "by patient"
                                ? "by you"
                                : stepperData?.remark}
                        </p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className="flex flex-col items-center">
                        <div className="bg-c24 w-fit p-2 rounded-full">
                            <LuPlus
                                size={25}
                                color="#ffffff"
                                className="z-10 rotate-45"
                            />
                        </div>
                    </div>
                    <p className="font-f3 font-w1 text-[13px] mt-2">
                        Appointment Completed
                    </p>
                </div>
            </div>
        </>
    );
};

export default StepperForMissedAppointments;
