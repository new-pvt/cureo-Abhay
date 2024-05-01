import React, { memo } from "react";
import PrimaryButton from "../../../Common/Components/Buttons/PrimaryButton";
import { H2, H4, P1, P2 } from "../../../Common/Components/Text/Textt";

const Section3 = () => {
    const featuresData = [
        {
            number: "01",
            title: "Appointment Booking:",
            description:
                "Stay organized with our intuitive appointment tracking system. Receive timely reminders, view upcoming appointments, and manage your schedule effortlessly.",
        },
        {
            number: "02",
            title: "Appointment Tracking:",
            description:
                "Say goodbye to long waiting times and phone calls. With Medidek, you can effortlessly book appointments with your healthcare providers at your convenience.",
        },
        {
            number: "03",
            title: "Medical History Management:",
            description:
                "Your health history is important, and we prioritize its security. Medidek allows you to upload and manage your medical history securely, ensuring that you have access to crucial information when needed.",
        },
    ];
    return (
        <section className="overflow-x-hidden relative hiddenn px-[16px] md:px-[50px] py-0 md:py-[112.5px] w-full min-h-[calc(100vh-108px)] flex flex-col md:flex-row justify-between items-center">
            <div className="md:w-[25%] h-[25%] blur-[120px] absolute -left-10 top-0 -z-10 bg-gradient-to-b from-[#1F51C6AD] via-[#108ED6] to-[#1F51C6AD]"></div>
            <div className="md:w-[25%] h-[25%] blur-[120px] absolute -right-10 bottom-0 -z-10 bg-gradient-to-b from-[#1F51C6AD] via-[#108ED6] to-[#1F51C6]"></div>

            {/* <div className="md:w-[35%] h-1/2 blur-[120px] absolute right-10 bottom-0 -z-10 bg-gradient-to-b from-[#1F51C6AD] via-[#108ED6] to-[#1F51C6]"></div> */}

            <div className="w-full md:w-[29.42%]">
                <H2
                    content={"Your Health, Your Way"}
                    className="text-center md:text-left"
                />
                <P1
                    content={
                        "Medidek is designed to put your health in your hands. We believe that managing your healthcare should be simple, secure, and personalized. "
                    }
                    className="text-center md:text-left"
                />
                <PrimaryButton
                    className={
                        "bg-c1 w-[171px] mt-[13.5px] mx-auto block md:mx-0"
                    }
                    h={"45px"}
                    bg={"c1"}
                    color={"white"}
                    radius={"44px"}
                    content={"View Doctors"}
                />
            </div>
            <div className="md:w-[33.47%] md:h-[70%] flex flex-col gap-[55px] mt-[55px] md:gap-0 md:mt-0 justify-between">
                {featuresData.map((feature, i) => (
                    <div
                        key={i}
                        className={`flex ${i === 1 ? "flex-row-reverse" : null} ${i === 1 ? "text-right" : null} md:text-left md:flex-row gap-2.5 md:gap-[25px] items-center`}
                    >
                        <p
                            style={{
                                textShadow:
                                    "1px 0 #0095EF, -1px 0 #0095EF, 0 1px #0095EF, 0 -1px #0095EF, 1px 1px #0095EF, -1px -1px #0095EF, -1px 1px #0095EF, 1px -1px #0095EF",
                            }}
                            className="font-f2 font-w3 leading-[124.92px] text-[90px] text-white"
                        >
                            {feature.number}
                        </p>
                        <div>
                            <H4
                                content={feature.title}
                                className="mb-[3px] text-[1rem]"
                            />
                            <P2 content={feature.description} />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default memo(Section3);
