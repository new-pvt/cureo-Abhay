import React, { memo } from "react";
import { H4, H6, P2, P3 } from "../../../Common/Components/Text/Textt";
import PrimaryButton from "../../../Common/Components/Buttons/PrimaryButton";
import { Input1, TextArea } from "../../../Common/Components/Inputs/Inputs";

const Section6 = () => {
    return (
        <section className="overflow-x-hidden md:mt-0 relative px-[16px] md:px-[50px] pt-0 md:pt-[112.5px] pb-[223px] w-full min-h-[calc(100vh-93px)] flex gap-[50px] md:gap-[50px] items-center">
            <div className="md:w-[35%] h-[25%] blur-[120px] absolute top-0 -right-10 -z-10 bg-gradient-to-t from-[#1F51C6AD] via-[#108ED6] to-[#1F51C6]"></div>

            <div className="md:w-[35%] h-[25%] blur-[120px] absolute left-0 bottom-0 -z-10 bg-gradient-to-b from-[#1F51C6AD] via-[#108ED6] to-[#1F51C6]"></div>
            <div className="flex-1 p-[25px] hidden md:block border boder-c17 space-y-[30px] rounded-[7px]">
                <H6 content="Contact Information" />
                <div className="flex flex-col gap-5">
                    <div className="flex items-center gap-[5.71px]">
                        <div className="bg-c3 w-[38.29px] h-[38.29px] flex justify-center items-center rounded-full">
                            <img
                                src="/Home/location.svg"
                                alt="img"
                                className="w-[12.28px] h-[17.34px]"
                            />
                        </div>
                        <div className="">
                            <P3
                                content="CureO Healthcare Pvt Ltd."
                                className="text-[15px]"
                            />
                            <P2
                                content="2nd floor, Ginger Square Mall, Bus Stop, Jaripatka, Nagpur-440015"
                                className="w-[60%] text-[15px]"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-[5.71px]">
                        <div className="bg-c3 w-[38.29px] h-[38.29px] flex justify-center items-center rounded-full">
                            <img
                                src="/Home/Phone.svg"
                                alt="img"
                                className="w-[21.67px] h-[17.34px]"
                            />
                        </div>
                        <P2 content="+91 95189 77267" className="text-c11" />
                    </div>
                    <div className="flex items-center gap-[5.71px]">
                        <div className="bg-c3 w-[38.29px] h-[38.29px] flex justify-center items-center rounded-full">
                            <img
                                src="/Home/mail.png"
                                alt="img"
                                className="w-[21.67px] h-[17.34px]"
                            />
                        </div>
                        <P2
                            content="medideksocial@123.com"
                            className="text-c11"
                        />
                    </div>
                </div>
                <div className="relative">
                    <img src="/Home/Homepage-map.png" alt="img" className="" />
                    <PrimaryButton
                        className={
                            "bg-c1 px-[11px] py-2 text-[10px] font-f3 absolute z-10 top-[15px] left-[15px]"
                        }
                        // h={"45px"}
                        bg={"c1"}
                        color={"white"}
                        radius={"44px"}
                        content={"Open in Maps"}
                    />
                </div>
            </div>
            <div className="flex-1">
                <H4 content="How can we help you?" />
                <P2
                    content="Send us your query and we’ll get back to you within 24 hours."
                    className="text-c4 text-[15px] mt-2"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-2 md:gap-x-[18.38px] md:gap-y-[25px] mt-[25px]">
                    <Input1
                        type="text"
                        placeholder="Enter your Name"
                        name="name"
                        classname="w-full"
                    />
                    <Input1
                        type="number"
                        placeholder="Phone Number"
                        name="phone"
                        classname="w-full"
                    />
                    <Input1
                        type="email"
                        placeholder="Email address"
                        name="email"
                        classname="w-full"
                    />
                    <Input1
                        type="email"
                        placeholder="Type of Query"
                        name="email"
                        classname="w-full"
                    />
                    <TextArea classname="col-span-2" />
                    <PrimaryButton
                        className={
                            "bg-c1 px-[11px] py-2 text-[1.063rem] font-f3 font-w3 col-span-2"
                        }
                        // h={"45px"}
                        bg={"c1"}
                        color={"white"}
                        radius={"44px"}
                        content={"Send Message"}
                    />
                </div>
            </div>
        </section>
    );
};

export default memo(Section6);
