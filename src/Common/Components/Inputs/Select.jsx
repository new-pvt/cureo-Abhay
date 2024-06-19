import { memo, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import useClickAwayToClose from "../../../Utils/Hooks/useClickAwayToClose";

const Select = ({
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
}) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const ref = useClickAwayToClose(() => setShowDropdown(false));

    return (
        <div
            ref={ref}
            className={`relative h-[41px] border border-c17 text-[13px] ${divClasses} `}
        >
            <input
                autoComplete="off"
                inputMode="none"
                readOnly={readOnly}
                onFocus={() => (readOnly ? null : setShowDropdown(true))}
                disabled={disabled}
                required={required}
                id={id}
                autoFocus={autoFocus}
                placeholder={placeholder}
                name={name}
                onChange={() => null}
                value={value}
                className={`outline-none read-only:bg-[#ECF0F9] read-only:cursor-not-allowed disabled:bg-[#D9D9D961] disabled:cursor-not-allowed disabled:text-[#706D6D] border font-f2 leading-[18.04px]  text-c19 border-c18 w-full h-full pr-[24%] md:pr-[14%] px-[15px] placeholder:text-c22 placeholder:font-f3 font-[500] border-none ${inputClasses}`}
            />
            <IoIosArrowDown
                size={20}
                className={`absolute right-0 top-0 bottom-0 my-auto mr-[15px] ${iconClasses}`}
            />
            {showDropdown && (
                <div className="absolute z-10 w-full cursor-default max-h-[200px] overflow-y-auto myScrollbar bg-c2 shadow-lg shadow-black-500/50">
                    {options?.map((item, i) => (
                        <h6
                            id={id}
                            name="abhay"
                            key={i}
                            onClick={(e) => {
                                setSelect(e, item);
                                setShowDropdown(false);
                            }}
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

export default memo(Select);
