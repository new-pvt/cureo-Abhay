import { ErrorSpan, H7, P3, P5 } from "../../Common/Components/Text/Textt";
import DoctorCard from "../Components/DoctorsCard/DoctorCard";

import {
    memo,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useReducer,
    useState,
} from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { axiosClient } from "../../Utils/axiosClient";
import { IoIosRadioButtonOff } from "react-icons/io";
import { IoIosRadioButtonOn } from "react-icons/io";
import SlotsCard from "../Components/Book Appointments/SlotsCard";
import moment from "moment";
import { Input1 } from "../../Common/Components/Inputs/Inputs";
import PrimaryButton from "../../Common/Components/Buttons/PrimaryButton";
import AppointmentContext from "../../Utils/Context/Hospital/BookAppointment/AppointmentContext";
import {
    ACCEPT_APPOINTMENT,
    SELECTED_HOSPITAL,
    getSessionItem,
    removeSessionItem,
    setSessionItem,
} from "../../Utils/SessionStorage/appointmentForm";
import {
    INITIAL_STATE,
    doctorsReducer,
} from "../../Patients/Reducers/DoctorDetails/doctorDetailReducer";
import { ACTION_TYPES } from "../../Patients/Reducers/DoctorDetails/ActionsType";
import AppointmentAlreadyExistDialog from "../Components/Book Appointments/Dialog/AppointmentAlreadyExistDialog";
import AppointmentBookedDialog from "../Components/Book Appointments/Dialog/AppointmentBookedDialog";
import TokenCard from "../Components/Book Appointments/TokenCard";
import toast from "react-hot-toast";

