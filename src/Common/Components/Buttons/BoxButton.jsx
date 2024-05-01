import React, { memo } from "react";

const BoxButton = ({
    content,
    classname,
    onclick,
    style,
    id = "",
    value,
    name,
    disabled,
}) => {
    return (
        <button
            disabled={disabled}
            id={id}
            name={name}
            value={value}
            onClick={onclick}
            style={style}
            className={` text-c16 h-[37px] rounded-[3px] p-[14] font-f3 font-w1 text-[13px] disabled:bg-[#5D5E61BD] disabled:cursor-not-allowed ${classname}`}
        >
            {content}
        </button>
    );
};

export default memo(BoxButton);
