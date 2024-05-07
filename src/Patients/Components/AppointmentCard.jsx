import React from "react";
import Avatar from "../../Common/Components/Avatar/Avatar";
import { FormSpan, Span, Span2 } from "../../Common/Components/Text/Textt";
import PrimaryButton from "../../Common/Components/Buttons/PrimaryButton";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const AppointmentCard = ({ appointment }) => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col md:flex-row gap-2.5 justify-between items-start md:items-center border-b border-dashed p-4 md:p-5 border-c17">
            <div className="flex gap-2.5">
                <Avatar
                    src={appointment?.doctorid?.imgurl}
                    className="w-[68px] md:w-[73px] h-[68px] md:h-[73px]"
                />
                <div className="flex flex-col gap-2">
                    <FormSpan
                        content={`Appointment by ${appointment.tokenNo ? "Token" : "Slot"}`}
                        className={
                            "font-w1 whitespace-nowrap text-[10px] w-fit text-[#1F51C6] bg-[#108ED647] px-2 py-[5px] rounded-[5px]"
                        }
                    />

                    <Span2 className={"leading-[15px] text-c11"}>
                        {appointment?.doctorid?.nameOfTheDoctor}
                    </Span2>
                    <div className="flex items-center gap-1">
                        <div className="flex items-center gap-[5px]">
                            <img src="/Appointment/Calender.svg" alt="icon" />
                            <Span
                                content={moment(
                                    appointment?.appointmentDate
                                ).format("DD MMM, ddd")}
                                className="text-[#263238]"
                            />
                        </div>
                        <div className="flex items-center gap-[5px]">
                            <img src="/Appointment/Time.svg" alt="icon" />
                            <Span
                                content={appointment.AppointmentTime}
                                className="text-[#263238]"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <PrimaryButton
                onclick={() =>
                    navigate(
                        appointment?.status == "pending"
                            ? `/patient/appointments/${appointment?._id}/upcoming`
                            : appointment?.status == "completed"
                              ? `/patient/appointments/${appointment?._id}/completed`
                              : `/patient/appointments/${appointment?._id}/cancelled`
                    )
                }
                className={"bg-c1 text-c2 font-f2 w-full md:w-[145px]"}
                w={"129px"}
                h={"40px"}
                bg={"c1"}
                radius={"44px"}
                content={"View"}
                // reff={ref}
            />
        </div>
    );
};

export default AppointmentCard;
