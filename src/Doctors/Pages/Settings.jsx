import React, { useCallback, useContext, useEffect, useState } from "react";
import PrimaryButton from "../../Common/Components/Buttons/PrimaryButton";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import BoxButton from "../../Common/Components/Buttons/BoxButton";
import moment from "moment";
import DateCarousel from "../Components/Settings/DateCarousel";
import ScheduledTimesCard from "../Components/Settings/ScheduledTimesCard";
import ShowSlots from "../Components/Settings/ShowSlots";
import AddSlots from "../Components/Settings/AddSlots";
import LoadingDots from "../../Common/Components/Animation/LoadingDots/LoadingDots";
import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosClient } from "../../Utils/axiosClient";
import { useDispatch, useSelector } from "react-redux";
import { updateDoctorsData } from "../../Utils/Store/doctorDataSlice";
import { ErrorSpan } from "../../Common/Components/Text/Textt";
import SettingsContext from "../../Utils/Context/Doctor/SettingsContext";

const Settings = () => {
    const { doctor } = useSelector((state) => state.doctorsData);
    const { appointmentBy, setAppointmentBy } = useContext(SettingsContext);
    const dispatch = useDispatch();
    const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
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
            dispatch(updateDoctorsData(data));
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
                    `/v2/getSlotDetailForDoctorForPerticularDate/${doctor?._id}/${date}`
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
                    `/v2/getAppointmentByTokenSlotDetailForDoctorForPerticularDate/${doctor?._id}/${date}`
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

    useEffect(() => {
        setAppointmentBy(
            doctor?.acceptAppointments == "bySlot" ? "slot" : "token"
        );
    }, [doctor]);

    return (
        <div className="w-full flex justify-center h-full">
            <div className="w-full md:w-[52.4%] h-full py-10 space-y-4">
                <div className="flex bg-c2 rounded-[59px]">
                    <PrimaryButton
                        content={"Slot Appointment"}
                        onclick={() => setAppointmentBy("slot")}
                        type="submit"
                        className={`${appointmentBy == "slot" ? "bg-c3 text-c2" : "bg-none text-c11"} font-f2 text-[13px] w-full md:w-[328px] mx-auto`}
                        h={"40px"}
                        bg={"c1"}
                        radius={"44px"}
                    />
                    <PrimaryButton
                        content={"Token Appointments"}
                        onclick={() => setAppointmentBy("token")}
                        type="submit"
                        className={`${appointmentBy == "token" ? "bg-c3 text-c2" : "bg-none text-c11"} font-f2 text-[13px] w-full md:w-[328px] mx-auto`}
                        h={"40px"}
                        bg={"c1"}
                        color={"#353535"}
                        radius={"44px"}
                    />
                </div>
                <div className="p-5 bg-c2 rounded-[5px] space-y-[25px] min-h-[90%] ">
                    <h6 className="font-f2 font-w1">
                        {appointmentBy == "slot" ? "Slot" : "Token"}{" "}
                        Appointments:
                    </h6>
                    <div>
                        <label className="inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                disabled={
                                    doctor?.acceptAppointments == "bySlot" &&
                                    appointmentBy == "slot"
                                        ? true
                                        : doctor?.acceptAppointments ==
                                                "byToken" &&
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
                                        : doctor?.acceptAppointments ==
                                                "bySlot" &&
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
                        <ShowSlots data={data} appointmentBy={appointmentBy}  date={date}/>
                    ) : (
                        <AddSlots
                            date={date}
                            appointmentBy={appointmentBy}
                            getScheduleData={handleApiCalling}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Settings;
