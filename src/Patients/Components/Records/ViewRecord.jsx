import React, { memo, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import crossIcon from "/Find Doctors/cross.png";
import useClickAwayToClose from "../../../Utils/Hooks/useClickAwayToClose";
import { H4 } from "../../../Common/Components/Text/Textt";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const ViewRecord = ({
    data,
    index,
    handleNextPrev,
    onclose,
    showIcon = false,
    title = "",
}) => {
    useEffect(() => {
        document.body.style.overflowY = "hidden";
        return () => {
            document.body.style.overflowY = "scroll";
        };
    }, []);

    const clickAwayToClose = () => (onclose ? onclose() : null);
    const ref = useClickAwayToClose(clickAwayToClose);

    return ReactDOM.createPortal(
        <div className="fixed flex justify-center items-center inset-0 z-40 bg-c21 px-4">
            <div
                ref={ref}
                className="relative bg-c2 w-full md:w-[80%] h-[90%] md:min-w-[441px] rounded-[6px] md:mx-auto p-4 md:p-[25px] "
            >
                <div className="flex justify-between items-center">
                    <H4 content={title} />
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
                <h6 className="font-f3 font-w2 text-[15px] text-right">
                    {index + 1}/{data?.length}
                </h6>
                <div className="relative flex h-full p-4">
                    <button
                        onClick={() => handleNextPrev(index - 1)}
                        className="absolute z-20 bg-[#B8B8BA99] h-fit top-0 bottom-0 -left-8 my-auto p-3 md:p-5 rounded-full"
                    >
                        <FaAngleLeft />
                    </button>
                    {data[index]?.imgtype == "application/pdf" ? (
                        <iframe
                            src={`${data[index]?.imgurl}?#zoom=-50&scrollbar=0&toolbar=1&navpanes=0`}
                            frameBorder="0"
                            className="w-full h-full"
                        />
                    ) : (
                        <img
                            src={data[index]?.imgurl}
                            alt="image"
                            className="w-auto h-auto mx-auto"
                        />
                    )}

                    <button
                        onClick={() => handleNextPrev(index + 1)}
                        className="absolute z-20 bg-[#B8B8BA99] h-fit top-0 bottom-0 -right-8 my-auto p-3 md:p-5 rounded-full"
                    >
                        <FaAngleRight />
                    </button>
                </div>
            </div>
        </div>,
        document.querySelector(".myportalModelDiv")
    );
};

export default memo(ViewRecord);
