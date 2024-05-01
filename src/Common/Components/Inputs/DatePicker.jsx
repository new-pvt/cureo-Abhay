import React, { useCallback, useState } from "react";
import Calender from "../Calender/Calender";
import useClickAwayToClose from "../../../Utils/Hooks/useClickAwayToClose";

const DatePicker = ({
    className,
    value,
    placeholder,
    name,
    callback,
    divClasses,
    inputClasses,
    id,
    icon,
    required,
    src = "/EditProfile/Calender.svg",
}) => {
    const [date, setDate] = useState("");
    const [showCalender, setShowCalender] = useState(false);
    // const ref = useClickAwayToClose(() => setShowCalender(false));
    const handleSelectedDate = useCallback(
        (e, val) => {
            callback(e, val);
            setShowCalender(false);
        },
        [value]
    );
    return (
        <div className={`relative ${divClasses}`}>
            <input
                onChange={() => null}
                onFocus={() => setShowCalender(true)}
                // name={name}
                value={value}
                type="text"
                id={id}
                placeholder={placeholder}
                className={inputClasses}
                required={required}
            />
            {icon && (
                <img
                    src={src}
                    className="absolute right-0 top-0 bottom-0 my-auto mr-4"
                />
            )}
            {showCalender && (
                <Calender
                    callback={handleSelectedDate}
                    onclose={() => setShowCalender(false)}
                    name={name}
                    initialDate={value}
                />
            )}
        </div>
    );
};

export default DatePicker;

// import React, { useState } from "react";
// import moment from "moment";
// import useClickAwayToClose from '../../../Utils/Hooks/useClickAwayToClose'

// const DatePicker = () => {
//     const [showCalendar, setShowCalendar] = useState(false);
//     const [selectedDate, setSelectedDate] = useState(null);
//     const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
//     const calendar = [];
//     const [currentDate, setCurrentDate] = useState(moment());
//     const currentMonth = currentDate.month();
//     const currentYear = currentDate.year();
//     const daysInMonth = currentDate.daysInMonth();
//     const firstDayOfMonth = currentDate.startOf("month").day();
//     const ref = useClickAwayToClose(()=>setShowCalendar(false));
//     // Function to toggle calendar visibility
//     const toggleCalendar = () => {
//         setShowCalendar(!showCalendar);
//     };

//     // Function to handle date selection
//     const handleDateClick = (date) => {
//         setSelectedDate(date);
//         setShowCalendar(false);
//     };

//     // Generate calendar
//     const generateCalendar = () => {
//         for (let i = 1; i <= daysInMonth; i++) {
//             const date = moment([currentYear, currentMonth, i]);
//             const dayOfWeek = date.day();
//             const isSunday = dayOfWeek === 0;

//             calendar.push(
//                 <div
//                     key={i}
//                     className={`cursor-pointer p-2 ${isSunday ? "text-[#FF271B]" : ""}  font-f2 font-w2 text-[13px] rounded-full`}
//                     onClick={() => handleDateClick(date)}
//                 >
//                     <span className={`text-center block rounded-full `}>
//                         {i}
//                     </span>
//                 </div>
//             );
//         }

//         return calendar;
//     };

//     return (
//         <div ref={ref} className="relative w-full h-full">
//             <input
//                 type="text"
//                 className="w-full border p-2 rounded-[5px] "
//                 placeholder="Birth Date"
//                 onClick={toggleCalendar}
//                 value={
//                     selectedDate ? selectedDate.format("ddd MMM DD YYYY") : ""
//                 }
//             />
//             {showCalendar && (
//                 <div className="absolute bg-white border p-4 shadow-lg top-12 left-0 z-10 w-full h-fit">
//                     <div className="flex justify-between mb-2">
//                         <div className="text-lg font-bold text-c3">
//                             {currentDate.format("MMMM")}
//                         </div>
//                         <div className="text-lg font-bold text-c3">
//                             {currentDate.format("YYYY")}
//                         </div>
//                     </div>
//                     <div className="grid grid-cols-7 justify-center items-center text-center gap-1 w-full">
//                         {days.map((item) => (
//                             <div
//                                 key={item}
//                                 className={`text-center font-f2 font-w1 ${item === "Sun" ? "text-[#FF271B]" : "text-[#8A8989]"}  `}
//                             >
//                                 {item}
//                             </div>
//                         ))}

//                         {[...Array(firstDayOfMonth).keys()].map((_, index) => (
//                             <div key={index}></div>
//                         ))}
//                         {generateCalendar()}
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default DatePicker;
