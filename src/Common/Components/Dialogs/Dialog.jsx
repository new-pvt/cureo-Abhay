import React, { memo, useEffect } from "react";
import ReactDOM from "react-dom";
import crossIcon from "/Find Doctors/cross.png";
import useClickAwayToClose from "../../../Utils/Hooks/useClickAwayToClose";
import { H4 } from "../Text/Textt";

const Dialog = ({ children, onclose, showIcon = false, title="" }) => {
    useEffect(() => {
        document.body.style.overflowY = "hidden";
        return () => {
            document.body.style.overflowY = "scroll";
        };
    }, []);

    const clickAwayToClose = () => onclose ? onclose() : null;

    const ref = useClickAwayToClose(clickAwayToClose);

    return ReactDOM.createPortal(
        <div className="fixed flex justify-center items-center inset-0 z-40 bg-c21 px-4">
            <div
                ref={ref}
                className="relative bg-c2 w-full md:w-fit md:min-w-[441px] rounded-[6px] md:mx-auto p-4 md:p-[25px] "
            >
                <div className="flex justify-between items-center">
                    <H4 content={title}/>
                {showIcon && (
                    <img
                        src={crossIcon}
                        onClick={onclose}
                        alt="cross icon"
                        className="w-4 h-4"
                        // className="absolute top-0 right-0 mt-[25px] mr-[25px] w-4 h-4"
                    />
                )}
                </div>
               
                {children}
            </div>
        </div>,
        document.querySelector(".myportalModelDiv")
    );
};

export default memo(Dialog);
