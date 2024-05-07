import React, {
    memo,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import Select from "../../../Common/Components/Inputs/Select";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import PrimaryButton from "../../../Common/Components/Buttons/PrimaryButton";
import { IoMdRadioButtonOn, IoMdRadioButtonOff } from "react-icons/io";
import { ErrorSpan } from "../../../Common/Components/Text/Textt";
import { useSelector } from "react-redux";
import { axiosClient } from "../../../Utils/axiosClient";
import SettingsContext from "../../../Utils/Context/Doctor/SettingsContext";
import toast from "react-hot-toast";

const EditSlots = ({ date, data, getScheduleData }) => {
    const slotDuration = ["15 min", "30 min", "45 min", "60 min"];
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const { doctor } = useSelector((state) => state.doctorsData);
    const { appointmentBy } = useContext(SettingsContext);

    const [times, setTimes] = useState({
        startTimes1: null,
        endTimes1: null,
        startTimes2: null,
        endTimes2: null,
        startTimes3: null,
        endTimes3: null,
    });

    const [inputValue, setInput] = useState({
        slotduration: "15 min",
        Starttime1: data?.Starttime1,
        Endtime1: data?.Endtime1,
        Starttime2: data?.Starttime2,
        Endtime2: data?.Endtime2,
        Starttime3: data?.Starttime3,
        Endtime3: data?.Endtime3,
        isholiday: false,
    });

    const handleSelect = useCallback(
        (e, val) => {
            setInput({ ...inputValue, [e.target.id]: val });
        },
        [inputValue]
    );

    const generateStartTimes = () => {
        const timestamps = [];
        const totalMinutesInDay = 24 * 60;

        for (
            let minute = 0;
            minute < totalMinutesInDay;
            minute += Number(inputValue?.slotduration?.split(" ")[0])
        ) {
            const hour = Math.floor(minute / 60);
            const minutePart = minute % 60;

            const formattedHour = hour.toString().padStart(2, "0");
            const formattedMinute = minutePart.toString().padStart(2, "0");

            const timestamp = `${formattedHour}:${formattedMinute}`;
            timestamps.push(timestamp);
        }

        return timestamps;
    };
    const startTimes = generateStartTimes();

    useEffect(() => {
        // Calculate the initial end time based on slot duration and start time
        const start = new Date(`01/01/2023 ${inputValue?.Starttime1}`);
        start.setMinutes(
            start.getMinutes() + Number(inputValue?.slotduration?.split(" ")[0])
        );

        setInput({ ...inputValue, Endtime1: "" });

        // Generate end times based on the selected start time and slot duration
        const generatedEndTimes = [];
        let currentTime = new Date(`01/01/2023 ${inputValue?.Starttime1}`);

        while (currentTime < new Date(`01/01/2023 11:59 PM`)) {
            currentTime.setMinutes(
                currentTime.getMinutes() +
                    Number(inputValue?.slotduration?.split(" ")[0])
            );
            generatedEndTimes.push(
                currentTime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                })
            );
        }
        setTimes({ ...times, endTimes1: generatedEndTimes });
    }, [inputValue?.slotduration, inputValue?.Starttime1]);

    useEffect(() => {
        // Calculate the initial end time based on slot duration and start time
        const start = new Date(`01/01/2023 ${inputValue?.Endtime1}`);
        start.setMinutes(
            start.getMinutes() + Number(inputValue?.slotduration?.split(" ")[0])
        );
        setInput({ ...inputValue, Starttime2: "" });
        const genratedStartTimes2 = [];
        let currentTime = new Date(`01/01/2023 ${inputValue?.Endtime1}`);
        while (currentTime < new Date(`01/01/2023 11:59 PM`)) {
            currentTime.setMinutes(
                currentTime.getMinutes() +
                    Number(inputValue?.slotduration?.split(" ")[0])
            );
            genratedStartTimes2.push(
                currentTime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                })
            );
        }
        setTimes({ ...times, startTimes2: genratedStartTimes2 });
    }, [inputValue?.Endtime1]);

    useEffect(() => {
        // Calculate the initial end time based on slot duration and start time
        const start = new Date(`01/01/2023 ${inputValue?.Starttime2}`);
        start.setMinutes(
            start.getMinutes() + Number(inputValue?.slotduration?.split(" ")[0])
        );
        // setEndTime2(
        //     start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        // );

        // Generate end times based on the selected start time and slot duration

        setInput({ ...inputValue, Endtime2: "" });

        const generatedEndTimes2 = [];
        let currentTime = new Date(`01/01/2023 ${inputValue?.Starttime2}`);

        while (currentTime < new Date(`01/01/2023 11:59 PM`)) {
            currentTime.setMinutes(
                currentTime.getMinutes() +
                    Number(inputValue?.slotduration?.split(" ")[0])
            );
            generatedEndTimes2.push(
                currentTime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                })
            );
        }
        setTimes({ ...times, endTimes2: generatedEndTimes2 });
    }, [inputValue?.Starttime2]);

    useEffect(() => {
        // Calculate the initial end time based on slot duration and start time
        const start = new Date(`01/01/2023 ${inputValue?.Endtime2}`);

        start.setMinutes(
            start.getMinutes() + Number(inputValue?.slotduration?.split(" ")[0])
        );
        // setStartTime3(
        //     start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        // );

        // Generate end times based on the selected start time and slot duration
        setInput({ ...inputValue, Starttime3: "" });

        const genratedStartTimes3 = [];
        let currentTime = new Date(`01/01/2023 ${inputValue?.Endtime2}`);

        while (currentTime < new Date(`01/01/2023 11:59 PM`)) {
            currentTime.setMinutes(
                currentTime.getMinutes() +
                    Number(inputValue?.slotduration?.split(" ")[0])
            );
            genratedStartTimes3.push(
                currentTime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                })
            );
        }
        setTimes({ ...times, startTimes3: genratedStartTimes3 });
    }, [inputValue?.Endtime2]);

    useEffect(() => {
        // Calculate the initial end time based on slot duration and start time
        const start = new Date(`01/01/2023 ${inputValue?.Starttime3}`);
        start.setMinutes(
            start.getMinutes() + Number(inputValue?.slotduration?.split(" ")[0])
        );
        // setEndTime3(
        //     start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        // );

        // Generate end times based on the selected start time and slot duration

        setInput({ ...inputValue, Endtime3: "" });

        const generatedEndTimes3 = [];
        let currentTime = new Date(`01/01/2023 ${inputValue?.Starttime3}`);

        while (currentTime < new Date(`01/01/2023 11:59 PM`)) {
            currentTime.setMinutes(
                currentTime.getMinutes() +
                    Number(inputValue?.slotduration?.split(" ")[0])
            );
            generatedEndTimes3.push(
                currentTime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                })
            );
        }
        setTimes({ ...times, endTimes3: generatedEndTimes3 });
    }, [inputValue?.Starttime3]);

    const handleSave = async (e) => {
        e.preventDefault();
        setError(false);
        setLoading(true);
        if (appointmentBy == "slot") {
            try {
                const response = await axiosClient.post(
                    "/v2/creatSlotForDoctor",
                    {
                        slotduration: Number(
                            inputValue?.slotduration?.split(" ")[0]
                        ),
                        Starttime1: inputValue.Starttime1,
                        Endtime1: inputValue.Endtime1,
                        Starttime2: inputValue.Starttime2,
                        Endtime2: inputValue.Endtime2,
                        Starttime3: inputValue.Starttime3,
                        Endtime3: inputValue.Endtime3,
                        isholiday: inputValue.isholiday,
                        date: date,
                        doctorid: doctor?._id,
                    }
                );
                if (response.status == "ok") {
                    await getScheduleData();
                }
            } catch (error) {
                toast.error(error.message);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        } else {
            try {
                const response = await axiosClient.post(
                    "/v2/creatTokenForDoctor",
                    {
                        Starttime1: inputValue.Starttime1,
                        Endtime1: inputValue.Endtime1,
                        Starttime2: inputValue.Starttime2,
                        Endtime2: inputValue.Endtime2,
                        Starttime3: inputValue.Starttime3,
                        Endtime3: inputValue.Endtime3,
                        date: date,
                        doctorid: doctor?._id,
                    }
                );
                if (response.status == "ok") {
                    getScheduleData();
                }
            } catch (error) {
                toast.error(error.message);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
    };

    console.log(times);

    return (
        <form onSubmit={handleSave} className="space-y-[25px]">
            {appointmentBy == "slot" && (
                <div className="w-full md:w-[calc(50%-10px)] space-y-3">
                    <label
                        htmlFor="slotduration"
                        className="font-f3 w-1 text-[13px] md:text-[15px] text-[#383838]"
                    >
                        Choose Slot Duration
                    </label>
                    <Select
                        value={inputValue?.slotduration}
                        disabled={
                            inputValue.isholiday
                                ? true
                                : doctor?.acceptAppointments == "byToken" &&
                                    appointmentBy != "token"
                                  ? true
                                  : doctor?.acceptAppointments == "bySlot" &&
                                      appointmentBy != "slot"
                                    ? true
                                    : false
                        }
                        id={"slotduration"}
                        placeholder={"Choose Slot Duration"}
                        options={slotDuration}
                        setSelect={handleSelect}
                        className={`${inputValue.isholiday ? "cursor-not-allowed" : "cursor-pointer"}`}
                    />
                </div>
            )}

            <div className="flex flex-col md:flex-row md:items-center gap-5 ">
                <div className="flex-1 space-y-3 relative">
                    <label
                        htmlFor="Starttime1"
                        className="font-f3 w-1 text-[13px] md:text-[15px] text-[#383838]"
                    >
                        Start Time 1
                    </label>
                    <Select
                        value={inputValue?.Starttime1}
                        disabled={
                            inputValue.isholiday
                                ? true
                                : doctor?.acceptAppointments == "byToken" &&
                                    appointmentBy != "token"
                                  ? true
                                  : doctor?.acceptAppointments == "bySlot" &&
                                      appointmentBy != "slot"
                                    ? true
                                    : false
                        }
                        required={true}
                        id={"Starttime1"}
                        placeholder={"Ex. 10:00"}
                        options={startTimes}
                        setSelect={handleSelect}
                    />
                </div>
                <div className="flex-1 space-y-3">
                    <label
                        htmlFor="Endtime1"
                        className="font-f3 w-1 text-[13px] md:text-[15px] text-[#383838]"
                    >
                        End Time 1
                    </label>
                    <div className="flex items-center gap-[14px]">
                        <Select
                            value={inputValue?.Endtime1}
                            disabled={
                                inputValue.isholiday
                                    ? true
                                    : doctor?.acceptAppointments == "byToken" &&
                                        appointmentBy != "token"
                                      ? true
                                      : doctor?.acceptAppointments ==
                                              "bySlot" &&
                                          appointmentBy != "slot"
                                        ? true
                                        : false
                            }
                            required={inputValue.Starttime1 ? true : false}
                            id={"Endtime1"}
                            placeholder={"Ex. 14:00"}
                            options={times.endTimes1}
                            setSelect={handleSelect}
                            divClasses={"flex-1"}
                        />
                        {/* <BsFillPlusCircleFill size={40} color="#108ED6" /> */}
                    </div>
                </div>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-5">
                <div className="flex-1 space-y-3">
                    <label
                        htmlFor="Starttime2"
                        className="font-f3 w-1 text-[13px] md:text-[15px] text-[#383838]"
                    >
                        Start Time 2
                    </label>
                    <Select
                        value={inputValue?.Starttime2}
                        disabled={
                            inputValue.isholiday
                                ? true
                                : doctor?.acceptAppointments == "byToken" &&
                                    appointmentBy != "token"
                                  ? true
                                  : doctor?.acceptAppointments == "bySlot" &&
                                      appointmentBy != "slot"
                                    ? true
                                    : false
                        }
                        id={"Starttime2"}
                        placeholder={"Choose Slot Duration"}
                        options={times?.startTimes2}
                        setSelect={handleSelect}
                    />
                </div>
                <div className="flex-1 space-y-3">
                    <label
                        htmlFor="Endtime2"
                        className="font-f3 w-1 text-[13px] md:text-[15px] text-[#383838]"
                    >
                        End Time 2
                    </label>
                    <div className="flex items-center gap-[14px]">
                        <Select
                            value={inputValue?.Endtime2}
                            disabled={
                                inputValue.isholiday
                                    ? true
                                    : doctor?.acceptAppointments == "byToken" &&
                                        appointmentBy != "token"
                                      ? true
                                      : doctor?.acceptAppointments ==
                                              "bySlot" &&
                                          appointmentBy != "slot"
                                        ? true
                                        : false
                            }
                            required={inputValue.Starttime2 ? true : false}
                            id={"Endtime2"}
                            placeholder={"Choose Slot Duration"}
                            options={times.endTimes2}
                            setSelect={handleSelect}
                            divClasses={"flex-1"}
                        />
                        {/* <BsFillPlusCircleFill size={40} color="#108ED6" /> */}
                    </div>
                </div>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-5">
                <div className="flex-1 space-y-3">
                    <label
                        htmlFor="Starttime3"
                        className="font-f3 w-1 text-[13px] md:text-[15px] text-[#383838]"
                    >
                        Start Time 3
                    </label>
                    <Select
                        value={inputValue?.Starttime3}
                        disabled={
                            inputValue.isholiday
                                ? true
                                : doctor?.acceptAppointments == "byToken" &&
                                    appointmentBy != "token"
                                  ? true
                                  : doctor?.acceptAppointments == "bySlot" &&
                                      appointmentBy != "slot"
                                    ? true
                                    : false
                        }
                        id={"Starttime3"}
                        placeholder={"Choose Slot Duration"}
                        options={times?.startTimes3}
                        setSelect={handleSelect}
                    />
                </div>
                <div className="flex-1 space-y-3">
                    <label
                        htmlFor="Endtime3"
                        className="font-f3 w-1 text-[13px] md:text-[15px] text-[#383838]"
                    >
                        End Time 3
                    </label>
                    <div className="flex items-center gap-[14px]">
                        <Select
                            value={inputValue?.Endtime3}
                            disabled={
                                inputValue.isholiday
                                    ? true
                                    : doctor?.acceptAppointments == "byToken" &&
                                        appointmentBy != "token"
                                      ? true
                                      : doctor?.acceptAppointments ==
                                              "bySlot" &&
                                          appointmentBy != "slot"
                                        ? true
                                        : false
                            }
                            required={inputValue.Starttime3 ? true : false}
                            id={"Endtime3"}
                            placeholder={"Choose Slot Duration"}
                            options={times?.endTimes3}
                            setSelect={handleSelect}
                            divClasses={"flex-1"}
                        />
                        {/* <div className="bg-[#EA4335] rounded-full">
                            <MdDelete
                                size={40}
                                color="#ffffff"
                                className="p-2"
                            />
                        </div> */}
                    </div>
                </div>
            </div>
            {appointmentBy == "slot" && (
                <button
                    disabled={
                        inputValue.isholiday
                            ? true
                            : doctor?.acceptAppointments == "byToken" &&
                                appointmentBy != "token"
                              ? true
                              : doctor?.acceptAppointments == "bySlot" &&
                                  appointmentBy != "slot"
                                ? true
                                : false
                    }
                    onClick={() =>
                        setInput({
                            ...inputValue,
                            isholiday: !inputValue?.isholiday,
                            Starttime1: "",
                            Endtime1: "",
                            Starttime2: "",
                            Endtime2: "",
                            Starttime3: "",
                            Endtime3: "",
                        })
                    }
                    className="font-f3 font-w1 w-fit text-[13px] text-c4 disabled:cursor-not-allowed flex items-center gap-[5px] cursor-pointer select-none"
                >
                    {!inputValue?.isholiday ? (
                        <IoMdRadioButtonOff size={20} />
                    ) : (
                        <IoMdRadioButtonOn size={20} />
                    )}
                    Mark As Holiday
                </button>
            )}
            {error && (
                <ErrorSpan
                    content={error}
                    className={"block text-center text-c24"}
                />
            )}
            <PrimaryButton
                type="submit"
                disabled={
                    loading
                        ? true
                        : inputValue.isholiday
                          ? true
                          : doctor?.acceptAppointments == "byToken" &&
                              appointmentBy != "token"
                            ? true
                            : doctor?.acceptAppointments == "bySlot" &&
                                appointmentBy != "slot"
                              ? true
                              : false
                }
                loading={loading}
                className={`bg-c1 flex-1 text-c2 w-full font-f2 text-[13px] py-3 mx-auto block whitespace-nowrap mb-5`}
                // w={"132px"}
                // h={"41px"}
                bg={"c29"}
                radius={"44px"}
                content={"Save"}
                // reff={ref}
            />
        </form>
    );
};

export default memo(EditSlots);
