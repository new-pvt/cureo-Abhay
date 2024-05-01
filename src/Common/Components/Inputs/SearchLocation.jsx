import { memo, useRef, useState } from "react";
import locationIcon from "/Find Doctors/Location-1.svg";
import useClickAwayToClose from "../../../Utils/Hooks/useClickAwayToClose";

const SearchLocation = ({
    placeholder = "",
    name = "",
    divClasses = "",
    inputClasses = "",
    iconClasses = "",
    value,
    autoFocus,
    required,
    id,
    options,
    setSelect,
    disabled,
    readOnly,
    onchange,
    onSelect,
    icon=locationIcon,
}) => {
    const [inputValue, setInputValue] = useState(value || "");
    const [showDropdown, setShowDropdown] = useState(false);
    const ref = useClickAwayToClose(() => setShowDropdown(false));
    const handleInputChange = (e) => {
        onchange(e.target.value);
        // const inputValue = e.target.value;
        // setInputValue(inputValue);
        // Show dropdown only if input value is not empty
    };

    const handleSuggestionClick = (item) => {
        onSelect(item);
        setShowDropdown(false);
        // setInputValue(item);
        // setSelect(null, item); // Pass null instead of event as it's not needed here
    };

    const handleEnter = (e) => {
        if (e.key === "Enter") {
            onSelect(e.target.value);
            setShowDropdown(false);
            return;
        } else {
            return;
        }
    };

    return (
        <div
            ref={ref}
            className={`relative h-[41px] border border-c17 text-[13px] ${divClasses} `}
        >
            <input
                autoComplete="off"
                readOnly={readOnly}
                onFocus={() => (readOnly ? null : setShowDropdown(true))}
                disabled={disabled}
                required={required}
                id={id}
                autoFocus={autoFocus}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={handleInputChange}
                onKeyUp={handleEnter}
                className={`outline-none read-only:bg-[#ECF0F9] read-only:cursor-not-allowed disabled:bg-[#D9D9D961] disabled:cursor-not-allowed disabled:text-[#706D6D] border font-f2 leading-[18.04px]  text-c19 border-c18 w-full h-full pr-[24%] md:pr-[14%] px-[15px] placeholder:text-c22 placeholder:font-f3 font-[500] border-none ${inputClasses}`}
            />
            <img
                src={icon}
                className={`absolute right-0 top-0 bottom-0 my-auto mr-[15px] ${iconClasses}`}
            />
            {showDropdown && (
                <div className="absolute z-10 w-full cursor-default max-h-[200px] overflow-y-auto myScrollbar bg-c2 shadow-lg shadow-black-500/50">
                    {options?.map((item, i) => (
                        <h6
                            id={id}
                            name="abhay"
                            key={i}
                            onClick={() => handleSuggestionClick(item)}
                            className="hover:bg-c3 hover:text-c2 p-2"
                        >
                            {item}
                        </h6>
                    ))}
                </div>
            )}
        </div>
    );
};

export default memo(SearchLocation);
