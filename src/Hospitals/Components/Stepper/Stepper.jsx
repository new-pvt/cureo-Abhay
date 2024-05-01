import React from "react";
import { FaCheck } from "react-icons/fa6";
import "./StepperStyle.css"
import { Span } from "../../../Common/Components/Text/Textt";
import moment from "moment";

const Stepper = ({ createdProfile, verified }) => {
    return (
        <div className="flex justify-between ">
            <div className={`step-item`}>
                <div
                    className={`${createdProfile ? "bg-[#108ED6]" : "bg-[#5D5E61] border-[2px] border-c2 "} rounded-full p-2.5 z-10`}
                >
                    <FaCheck size={25} color="#ffffff" className=" " />
                </div>

                <p className="font-f3 font-w1">Create Profile</p>
            </div>
            <div className={`step-item`}>
                <div
                    className={`${verified ? "bg-[#108ED6]" : "bg-[#5D5E61] border-[2px] border-c2 "} rounded-full p-2.5 z-10`}
                >
                    <FaCheck size={25} color="#ffffff" className="z-10 " />
                </div>
                <p className="font-f3 font-w1">Verification</p>
            </div>
        </div>
    );
};

export default Stepper;
