import React, { memo, useState } from "react";
import { H7 } from "../../../Common/Components/Text/Textt";
import PrimaryButton from "../../../Common/Components/Buttons/PrimaryButton";
import { useDispatch, useSelector } from "react-redux";
import { setTabValue } from "../../../Utils/Store/tabSlice";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import useClickAwayToClose from "../../../Utils/Hooks/useClickAwayToClose";
import { useQuery } from "@tanstack/react-query";
import { FaFilter } from "react-icons/fa";
import moment from "moment";
import {
    getCompleteAppointmentsByTokenData,
    getCompleteAppointmentsData,
    getMissedAppointmentsByTokenData,
    getMissedAppointmentsData,
    getPendingAppointmentsByTokenData,
    getPendingAppointmentsData,
} from "../../Apis/apis";
import Table from "./Table";
import SortFilter from "../../../Hospitals/Components/Appointments/SortFilter";

const AppointmentTable = ({ date }) => {
    const { doctor } = useSelector((state) => state.doctorsData);
    const [appointmentBy, setAppointmentBy] = useState(
        doctor?.acceptAppointments == "bySlot"
            ? "Online Appointments"
            : "Token Appointments"
    );
    const { tabValue } = useSelector((state) => state.tab);
    const [sortFilter, setSortFilter] = useState(false);

    const handleApiCalling = () => {
        if (appointmentBy == "Online Appointments" && tabValue == 0) {
            return getPendingAppointmentsData(doctor, date);
        }
        if (appointmentBy == "Online Appointments" && tabValue == 1) {
            return getCompleteAppointmentsData(doctor, date);
        }
        if (appointmentBy == "Online Appointments" && tabValue == 2) {
            return getMissedAppointmentsData(doctor, date);
        }
        if (appointmentBy == "Token Appointments" && tabValue == 0) {
            return getPendingAppointmentsByTokenData(doctor, date);
        }
        if (appointmentBy == "Token Appointments" && tabValue == 1) {
            return getCompleteAppointmentsByTokenData(doctor, date);
        }
        if (appointmentBy == "Token Appointments" && tabValue == 2) {
            return getMissedAppointmentsByTokenData(doctor, date);
        }
    };

    const appointment = useQuery({
        queryKey: ["appointments", appointmentBy, tabValue, date, doctor?._id],
        queryFn: handleApiCalling,
        staleTime: 10000,
    });

    const dispatch = useDispatch();
    const [selectBox, setSelectBox] = useState(false);

    const tabs = ["Upcoming", "Completed", "Cancelled"];
    const ref = useClickAwayToClose(() => setSelectBox(false));

    return (
        <div className="bg-c2 rounded-[5px] pt-4 pb-1 ">
            <div className="flex justify-between items-center px-4">
                <H7 content="Appointments" />
                <div className="hidden md:flex items-center gap-2.5">
                    <div
                        ref={ref}
                        onClick={() => setSelectBox(!selectBox)}
                        className="relative bg-c1 text-c2 cursor-pointer font-f2 font-[500] text-[13px] px-5 rounded-[80px] h-[32px] flex items-center"
                    >
                        {appointmentBy}{" "}
                        {selectBox ? (
                            <IoIosArrowUp className="ml-1" />
                        ) : (
                            <IoIosArrowDown className="ml-1" />
                        )}
                        {selectBox && (
                            <div
                                onClick={(e) =>
                                    setAppointmentBy(e.target.innerText)
                                }
                                className="absolute flex justify-center items-center w-full h-10 border bg-c2 rounded-sm text-c16 px-5 font-f2 font-[600] text-[13px] whitespace-nowrap left-0 top-9 z-20 cursor-pointer"
                            >
                                {appointmentBy == "Token Appointments"
                                    ? "Online Appointments"
                                    : "Token Appointments"}
                            </div>
                        )}
                    </div>
                    <span>|</span>
                    {tabs.map((tab, i) => (
                        <PrimaryButton
                            key={i}
                            onclick={() => dispatch(setTabValue(i))}
                            className={`${tabValue == i ? "bg-c1 text-c2" : "bg-c2 text-c20 border border-c26"} font-f2 font-[600] w-[107px] h-[32px] rounded-[80px] text-[13px]`}
                            bg={"c1"}
                            content={tab}
                        />
                    ))}
                </div>
                <div
                    onClick={() => setSortFilter((prevVal) => !prevVal)}
                    className="flex md:hidden items-center border font-f3 font-w1 text-[13px] gap-1 border-[#D9D9D96E] rounded-[21px] px-3 justify-center py-[5px] text-c20 cursor-pointer"
                >
                    <FaFilter />
                    Sort/filter
                </div>
            </div>
            <Table data={appointment} appointmentBy={appointmentBy} />
            {sortFilter && (
                <SortFilter
                    sortFilter={sortFilter}
                    setSortFilter={setSortFilter}
                    tabs={tabs}
                    appointmentBy={appointmentBy}
                    setAppointmentBy={setAppointmentBy}
                />
            )}
        </div>
    );
};

export default memo(AppointmentTable);
