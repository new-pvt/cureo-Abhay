import React, { memo, useState } from "react";
import { H7 } from "../../../Common/Components/Text/Textt";
import PrimaryButton from "../../../Common/Components/Buttons/PrimaryButton";
import { useDispatch, useSelector } from "react-redux";
import { setTabValue } from "../../../Utils/Store/tabSlice";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { FaFilter } from "react-icons/fa";
import useClickAwayToClose from "../../../Utils/Hooks/useClickAwayToClose";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import './datePicker.css'
import {
    getCompleteAppointmentsByTokenData,
    getCompleteAppointmentsData,
    getMissedAppointmentsByTokenData,
    getMissedAppointmentsData,
    getPendingAppointmentsByTokenData,
    getPendingAppointmentsData,
} from "../../Apis/apis";
import Table from "./Table";
import SortFilter from "./SortFilter";

const DatePickerStyleForMobile = styled(MobileDatePicker)({
    color: "red",
    [`& input`]: {
        color: "#383838",
        fontFamily: "Poppins",
        fontWeight: "500",
        fontSize: "13px",
        textAlign: "center",
        marginTop: "3px",
        outline: "none",
    },

    [`& input:focus div`]: {
        color: "red",
        border: "red",
        outline: "none",
    },
    [`& div`]: {
        height: "38.02px",
    },
    [`& fieldset`]: {
        borderRadius: "80px",
    },
});

const AppointmentTable = () => {
    const { user } = useSelector((state) => state.auth);
    const [appointmentBy, setAppointmentBy] = useState("Online Appointments");
    const { tabValue } = useSelector((state) => state.tab);
    const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
const [sortFilter, setSortFilter] = useState(false);
    const handleApiCalling = () => {
        if (appointmentBy === "Online Appointments") {
            switch (tabValue) {
                case 0:
                    return getPendingAppointmentsData(user, date);
                case 1:
                    return getCompleteAppointmentsData(user, date);
                case 2:
                    return getMissedAppointmentsData(user, date);
                default:
                    return null;
            }
        } else if (appointmentBy === "Token Appointments") {
            switch (tabValue) {
                case 0:
                    return getPendingAppointmentsByTokenData(user, date);
                case 1:
                    return getCompleteAppointmentsByTokenData(user, date);
                case 2:
                    return getMissedAppointmentsByTokenData(user, date);
                default:
                    return null;
            }
        }
    };
    // const { data: appointment, isLoading } = useQuery(
    //     ["appointments", appointmentBy, tabValue, date],
    //     handleApiCalling,
    //     { keepPreviousData: true }
    // );

    const appointment = useQuery({
        queryKey: ["appointments", appointmentBy, tabValue, date],
        queryFn: handleApiCalling,
        staleTime: 10000,
    });

    const dispatch = useDispatch();
    const [selectBox, setSelectBox] = useState(false);

    const tabs = ["Upcoming", "Completed", "Cancelled"];
    const ref = useClickAwayToClose(() => setSelectBox(false));

    return (
        <div className="bg-inherit rounded-[5px] pt-4 pb-1 mt-10">
           
            <div className="flex justify-between items-center ">
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
                                className="absolute flex justify-center items-center w-full h-10 border bg-c2 rounded-sm text-c16 px-5 font-f2 font-[600] text-[13px] whitespace-nowrap left-0 top-9 z-10 cursor-pointer"
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
                <div onClick={()=>setSortFilter((prevVal)=>!prevVal)} className="flex md:hidden items-center border font-f3 font-w1 gap-1 border-[#D9D9D96E] rounded-[21px] px-4 justify-center py-[5px] text-c20 cursor-pointer">
                    <FaFilter />
                    Sort/filter
                </div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePickerStyleForMobile
                    className="date-picker"
                        format="DD-MM-YYYY"
                        onChange={(e) =>
                            setDate(moment(e.$d).format("YYYY-MM-DD"))
                        }
                        sx={{
                            width: "120px",
                            // backgroundColor: "#1F51C6",
                            color: "#383838",
                            borderRadius: "50px",
                        }}
                        defaultValue={dayjs()}
                    />
                </LocalizationProvider>
            </div>
            <Table data={appointment} appointmentBy={appointmentBy} />
            {
                sortFilter && (
                    <SortFilter sortFilter={sortFilter} setSortFilter={setSortFilter} tabs={tabs} appointmentBy={appointmentBy} setAppointmentBy={setAppointmentBy}/>
                )
            }
        </div>
    );
};

export default memo(AppointmentTable);
