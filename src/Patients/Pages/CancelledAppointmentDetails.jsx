import React, { useCallback, useEffect, useState } from "react";
import Avatar from "../../Common/Components/Avatar/Avatar";
import { useNavigate, useParams } from "react-router-dom";
import { axiosClient } from "../../Utils/axiosClient";
import { FormSpan, P3, Span, Span2 } from "../../Common/Components/Text/Textt";
import moment from "moment";
import StepperForMissedAppointments from "../Components/Appointments/Missed/StepperForMissedAppointments";
import PrimaryButton from "../../Common/Components/Buttons/PrimaryButton";
import AppointCancelDialog from "../Components/Appointment/AppointCancelDialog";
import AppointmentCancelledPopUp from "../Components/Appointment/AppointmentCancelledPopUp";
import {
    ACCEPT_APPOINTMENT,
    SELECTED_HOSPITAL,
    setSessionItem,
} from "../../Utils/SessionStorage/appointmentForm";
import toast from "react-hot-toast";

const CancelledAppointmentDetails = () => {
    const { appointmentId } = useParams();
    const navigate = useNavigate();
    const [appointment, setAppointment] = useState({});
    const [cancelAppointmentDialog, setCancelAppointmentDialog] =
        useState(false);
    const [loading, setLoading] = useState(false);
    const [appointmentCancelled, setAppointmentCancelled] = useState(false);

    const getPendingAppointmentsData = async () => {
        try {
            setLoading(true);
            const response = await axiosClient.get(
                `/v2/getsingleappointmentbyid/${appointmentId}/missed`
            );
            if (response.status === "ok") {
                // setTempDate(response.result.appointmentDate);
                // setTempDate(
                //     moment(response.result.appointmentDate).format("YYYY-MM-DD")
                // );
                // setTempDoctorId(response.result.doctorid._id);
                return setAppointment(response.result);
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const cancelAppointment = async () => {
        setLoading(true);
        try {
            const response = await axiosClient.put(
                `/v2/updateUserAppointmentStatus/${appointmentId}`,
                { status: "cancelled", remark: "by patient" }
            );
            if (response.status === "ok") {
                setAppointmentCancelled(true);
                setTimeout(() => {
                    setAppointmentCancelled(false);
                    navigate("/patient/appointments");
                }, 3000);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
        // setUpdatedStatus("cancled");
    };

    console.log(appointment?.doctorid?._id);

    const handleBookAgain = useCallback(() => {
        setSessionItem(SELECTED_HOSPITAL, appointment?.doctorid?._id);
        setSessionItem(
            ACCEPT_APPOINTMENT,
            appointment?.doctorid?.acceptAppointments
        );
        navigate(
            `/patient/doctor/${appointment?.doctorid?._id}/book_appointment`
        );
    }, [appointment]);

    useEffect(() => {
        getPendingAppointmentsData();
    }, []);

    return (
        <div className="relative min-h-[calc(100vh-108px)] flex justify-center md:mt-[80px] md:mx-[26.56%]">
            <div className="md:w-[40%] h-[50%] blur-[120px] fixed bottom-0 right-0 -z-20 bg-gradient-to-l from-[#1F51C626] via-[#108ED638] to-[#1F51C638]"></div>

            <div className="md:w-[40%] h-[50%] blur-[120px] fixed left-0 bottom-0 -z-20 bg-gradient-to-b from-[#1F51C638] via-[#108ED638] to-[#1F51C626]"></div>
            <div className="w-full">
                <div className="relative border border-c26 rounded-[5px] w-full pb-4">
                    <div className="flex gap-2.5 m-5">
                        <Avatar
                            src={appointment?.doctorid?.imgurl}
                            className="w-[68px] md:w-[73px] h-[68px] md:h-[73px]"
                        />
                        <div className="flex flex-col gap-2">
                            <FormSpan
                                content={`Appointment by ${appointment?.tokenNo ? "Token" : "Slot"}`}
                                className={
                                    "font-w1 whitespace-nowrap text-[10px] w-fit text-[#1F51C6] bg-[#108ED647] px-2 py-[5px] rounded-[5px]"
                                }
                            />

                            <Span2 className={"leading-[15px] text-c11"}>
                                {appointment?.doctorid?.nameOfTheDoctor}
                            </Span2>
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-[5px]">
                                    <img
                                        src="/Appointment/Calender.svg"
                                        alt="icon"
                                    />
                                    <Span
                                        content={moment(
                                            appointment?.appointmentDate
                                        ).format("DD MMM, ddd")}
                                        className="text-[#353535]"
                                    />
                                </div>
                                <div className="flex items-center gap-[5px]">
                                    <img
                                        src="/Appointment/Time.svg"
                                        alt="icon"
                                    />
                                    <Span
                                        content={appointment.AppointmentTime}
                                        className="text-[#353535]"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-[5px]">
                                <img
                                    src="/Appointment/location.png"
                                    alt="icon"
                                    className="w-[13px] h-[13px]"
                                />
                                <Span
                                    content={appointment?.doctorid?.location}
                                />
                            </div>
                            <div className="flex md:hidden items-center w-fit mt-1 md:mt-0 gap-1 bg-c24 text-c2 top-[15px] right-[15px] p-[5px] rounded-[5px]">
                                {/* <img
                                    src="/Find Doctors/AppointmentVerified.svg"
                                    alt="img"
                                    className="w-[11.08px]"
                                /> */}
                                <span className="font-f3 font-w1 leading-[15.6px] text-[0.813rem] text-c2 cursor-pointer">
                                    Appointment {appointment?.status}
                                </span>
                                {/* <FormSpan
                                    content={"Appointment Cancelled"}
                                    className={
                                        "font-w1 whitespace-nowrap text-[10px] text-[#ffffff]"
                                    }
                                /> */}
                            </div>
                        </div>
                    </div>
                    <div className="p-5 flex flex-col md:flex-row md:items-center gap-4 border-y border-dashed">
                        <div className="flex items-center gap-1">
                            <P3 content={"#Appointment ID :"} />
                            <Span content={appointment?._id} />
                        </div>
                        <div className="flex items-center gap-1">
                            <P3 content={"Estimated Time :"} />
                            <Span content={"-"} />
                        </div>
                    </div>
                    {/* Tracking UI */}
                    <StepperForMissedAppointments stepperData={appointment} />
                    <div className="hidden md:flex items-center w-fit mt-1 md:mt-0 gap-1 absolute bg-c24 top-[15px] right-[15px] p-[5px] rounded-[5px]">
                        <span className="font-f3 font-w1 leading-[15.6px] text-[0.813rem] text-c2 ">
                            Appointment {appointment?.status}
                        </span>
                    </div>
                </div>
                <PrimaryButton
                    disabled={loading}
                    onclick={handleBookAgain}
                    className={`bg-c1 text-c2 font-f2 font-w1 w-fit px-[53px] mx-auto block whitespace-nowrap my-5`}
                    // w={"132px"}
                    h={"40px"}
                    bg={"c29"}
                    radius={"44px"}
                    content={"Book Again"}
                    // reff={ref}
                />
            </div>
            {cancelAppointmentDialog && (
                <AppointCancelDialog
                    onClose={() => setCancelAppointmentDialog(false)}
                    appointmentId={appointmentId}
                    cancelAppointment={cancelAppointment}
                    loading={loading}
                />
            )}
            {appointmentCancelled && (
                <AppointmentCancelledPopUp
                    doctorName={appointment?.doctorid?.nameOfTheDoctor}
                />
            )}
        </div>
    );
};

export default CancelledAppointmentDetails;
