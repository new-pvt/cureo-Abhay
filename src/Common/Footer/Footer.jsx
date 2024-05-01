import React, { memo } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    const footerLinks = [
        {
            title: "Explore",
            links: [
                {
                    tabName: "Home",
                    to: "/",
                },
                {
                    tabName: "Find Doctors",
                    to: "/find-doctors",
                },
                {
                    tabName: "Appointments",
                    to: "/appointments",
                },
                {
                    tabName: "Records",
                    to: "/records",
                },
                {
                    tabName: "Contact Us",
                    to: "/contact-us",
                },
                {
                    tabName: "Our Team",
                    to: "/our-team",
                },
                {
                    tabName: "Blogs",
                    to: "/blogs",
                },
            ],
        },
        {
            title: "More",
            links: [
                {
                    tabName: "Help",
                    to: "/",
                },
                {
                    tabName: "Privacy Policy",
                    to: "/",
                },
                {
                    tabName: "Terms & Condition",
                    to: "/",
                },
                {
                    tabName: "Cancellation Policy",
                    to: "/",
                },
            ],
        },
    ];
    return (
        <footer className="bg-c1 w-full px-4 md:px-[63px] md:pt-[49px] pb-[15px]">
            <div className="flex flex-wrap justify-between md:items-center gap-[30px] md:gap-0 py-[25px]">
                <img
                    src="/Home/Medidek Logo_fontColor_Changed 2.png"
                    alt="img"
                    className="w-[162px] h-[38px] md:w-[230px] md:h-[72px] "
                />
                <div className="text-white block md:hidden">
                    <div className="flex gap-2.5 mt-2">
                        <a to={"/"}>
                            <img src="/Home/Insta.svg" alt="icon" />
                        </a>
                        <a to={"/"}>
                            <img src="/Home/LinkedIn.svg" alt="icon" />
                        </a>
                        <a to={"/"}>
                            <img src="/Home/facebook.svg" alt="icon" />
                        </a>
                        <a to={"/"}>
                            <img src="/Home/Youtube.svg" alt="icon" />
                        </a>
                    </div>
                </div>
                <div className="flex flex-wrap gap-[50px] md:gap-[113px]">
                    {footerLinks.map((item, i) => (
                        <div key={i} className={`text-c2   `}>
                            <b className="font-f2 font-w3 text-[20px]">
                                {item.title}
                            </b>
                            <div className={`flex flex-col mt-2 gap-1`}>
                                {item.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        to={link.to}
                                        className="text-c18 font-f3"
                                    >
                                        {link.tabName}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}

                    <div className="text-white hidden md:block">
                        <b className="font-f2 font-w3 text-[20px]">Socials</b>
                        <div className="flex gap-2.5 mt-2">
                            <a to={"/"}>
                                <img src="/Home/Insta.svg" alt="icon" />
                            </a>
                            <a to={"/"}>
                                <img src="/Home/LinkedIn.svg" alt="icon" />
                            </a>
                            <a to={"/"}>
                                <img src="/Home/facebook.svg" alt="icon" />
                            </a>
                            <a to={"/"}>
                                <img src="/Home/Youtube.svg" alt="icon" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <hr className="mt-[45px]" />
            <p className="text-white text-center mt-[13px]">
                Copyright©2023 Medidek
            </p>
        </footer>
    );
};

export default memo(Footer);
