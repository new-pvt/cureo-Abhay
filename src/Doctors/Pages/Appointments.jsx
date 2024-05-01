import React, { useState } from "react";
import AppointmentTable from "../Components/Tables/AppointmentTable";
import { Input2 } from "../../Common/Components/Inputs/Inputs";
import DatePicker from "../../Common/Components/Inputs/DatePicker";
import moment from "moment";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const Appointments = () => {
    const [date, setDate] = useState(moment().format("DD-MM-YYYY"));

    const today = moment().format("DD-MM-YYYY");
    const handleDateChange = (e, value) => {
        setDate(value);
    };
    return (
        <div className="space-y-5 h-full">
            <div className="w-full flex flex-col md:flex-row justify-between md:items-center ">
                <Input2
                    type="text"
                    placeholder="Search Appointment"
                    name="speciality"
                    icon={"/Find Doctors/Search.svg"}
                    divClasses="w-[100%] md:w-[356px] rounded-[106px]"
                    inputClasses="rounded-[106px] text-[13px]"
                />

                <div className="flex items-center w-fit gap-4 ">
                    <div className="relative w-full flex items-center ">
                        <DatePicker
                            value={date == today ? "Today" : date}
                            callback={handleDateChange}
                            divClasses="w-fit"
                            inputClasses={
                                "w-[120px] block bg-inherit outline-none border-none font-f2 font-w2 text-[15px] text-c15 focus:outline-none focus:border-none cursor-pointer md:text-right rounded-[45px]"
                            }
                        />
                        <IoIosArrowDown
                            size={20}
                            color="#108ED6"
                            className="-m-2.5 hidden md:block"
                        />
                    </div>

                    <div className="hidden md:block shrink-0 p-[11px] bg-c2 rounded-full">
                        <div className="relative">
                            <img
                                src="/Doctor/notification.png"
                                alt="dot"
                                className="w-[19px] h-[19px]"
                            />
                            <i className="w-[5px] h-[5px] bg-red-600 block rounded-full absolute top-0 right-[2px]"></i>
                        </div>
                    </div>
                </div>
            </div>

            <AppointmentTable
                date={moment(date, "DD-MM-YYYY").format("YYYY-MM-DD")}
            />
        </div>
    );
};

export default Appointments;
