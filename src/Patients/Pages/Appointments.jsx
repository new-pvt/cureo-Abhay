import React, { memo, useEffect, useState } from "react";
import { Input2 } from "../../Common/Components/Inputs/Inputs";
import locationIcon from "/Find Doctors/Search.svg";
import PrimaryButton from "../../Common/Components/Buttons/PrimaryButton";
import { useDispatch, useSelector } from "react-redux";
import { setTabValue } from "../../Utils/Store/tabSlice";
import AppointmentCard from "../Components/AppointmentCard";
import { axiosClient } from "../../Utils/axiosClient";
import { Span2 } from "../../Common/Components/Text/Textt";
import PatientLogIn from "../Components/Authentication/PatientLogIn";
import Illistration from "../../Common/Components/Illustration/Illistration";
import AppointmentCardSkelaton from "../../Common/Components/Skelaton/AppointmentCardSkelaton";
import useGetAuthenticate from "../../Utils/Hooks/useGetAuthenticate";
import { useNavigate } from "react-router-dom";

const Appointments = () => {
    const { tabValue } = useSelector((state) => state.tab);
    const { user, isLoggedIn } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [pendingAppointmentData, setPendingAppointmentData] = useState([]);
    const [completeAppointmentData, setCompleteAppointmentData] = useState([]);
    const [missedAppointmentData, setMissedAppointmentData] = useState([]);
    const [nothingToShow, setNothingToShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const tabs = [
        {
            tabName: "Upcoming",
        },
        {
            tabName: "Completed",
        },
        {
            tabName: "Cancelled",
        },
    ];

    const getPendingAppointmentsData = async () => {
        if (tabValue !== 0) {
            return false;
        }
        setIsLoading(true);
        setNothingToShow(false);
        setCompleteAppointmentData([]);
        setMissedAppointmentData([]);
        try {
            const response = await axiosClient.get(
                `/v2/getPendingAppointmentForPatient/${user?._id}`
            );
            if (response.status === "ok" && response.result.length == 0) {
                return setNothingToShow(true);
            } else {
                setNothingToShow(false);
                return setPendingAppointmentData(response.result);
            }
        } catch (error) {
            console.log(error.message);
        } finally {
            setIsLoading(false);
        }
    };
    const getCompleteAppointmentsData = async () => {
        if (tabValue !== 1) {
            return false;
        }
        setIsLoading(true);
        setNothingToShow(false);
        setPendingAppointmentData([]);
        setMissedAppointmentData([]);
        try {
            const response = await axiosClient.get(
                `/v2/getCompletedAppointment/${user?._id}`
            );

            if (
                response.status === "ok" &&
                response.result == "no appointment found by this doctor"
            ) {
                return setNothingToShow(true);
            } else {
                setNothingToShow(false);
                return setCompleteAppointmentData(response.result);
            }
        } catch (error) {
            console.log(error.message);
        } finally {
            setIsLoading(false);
        }
    };
    const getMissedAppointmentsData = async () => {
        if (tabValue !== 2) {
            return false;
        }
        setIsLoading(true);
        setNothingToShow(false);
        setPendingAppointmentData([]);
        setCompleteAppointmentData([]);
        try {
            const response = await axiosClient.get(
                `/v2/getMissedAppointment/${user?._id}`
            );

            if (response.status === "ok" && !response.result == []) {
                return setNothingToShow(true);
            } else {
                setNothingToShow(false);
                return setMissedAppointmentData(response.result);
            }
        } catch (error) {
            console.log(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getPendingAppointmentsData();
        getCompleteAppointmentsData();
        getMissedAppointmentsData();
    }, [tabValue]);

    return (
        <>
            <main className="relative w-full min-h-[calc(100vh-108px)] mb-4 px-4">
                <div className="md:w-[40%] h-[50%] blur-[120px] fixed bottom-0 right-0 -z-20 bg-gradient-to-l from-[#1F51C626] via-[#108ED638] to-[#1F51C638]"></div>

                <div className="md:w-[40%] h-[50%] blur-[120px] fixed left-0 bottom-0 -z-20 bg-gradient-to-b from-[#1F51C638] via-[#108ED638] to-[#1F51C626]"></div>
                <Input2
                    type="text"
                    placeholder="Search Appointment"
                    name="location"
                    icon={locationIcon}
                    divClasses="w-full md:w-[33.33%] rounded-[106px] md:mx-auto my-10"
                    inputClasses="rounded-[106px] text-[13px]"
                    onChange={(e) => setLocation(e.target.value)}
                />
                <div className="flex gap-2.5 justify-center">
                    {tabs.map((tab, i) => (
                        <PrimaryButton
                            key={i}
                            onclick={() => dispatch(setTabValue(i))}
                            className={`${tabValue == i ? "bg-c1 text-c2" : "bg-c2 text-c22 border border-c26"} font-f2 w-full md:w-[145px]`}
                            w={"132px"}
                            h={"40px"}
                            bg={"c1"}
                            radius={"44px"}
                            content={tab.tabName}
                            // reff={ref}
                        />
                    ))}
                </div>
                {nothingToShow ? (
                    <Illistration
                        src={"/Appointment/no appointment found .svg"}
                        errorTitle={"Oops! there are no appointments"}
                        subText={
                            "Book an appointment to see appointments here!"
                        }
                        imgClassName="w-[300px]"
                        button={{
                            content: "Find Doctors",
                            onclick: () => navigate("/find-doctors"),
                        }}
                    />
                ) : tabValue == 0 ? (
                    <div className="border border-c26 md:mx-[26.56%] mt-5 rounded-[5px]">
                        {isLoading
                            ? Array.from({ length: 5 }).map((_, i) => (
                                  <AppointmentCardSkelaton key={i} />
                              ))
                            : pendingAppointmentData?.map((appointment) => (
                                  <AppointmentCard
                                      key={appointment?._id}
                                      appointment={appointment}
                                  />
                              ))}
                    </div>
                ) : tabValue == 1 ? (
                    <div className="border border-c26 md:mx-[26.56%] mt-5 rounded-[5px]">
                        {isLoading
                            ? Array.from({ length: 5 }).map((_, i) => (
                                  <AppointmentCardSkelaton key={i} />
                              ))
                            : completeAppointmentData?.map((appointment) => (
                                  <AppointmentCard
                                      key={appointment?._id}
                                      appointment={appointment}
                                  />
                              ))}
                    </div>
                ) : (
                    <div className="border border-c26 md:mx-[26.56%] mt-5 rounded-[5px]">
                        {isLoading
                            ? Array.from({ length: 5 }).map((_, i) => (
                                  <AppointmentCardSkelaton key={i} />
                              ))
                            : missedAppointmentData?.map((appointment) => (
                                  <AppointmentCard
                                      key={appointment?._id}
                                      appointment={appointment}
                                  />
                              ))}
                    </div>
                )}
                {/* {nothingToShow ? (
                    <Illistration
                        src={"/Appointment/no appointment found .svg"}
                        errorTitle={"Oops! there are no appointments"}
                        subText={
                            "Book an appointment to see appointments here!"
                        }
                        imgClassName="w-[300px]"
                        button={{
                            content: "Find Doctors",
                            onclick: "",
                        }}
                    />
                ) : (
                    // <div className="text-center mt-5 text-3xl">

                    //     <Span2 className={"text-[20px]"}>Nothing to show</Span2>
                    // </div>
                    <div className="border border-c26 md:mx-[26.56%] mt-5 rounded-[5px]">
                        {appointmentData?.map((appointment) => (
                            <AppointmentCard
                                key={appointment?._id}
                                appointment={appointment}
                            />
                        ))}
                    </div>
                )} */}
            </main>
            {/* {!user && !isLoggedIn && useGetAuthenticate()} */}
            {/* {!user && !isLoggedIn && <PatientLogIn />} */}
        </>
    );
};

export default memo(Appointments);
