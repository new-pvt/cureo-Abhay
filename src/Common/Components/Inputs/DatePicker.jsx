import React, { useCallback, useState } from "react";
import Calender from "../Calender/Calender";

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
    const [showCalender, setShowCalender] = useState(false);
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
