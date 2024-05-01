import React, { memo, useCallback, useContext, useEffect, useState } from "react";
import {
    ErrorSpan,
    H7,
    LinkTextWithIcon,
    P2,
    P3,
} from "../../../Common/Components/Text/Textt";
import BoxButton from "../../../Common/Components/Buttons/BoxButton";
import AppointmentContext from "../../../Utils/Context/Hospital/BookAppointment/AppointmentContext";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import LoadingDots from "../../../Common/Components/Animation/LoadingDots/LoadingDots";
import moment from "moment";

const SlotsCard = ({
    dates,
    handleSelectingSlot,
    slotsData,
    slotsLoading,
    doctorNotAvailable,
    acceptAppointment,
}) => {
    console.log(slotsData);
    const [translate, setTranslate] = useState(0);
    const { appointmentBookingDetails, setAppointmentBookingDetails } =
        useContext(AppointmentContext);
    const [currentTime, setCurrentTime] = useState(moment());

    const handlePrev = () => {
        setTranslate((prevVal) => prevVal - 100);
    };
    const handleNext = () => {
        setTranslate((prevVal) => prevVal + 100);
    };
    
    const isNotAvailable = (time) => {
        return currentTime.isAfter(moment(time, "HH:mm").format());
    };

    useEffect(()=>{
      const updateTime = setInterval(() => {
            setCurrentTime(moment())
        }, 3000);

        return clearInterval(updateTime);
    },[])

    return (
        <div className="border-y flex flex-col gap-5 border-dashed py-5 border-c25">
            <div className="flex items-center gap-1">
                <H7 content={"Book Appointment"} />
                <P2
                    content={`(appointment by ${acceptAppointment == "bySlot" ? "Slot" : "Token"})`}
                    className={"font-w2 text-c22"}
                />
            </div>
            <div className="flex gap-2 items-center">
                {acceptAppointment == "bySlot" && (
                    <button onClick={handlePrev} className="block md:hidden">
                        {"<"}
                    </button>
                )}
                <div className="flex w-[300%] gap-2.5 flex-nowrap md:flex-wrap overflow-hidden">
                    {dates?.map((day, i) => (
                        <div
                            key={i}
                            className="flex flex-col items-center gap-[5px]"
                        >
                            {acceptAppointment == "bySlot" ? (
                                <BoxButton
                                    content={day}
                                    name={"appointmentDate"}
                                    value={day}
                                    onclick={handleSelectingSlot}
                                    classname={`${appointmentBookingDetails?.appointmentDate == day ? "bg-c3 text-c2" : "border border-c17 bg-c2 "} w-[87.84px] md:w-[110px] -translate-x-[${translate + "%"}]`}
                                />
                            ) : (
                                i == 0 && (
                                    <BoxButton
                                        content={day}
                                        name={"appointmentDate"}
                                        value={day}
                                        classname={`${appointmentBookingDetails?.appointmentDate == day ? "bg-c3 text-c2" : "border border-c17 bg-c2 "} w-[87.84px] md:w-[110px] -translate-x-[${translate + "%"}]`}
                                    />
                                )
                            )}
                            {/* <ErrorSpan content={"Slot Booked"} /> */}
                        </div>
                    ))}
                </div>
                {acceptAppointment == "bySlot" && (
                    <button onClick={handleNext} className="block md:hidden">
                        {">"}
                    </button>
                )}
            </div>
            <div className="flex gap-x-2.5 gap-y-[25px] flex-wrap w-[90%] ">
                {slotsLoading ? (
                    <LoadingDots />
                ) : doctorNotAvailable ? (
                    <P3 content={"Doctor not available for this date"} />
                ) : (
                    <div>
                        <P3
                            content={`${slotsData?.length} Slots Available`}
                            className={"text-[10px]"}
                        />
                        <div className="flex gap-x-2.5 gap-y-[27px] flex-wrap min-h-[200px] max-h-[200px] h-[200px] overflow-x-auto no-scrollbar pb-2">
                            {doctorNotAvailable ? (
                                <P3
                                    content={
                                        "Doctor not available for this date"
                                    }
                                />
                            ) : (
                                slotsData?.map((slot, i) => (
                                    <div>

                                    <BoxButton
                                        id={"AppointmentTime"}
                                        key={i}
                                        name="AppointmentTime"
                                        disabled={isNotAvailable(
                                            slot?.endTime
                                        )}
                                        value={`${slot?.startTime} - ${slot?.endTime}`}
                                        content={`${slot?.startTime} - ${slot?.endTime}`}
                                        onclick={handleSelectingSlot}
                                        classname={`${appointmentBookingDetails?.AppointmentTime == slot?.startTime + " - " + slot?.endTime ? "bg-c3 text-c2" : "border border-c17 bg-c2 "} w-[125px] `}
                                    />
                                    <span
                                            className={`font-f3 font-[400] block text-center mt-2 leading-[12px] text-[0.825rem] ${isNotAvailable(slot?.endTime) ? "text-c24" : "text-[#14D610]"} `}
                                        >
                                            {isNotAvailable(slot?.endTime)
                                                ? "Not Available"
                                                : "Available"}
                                        </span>
                                    </div>

                                ))
                            )}
                        </div>
                    </div>
                )}

                {/* {!state.doctorNotAvailable &&
                    appointmentBookingDetails?.AppointmentTime && (
                        <LinkTextWithIcon
                            to={`/doctor/${state.showTimeSlot}/book_appointment`}
                            className=" whitespace-nowrap w-fit flex items-center text-c3"
                        >
                            Next <FaAngleRight size={16} />
                        </LinkTextWithIcon>
                    )} */}

                {/* {slots.map((slot, i) => (
                    <BoxButton
                        key={i}
                        content={"12:00 - 13:00"}
                        onclick={() => setSelectedDate(i)}
                        classname={`${selectedDate === i ? "bg-c3 text-c2" : "border border-c17 bg-c2 "} w-[125px]`}
                    />
                ))} */}
            </div>
        </div>
    );
};

export default memo(SlotsCard);
