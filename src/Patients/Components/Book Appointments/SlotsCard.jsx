import React, {
    memo,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import {
    ErrorSpan,
    H7,
    LinkTextWithIcon,
    P2,
    P3,
} from "../../../Common/Components/Text/Textt";
import BoxButton from "../../../Common/Components/Buttons/BoxButton";
import AppointmentContext from "../../../Utils/Context/Patients/AppointmentContext";
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
    const [translate, setTranslate] = useState(0);
    const { appointmentBookingDetails, setAppointmentBookingDetails } =
        useContext(AppointmentContext);
    const [currentTime, setCurrentTime] = useState(moment());

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
    const handleSelectingDate = useCallback(
        (e, hospitalId) => {
            setAppointmentBookingDetails({
                ...appointmentBookingDetails,
                appointmentDate: e.target.innerText,
                selectedHospital: hospitalId,
            });
        },
        [appointmentBookingDetails?.appointmentDate]
    );

    const isNotAvailable = (time) => {
        return currentTime.isAfter(moment(time, "HH:mm").format());
    };

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
                    <div>
                        <P3
                            content={`${slotsData?.length} Slots Available`}
                            className={"text-[10px]"}
                        />
                        <div className="flex gap-x-2.5 gap-y-[27px] flex-wrap min-h-[200px] max-h-[200px] h-[200px] overflow-x-auto pb-2">
                            {doctorNotAvailable ? (
                                <P3
                                    content={
                                        "Doctor not available for this date"
                                    }
                                />
                            ) : (
                                slotsData?.map((slot, i) => (
                                    <div key={i}>
                                        <BoxButton
                                            id={"AppointmentTime"}
                                            name="AppointmentTime"
                                            disabled={
                                                slot.isbooked ||
                                                isNotAvailable(
                                                    slot?.slot?.endTime
                                                )
                                            }
                                            value={`${slot?.slot?.startTime} - ${slot?.slot?.endTime}`}
                                            content={`${slot?.slot?.startTime} - ${slot?.slot?.endTime}`}
                                            onclick={handleSelectingSlot}
                                            classname={`${appointmentBookingDetails?.AppointmentTime == slot?.slot?.startTime + " - " + slot?.slot?.endTime ? "bg-c3 text-c2" : "border border-c17 bg-c2 "} w-[125px] `}
                                        />
                                        {slot?.isbooked && !isNotAvailable(
                                                    slot?.slot?.endTime
                                                ) ? (
                                            <ErrorSpan content={"Slot Booked"} className="block text-center mt-2 text-c30"/>
                                        ) : (
                                            <ErrorSpan
                                            content={isNotAvailable(
                                                slot?.slot?.endTime
                                            )
                                                ? "Not Available"
                                                : "Available"}
                                                className={`font-f3 font-[400] block text-center mt-2 leading-[12px] text-[0.825rem] ${isNotAvailable(slot?.slot?.endTime) ? "text-c30" : "text-[#14D610]"} `}
                                            />
                                            
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default memo(SlotsCard);
