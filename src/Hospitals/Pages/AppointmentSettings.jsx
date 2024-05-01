import React, { useCallback, useContext, useEffect, useState } from "react";
import PrimaryButton from "../../Common/Components/Buttons/PrimaryButton";
import AppointmentSettingContext from "../../Utils/Context/Hospital/AppointmentSettings/AppointmentSettingsContext";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import DateCarousel from "../../Doctors/Components/Settings/DateCarousel";
import moment from "moment";
import { axiosClient } from "../../Utils/axiosClient";
import { ErrorSpan } from "../../Common/Components/Text/Textt";
import LoadingDots from "../../Common/Components/Animation/LoadingDots/LoadingDots";
import AddSlots from "../Components/AppointmentSettings/AddSlots";
import ShowSlots from "../Components/AppointmentSettings/ShowSlots";

const AppointmentSettings = () => {
    const { doctorId } = useParams();

    const { appointmentBy, setAppointmentBy, doctor, setDoctor, date, setDate } = useContext(
        AppointmentSettingContext
    );

    // const [doctor, setDoctor] = useState({});
    // const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const switchMutation = useMutation({
        mutationFn: async (acceptAppointments) => {
            const data = await axiosClient.put(
                `/v2/editAcceptAppointmentBy/${doctor?._id}`,
                acceptAppointments
            );

            return data.result;
        },
        onSuccess: async (data, variables, context) => {
            setDoctor(data);
            setAppointmentBy(
                data.acceptAppointments == "bySlot" ? "slot" : "token"
            );
            // dispatch(updateDoctorsData(data));
        },
        onError: (error, variables, context) => {
            // An error happened!
        },
    });

    const handleApiCalling = async () => {
        if (appointmentBy == "slot") {
            try {
                setLoading(true);
                const response = await axiosClient.get(
                    `/v2/getSlotDetailForDoctorForPerticularDate/${doctorId}/${date}`
                );
                if (response.status == "ok") {
                    return setData(response.result);
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        } else {
            try {
                setLoading(true);
                const response = await axiosClient.get(
                    `/v2/getAppointmentByTokenSlotDetailForDoctorForPerticularDate/${doctorId}/${date}`
                );
                if (response.status == "ok") {
                    return setData(response.result);
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        handleApiCalling();
    }, [appointmentBy, date]);

    const handleDateChange = useCallback(
        (day) => {
            setDate(moment(day, "DD MMM, ddd").format("YYYY-MM-DD"));
        },
        [date]
    );

    const getSingleDoctorDetails = async () => {
        try {
            const response = await axiosClient.get(
                `/v2/singledoctor/${doctorId}`
            );
            if (response.status === "ok") {
                setDoctor(response.result);
                setAppointmentBy(
                    response.result.acceptAppointments == "bySlot"
                        ? "slot"
                        : "token"
                );
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        getSingleDoctorDetails();
    }, []);

    return (
        <main className="overflow-x-hidden flex flex-col gap-5 relative min-h-[calc(100vh-108px)] my-[40px] px-4 md:px-[24.74%] ">
            <div className="md:w-[40%] h-[50%] blur-[120px] fixed bottom-0 right-0 -z-20 bg-gradient-to-l from-[#1F51C626] via-[#108ED638] to-[#1F51C638]"></div>
            <div className="md:w-[40%] h-[50%] blur-[120px] fixed left-0 bottom-0 -z-20 bg-gradient-to-b from-[#1F51C638] via-[#108ED638] to-[#1F51C626]"></div>
            <div className="flex border rounded-[59px]">
                <PrimaryButton
                    content={"Slot Appointment"}
                    onclick={() => setAppointmentBy("slot")}
                    className={`${appointmentBy == "slot" ? "bg-c3 text-c2" : "bg-none text-c11 "} font-f2 flex-1 mx-auto`}
                    h={"40px"}
                    bg={"c1"}
                    radius={"44px"}
                />
                <PrimaryButton
                    content={"Appointments By Token"}
                    onclick={() => setAppointmentBy("token")}
                    className={`${appointmentBy == "token" ? "bg-c3 text-c2" : "bg-none text-c11"} font-f2 flex-1 mx-auto`}
                    h={"40px"}
                    bg={"c1"}
                    color={"#353535"}
                    radius={"44px"}
                />
            </div>
            <div className="p-5 bg-inherit border border-[#D9D9D9] rounded-[5px] space-y-[25px]">
                <h6 className="font-f2 font-w1">
                    {appointmentBy == "slot" ? "Slot" : "Token"} Appointments:
                </h6>
                <div>
                    <label className="inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            disabled={
                                doctor?.acceptAppointments == "bySlot" &&
                                appointmentBy == "slot"
                                    ? true
                                    : doctor?.acceptAppointments == "byToken" &&
                                        appointmentBy == "token"
                                      ? true
                                      : false
                            }
                            value=""
                            className="sr-only peer"
                            checked={
                                doctor?.acceptAppointments == "byToken" &&
                                appointmentBy == "slot"
                                    ? false
                                    : doctor?.acceptAppointments == "bySlot" &&
                                        appointmentBy == "token"
                                      ? false
                                      : doctor?.acceptAppointments ==
                                              "bySlot" &&
                                          appointmentBy == "slot"
                                        ? true
                                        : doctor?.acceptAppointments ==
                                                "byToken" &&
                                            appointmentBy == "token"
                                          ? true
                                          : false
                            }
                            onChange={() =>
                                switchMutation.mutate({
                                    acceptAppointments:
                                        appointmentBy == "slot"
                                            ? "bySlot"
                                            : "byToken",
                                })
                            }
                        />
                        <div className="relative w-[60px] h-[26px] bg-gray-200 peer-focus:outline-none dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-c4 peer-checked:after:translate-x-[150%] rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[22px] after:w-[22px] after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        {/* <div className="absolute flex justify-center w-[60px]  opacity-15">
                            <LoadingDots />
                        </div> */}
                    </label>
                    {switchMutation.isPending && (
                        <p className="font-f2 text-[13px] font-w1 text-c1">
                            Please Wait...
                        </p>
                    )}
                    {switchMutation.error && (
                        <ErrorSpan
                            content={switchMutation.error.message}
                            className={"block text-c24"}
                        />
                    )}
                </div>

                <DateCarousel
                    date={date}
                    setDate={setDate}
                    handleDateChange={handleDateChange}
                    refetch={handleApiCalling}
                />
                {loading ? (
                    <LoadingDots />
                ) : data ? (
                    <ShowSlots data={data} appointmentBy={appointmentBy} getScheduleData={handleApiCalling}/>
                ) : (
                    <AddSlots
                        date={date}
                        appointmentBy={appointmentBy}
                        getScheduleData={handleApiCalling}
                    />
                )}
            </div>
        </main>
    );
};

export default AppointmentSettings;
