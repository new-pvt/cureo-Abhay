import React, { memo } from "react";
import "./Style/section1.css";
import PrimaryButton from "../../../Common/Components/Buttons/PrimaryButton";
import Section2 from "./Section2";
import { useNavigate } from "react-router-dom";

const Section1 = () => {

    const navigate = useNavigate();
    const openInNewTab = () => {
        const win = window.open('https://play.google.com/store/apps/details?id=com.listnative04', '_blank');
        win.focus();
      };
    return (
        <section className=" w-full section2Gradient relative overflow-hidden min-h-[calc(100dvh-108px)] flex justify-center items-center px-4 py-4 md:px-[50px]">
            <div className="w-full h-10  blur-[120px] absolute botto  bg-gradient-to-b from-[#1F51C6AD] via-[#108ED6] to-[#1F51C6]"></div>

            <div className="relative flex flex-col gap-4 w-full md:w-[39.33%] ">
                <img
                    src="/Home/Line2.png"
                    alt="img"
                    className="absolute -left-[45%] md:-left-[85%] top-5 md:-top-10 w-[226.41px] md:w-full"
                />
                <h1 className="font-f1 font-w3 text-[28px] md:text-[2.813rem] text-center text-c15 leading-[39.99px] md:leading-[52.99px]">
                    Transform Your Healthcare with CureO
                </h1>
                <p className="font-f2 font-w1 md:text-[1rem] text-center text-c12 leading-[24px] md:px-[22px]">
                    Seamlessly Book Appointments, Securely Manage Medical
                    Records, and Personalize Your Health Journey.
                </p>
                <div className="flex justify-center gap-2.5">
                    <PrimaryButton
                        onclick={()=>navigate("/find-doctors")}
                        className={"bg-c1 w-[145px]"}
                        h={"45px"}
                        bg={"c1"}
                        color={"white"}
                        radius={"44px"}
                        content={"Book Now"}
                    />
                    <PrimaryButton
                    onclick={openInNewTab}
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
                    className="absolute -right-[40%] bottom-[70px] md:bottom-0 md:-right-[85%] w-[226.41px] md:w-full"
                />
            </div>
        </section>
    );
};

export default memo(Section1);
