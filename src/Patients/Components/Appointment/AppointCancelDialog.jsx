import React, { useState } from "react";
import Dialog from "../../../Common/Components/Dialogs/Dialog";
import { H4, Span } from "../../../Common/Components/Text/Textt";
import PrimaryButton from "../../../Common/Components/Buttons/PrimaryButton";
import { axiosClient } from "../../../Utils/axiosClient";
import { useNavigate } from "react-router-dom";
import AppointmentCancelledPopUp from "./AppointmentCancelledPopUp";

const AppointCancelDialog = ({ onClose, doctorName, cancelAppointment, loading }) => {
    return (
        <>
            <Dialog
                onclose={onClose}
                showIcon={true}
                title="Cancel Appointment?"
            >
                {/* <H4 content="Cancel Appointment? " className="mb-1 w-full md:w-[444px]" /> */}
                <p className="font-f3 font-w1 text-c4">
                    are you sure you want to cancel appointment with
                </p>
                <h6 className="font-f3 font-w3 text-[#1F51C6]">{doctorName}</h6>
                <div className="flex items-center gap-[9px]">
                    <PrimaryButton
                        onclick={onClose}
                        className={`bg-[#108ED629] flex-1 text-[#263238]  font-f2 text-[13px] py-3 mx-auto block whitespace-nowrap my-5`}
                        // w={"132px"}
                        // h={"41px"}
                        bg={"c29"}
                        radius={"44px"}
                        content={"No, Go Back!"}
                        // reff={ref}
                    />
                    <PrimaryButton
                        disabled={loading}
                        onclick={cancelAppointment}
                        dis
                        loading={loading}
                        className={`bg-c29 text-c2 flex-1 font-f2 text-[13px] px-4 py-3 mx-auto block whitespace-nowrap my-5`}
                        // w={"132px"}
                        // h={"41px"}
                        bg={"c29"}
                        radius={"44px"}
                        content={"Cancel appointment"}
                        // reff={ref}
                    />
                </div>
            </Dialog>
        </>
    );
};

export default AppointCancelDialog;
