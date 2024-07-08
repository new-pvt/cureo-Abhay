import React, { memo } from "react";
import { H2, P2 } from "../../../Common/Components/Text/Textt";
import PrimaryButton from "../../../Common/Components/Buttons/PrimaryButton";

const Section4 = () => {

    const openInNewTab = () => {
        const win = window.open('https://play.google.com/store/apps/details?id=com.listnative04', '_blank');
        win.focus();
      };

    return (
        <section className="overflow-x-hidden relative px-[16px] md:px-[50px] py-0 md:py-[112.5px] w-full min-h-[calc(100vh-108px)] flex flex-col md:flex-row md:justify-between items-center gap-[50px] md:gap-0">
            <div className="md:w-[35%] h-[25%] blur-[120px] absolute top-0 -right-10 -z-10 bg-gradient-to-t from-[#1F51C6AD] via-[#108ED6] to-[#1F51C6]"></div>

            <div className="md:w-[35%] h-[25%] blur-[120px] absolute left-0 bottom-0 -z-10 bg-gradient-to-b from-[#1F51C6AD] via-[#108ED6] to-[#1F51C6]"></div>

            <img src="/Home/app.png" alt="img" />

            <div className="flex flex-col items-center text-center md:items-end md:text-right w-full md:w-1/2">
                <H2 content="Download the CureO app" className=" " />
                <P2
                    content="Enhance Your Healthcare Experience with CureO: Seamlessly Book Appointments, Securely Manage Medical Records, and Personalize Your Health Journey"
                    className="md:w-[60%] "
                />
                <PrimaryButton
                onclick={openInNewTab}
                    className={"bg-c1 w-[171px] mt-[13.5px]"}
                    h={"45px"}
                    bg={"c1"}
                    color={"white"}
                    radius={"44px"}
                    content={"Download App"}
                />
            </div>
        </section>
    );
};

export default memo(Section4);
