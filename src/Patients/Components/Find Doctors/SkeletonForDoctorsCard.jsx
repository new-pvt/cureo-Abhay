import React, { memo } from "react";

const SkeletonForDoctorsCard = ({className}) => {
    return (
        <div
            className={`py-5 flex flex-col gap-3 md:gap-0 md:flex-row justify-between md:items-center rounded-[5px] ${className}`}
        >
            <div className="flex gap-[14px]">
                <div
                    className={"w-[88px] h-[88px] bg-[#B8B8BA99] rounded-full"}
                ></div>
                <div className="flex flex-col gap-[2px]">
                    <div className="flex flex-col flex-wrap gap-[5px] ">
                        <div className="w-[110px] h-5 bg-[#B8B8BA99] rounded-[5px]"></div>
                        <div className="w-[110px] h-3 bg-[#B8B8BA99] rounded"></div>
                        <div className="w-[150px] h-3 bg-[#B8B8BA99] rounded"></div>
                        <div className="w-[180px] h-3 bg-[#B8B8BA99] rounded"></div>
                        <div className="w-[70px] h-3 bg-[#B8B8BA99] rounded"></div>
                    </div>
                </div>
            </div>
            <div className="w-full md:w-[145px] h-[40px] bg-[#B8B8BA99] rounded-full"></div>

        </div>
    );
};

export default memo(SkeletonForDoctorsCard);
