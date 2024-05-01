import React from "react";
import Dialog from "../../../Common/Components/Dialogs/Dialog";
import { Span } from "../../../Common/Components/Text/Textt";

const AppointmentCancelledPopUp = ({ doctorName }) => {
    return (
        <Dialog onclose={()=> null}>
            <div className="flex flex-col justify-center items-center w-full gap-2">
                <img
                    src="/Appointment/AppointmentCancelled.svg"
                    alt="image"
                    className="w-[189px]"
                />
                <h2 className="leading-[26.66px] font-f1 font-w3 text-[24px]">
                    Appointment Cancelled!
                </h2>
                <p className="font-f3 font-w1 text-[15px] text-c4">
                Your appointment with Dr. {doctorName} has been cancelled!
                </p>
            </div>
        </Dialog>
    );
};

export default AppointmentCancelledPopUp;
