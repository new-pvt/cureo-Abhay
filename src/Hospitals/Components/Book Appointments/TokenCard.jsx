import React, { useEffect, useState } from "react";
import { ErrorSpan, H7, P2, P3 } from "../../../Common/Components/Text/Textt";
import BoxButton from "../../../Common/Components/Buttons/BoxButton";
import LoadingDots from "../../../Common/Components/Animation/LoadingDots/LoadingDots";
import moment from "moment";

const TokenCard = ({
    dates,
    slotsLoading,
    doctorNotAvailable,
    tokensData,
    acceptAppointment,
    isFormEnabled, setIsFormEnabled
}) => {
    const [currentTime, setCurrentTime] = useState(moment());
    const [timeSlots, setTimeSlots] = useState([]);

   
    useEffect(() => {
        if (tokensData) {
            const slots = [];
            for (let i = 1; i <= 3; i++) {
                const startTime = tokensData[`Starttime${i}`];
                const endTime = tokensData[`Endtime${i}`];
                if (startTime && endTime) {
                    slots.push({
                        startTime: moment(startTime, "HH:mm").format(),
                        endTime: moment(endTime, "HH:mm").format(),
                    });
                }
            }
            setTimeSlots(slots);
        }
    }, [tokensData]); // Update time slots when tokensData changes

    useEffect(() => {
        const timerID = setInterval(() => {
            setCurrentTime(moment());
        }, 60000); // Update time every seconds

        // Clean up timer on component unmount
        return () => clearInterval(timerID);
    }, []);

    useEffect(() => {
        updateFormStatus(); // Call updateFormStatus initially
    }, [timeSlots, currentTime]);

    const updateFormStatus = () => {
        // Check if the current time is within 1 hour before the start of any time slot
        const isWithinSlot = timeSlots.some((slot) => {
            const startTime = moment(slot.startTime);
            const endTime = moment(slot.endTime);
            const oneHourBeforeStartTime = moment(startTime)
                .subtract(1, "hours")
                .format();

            return (
                currentTime.isBetween(oneHourBeforeStartTime) &&
                currentTime.isBefore(endTime)
            );
        });

        // Enable or disable form based on whether the current time is within 1 hour before any time slot
        setIsFormEnabled(isWithinSlot);
    };

    return (
        <div className="border-y flex flex-col gap-5 border-dashed py-5 border-c25">
            <div className="flex items-center gap-1">
                <H7 content={"Book Appointment"} />
                <P2
                    content={`(appointment by ${acceptAppointment === "bySlot" ? "Slot" : "Token"})`}
                    className={"font-w2 text-c22"}
                />
            </div>
            <div className="flex gap-2 items-center">
                <div className="flex w-[300%] gap-2.5 flex-nowrap md:flex-wrap overflow-hidden">
                    {dates?.map((day, i) => (
                        <div
                            key={i}
                            className="flex flex-col items-center gap-[5px]"
                        >
                            {i === 0 && (
                                <BoxButton
                                    content={day}
                                    name={"appointmentDate"}
                                    value={day}
                                    classname={`bg-c3 text-c2 w-[87.84px] md:w-[110px] `}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex gap-x-2.5 gap-y-[25px] flex-wrap w-[90%] ">
                {slotsLoading ? (
                    <LoadingDots />
                ) : doctorNotAvailable ? (
                    <P3 content={"Doctor not available for this date"} />
                ) : (
                    <div className="flex gap-x-2.5 gap-y-[27px] flex-wrap max-h-[200px]  overflow-x-auto no-scrollbar pb-2">
                        {tokensData?.Starttime1 && (
                            <div>
                                <P3
                                    content={`Slot 1`}
                                    className={"text-[10px] block"}
                                />
                                <BoxButton
                                    id={`AppointmentTime`}
                                    name="AppointmentTime"
                                    value={`${tokensData?.Starttime1} - ${tokensData?.Endtime1}`}
                                    content={`${tokensData?.Starttime1} - ${tokensData?.Endtime1}`}
                                    classname={`border border-c17 ${currentTime.isAfter(moment(tokensData?.Endtime1, "HH:mm").format()) ? "bg-[#5D5E61BD]" : "bg-c2"} w-[125px] cursor-default`}
                                />
                                {isFormEnabled &&
                                    currentTime.isBetween(
                                        moment(tokensData?.Starttime1, "HH:mm")
                                            .subtract(1, "hours")
                                            .format(),
                                        moment(
                                            tokensData?.Endtime1,
                                            "HH:mm"
                                        ).format()
                                    ) && (
                                        <ErrorSpan
                                            content={"Available"}
                                            className="block text-center mt-1 text-[#14D610]"
                                        />
                                    )}
                                {currentTime.isAfter(
                                    moment(
                                        tokensData?.Endtime1,
                                        "HH:mm"
                                    ).format()
                                ) && (
                                    <ErrorSpan
                                        content={"Missed"}
                                        className="block text-center mt-1 text-c24"
                                    />
                                )}
                            </div>
                        )}
                        {tokensData?.Starttime2 && (
                            <div>
                                <P3
                                    content={`Slot 2`}
                                    className={"text-[10px] block"}
                                />
                                <BoxButton
                                    id={`AppointmentTime`}
                                    name="AppointmentTime"
                                    value={`${tokensData?.Starttime2} - ${tokensData?.Endtime2}`}
                                    content={`${tokensData?.Starttime2} - ${tokensData?.Endtime2}`}
                                    classname={`border border-c17 ${currentTime.isAfter(moment(tokensData?.Endtime2, "HH:mm").format()) ? "bg-[#5D5E61BD]" : "bg-c2"} w-[125px] cursor-default`}
                                />
                                {isFormEnabled &&
                                    currentTime.isBetween(
                                        moment(tokensData?.Starttime2, "HH:mm")
                                            .subtract(1, "hours")
                                            .format(),
                                        moment(
                                            tokensData?.Endtime2,
                                            "HH:mm"
                                        ).format()
                                    ) && (
                                        <ErrorSpan
                                            content={"Available"}
                                            className="block text-center mt-1 text-[#14D610]"
                                        />
                                    )}
                                {currentTime.isAfter(
                                    moment(
                                        tokensData?.Endtime2,
                                        "HH:mm"
                                    ).format()
                                ) && (
                                    <ErrorSpan
                                        content={"Missed"}
                                        className="block text-center mt-1 text-c24"
                                    />
                                )}
                            </div>
                        )}
                        {tokensData?.Starttime3 && (
                            <div>
                                <P3
                                    content={`Slot 3`}
                                    className={"text-[10px] block"}
                                />
                                <BoxButton
                                    id={`AppointmentTime`}
                                    name="AppointmentTime"
                                    value={`${tokensData?.Starttime3} - ${tokensData?.Endtime3}`}
                                    content={`${tokensData?.Starttime3} - ${tokensData?.Endtime3}`}
                                    classname={`border border-c17 ${currentTime.isAfter(moment(tokensData?.Endtime3, "HH:mm").format()) ? "bg-[#5D5E61BD]" : "bg-c2"} w-[125px] cursor-default`}
                                />
                                {isFormEnabled &&
                                    currentTime.isBetween(
                                        moment(tokensData?.Starttime3, "HH:mm")
                                            .subtract(1, "hours")
                                            .format(),
                                        moment(
                                            tokensData?.Endtime3,
                                            "HH:mm"
                                        ).format()
                                    ) && (
                                        <ErrorSpan
                                            content={"Available"}
                                            className="block text-center mt-1 text-[#14D610]"
                                        />
                                    )}
                                {currentTime.isAfter(
                                    moment(
                                        tokensData?.Endtime3,
                                        "HH:mm"
                                    ).format()
                                ) && (
                                    <ErrorSpan
                                        content={"Missed"}
                                        className="block text-center mt-1 text-c24"
                                    />
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TokenCard;