const BookAppointment = () => {
    const { doctorId } = useParams();
    const acceptAppointmentInfo = getSessionItem(ACCEPT_APPOINTMENT);
    const [state, dispatch] = useReducer(doctorsReducer, INITIAL_STATE);
    const { user, isLoggedIn } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [acceptAppointment, setAcceptAppointment] = useState(null);
    const [appointmentAlreadyExistDialog, setAppointmentAlreadyExistDialog] =
        useState(false);
    const [appointmentBookedDialog, setAppointmentBookedDialog] = useState({
        value: false,
        data: null,
    });
    const [error, setError] = useState({ value: "", message: "" });
    const [isFormEnabled, setIsFormEnabled] = useState(false);
    const { appointmentBookingDetails, setAppointmentBookingDetails } =
        useContext(AppointmentContext);

    const formInputs = [
        {
            title: "Name*",
            type: "text",
            placeholder: "Ex. John Doe",
            name: "name",
            classname: "",
            autofocus: false,
            value: appointmentBookingDetails?.name,
        },
        {
            title: "Age*",
            type: "number",
            placeholder: "Ex. 25",
            name: "age",
            classname: "",
            autofocus: false,
            value: appointmentBookingDetails?.age,
        },
        {
            title: "Gender*",
            type: "text",
            placeholder: "Gender",
            name: "gender",
            classname: "",
            autofocus: false,
            value: appointmentBookingDetails?.gender,
        },
        {
            title: "Mobile*",
            type: "number",
            placeholder: "Name",
            name: "phone",
            classname: "",
            autofocus: false,
            value: appointmentBookingDetails?.phone,
        },
        {
            title: "Appointment Notes*",
            type: "text",
            placeholder: "Ex. Feeling sick",
            name: "AppointmentNotes",
            classname: "",
            autofocus: false,
            value: appointmentBookingDetails?.AppointmentNotes,
        },
    ];

    const handleChange = useCallback(
        (e, hospital) => {
            console.log(hospital?.acceptAppointments);
            // if (e.target) {
            if (hospital) {
                setAcceptAppointment(hospital?.acceptAppointments);
            }
            // removeSessionItem(SELECTED_HOSPITAL);
            // removeSessionItem(ACCEPT_APPOINTMENT);
            const { name, value } = e.target;
            return setAppointmentBookingDetails({
                ...appointmentBookingDetails,
                [name]: value,
            });

            // } else {
            //     setAppointmentBookingDetails({
            //         ...appointmentBookingDetails,
            //         AppointmentTime: e,
            //     });
            // }
        },
        [appointmentBookingDetails]
    );

    console.log(state.doctorInfo.acceptAppointments);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError({ ...error, value: "", message: "" });
        if (!appointmentBookingDetails?.name) {
            return setError({
                value: true,
                message: "Please Enter Patient's name",
            });
        }
        if (!appointmentBookingDetails?.age) {
            return setError({
                value: true,
                message: "Please Enter Patient's age",
            });
        }
        if (!appointmentBookingDetails?.gender) {
            return setError({
                value: true,
                message: "Please Enter Patient's gender",
            });
        }
        if (!appointmentBookingDetails?.phone) {
            return setError({
                value: true,
                message: "Please Enter Patient's phone",
            });
        }
        if (!appointmentBookingDetails?.AppointmentNotes) {
            return setError({
                value: true,
                message: "Please Enter Appointment Notes",
            });
        }
        if (!appointmentBookingDetails?.appointmentDate) {
            return setError({
                value: true,
                message: "Please Select Appointment Date",
            });
        }
        if (
            !appointmentBookingDetails?.AppointmentTime &&
            acceptAppointment == "bySlot"
        ) {
            return setError({
                value: true,
                message: "Please Chhoose Slot Time",
            });
        }
        setLoading(true);
        const url =
            acceptAppointment == "bySlot"
                ? "/v2/bookAppointment"
                : "/v2/bookappointmentbytoken";
        try {
            const response = await axiosClient.post(url, {
                doctorid: doctorId,
                userid: user?._id,
                name: appointmentBookingDetails?.name,
                age: appointmentBookingDetails?.age,
                gender: appointmentBookingDetails?.gender,
                phone: appointmentBookingDetails?.phone,
                AppointmentNotes: appointmentBookingDetails?.AppointmentNotes,
                appointmentDate: moment(
                    appointmentBookingDetails?.appointmentDate,
                    "DD MMM, ddd"
                ).format("YYYY-MM-DD"),
                AppointmentTime: appointmentBookingDetails?.AppointmentTime,
                role: user?.role,
            });
            if (response.status === "ok") {
                toast.success("Appointment Booked");
                setAppointmentBookingDetails({
                    ...appointmentBookingDetails,
                    nameOfTheDoctor: "",
                    doctorsId: "",
                    acceptAppointments: null,
                    consultingTime: "",
                    hospitalId: "",
                    doctorid: "",
                    AppointmentNotes: "",
                    AppointmentTime: "",
                    imgurl: "",
                    connsultationFee: "",
                    location: "",
                    hospitalName: "",
                    name: "",
                    age: "",
                    gender: "",
                    phone: "",
                    email: "",
                    userid: "",
                });
                return setAppointmentBookedDialog({
                    ...appointmentBookedDialog,
                    value: true,
                    data: response.result,
                });
            }
        } catch (error) {
            if (
                error.status === "error" &&
                error.message === "Appointment is already exist"
            ) {
                setAppointmentAlreadyExistDialog(true);
                setTimeout(() => {
                    return setAppointmentAlreadyExistDialog(false);
                }, 3000);
            }
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSelectingSlot = useCallback(
        (slot) => {
            setAppointmentBookingDetails({
                ...appointmentBookingDetails,
                AppointmentTime: slot,
            });
        },
        [appointmentBookingDetails?.appointmentDate]
    );

    const getSingleDoctorDetails = async () => {
        try {
            const response = await axiosClient.get(
                `/v2/singledoctor/${doctorId}`
            );
            if (response.status === "ok") {
                dispatch({
                    type: ACTION_TYPES.SET_DOCTOR_INFO,
                    payload: response.result,
                });
                setAcceptAppointment(response.result.acceptAppointments);
                // setDoctorInfo(response.result);
                response.result;
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const getAvailableSlots = async () => {
        setAppointmentBookingDetails({
            ...appointmentBookingDetails,
            AppointmentTime: "",
        });
        // try {
        // if (state.showTimeSlot != 0) {
        dispatch({ type: ACTION_TYPES.SLOT_API_PENDING });
        // setSlotsLoading(true);

        try {
            const response = await axiosClient.get(
                `/v2/getAvailbleSlotsForAnUser/${doctorId}/${moment(appointmentBookingDetails.appointmentDate, "DD MMM, ddd").format("YYYY-MM-DD")}`
            );

            if (response.status === "ok") {
                if (
                    response.result[0] == "doctor not available for this date"
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
        } catch (error) {
            console.log(error.message);
        } finally {
            return dispatch({ type: ACTION_TYPES.SLOT_API_ERROR });
        }

        // }
        // } catch (error) {
        //     return dispatch({ type: ACTION_TYPES.SLOT_API_ERROR });
        // } finally {
        //     return dispatch({ type: ACTION_TYPES.SLOT_API_ERROR });
        // }
    };

    const getAvailableToken = async () => {
        dispatch({ type: ACTION_TYPES.SLOT_API_PENDING });
        try {
            const response = await axiosClient.get(
                `/v2/getAppointmentByTokenSlotDetailForDoctorForPerticularDate/${doctorId}/${moment(appointmentBookingDetails.appointmentDate, "DD MMM, ddd").format("YYYY-MM-DD")}`
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

    useEffect(() => {
        if (acceptAppointment == "bySlot") {
            getAvailableSlots();
            return;
        }
        if (acceptAppointment == "byToken") {
            getAvailableToken();
            return;
        }
    }, [
        acceptAppointment,
        appointmentBookingDetails?.selectedHospital,
        appointmentBookingDetails?.appointmentDate,
    ]);

    useEffect(() => {
        generateNextWeekDates();

        return () => {
            removeSessionItem(SELECTED_HOSPITAL);
            removeSessionItem(ACCEPT_APPOINTMENT);
        };
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

    useEffect(() => {
        getSingleDoctorDetails();
    }, [doctorId]);

    return (
        <div className="overflow-x-hidden flex flex-col gap-5 relative min-h-[calc(100vh-108px)] my-[40px] px-4 md:px-[24.74%] ">
            <div className="md:w-[40%] h-[50%] blur-[120px] fixed bottom-0 right-0 -z-20 bg-gradient-to-l from-[#1F51C626] via-[#108ED638] to-[#1F51C638]"></div>
            <div className="md:w-[40%] h-[50%] blur-[120px] fixed left-0 bottom-0 -z-20 bg-gradient-to-b from-[#1F51C638] via-[#108ED638] to-[#1F51C626]"></div>

            <DoctorCard
                doctorInfo={state.doctorInfo}
                clickble={false}
                className={"border-none shadow-sm px-[17px] shadow-[#0000001A]"}
            />

            <div>
                {acceptAppointment == "bySlot" ? (
                    <SlotsCard
                        dates={state.dates}
                        slotsData={state.slotsData}
                        handleSelectingSlot={handleChange}
                        slotsLoading={state.slotsLoading}
                        doctorNotAvailable={state.doctorNotAvailable}
                        acceptAppointment={acceptAppointment}
                    />
                ) : (
                    <TokenCard
                        dates={state.dates}
                        tokensData={state.tokensData}
                        handleSelectingSlot={handleChange}
                        slotsLoading={state.slotsLoading}
                        doctorNotAvailable={state.doctorNotAvailable}
                        acceptAppointment={acceptAppointment}
                        isFormEnabled={isFormEnabled} setIsFormEnabled={setIsFormEnabled}
                    />
                )}
            </div>
            <P3
                content={"Patient Details"}
                className={"text-c20 text-[15px]"}
            />
            <form onSubmit={handleSubmit} className="flex flex-col gap-[25px]">
                {formInputs?.map((input, i) => (
                    <div key={i} className="flex flex-col gap-[10px]">
                        <P5 content={input.title} />
                        <Input1
                        disabled={!isFormEnabled && acceptAppointment  === 'byTokens'} 
                            type={input.type}
                            placeholder={input.placeholder}
                            name={input.name}
                            autofocus={input.autofocus}
                            value={input.value}
                            onchange={handleChange}
                            required={true}
                            classname={`${input?.value ? "bg-c26 border-none text-c4" : "bg-white"}`}
                        />
                    </div>
                ))}
                {error.value && (
                    <ErrorSpan
                        content={error?.message}
                        className={"-my-[10px] text-center text-c24"}
                    />
                )}
                <PrimaryButton
                    content={"Book Appointment"}
                    type="submit"
                    loading={loading}
                    className={`bg-c1 font-f2 w-full md:w-[33.33%] mx-auto`}
                    h={"45px"}
                    bg={"c1"}
                    color={"white"}
                    radius={"44px"}
                    disabled={!isFormEnabled && acceptAppointment  == 'byToken'}
                />
            </form>
            {/* {!user && !isLoggedIn && <PatientLogIn />} */}
            {appointmentAlreadyExistDialog && (
                <AppointmentAlreadyExistDialog
                    setOpenDialog={setAppointmentAlreadyExistDialog}
                />
            )}
            {appointmentBookedDialog?.value && (
                <AppointmentBookedDialog
                    setAppointmentBookedDialog={setAppointmentBookedDialog}
                    appointmentData={appointmentBookedDialog?.data}
                />
            )}
        </div>
    );
};

export default memo(BookAppointment);
