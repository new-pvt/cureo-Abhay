import React, {
    memo,
    useCallback,
    useContext,
    useEffect,
    useReducer,
    useState,
} from "react";
import DoctorCard from "../Components/Find Doctors/DoctorCard";
import { useParams } from "react-router-dom";
import PatientLogIn from "../Components/Authentication/PatientLogIn";
import { useSelector } from "react-redux";
import { axiosClient } from "../../Utils/axiosClient";
import {
    ErrorSpan,
    FormSpan,
    LinkText,
    LinkTextWithIcon,
    P3,
    Span,
} from "../../Common/Components/Text/Textt";
import PrimaryButton from "../../Common/Components/Buttons/PrimaryButton";
import Avatar from "../../Common/Components/Avatar/Avatar";
import { FaAngleUp, FaAngleDown } from "react-icons/fa6";
import moment from "moment";
import BoxButton from "../../Common/Components/Buttons/BoxButton";
import RatingCard from "../../Common/Components/Cards/RatingCard";
import AppointmentContext from "../../Utils/Context/Patients/AppointmentContext";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import LoadingDots from "../../Common/Components/Animation/LoadingDots/LoadingDots";
import {
    INITIAL_STATE,
    doctorsReducer,
} from "../Reducers/DoctorDetails/doctorDetailReducer";
import { ACTION_TYPES } from "../Reducers/DoctorDetails/ActionsType";
import {
    ACCEPT_APPOINTMENT,
    SELECTED_HOSPITAL,
    getSessionItem,
    removeSessionItem,
    setSessionItem,
} from "../../Utils/SessionStorage/appointmentForm";

