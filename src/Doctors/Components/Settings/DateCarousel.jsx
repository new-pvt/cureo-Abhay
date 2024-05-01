import React, { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import moment from "moment";
import BoxButton from "../../../Common/Components/Buttons/BoxButton";

const DateCarousel = ({ date, setDate, refetch, handleDateChange }) => {
    const [dates, setDates] = useState([]);
    const [translate, setTranslate] = useState(0);

    const handleNextPrev = (newIndex) => {
        if (newIndex < 0) {
            newIndex = 0;
        } else if (newIndex >= dates.length) {
            newIndex = dates.length - 1;
        }

        setTranslate(newIndex);
        // dispatch({ type: ACTION_TYPES.SET_TRANSLATE, payload: newIndex });
    };

    

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
        setDates(datesArray);
    };

    return (
        <div className="flex w-full gap-2 items-center">
            <button
                onClick={() => handleNextPrev(translate - 1)}
                className="block"
            >
                <FaAngleLeft color="#108ED6" />
            </button>
            <div className="flex flex-1 snap-x snap-mandatory overflow-x-auto no-scrollbar gap-2.5">
                {dates?.map((day, i) => (
                    <div
                        key={i}
                        className="flex flex-col snap-always snap-center items-center gap-[5px]"
                    >
                        <BoxButton
                            content={day}
                            onclick={() => handleDateChange(day)}
                            style={{
                                transform: `translate(-${translate * 100}%)`,
                            }}
                            // classname={
                            //     "border border-c17 whitespace-nowrap px-5 font-f3 font-w2 text-c16"
                            // }
                            classname={`${date == moment(day, "DD MMM, ddd").format("YYYY-MM-DD") ? "bg-c3 text-c2" : "border border-c17 bg-c2 "} w-[87.84px] md:w-[110px] transition-transform`}
                        />
                        {/* <ErrorSpan content={"Slot Booked"} /> */}
                    </div>
                ))}
            </div>
            <button
                onClick={() => handleNextPrev(translate + 1)}
                className="block"
            >
                <FaAngleRight color="#108ED6" />
            </button>
        </div>
    );
};

export default DateCarousel;
