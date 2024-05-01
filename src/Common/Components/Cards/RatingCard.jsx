import React, { memo } from "react";
import Avatar from "../Avatar/Avatar";
import { FormSpan, P3, P6, Span2 } from "../Text/Textt";

const RatingCard = ({ratingData}) => {
    
    return (
        <div className="border border-c17 p-5 rounded-[5px] relative">
            <div className="flex gap-[15px]">
                <Avatar
                    src={ratingData?.userid?.imgurl}
                    className={"w-[56px] h-[56px] md:w-[66px] md:h-[66px]"}
                />
                <div>
                    <Span2 children={ratingData?.userid?.name} className={"text-c4"} />
                    <P3 content={ratingData?.userid?.title} />
                    <P6
                        content={ratingData?.message}
                        className={"w-full md:w-[75%]"}
                    />
                    <div className="flex items-center w-fit mt-1 md:mt-0 gap-1 static md:absolute bg-c7 top-[15px] right-[15px] p-[5px] rounded-[5px]">
                        <img
                            src="/Find Doctors/AppointmentVerified.svg"
                            alt="img"
                            className="w-[11.08px]"
                        />
                        <FormSpan
                            content={"Appointment Completed"}
                            className={"font-w1 whitespace-nowrap text-[10px]"}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(RatingCard);
