import React, { useContext, useState } from "react";
import ScheduledTimesCard from "./ScheduledTimesCard";
import PrimaryButton from "../../../Common/Components/Buttons/PrimaryButton";
import SettingsContext from "../../../Utils/Context/Doctor/SettingsContext";
import { useSelector } from "react-redux";
import EditSlots from "./EditSlots";

const ShowSlots = ({ data }) => {
    const { doctor } = useSelector((state) => state.doctorsData);
    const { appointmentBy } = useContext(SettingsContext);
    const [editSlot, setEditSlot] = useState();

    if (editSlot) return <EditSlots data={data} />;

    return (
        <>
            {appointmentBy == "slot" && (
                <div className="space-y-3">
                    <p className="leading-[18px] font-f3 font-w1 text-c20 text-[15px] ml-2">
                        Slot Duration:
                    </p>
                    <span className="leading-[18px] font-f3 font-w1 text-c20 text-[15px] ml-2 px-4 border border-c17 py-2 block w-fit rounded-[5px]">
                        {data?.slotduration} Mins
                    </span>
                </div>
            )}

            <div className="flex gap-4 flex-wrap">
                {data?.Starttime1 && (
                    <ScheduledTimesCard
                        data={{
                            slotNo: 1,
                            startTime: data?.Starttime1,
                            endTime: data?.Endtime1,
                        }}
                    />
                )}
                {data?.Starttime2 && (
                    <ScheduledTimesCard
                        data={{
                            slotNo: 2,
                            startTime: data?.Starttime2,
                            endTime: data?.Endtime2,
                        }}
                    />
                )}
                {data?.Starttime3 && (
                    <ScheduledTimesCard
                        data={{
                            slotNo: 3,
                            startTime: data?.Starttime3,
                            endTime: data?.Endtime3,
                        }}
                    />
                )}
            </div>
            <PrimaryButton
                content={"Edit"}
                disabled={
                    doctor?.acceptAppointments == "byToken" &&
                    appointmentBy != "token"
                        ? true
                        : doctor?.acceptAppointments == "bySlot" &&
                            appointmentBy != "slot"
                          ? true
                          : false
                }
                onclick={() => setEditSlot(true)}
                className={`bg-c1 text-c2 font-f2 w-full`}
                h={"37px"}
                bg={"c1"}
                color={"#353535"}
                radius={"44px"}
                // disabled={!signInInfo.password}
            />
        </>
    );
};

export default ShowSlots;
