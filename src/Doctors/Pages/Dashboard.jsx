import React, { useCallback, useState } from "react";
import { Input2 } from "../../Common/Components/Inputs/Inputs";
import { FaBell } from "react-icons/fa";
import AppointmentTable from "../Components/Tables/AppointmentTable";
import DatePicker from "../../Common/Components/Inputs/DatePicker";
import moment from "moment";
import Calender2 from "../../Common/Components/Calender/Calender2";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const Dashboard = () => {
    const cardData = [
        {
            cardName: "Appointments",
            value: 0,
            progress: 0,
        },
        {
            cardName: "Total Patients",
            value: 0,
            progress: 0,
        },
        {
            cardName: "Next Appointment",
            value: 0,
            progress: 0,
        },
    ];
    const [date, setDate] = useState(moment().format("DD-MM-YYYY"));
    const today = moment().format("DD-MM-YYYY");

    const handleDateChange = useCallback(
        (e, date) => {
            console.log("This is date",e, date);
            setDate(date);
        },
        [date]
    );
    return (
        <div className="w-full flex flex-col md:flex-row justify-between gap-4 h-full">
            <div className="w-full space-y-[15px] h-full">
                <div className="w-full flex flex-col md:flex-row justify-between items-center ">
                    <Input2
                        type="text"
                        placeholder="Search Appointment"
                        name="speciality"
                        icon={"/Find Doctors/Search.svg"}
                        divClasses="w-[100%] md:w-[356px] rounded-[106px] "
                        inputClasses="rounded-[106px] text-[13px]"
                    />
                    <div className="relative w-full flex md:hidden items-center ">
                        <DatePicker
                            value={date == today ? "Today" : date}
                            callback={handleDateChange}
                            divClasses="w-fit"
                            id="dateInput"
                            inputClasses={
                                "w-[120px] bg-inherit outline-none border-none font-f2 font-w2 text-[15px] text-c15 focus:outline-none focus:border-none cursor-pointer md:text-right rounded-[45px]"
                            }
                        />
                        <IoIosArrowDown
                            size={20}
                            color="#108ED6"
                            className="-m-2.5 hidden md:block"
                        />
                    </div>
                    <div className="hidden md:block p-[11px] bg-c2 rounded-full">
                        <div className="relative">
                            <img
                                src="/Doctor/notification.png"
                                alt="dot"
                                className="w-[19px] h-[19px]"
                            />
                            <i className="w-[5px] h-[5px] bg-red-600 block rounded-full absolute top-0 right-[4px]"></i>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-5">
                    {cardData.map((card, i) => (
                        <div
                            key={i}
                            className="bg-c2 flex-1 rounded-lg p-4 pr-[13px]"
                        >
                            <p className="font-f2 font-w1 text-[#667085] text-xs  leading-4">
                                {card?.cardName}
                            </p>
                            <h4 className="font-f2 font-w3 text-[22px] leading-[26px] mt-[6px]">
                                {card?.value}
                            </h4>
                            <span className="font-f3 font-w1 text-xs text-[#667085] block text-right">
                                {card?.progress} to go
                            </span>
                            <progress
                                className="doctor-dashboard rounded-[29px] w-full bg-[#EDEEFD] text-c3"
                                value={card?.progress}
                                max="100"
                            ></progress>
                        </div>
                    ))}
                </div>
                <AppointmentTable date={moment(date, "DD-MM-YYYY").format("YYYY-MM-DD")} />
            </div>

            <div className="w-full md:w-[28.09%] shrink-0 flex flex-col gap-[15px]">
                <div className="hidden md:block flex-1 bg-c2 rounded-xl">
                    <Calender2
                        wrapperDivClassess="-[274px] "
                        callback={handleDateChange}
                    />
                </div>
                <div className="flex-1 bg-c2 rounded-xl aspect-square p-4 ">
                    <h4 className="font-f2 font-w2 text-[1rem]">
                        Appointment Stats
                    </h4>
                    <div className="flex justify-center items-center h-full">
                        <div className="border-[30px] border-[#F2F4F7] w-[187.33px] rounded-full aspect-square "></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
