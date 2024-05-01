import React from "react";
import { H4, P2 } from "../Text/Textt";
import PrimaryButton from "../Buttons/PrimaryButton";

const Illistration = ({ src, errorTitle, subText, button, imgClassName = "" }) => {
    return (
        <div className="flex flex-col items-center p-6 gap-2">
            <img src={src} alt="img" className={imgClassName} />
            <H4 content={errorTitle} />
           {subText && <P2 content={subText} className="mb-2 text-center"/>}
            <PrimaryButton
             onclick={button?.onclick}
             className={"bg-c1 text-c2 font-f2 w-[141px] md:w-[145px]"}
             h={"40px"}
             bg={"c1"}
             radius={"44px"}
            content={button?.content} />
        </div>
    );
};

export default Illistration;
