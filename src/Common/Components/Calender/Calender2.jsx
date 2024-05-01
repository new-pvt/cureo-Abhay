import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import useClickAwayToClose from "../../../Utils/Hooks/useClickAwayToClose";
import moment from "moment";

const Calender2 = ({
    callback,
    onclose,
    name,
    initialDate = moment().format("DD-MM-YYYY"),
    wrapperDivClassess,
}) => {
    const clickAwayToClose = () => (onclose ? onclose() : null);
    const ref = useClickAwayToClose(clickAwayToClose);
    const handleSelectedDate = (e, date) => {
        setDate(moment().year(currentYear).month(currentMonth).date(date));
        callback(e,
            moment()
                .year(currentYear)
                .month(currentMonth)
                .date(date)
                .format("DD-MM-YYYY")
        );
    };
    const [date, setDate] = useState(
        initialDate == ""
            ? moment()
            : initialDate == "Today"
              ? moment()
              : moment(initialDate, "DD-MM-YYYY")
    );
    const currentMonth = date.month();
    const currentYear = date.year();
    const currentDate = date.date();
    const week = ["S", "M", "T", "W", "T", "F", "S"];
    const [Months, setMonths] = useState([]);
    const [Years, setYears] = useState([]);
    const [Dates, setDates] = useState([]);
    const [showMonths, setShowMonths] = useState(false);
    const [showYears, setShowYears] = useState(false);
    const yearsRef = useRef(null);
    const isCurrentDate = (item) => {
        const checkIsCurrentDate =
            date.clone().date(item).format("DD-MM-YYYY") ===
            moment().format("DD-MM-YYYY");
        return checkIsCurrentDate;
    };

    const selectedDate = (item) => {
        const checkIsSelectedDate = currentDate == item;

        return checkIsSelectedDate;
    };

    const isSunday = (item) => {
        return date.clone().date(item).day() === 0;
    };
    const isSatureday = (item) => {
        return date.clone().date(item).day() == 6;
    };

    const genrateYears = () => {
        const years = [];
        for (let index = 1900; index < date.year() + 100; index++) {
            years.push(index);
        }

        return setYears(years);
    };
    const genrateMonths = () => {
        const months = [];
        for (let index = 0; index < 12; index++) {
            months.push(index);
        }
        return setMonths(months);
    };

    const genrateDates = () => {
        const dates = [];
        for (let index = 1; index <= date.daysInMonth(); index++) {
            dates.push(index);
        }

        return setDates(dates);
    };

    useEffect(() => {
        // Scroll to current year element
        yearsRef?.current?.scrollIntoView({
            behavior: "auto",
            block: "center",
        });
    }, [showYears]);

    useEffect(() => {
        genrateYears();
        genrateMonths();
        genrateDates();
    }, [date]);

    return (
        <div
            ref={ref}
            className={`bg-c2 rounded-[6px] md:mx-auto p-4 ${wrapperDivClassess}`}
        >
            <div className="flex relative justify-between items-center text-lg font-bold text-c3 mb-4">
                <button
                    onClick={() => {
                        setShowMonths((prevVal) => !prevVal);
                        setShowYears(false);
                    }}
                >
                    {date.format("MMMM")}
                </button>
                <button
                    onClick={() => {
                        setShowYears((prevVal) => !prevVal);
                        setShowMonths(false);
                    }}
                >
                    {date.format("YYYY")}
                </button>
            </div>

            {showYears ? (
                <div className="grid grid-cols-3 max-h-[256px] overflow-auto justify-center text-center">
                    {Years.map((year, i) => (
                        <div
                            onClick={() => {
                                setDate(
                                    moment()
                                        .year(year)
                                        .month(currentMonth)
                                        .date(currentDate)
                                );
                                setShowYears(false);
                            }}
                            key={year}
                            ref={currentYear == year ? yearsRef : null}
                            className={`cursor-pointer p-3 font-f2 font-w2 text-[15px] rounded-full`}
                            // onClick={() => handleDateClick(date)}
                        >
                            <span
                                className={`text-center block  py-2 rounded-full ${currentYear == year ? "bg-c3 text-c2" : "text-[#8A8989]"}`}
                            >
                                {year}
                            </span>
                        </div>
                    ))}
                </div>
            ) : showMonths ? (
                <div className="grid grid-cols-3 h-[256px] min-h-[256px] max-h-[256px] overflow-auto justify-center text-center">
                    {Months.map((month, i) => (
                        <div
                            onClick={() => {
                                setDate(
                                    moment()
                                        .year(currentYear)
                                        .month(month)
                                        .date(currentDate)
                                );
                                setShowMonths(false);
                            }}
                            key={i}
                            className={`cursor-pointer p-2 font-f2 font-w2 text-[13px] rounded-full `}
                        >
                            <span
                                className={`text-center block font-f2 font-w1 text-[15px] rounded-full py-2 ${currentMonth == month ? "bg-c3 text-c2" : "text-[#8A8989]"}`}
                            >
                                {moment().month(month).format("MMM")}
                            </span>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="relative grid grid-cols-7 gap-1 w-full justify-center items-center text-center overflow-hidden">
                    {week.map((day, i) => (
                        <div
                            key={i}
                            className={` w-full text-center font-f2 font-w1 ${day === "S" ? "text-[#FF271B]" : "text-[#8A8989]"} aspect-square flex justify-center items-center`}
                        >
                            {day}
                        </div>
                    ))}
                    {[...Array(date.clone().startOf("month").day()).keys()].map(
                        (_, index) => (
                            <div key={index} className=""></div>
                        )
                    )}
                    {Dates.map((item, index) => (
                        <div
                            onClick={(e) => handleSelectedDate(e, item)}
                            key={item}
                            className={`cursor-pointer w-full aspect-square flex justify-center items-center rounded-[50%] box-border font-f2 font-w2 text-[13px] ${isCurrentDate(item) && selectedDate(item) ? "bg-c3 text-c2" : isCurrentDate(item) ? "border text-c3" : selectedDate(item) ? "bg-c3 text-c2" : isSunday(item) ? "text-c24" : isSatureday(item) ? "text-c24" : "text-[#8A8989]"}  `}
                        >
                            <span className={`text-center block `}>{item}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Calender2;
