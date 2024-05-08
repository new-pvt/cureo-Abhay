import React, { useCallback, useContext, useEffect, useState } from "react";
import { ErrorSpan, H7, P2, P3 } from "../../../Common/Components/Text/Textt";
import BoxButton from "../../../Common/Components/Buttons/BoxButton";
import LoadingDots from "../../../Common/Components/Animation/LoadingDots/LoadingDots";
import moment from "moment";
import AppointmentContext from "../../../Utils/Context/Patients/AppointmentContext";

const TokenCard = ({
    dates,
    slotsLoading,
    doctorNotAvailable,
    tokensData,
    acceptAppointment,
    isFormEnabled,
    setIsFormEnabled,
    handleSelectingSlot,
}) => {
    const [currentTime, setCurrentTime] = useState(moment());
    const [timeSlots, setTimeSlots] = useState([]);
    const [translate, setTranslate] = useState(0);
    const { appointmentBookingDetails, setAppointmentBookingDetails } =
        useContext(AppointmentContext);

    const handlePrev = (newIndex) => {
        if (newIndex < 0) {
            newIndex = 0;
        } else if (newIndex >= dates.length) {
            newIndex = dates.length - 1;
        }
        setTranslate(newIndex);
    };
    const handleNext = (newIndex) => {
        if (newIndex < 0) {
            newIndex = 0;
        } else if (newIndex >= dates.length) {
            newIndex = dates.length - 1;
        }
        setTranslate(newIndex);
    };

    useEffect(() => {
        if (tokensData) {
            const slots = [];
            for (let i = 1; i <= 3; i++) {
                const startTime = tokensData[`Starttime${i}`];
                const endTime = tokensData[`Endtime${i}`];
                if (startTime && endTime) {
                    slots.push({
                        startTime: moment(
                            `${appointmentBookingDetails?.appointmentDate} ${startTime}`,
                            "DD MMM, ddd HH:mm"
                        ).format(),
                        endTime: moment(
                            `${appointmentBookingDetails?.appointmentDate} ${endTime}`,
                            "DD MMM, ddd HH:mm"
                        ).format(),
                    });
                }
            }
            setTimeSlots(slots);
        }
    }, [tokensData]); // Update time slots when tokensData changes

    useEffect(() => {
        const timerID = setInterval(() => {
            setCurrentTime(moment());
        }, 60000); 

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

    console.log(isFormEnabled)

    const isOneHourBefore = useCallback(
        (startTime, endTime) => {
            return currentTime.isBetween(
                moment(
                    `${appointmentBookingDetails?.appointmentDate} ${startTime}`,
                    "DD MMM, ddd HH:mm"
                )
                    .subtract(1, "hours")
                    .format(),
                moment(
                    `${appointmentBookingDetails?.appointmentDate} ${endTime}`,
                    "DD MMM, ddd HH:mm"
                ).format()
            );
        },
        [appointmentBookingDetails?.appointmentDate]
    );

    const isNotAvailable = useCallback(
        (time) => {
            return currentTime.isAfter(
                moment(
                    `${appointmentBookingDetails?.appointmentDate} ${time}`,
                    "DD MMM, ddd HH:mm"
                ).format()
            );
        },
        [appointmentBookingDetails?.appointmentDate]
    );

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
                <button
                    onClick={() => handlePrev(translate - 1)}
                    className="block md:hidden"
                >
                    {"<"}
                </button>
                <div className="flex flex-1 md:flex-wrap snap-x snap-mandatory overflow-x-auto no-scrollbar gap-2.5">
                    {dates?.map((day, i) => (
                        <div
                            key={i}
                            className="flex flex-col snap-always snap-center items-center gap-[5px]"
                        >
                            <BoxButton
                                content={day}
                                name={"appointmentDate"}
                                value={day}
                                onclick={handleSelectingSlot}
                                style={{
                                    transform: `translate(-${translate * 100}%)`,
                                }}
                                classname={`${appointmentBookingDetails?.appointmentDate == day ? "bg-c3 text-c2" : "border border-c17 bg-c2 "} w-[87.84px] md:w-[110px] -translate-x-[${translate + "%"}] transition-transform`}
                            />

                            {/* <ErrorSpan content={"Slot Booked"} /> */}
                        </div>
                    ))}
                </div>
                <button
                    onClick={() => handleNext(translate + 1)}
                    className="block md:hidden"
                >
                    {">"}
                </button>
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
                                    classname={`border border-c17 ${
                                        isOneHourBefore(
                                            tokensData?.Starttime1,
                                            tokensData?.Endtime1
                                        ) === false
                                            ? "bg-[#5D5E61BD]"
                                            : "bg-c2"
                                    } w-[125px] cursor-default`}
                                />
                                {isFormEnabled &&
                                    isOneHourBefore(tokensData?.Starttime1) &&
                                    !isNotAvailable(tokensData?.Starttime1) && (
                                        <ErrorSpan
                                            content={"Available"}
                                            className="block text-center mt-1 text-[#14D610]"
                                        />
                                    )}
                                {isNotAvailable(tokensData?.Endtime1) && (
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
                                    classname={`border border-c17 ${
                                        isOneHourBefore(
                                            tokensData?.Starttime2,
                                            tokensData?.Endtime2
                                        ) === false
                                            ? "bg-[#5D5E61BD]"
                                            : "bg-c2"
                                    } w-[125px] cursor-default`}
                                />
                                {isFormEnabled &&
                                    isOneHourBefore(
                                        tokensData?.Starttime2,
                                        tokensData?.Endtime2
                                    ) && (
                                        <ErrorSpan
                                            content={"Available"}
                                            className="block text-center mt-1 text-[#14D610]"
                                        />
                                    )}
                                {isNotAvailable(tokensData?.Endtime2) && (
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
                                    classname={`border border-c17 ${
                                        isOneHourBefore(
                                            tokensData?.Starttime3,
                                            tokensData?.Endtime3
                                        ) === false
                                            ? "bg-[#5D5E61BD]"
                                            : "bg-c2"
                                    } w-[125px] cursor-default`}
                                />
                                {isFormEnabled &&
                                    isOneHourBefore(
                                        tokensData?.Starttime3,
                                        tokensData?.Endtime3
                                    ) && (
                                        <ErrorSpan
                                            content={"Available"}
                                            className="block text-center mt-1 text-[#14D610]"
                                        />
                                    )}
                                {isNotAvailable(tokensData?.Endtime3) && (
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
