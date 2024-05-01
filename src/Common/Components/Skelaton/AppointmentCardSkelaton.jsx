import React from "react";

const AppointmentCardSkelaton = () => {
    return (
        <div className=" rounded-md w-full border-b border-dashed p-5 border-c17">
            <div className="animate-pulse flex flex-col md:flex-row gap-2.5 justify-between items-start md:items-center">
                <div className="flex gap-2.5">
                    <div className="rounded-full bg-[#B8B8BA99] w-[73px] h-[73px]"></div>
                    <div className="flex-1 space-y-4">
                        <div className="w-[110px] h-5 bg-[#B8B8BA99] rounded-[5px]"></div>
                        <div className="w-[120px] h-3 bg-[#B8B8BA99] rounded"></div>
                        <div className="w-[180px] h-3 bg-[#B8B8BA99] rounded"></div>
                    </div>
                </div>
                <div className="w-full md:w-[145px] h-10 bg-[#B8B8BA99] rounded-[37px]"></div>
            </div>
        </div>
    );
};

export default AppointmentCardSkelaton;
