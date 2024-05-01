import { memo } from "react";

export const Input1 = memo(
    ({
        type = "",
        placeholder = "",
        name = "",
        classname = "",
        autofocus,
        value,
        onchange,
        required,
        id,
        readOnly,
        disabled,
    }) => {
        return (
            <input
                autoComplete="off"
                readOnly={readOnly}
                disabled={disabled}
                autoFocus={autofocus}
                value={value}
                onChange={onchange}
                type={type}
                placeholder={placeholder}
                name={name}
                required={required}
                id={id}
                className={`outline-none border read-only:bg-[#ECF0F9] disabled:bg-[#5D5E61BD] disabled:text-white read-only:cursor-not-allowed border-c18 h-[40px] px-4 rounded-[5px] ${classname} placeholder:text-c22 placeholder:font-f3 font-[500]`}
            />
        );
    }
);
export const Input2 = memo(
    ({
        type = "",
        placeholder = "",
        name = "",
        divClasses = "",
        icon,
        inputClasses = "",
        iconClasses = "",
        value,
        children,
        onchange,
        autoFocus,
        required,
        iconClick,
    }) => {
        return (
            <div
                className={`relative  h-[41px] border border-c17 text-[13px] ${divClasses} `}
            >
                <input
                    autoComplete="off"
                    required={required}
                    type={type}
                    autoFocus={autoFocus}
                    placeholder={placeholder}
                    name={name}
                    onChange={onchange}
                    value={value}
                    className={`outline-none border font-f2 font-w1 leading-[18.04px]  text-c19 border-c18 w-full h-full ${icon && "pr-[24%] md:pr-[14%]"} px-[15px] placeholder:text-c22 placeholder:font-f3 font-[500] border-none ${inputClasses}`}
                />
                {icon && (
                    <img
                        onClick={iconClick}
                        src={icon}
                        alt="icon"
                        className={`absolute right-0 top-0 bottom-0 my-auto  ${icon && "mr-[15px]"} ${iconClasses}`}
                    />
                )}
                {children}
            </div>
        );
    }
);

export const TextArea = memo(
    ({
        type = "",
        placeholder = "",
        name = "",
        value,
        onchange,
        classname = "",
    }) => {
        return (
            <textarea
                autoComplete="off"
                type={type}
                placeholder={placeholder}
                name={name}
                rows={4}
                cols={6}
                value={value}
                onChange={onchange}
                className={`outline-none border border-c18 p-[14px] rounded-[5px] placeholder:text-c22 placeholder:font-f3 ${classname}`}
            />
        );
    }
);
