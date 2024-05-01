import React, { useContext } from "react";
import { useSelector } from "react-redux";
import SettingsContext from "../../../Utils/Context/Doctor/SettingsContext";

const ScheduledTimesCard = ({ data }) => {
    const { doctor } = useSelector((state) => state.doctorsData);
    const { appointmentBy, setAppointmentBy } = useContext(SettingsContext);


    return (
        <div className={`relative flex gap-[25px] p-4 pt-6 leading-[18px] font-f3 font-w1 text-[15px] ml-2 border border-c17 w-fit rounded-[5px] ${doctor?.acceptAppointments == "byToken" && appointmentBy != "token" ? "bg-[#D9D9D961] text-[#706D6D]" : doctor?.acceptAppointments == "bySlot" && appointmentBy != "slot" ? "bg-[#D9D9D961] text-[#706D6D] " : "text-c20"}`}>
            <span className="absolute top-[-10px] bg-c2 leading-[18px] font-f3 font-w1  text-[15px] block w-fit rounded-[5px]">
                Slot {data?.slotNo}
            </span>
            <div className=" space-y-3">
                <p className="leading-[18px] font-f3 font-w1  text-[15px] ">
                    Start Time:
                </p>
                <span className="leading-[18px] font-f3 font-w1  text-[15px]  px-[23px] border border-c17 py-2 block w-fit rounded-[5px]">
                    {data?.startTime}
                </span>
            </div>
            <div className="ml-2 space-y-3">
                <p className="leading-[18px] font-f3 font-w1  text-[15px] ">
                    End Time:
                </p>
                <span className="leading-[18px] font-f3 font-w1  text-[15px]  px-[23px] border border-c17 py-2 block w-fit rounded-[5px]">
                    {data?.endTime}
                </span>
            </div>
        </div>
    );
};

export default ScheduledTimesCard;
