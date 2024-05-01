import React from "react";
import Dialog from "../../../../Common/Components/Dialogs/Dialog";
import { H1 } from "../../../../Common/Components/Text/Textt";
import moment from "moment";

const AppointmentBookedDialog = ({
    setAppointmentBookedDialog,
    appointmentData,
}) => {
    return (
        <Dialog onclose={() => setAppointmentBookedDialog(false)}>
            <div className="flex flex-col justify-center items-center w-full gap-2">
                <img
                    src="/Appointment/AppointmentBooked.svg"
                    alt="image"
                    className="w-[189px]"
                />
                <h2 className="leading-[26.66px] font-f1 font-w3 text-[24px]">
                    Appointment booked!
                </h2>
                {appointmentData.AppointmentTime && (
                    <p className="font-f3 font-w1 text-[13px] leading-[15.6px] text-c4">
                        Your appointment has been booked for{" "}
                        {moment(appointmentData?.appointmentDate).format(
                            "DD MMM, ddd"
                        )}{" "}
                        {`@${appointmentData.AppointmentTime}`}
                    </p>
                )}
                {appointmentData?.tokenNo && (
                    <h6 className="font-f2 font-w2">
                        Token : {appointmentData?.tokenNo}
                    </h6>
                )}
            </div>
        </Dialog>
    );
};

export default AppointmentBookedDialog;
