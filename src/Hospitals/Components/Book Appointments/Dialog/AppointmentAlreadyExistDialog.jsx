import React from "react";
import Dialog from "../../../../Common/Components/Dialogs/Dialog";
import { H1 } from "../../../../Common/Components/Text/Textt";

const AppointmentAlreadyExistDialog = ({setOpenDialog}) => {
    return (
        <Dialog onclose={()=>setOpenDialog(false)}>
            <div className="flex flex-col justify-center items-center w-full gap-2">
                <img src="/Appointment/AppointmentCancelled.svg" alt="image" className="w-[189px]" />
                <h2
                    className="leading-[26.66px] font-f1 font-w3 text-[24px]"
                >
                    Appointment Already Exists
                    </h2>
            </div>
        </Dialog>
    );
};

export default AppointmentAlreadyExistDialog;
