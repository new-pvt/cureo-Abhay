import React, { memo } from "react";
import './Style/section1.css'
import PrimaryButton from "../../../Common/Components/Buttons/PrimaryButton";

const Section1 = () => {
    return (
        <section className=" w-full relative  min-h-[calc(100vh-108px)] flex justify-center items-center px-4 py-4 md:px-[50px]">
            <div className="md:w-[55%] h-1/3 blur-[120px] absolute bottom-0 -z-10 bg-gradient-to-b from-[#1F51C6AD] via-[#108ED6] to-[#1F51C6]"></div>
            <div className=" flex flex-col gap-4 w-full md:w-[39.33%]">
                <img
                    src="/Home/Line2.png"
                    alt="img"
                    className="absolute left-0 hidden md:block"
                />
                <h1 className="font-f1 font-w3 text-[28px] md:text-[2.813rem] text-center text-c15 leading-[39.99px] md:leading-[52.99px]">
                    Transform Your Healthcare with Medidek
                </h1>
                <p className="font-f2 font-w1 md:text-[1rem] text-center text-c12 leading-[24px] md:px-[22px]">
                    Seamlessly Book Appointments, Securely Manage Medical
                    Records, and Personalize Your Health Journey.
                </p>
                <div className="flex justify-center gap-2.5">
                    <PrimaryButton
                        className={"bg-c1 w-[145px]"}   
                        h={"45px"}
                        bg={"c1"}
                        color={"white"}
                        radius={"44px"}
                        content={"Book Now"}
                    />
                    <PrimaryButton
                        className={"bg-c3 w-[177px] hidden md:block"}
                        w={"177px"}
                        // px={"33px"}
                        // py={"18px"}
                        h={"45px"}
                        bg={"c1"}
                        color={"white"}
                        radius={"44px"}
                        content={"Download App"}
                    />
                </div>
                <img
                    src="/Home/Line1.png"
                    alt="img"
                    className="absolute right-0 hidden md:block"
                />
            </div>
        </section>
    );
};

export default memo(Section1);
