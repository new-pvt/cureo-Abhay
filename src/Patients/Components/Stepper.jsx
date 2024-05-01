import React from "react";
import "./StepperStyle.css";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { IoCheckmark } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { Span } from "../../Common/Components/Text/Textt";
import moment from "moment";

const Stepper = ({ stepperData }) => {
    return (
        <>
            {/* Stepper For Web */}
            <div className="hidden md:flex justify-between mt-[33px] ">
                <div className={`step-item`}>
                    <div className="bg-[#108ED6] rounded-full p-2.5 z-10">
                        <FaCheck size={25} color="#ffffff" className="z-10 " />
                    </div>

                    <p className="font-f3 font-w1">Appointment Confirm</p>
                </div>
                <div className={`step-item`}>
                    <div className="border-[3px] border-[#BFBFBF] bg-c2 rounded-full p-[6px] z-10">
                        <FaCheck size={25} color="#BFBFBF" className="z-10 " />
                    </div>
                    <p className="font-f3 font-w1 text-center">
                        Dr. {stepperData?.doctorid?.nameOfTheDoctor} will start
                        Appointments
                    </p>
                    <Span
                        content={`@${stepperData?.AppointmentTime},  ${moment(
                            stepperData?.appointmentDate
                        ).format("DD MMM, ddd")} `}
                    />
                </div>
                <div className={`step-item`}>
                    <div className="border-[3px] border-[#BFBFBF] bg-c2 rounded-full p-[6px] z-10">
                        <FaCheck size={25} color="#BFBFBF" className="z-10 " />
                    </div>
                    <p className="font-f3 font-w1">Appointment Completed</p>
                </div>
            </div>
            {/* Stepper for Mobile View*/}

            <div className="block md:hidden mt-6 ml-4">
                <div className="flex gap-2">
                    <div className="flex flex-col items-center">
                        <div className="bg-[#108ED6] w-fit p-2 rounded-full">
                            <IoCheckmark color="#ffffff" />
                        </div>
                        <div className="w-[2px] h-[60px] bg-[#BFBFBF]"></div>
                    </div>
                    <p className="font-f3 font-w1 text-[13px]">
                        Appointment Confirm
                    </p>
                </div>
                <div className="flex gap-2">
                    <div className="flex flex-col items-center">
                        <div className=" border-[3px] border-[#BFBFBF] bg-c2 w-fit p-[6px] rounded-full">
                            <IoCheckmark color="#5D5E61BD" />
                        </div>
                        <div className="w-[2px] h-[60px] bg-[#BFBFBF]"></div>
                    </div>
                    <div>
                        <p className="font-f3 font-w1 text-[13px]">
                            Dr. {stepperData?.doctorid?.nameOfTheDoctor} will
                            start Appointments
                        </p>
                        <p className="font-f3 font-w1 text-[13px] text-[#949494]">
                            {`@${stepperData?.AppointmentTime},   ${moment(
                                stepperData?.appointmentDate
                            ).format("DD MMM, ddd")} `}{" "}
                        </p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className="flex flex-col items-center">
                        <div className=" border-[3px] border-[#BFBFBF] bg-c2 w-fit p-[6px] rounded-full">
                            <IoCheckmark color="#5D5E61BD" />
                        </div>
                    </div>
                    <p className="font-f3 font-w1 text-[13px]">
                        Appointment Completed
                    </p>
                </div>
            </div>
        </>
    );
};

export default Stepper;