const DoctorDetails = () => {
    const { doctorId } = useParams();
    const { user, isLoggedIn } = useSelector((state) => state.auth);
    const [state, dispatch] = useReducer(doctorsReducer, INITIAL_STATE);
    const [isFormEnabled, setIsFormEnabled] = useState(false);

    const { appointmentBookingDetails, setAppointmentBookingDetails } =
        useContext(AppointmentContext);

    const [currentTime, setCurrentTime] = useState(moment());
    const [timeSlots, setTimeSlots] = useState([]);

    useEffect(() => {
        if (state?.tokensData) {
            const slots = [];
            for (let i = 1; i <= 3; i++) {
                const startTime = state?.tokensData[`Starttime${i}`];
                const endTime = state?.tokensData[`Endtime${i}`];
                if (startTime && endTime) {
                    slots.push({
                        startTime: moment(startTime, "HH:mm").format(),
                        endTime: moment(endTime, "HH:mm").format(),
                    });
                }
            }
            setTimeSlots(slots);
        }
    }, [state.tokensData]); // Update time slots when tokensData changes

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

    const handlePrev = (newIndex) => {
        if (newIndex < 0) {
            newIndex = 0;
        } else if (newIndex >= state.dates.length) {
            newIndex = state.dates.length - 1;
        }
        dispatch({ type: ACTION_TYPES.SET_TRANSLATE, payload: newIndex });
    };
    const handleNext = (newIndex) => {
        if (newIndex < 0) {
            newIndex = 0;
        } else if (newIndex >= state.dates.length) {
            newIndex = state.dates.length - 1;
        }
        dispatch({ type: ACTION_TYPES.SET_TRANSLATE, payload: newIndex });
    };

    const handleSelectingDate = useCallback(
        (e, hospitalId) => {
            setAppointmentBookingDetails({
                ...appointmentBookingDetails,
                appointmentDate: e.target.innerText,
            });
        },
        [appointmentBookingDetails?.appointmentDate]
    );
    const handleSelectingSlot = useCallback(
        (slot) => {
            console.log(slot);
            setAppointmentBookingDetails({
                ...appointmentBookingDetails,
                AppointmentTime: slot,
            });
        },
        [appointmentBookingDetails?.appointmentDate]
    );

    const getAvailableSlots = async () => {
        setAppointmentBookingDetails({
            ...appointmentBookingDetails,
            AppointmentTime: "",
        });
        try {
            if (state.showTimeSlot != 0) {
                dispatch({ type: ACTION_TYPES.SLOT_API_PENDING });
                // setSlotsLoading(true);
                const response = await axiosClient.get(
                    `/v2/getAvailbleSlotsForAnUser/${state.showTimeSlot}/${moment(appointmentBookingDetails.appointmentDate, "DD MMM, ddd").format("YYYY-MM-DD")}`
                );
                if (response.status === "ok") {
                    if (
                        response.result[0] ==
                        "doctor not available for this date"
                    ) {
                        return dispatch({
                            type: ACTION_TYPES.SLOT_API_NOT_AVAILABLE,
                        });
                    }
                    return dispatch({
                        type: ACTION_TYPES.SLOT_API_COMPLETE,
                        payload: response.result,
                    });
                }
            }
        } catch (error) {
            return dispatch({ type: ACTION_TYPES.SLOT_API_ERROR });
            console.log(error.message);
        } finally {
            return dispatch({ type: ACTION_TYPES.SLOT_API_ERROR });
        }
    };

    const getAvailableToken = async () => {
        dispatch({ type: ACTION_TYPES.SLOT_API_PENDING });
        try {
            const response = await axiosClient.get(
                `/v2/getAppointmentByTokenSlotDetailForDoctorForPerticularDate/${state.showTimeSlot}/${moment(appointmentBookingDetails.appointmentDate, "DD MMM, ddd").format("YYYY-MM-DD")}`
            );
            if (response.status === "ok") {
                if (!response.result) {
                    return dispatch({
                        type: ACTION_TYPES.SLOT_API_NOT_AVAILABLE,
                    });
                }
                return dispatch({
                    type: ACTION_TYPES.TOKEN_API_COMPLETE,
                    payload: response.result,
                });
            }
        } catch (error) {
            console.log(error.message);
        } finally {
            return dispatch({ type: ACTION_TYPES.SLOT_API_ERROR });
        }
    };

    const handleShowTimeSlot = (doctor) => {
        if (doctor.acceptAppointments == "byToken") {
            setAppointmentBookingDetails({
                ...appointmentBookingDetails,
                appointmentDate: moment().format("DD MMM, ddd"),
            });
        }
        if (state.showTimeSlot != doctor?._id) {
            dispatch({
                type: ACTION_TYPES.SET_SHOW_TIME_SLOT,
                payload: doctor?._id,
            });
            setSessionItem(SELECTED_HOSPITAL, doctor?._id);
            setSessionItem(ACCEPT_APPOINTMENT, doctor?.acceptAppointments);
            // setShowTimeSlot(doctorId);
            setAppointmentBookingDetails({
                ...appointmentBookingDetails,
                selectedHospital: doctorId,
            });
        } else {
            dispatch({ type: ACTION_TYPES.SET_SHOW_TIME_SLOT, payload: 0 });
            removeSessionItem(SELECTED_HOSPITAL);
            removeSessionItem(ACCEPT_APPOINTMENT);
            setAppointmentBookingDetails({
                ...appointmentBookingDetails,
                appointmentDate: "",
            });
        }
    };

    const getSingleDoctorDetails = async () => {
        try {
            const response = await axiosClient.get(
                `/v2/singledoctor/${doctorId}`
            );
            if (response.status === "ok") {
                try {
                    const hospitaList = await axiosClient.get(
                        `/v2/multipleloginprofile/${response?.result?.doctorid}`
                    );
                    if (hospitaList.status === "ok") {
                        dispatch({
                            type: ACTION_TYPES.SET_DOCTOR_INFO,
                            payload: response.result,
                        });
                        dispatch({
                            type: ACTION_TYPES.SET_HOSPITAL_LIST,
                            payload: hospitaList.result,
                        });
                    }
                    return;
                } catch (error) {
                    console.log(error);
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    console.log(appointmentBookingDetails?.appointmentDate);

    useEffect(() => {
        if (state.showTimeSlot != 0) {
            if (getSessionItem(ACCEPT_APPOINTMENT) == "byToken") {
                getAvailableToken();
            } else {
                getAvailableSlots();
            }
        }
    }, [state.showTimeSlot, appointmentBookingDetails?.appointmentDate]);

    useEffect(() => {
        getSingleDoctorDetails();
    }, [doctorId]);

    useEffect(() => {
        generateNextWeekDates();
    }, []);

    const generateNextWeekDates = () => {
        const datesArray = [];
        let currentDate = moment();

        for (let i = 0; i < 7; i++) {
            datesArray.push(currentDate.format("DD MMM, ddd"));
            currentDate = currentDate.add(1, "days");
        }
        dispatch({ type: ACTION_TYPES.SET_DATES, payload: datesArray });
    };

    const isNotAvailable = (time) => {
        return currentTime.isAfter(
            moment(
                `${appointmentBookingDetails?.appointmentDate} ${time}`,
                "DD MMM, ddd HH:mm"
            ).format()
        );
    };

    return (
        <div className="overflow-x-hidden flex gap-5 relative min-h-[calc(100vh-108px)] my-[40px] px-4 md:px-[50px]">
            {/* <div className="md:w-[40%] h-[50%] blur-[120px] fixed bottom-0 right-0 -z-20 bg-gradient-to-l from-[#1F51C626] via-[#108ED638] to-[#1F51C638]"></div>

            <div className="md:w-[40%] h-[50%] blur-[120px] fixed left-0 bottom-0 -z-20 bg-gradient-to-b from-[#1F51C638] via-[#108ED638] to-[#1F51C626]"></div> */}
            <main className="w-full md:w-[68.16%] flex flex-col gap-5 ">
                <P3 content="Doctor’s Profile" className={"text-[15px]"} />
                <DoctorCard
                    doctorInfo={state.doctorInfo}
                    discreption={true}
                    clickble={false}
                    fullDiscreption={true}
                    hideInSm={true}
                    verified={true}
                    className="border border-solid border-c17 px-5 py-[17px]"
                />
                {/* Mobile screen hospital list from here */}
                <div className="w-full block md:hidden">
                    <P3 content="Hospitals List" className={"text-[15px]"} />
                    <div className=" border border-solid border-c17 px-5 pt-[12px] mt-5 rounded-[5px]">
                        {state.hospitalList?.map((hospital, i) => (
                            <div
                                key={hospital?._id}
                                className="border-b border-dashed border-c17 pt-3"
                            >
                                <div className="flex gap-2.5">
                                    <Avatar
                                        src={hospital?.imgurl}
                                        className={"w-[55px] h-[55px]"}
                                    />
                                    <div>
                                        <P3
                                            content={
                                                hospital?.hospitalId === null
                                                    ? hospital?.nameOfTheDoctor
                                                    : hospital?.hospitalId
                                                          ?.nameOfhospitalOrClinic
                                            }
                                            className={"text-[13px]"}
                                        />
                                        <div className="flex items-center">
                                            <img
                                                src="/Find Doctors/ConsultationCharges.svg"
                                                alt="icon"
                                                className="w-[8px]"
                                            />
                                            <Span
                                                content={
                                                    hospital?.connsultationFee
                                                }
                                                className={
                                                    "text-[#353535] text-[13px]"
                                                }
                                            />
                                        </div>
                                        <div className="flex items-center gap-[5px] w-[90%]">
                                            <img
                                                src="/Find Doctors/Vector@2x.png"
                                                alt="img"
                                                className="w-[10px]"
                                            />
                                            <Span
                                                content={
                                                    state.doctorInfo?.location
                                                }
                                            />
                                        </div>
                                        <div
                                            onClick={() =>
                                                handleShowTimeSlot(hospital)
                                            }
                                            className="flex items-center gap-[5px] mt-2 mb-3 select-none"
                                        >
                                            <FormSpan content="Pick a Time Slotttt" />
                                            {state.showTimeSlot ==
                                            hospital?._id ? (
                                                <FaAngleUp
                                                    color="#108ED6"
                                                    size={17.61}
                                                    className="mt-1"
                                                />
                                            ) : (
                                                <FaAngleDown
                                                    color="#108ED6"
                                                    size={17.61}
                                                    className="mt-1"
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {state.showTimeSlot == hospital?._id && (
                                    <div className="py-5 flex flex-col gap-[15px] border-y border-dashed">
                                        <div className="flex w-full gap-2 items-center">
                                            {getSessionItem(
                                                ACCEPT_APPOINTMENT
                                            ) != "byToken" && (
                                                <button
                                                    onClick={() =>
                                                        handlePrev(
                                                            state.translate - 1
                                                        )
                                                    }
                                                    className="block"
                                                >
                                                    {"<"}
                                                </button>
                                            )}
                                            <div className="flex flex-1 snap-x snap-mandatory overflow-x-auto no-scrollbar gap-2.5">
                                                {state.dates?.map((day, i) => (
                                                    <div
                                                        key={i}
                                                        className="flex flex-col snap-always snap-center items-center gap-[5px]"
                                                    >
                                                        <BoxButton
                                                            content={day}
                                                            onclick={
                                                                handleSelectingDate
                                                            }
                                                            style={{
                                                                transform: `translate(-${state.translate * 100}%)`,
                                                            }}
                                                            classname={`${appointmentBookingDetails?.appointmentDate == day ? "bg-c3 text-c2" : "border border-c17 bg-c2 "} w-[87.84px] md:w-[110px] transition-transform`}
                                                        />

                                                        {/* <ErrorSpan content={"Slot Booked"} /> */}
                                                    </div>
                                                ))}
                                            </div>
                                            {getSessionItem(
                                                ACCEPT_APPOINTMENT
                                            ) != "byToken" && (
                                                <button
                                                    onClick={() =>
                                                        handleNext(
                                                            state.translate + 1
                                                        )
                                                    }
                                                    className="block"
                                                >
                                                    {">"}
                                                </button>
                                            )}
                                        </div>
                                        {state.slotsLoading ? (
                                            <LoadingDots />
                                        ) : state.doctorNotAvailable ? (
                                            <P3
                                                content={
                                                    "Doctor not available for this date"
                                                }
                                            />
                                        ) : getSessionItem(
                                              ACCEPT_APPOINTMENT
                                          ) == "byToken" ? (
                                            <div className="flex gap-x-2.5 gap-y-[27px] flex-wrap max-h-[200px]  overflow-x-auto no-scrollbar pb-2">
                                                {state?.tokensData
                                                    ?.Starttime1 && (
                                                    <div>
                                                        <P3
                                                            content={`Slot 1`}
                                                            className={
                                                                "text-[10px] block"
                                                            }
                                                        />
                                                        <BoxButton
                                                            id={`AppointmentTime`}
                                                            name="AppointmentTime"
                                                            value={`${state?.tokensData?.Starttime1} - ${state?.tokensData?.Endtime1}`}
                                                            content={`${state?.tokensData?.Starttime1} - ${state?.tokensData?.Endtime1}`}
                                                            classname={`border border-c17 ${currentTime.isAfter(moment(state?.tokensData?.Endtime1, "HH:mm").format()) ? "bg-[#5D5E61BD]" : "bg-c2"} w-[125px] cursor-default`}
                                                        />
                                                        {isFormEnabled &&
                                                            currentTime.isBetween(
                                                                moment(
                                                                    state
                                                                        ?.tokensData
                                                                        ?.Starttime1,
                                                                    "HH:mm"
                                                                )
                                                                    .subtract(
                                                                        1,
                                                                        "hours"
                                                                    )
                                                                    .format(),
                                                                moment(
                                                                    state
                                                                        ?.tokensData
                                                                        ?.Endtime1,
                                                                    "HH:mm"
                                                                ).format()
                                                            ) && (
                                                                <ErrorSpan
                                                                    content={
                                                                        "Available"
                                                                    }
                                                                    className="block text-center mt-1 text-[#14D610]"
                                                                />
                                                            )}
                                                        {currentTime.isAfter(
                                                            moment(
                                                                state
                                                                    ?.tokensData
                                                                    ?.Endtime1,
                                                                "HH:mm"
                                                            ).format()
                                                        ) && (
                                                            <ErrorSpan
                                                                content={
                                                                    "Missed"
                                                                }
                                                                className="block text-center mt-1 text-c24"
                                                            />
                                                        )}
                                                    </div>
                                                )}
                                                {state?.tokensData
                                                    ?.Starttime2 && (
                                                    <div>
                                                        <P3
                                                            content={`Slot 2`}
                                                            className={
                                                                "text-[10px] block"
                                                            }
                                                        />
                                                        <BoxButton
                                                            id={`AppointmentTime`}
                                                            name="AppointmentTime"
                                                            value={`${state?.tokensData?.Starttime2} - ${state?.tokensData?.Endtime2}`}
                                                            content={`${state?.tokensData?.Starttime2} - ${state?.tokensData?.Endtime2}`}
                                                            classname={`border border-c17 ${currentTime.isAfter(moment(state?.tokensData?.Endtime2, "HH:mm").format()) ? "bg-[#5D5E61BD]" : "bg-c2"} w-[125px] cursor-default`}
                                                        />
                                                        {isFormEnabled &&
                                                            currentTime.isBetween(
                                                                moment(
                                                                    state
                                                                        ?.tokensData
                                                                        ?.Starttime2,
                                                                    "HH:mm"
                                                                )
                                                                    .subtract(
                                                                        1,
                                                                        "hours"
                                                                    )
                                                                    .format(),
                                                                moment(
                                                                    state
                                                                        ?.tokensData
                                                                        ?.Endtime2,
                                                                    "HH:mm"
                                                                ).format()
                                                            ) && (
                                                                <ErrorSpan
                                                                    content={
                                                                        "Available"
                                                                    }
                                                                    className="block text-center mt-1 text-[#14D610]"
                                                                />
                                                            )}
                                                        {currentTime.isAfter(
                                                            moment(
                                                                state
                                                                    ?.tokensData
                                                                    ?.Endtime2,
                                                                "HH:mm"
                                                            ).format()
                                                        ) && (
                                                            <ErrorSpan
                                                                content={
                                                                    "Missed"
                                                                }
                                                                className="block text-center mt-1 text-c24"
                                                            />
                                                        )}
                                                    </div>
                                                )}
                                                {state?.tokensData
                                                    ?.Starttime3 && (
                                                    <div>
                                                        <P3
                                                            content={`Slot 3`}
                                                            className={
                                                                "text-[10px] block"
                                                            }
                                                        />
                                                        <BoxButton
                                                            id={`AppointmentTime`}
                                                            name="AppointmentTime"
                                                            value={`${state?.tokensData?.Starttime3} - ${state?.tokensData?.Endtime3}`}
                                                            content={`${state?.tokensData?.Starttime3} - ${state?.tokensData?.Endtime3}`}
                                                            classname={`border border-c17 ${currentTime.isAfter(moment(state?.tokensData?.Endtime3, "HH:mm").format()) ? "bg-[#5D5E61BD]" : "bg-c2"} w-[125px] cursor-default`}
                                                        />
                                                        {isFormEnabled &&
                                                            currentTime.isBetween(
                                                                moment(
                                                                    state
                                                                        ?.tokensData
                                                                        ?.Starttime3,
                                                                    "HH:mm"
                                                                )
                                                                    .subtract(
                                                                        1,
                                                                        "hours"
                                                                    )
                                                                    .format(),
                                                                moment(
                                                                    state
                                                                        ?.tokensData
                                                                        ?.Endtime3,
                                                                    "HH:mm"
                                                                ).format()
                                                            ) && (
                                                                <ErrorSpan
                                                                    content={
                                                                        "Available"
                                                                    }
                                                                    className="block text-center mt-1 text-[#14D610]"
                                                                />
                                                            )}
                                                        {currentTime.isAfter(
                                                            moment(
                                                                state
                                                                    ?.tokensData
                                                                    ?.Endtime3,
                                                                "HH:mm"
                                                            ).format()
                                                        ) && (
                                                            <ErrorSpan
                                                                content={
                                                                    "Missed"
                                                                }
                                                                className="block text-center mt-1 text-c24"
                                                            />
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <>
                                                <P3
                                                    content={`${state.slotsData?.length} Slots Available`}
                                                    className={"text-[10px]"}
                                                />
                                                <div className="flex gap-x-2.5 gap-y-[27px] flex-wrap min-h-[200px] maz-h-[200px] h-[200px] overflow-x-auto ">
                                                    {state.slotsData?.map(
                                                        (slot, i) => (
                                                            <div key={i}>
                                                                <BoxButton
                                                                    disabled={
                                                                        slot.isbooked ||
                                                                        isNotAvailable(
                                                                            slot
                                                                                ?.slot
                                                                                ?.endTime
                                                                        )
                                                                    }
                                                                    content={`${slot?.slot?.startTime} - ${slot?.slot?.endTime}`}
                                                                    onclick={(
                                                                        e
                                                                    ) =>
                                                                        handleSelectingSlot(
                                                                            slot.slot
                                                                        )
                                                                    }
                                                                    classname={`${appointmentBookingDetails?.AppointmentTime == slot?.slot && state.showTimeSlot == hospital?._id ? "bg-c3 text-c2" : "border border-c17 bg-c2 "} w-[125px] `}
                                                                />
                                                                {slot?.isbooked ? (
                                                                    <span
                                                                        className={`font-f3 font-[400] block text-center mt-2 leading-[12px] text-[0.825rem]  `}
                                                                    >
                                                                        Booked
                                                                    </span>
                                                                ) : (
                                                                    <span
                                                                        className={`font-f3 font-[400] block text-center mt-2 leading-[12px] text-[0.825rem] ${isNotAvailable(slot?.slot?.endTime) ? "text-c24" : "text-[#14D610]"} `}
                                                                    >
                                                                        {isNotAvailable(
                                                                            slot
                                                                                ?.slot
                                                                                ?.endTime
                                                                        )
                                                                            ? "Not Available"
                                                                            : "Available"}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </>
                                        )}

                                        {!state.doctorNotAvailable &&
                                            appointmentBookingDetails?.AppointmentTime && (
                                                <LinkTextWithIcon
                                                    to={`/patient/doctor/${state.showTimeSlot}/book_appointment`}
                                                    className=" whitespace-nowrap w-fit flex items-center text-c3"
                                                >
                                                    Next{" "}
                                                    <FaAngleRight size={16} />
                                                </LinkTextWithIcon>
                                            )}
                                        {isFormEnabled && (
                                            <LinkTextWithIcon
                                                to={`/patient/doctor/${state.showTimeSlot}/book_appointment`}
                                                className=" whitespace-nowrap w-fit flex items-center text-c3"
                                            >
                                                Next <FaAngleRight size={16} />
                                            </LinkTextWithIcon>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                {/* Mobile screen hospital list to here */}

                <div className="flex gap-2.5">
                    <PrimaryButton
                        content={"Reviews"}
                        className={`${state.services ? "bg-c2 text-c28 border border-c22" : "bg-c1 text-c2"} font-f2 w-[129px]`}
                        h={"40px"}
                        bg={"c1"}
                        radius={"44px"}
                        onclick={() =>
                            dispatch({
                                type: ACTION_TYPES.SET_SERVICES,
                                payload: false,
                            })
                        }
                    />
                    <PrimaryButton
                        content={"Services"}
                        className={`${state.services ? "bg-c1 text-c2" : "bg-c2 text-c28 border border-c22"} font-f2 w-[129px] border border-c26 `}
                        h={"40px"}
                        bg={"c1"}
                        // color={"c22"}
                        radius={"44px"}
                        onclick={() =>
                            dispatch({
                                type: ACTION_TYPES.SET_SERVICES,
                                payload: true,
                            })
                        }
                    />
                </div>
                {state.services ? (
                    <div className="flex flex-col gap-[20px]">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <p
                                key={i}
                                className="text-c16 font-f3 font-w1 text-[13px]"
                            >
                                {i + 1}. Root Canal
                            </p>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col gap-5 h-[500px] overflow-scroll no-scrollbar">
                        {state?.doctorInfo?.reviews?.map((review, i) => (
                            <RatingCard ratingData={review} key={i} />
                        ))}
                    </div>
                )}
            </main>
            {/* Large screen hospital List From here  */}
            <aside className="w-[31.84%] hidden md:block">
                <P3 content="Hospitals List" className={"text-[15px]"} />

                <div className=" border border-solid border-c17 px-5 pt-[12px] mt-5 rounded-[5px]">
                    {state.hospitalList?.map((hospital, i) => (
                        <div
                            key={hospital?._id}
                            className="border-b border-dashed border-c17 pt-3"
                        >
                            <div className="flex gap-2.5">
                                <Avatar
                                    src={hospital?.imgurl}
                                    className={"w-[55px] h-[55px]"}
                                />
                                <div className="w-full">
                                    <P3
                                        content={
                                            hospital?.hospitalId === null
                                                ? hospital?.nameOfTheDoctor
                                                : hospital?.hospitalId
                                                      ?.nameOfhospitalOrClinic
                                        }
                                        className={"text-[13px]"}
                                    />
                                    <div className="flex items-center">
                                        <img
                                            src="/Find Doctors/ConsultationCharges.svg"
                                            alt="icon"
                                            className="w-[8px]"
                                        />
                                        <Span
                                            content={hospital?.connsultationFee}
                                            className={
                                                "text-[#353535] text-[13px]"
                                            }
                                        />
                                    </div>
                                    <div className="flex items-center gap-[5px] w-[90%]">
                                        <img
                                            src="/Find Doctors/Vector@2x.png"
                                            alt="img"
                                            className="w-[10px]"
                                        />
                                        <Span
                                            content={
                                                hospital?.hospitalId === null
                                                    ? hospital?.location
                                                    : hospital?.hospitalId
                                                          ?.location
                                            }
                                        />
                                    </div>
                                    <div
                                        onClick={() =>
                                            handleShowTimeSlot(hospital)
                                        }
                                        className="flex items-center gap-[5px] mt-2 mb-3 select-none"
                                    >
                                        <FormSpan content="Pick a Time Slot" />
                                        {state.showTimeSlot == hospital?._id ? (
                                            <FaAngleUp
                                                color="#108ED6"
                                                size={17.61}
                                                className="mt-1"
                                            />
                                        ) : (
                                            <FaAngleDown
                                                color="#108ED6"
                                                size={17.61}
                                                className="mt-1"
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                            {state.showTimeSlot == hospital?._id && (
                                <div className="py-5 flex flex-col gap-[15px] border-y border-dashed min-h-[100px]">
                                    <div className="flex w-full gap-2 items-center">
                                        <button
                                            onClick={() =>
                                                handlePrev(state.translate - 1)
                                            }
                                            className="block"
                                        >
                                            <FaAngleLeft color="#108ED6" />
                                        </button>

                                        <div className="flex flex-1 snap-x snap-mandatory overflow-x-auto no-scrollbar gap-2.5">
                                            {state.dates?.map((day, i) => (
                                                <div
                                                    key={day}
                                                    className="flex flex-col snap-always snap-center items-center gap-[5px]"
                                                >
                                                    <BoxButton
                                                        content={day}
                                                        onclick={(e) =>
                                                            handleSelectingDate(
                                                                e,
                                                                hospital?._id
                                                            )
                                                        }
                                                        style={{
                                                            transform: `translate(-${state.translate * 100}%)`,
                                                        }}
                                                        classname={`${appointmentBookingDetails?.appointmentDate == day && state.showTimeSlot == hospital?._id ? "bg-c3 text-c2" : "border border-c17 bg-c2 "} w-[87.84px] md:w-[110px] transition-transform`}
                                                    />
                                                </div>
                                            ))}
                                        </div>

                                        <button
                                            onClick={() =>
                                                handleNext(state.translate + 1)
                                            }
                                            className="block"
                                        >
                                            <FaAngleRight color="#108ED6" />
                                        </button>
                                    </div>
                                    {state.slotsLoading ? (
                                        <LoadingDots />
                                    ) : state.doctorNotAvailable ? (
                                        <P3
                                            content={
                                                "Doctor not available for this date"
                                            }
                                        />
                                    ) : getSessionItem(ACCEPT_APPOINTMENT) ==
                                      "byToken" ? (
                                        <div className="flex gap-x-2.5 gap-y-[27px] flex-wrap max-h-[200px]  overflow-x-auto no-scrollbar pb-2">
                                            {state?.tokensData?.Starttime1 && (
                                                <div>
                                                    <P3
                                                        content={`Slot 1`}
                                                        className={
                                                            "text-[10px] block"
                                                        }
                                                    />
                                                    <BoxButton
                                                        id={`AppointmentTime`}
                                                        name="AppointmentTime"
                                                        value={`${state?.tokensData?.Starttime1} - ${state?.tokensData?.Endtime1}`}
                                                        content={`${state?.tokensData?.Starttime1} - ${state?.tokensData?.Endtime1}`}
                                                        classname={`border border-c17 ${currentTime.isAfter(moment(state?.tokensData?.Endtime1, "HH:mm").format()) ? "bg-[#5D5E61BD]" : "bg-c2"} w-[125px] cursor-default`}
                                                    />
                                                    {isFormEnabled &&
                                                        currentTime.isBetween(
                                                            moment(
                                                                state
                                                                    ?.tokensData
                                                                    ?.Starttime1,
                                                                "HH:mm"
                                                            )
                                                                .subtract(
                                                                    1,
                                                                    "hours"
                                                                )
                                                                .format(),
                                                            moment(
                                                                state
                                                                    ?.tokensData
                                                                    ?.Endtime1,
                                                                "HH:mm"
                                                            ).format()
                                                        ) && (
                                                            <ErrorSpan
                                                                content={
                                                                    "Available"
                                                                }
                                                                className="block text-center mt-1 text-[#14D610]"
                                                            />
                                                        )}
                                                    {currentTime.isAfter(
                                                        moment(
                                                            state?.tokensData
                                                                ?.Endtime1,
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
                                            {state?.tokensData?.Starttime2 && (
                                                <div>
                                                    <P3
                                                        content={`Slot 2`}
                                                        className={
                                                            "text-[10px] block"
                                                        }
                                                    />
                                                    <BoxButton
                                                        id={`AppointmentTime`}
                                                        name="AppointmentTime"
                                                        value={`${state?.tokensData?.Starttime2} - ${state?.tokensData?.Endtime2}`}
                                                        content={`${state?.tokensData?.Starttime2} - ${state?.tokensData?.Endtime2}`}
                                                        classname={`border border-c17 ${currentTime.isAfter(moment(state?.tokensData?.Endtime2, "HH:mm").format()) ? "bg-[#5D5E61BD]" : "bg-c2"} w-[125px] cursor-default`}
                                                    />
                                                    {isFormEnabled &&
                                                        currentTime.isBetween(
                                                            moment(
                                                                state
                                                                    ?.tokensData
                                                                    ?.Starttime2,
                                                                "HH:mm"
                                                            )
                                                                .subtract(
                                                                    1,
                                                                    "hours"
                                                                )
                                                                .format(),
                                                            moment(
                                                                state
                                                                    ?.tokensData
                                                                    ?.Endtime2,
                                                                "HH:mm"
                                                            ).format()
                                                        ) && (
                                                            <ErrorSpan
                                                                content={
                                                                    "Available"
                                                                }
                                                                className="block text-center mt-1 text-[#14D610]"
                                                            />
                                                        )}
                                                    {currentTime.isAfter(
                                                        moment(
                                                            state?.tokensData
                                                                ?.Endtime2,
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
                                            {state?.tokensData?.Starttime3 && (
                                                <div>
                                                    <P3
                                                        content={`Slot 3`}
                                                        className={
                                                            "text-[10px] block"
                                                        }
                                                    />
                                                    <BoxButton
                                                        id={`AppointmentTime`}
                                                        name="AppointmentTime"
                                                        value={`${state?.tokensData?.Starttime3} - ${state?.tokensData?.Endtime3}`}
                                                        content={`${state?.tokensData?.Starttime3} - ${state?.tokensData?.Endtime3}`}
                                                        classname={`border border-c17 ${currentTime.isAfter(moment(state?.tokensData?.Endtime3, "HH:mm").format()) ? "bg-[#5D5E61BD]" : "bg-c2"} w-[125px] cursor-default`}
                                                    />
                                                    {isFormEnabled &&
                                                        currentTime.isBetween(
                                                            moment(
                                                                state
                                                                    ?.tokensData
                                                                    ?.Starttime3,
                                                                "HH:mm"
                                                            )
                                                                .subtract(
                                                                    1,
                                                                    "hours"
                                                                )
                                                                .format(),
                                                            moment(
                                                                state
                                                                    ?.tokensData
                                                                    ?.Endtime3,
                                                                "HH:mm"
                                                            ).format()
                                                        ) && (
                                                            <ErrorSpan
                                                                content={
                                                                    "Available"
                                                                }
                                                                className="block text-center mt-1 text-[#14D610]"
                                                            />
                                                        )}
                                                    {currentTime.isAfter(
                                                        moment(
                                                            state?.tokensData
                                                                ?.Endtime3,
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
                                    ) : (
                                        <>
                                            <P3
                                                content={`${state.slotsData?.length} Slots Available`}
                                                className={"text-[10px]"}
                                            />
                                            <div className="flex gap-x-2.5 gap-y-[27px] flex-wrap min-h-[200px] maz-h-[200px] h-[200px] overflow-x-auto ">
                                                {state.doctorNotAvailable ? (
                                                    <P3
                                                        content={
                                                            "Doctor not available for this date"
                                                        }
                                                    />
                                                ) : (
                                                    state.slotsData?.map(
                                                        (slot, i) => (
                                                            <div>
                                                                <BoxButton
                                                                    key={i}
                                                                    disabled={
                                                                        slot.isbooked ||
                                                                        isNotAvailable(
                                                                            slot
                                                                                ?.slot
                                                                                ?.endTime
                                                                        )
                                                                    }
                                                                    content={`${slot?.slot?.startTime} - ${slot?.slot?.endTime}`}
                                                                    onclick={(
                                                                        e
                                                                    ) =>
                                                                        handleSelectingSlot(
                                                                            slot?.slot
                                                                        )
                                                                    }
                                                                    classname={`${appointmentBookingDetails?.AppointmentTime == slot?.slot && state.showTimeSlot == hospital?._id ? "bg-c3 text-c2" : "border border-c17 bg-c2 "} w-[125px] `}
                                                                />
                                                                {slot?.isbooked ? (
                                                                    <span
                                                                        className={`font-f3 font-[400] block text-center mt-2 leading-[12px] text-[0.825rem]  `}
                                                                    >
                                                                        Booked
                                                                    </span>
                                                                ) : (
                                                                    <span
                                                                        className={`font-f3 font-[400] block text-center mt-2 leading-[12px] text-[0.825rem] ${isNotAvailable(slot?.slot?.endTime) ? "text-c24" : "text-[#14D610]"} `}
                                                                    >
                                                                        {isNotAvailable(
                                                                            slot
                                                                                ?.slot
                                                                                ?.endTime
                                                                        )
                                                                            ? "Not Available"
                                                                            : "Available"}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        )
                                                    )
                                                )}
                                            </div>
                                        </>
                                    )}

                                    {!state.doctorNotAvailable &&
                                        appointmentBookingDetails?.AppointmentTime && (
                                            <LinkTextWithIcon
                                                to={`/patient/doctor/${state.showTimeSlot}/book_appointment`}
                                                className=" whitespace-nowrap w-fit flex items-center text-c3"
                                            >
                                                Next <FaAngleRight size={16} />
                                            </LinkTextWithIcon>
                                        )}
                                    {isFormEnabled && (
                                        <LinkTextWithIcon
                                            to={`/patient/doctor/${state.showTimeSlot}/book_appointment`}
                                            className=" whitespace-nowrap w-fit flex items-center text-c3"
                                        >
                                            Next <FaAngleRight size={16} />
                                        </LinkTextWithIcon>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </aside>
            {/* Large screen hospital List to here  */}
            {/* {!user && !isLoggedIn && <PatientLogIn />} */}
        </div>
    );
};

export default memo(DoctorDetails);
