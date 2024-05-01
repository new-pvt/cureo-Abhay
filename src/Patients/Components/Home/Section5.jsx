import React, { memo } from "react";
import { H2 } from "../../../Common/Components/Text/Textt";
import PrimaryButton from "../../../Common/Components/Buttons/PrimaryButton";

const Section5 = () => {
    return (
        <section className="overflow-x-hidden md:mt-0 relative px-[16px] py-0 md:py-[112.5px] md:px-[50px] w-full min-h-[calc(100vh-108px)] flex flex-col items-center gap-[50px] md:gap-0">
            <div className="md:w-[25%] h-[25%] blur-[120px] absolute -left-10 top-0 -z-10 bg-gradient-to-b from-[#ffffff] via-[#108ED6] to-[#1F51C6AD]"></div>
            <div className="md:w-[25%] h-[25%] blur-[120px] absolute -right-10 bottom-0 -z-10 bg-gradient-to-b from-[#1F51C6AD] via-[#108ED6] to-[#1F51C6]"></div>
            <H2 content="Our Blogs" className="text-center md:my-4" />
            <div className="grid grid-cols-1 md:grid-cols-5 gap-y-2 md:gap-[15px] ">
                <div className="col-span-3 row-span-3">
                    <img
                        src="/Home/blog1.jpg"
                        alt="img"
                        className="w-full h-[205px] md:h-[501px] rounded-[6px]"
                    />
                </div>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 col-span-2 row-span-2 gap-[15px]">
                    <img
                        src="/Home/blog1.jpg"
                        alt="img"
                        className="w-full md:w-[339px] h-[244px] rounded-[6px]"
                    />
                    <img
                        src="/Home/blog2.jpg"
                        alt="img"
                        className="w-full md:w-[339px] h-[244px] rounded-[6px]"
                    />
                    <img
                        src="/Home/blog3.jpg"
                        alt="img"
                        className="w-full md:w-[339px] h-[244px] rounded-[6px]"
                    />
                    <img
                        src="/Home/blog4.jpg"
                        alt="img"
                        className="w-full md:w-[339px] h-[244px] rounded-[6px]"
                    />
                </div>
            </div>
            <PrimaryButton
                className={"bg-c1 w-[171px] mb-4"}
                h={"45px"}
                bg={"c1"}
                color={"white"}
                radius={"44px"}
                content={"View All"}
            />
        </section>
    );
};

export default memo(Section5);
