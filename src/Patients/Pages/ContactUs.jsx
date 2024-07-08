import React, {
    memo,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { H4, H6, P2, P3, Span } from "../../Common/Components/Text/Textt";
import PrimaryButton from "../../Common/Components/Buttons/PrimaryButton";
import { Input1, TextArea } from "../../Common/Components/Inputs/Inputs";
import { FaLocationDot } from "react-icons/fa6";
import ContactUsContext from "../../Utils/Context/Patients/ContactUs/ContactUsContext";
import { axiosClient } from "../../Utils/axiosClient";
import ContactUsPopUp from "../../Common/Components/ContactUs/ContactUsPopUp";
import { useLocation } from "react-router-dom";

const ContactUs = () => {
    const {pathname} = useLocation();
    const { contactUsInputs, setContactUsInputs } =
        useContext(ContactUsContext);

    const [loading, setLoading] = useState(false);
    const [successPopUp, setSuccessPopUp] = useState(false);


    const openInNewTab = () => {
        const win = window.open('https://maps.app.goo.gl/NQRGhEc1GVmTKxwW9', '_blank');
        win.focus();
      };

    

    const inputs = [
        {
            type: "text",
            placeholder: "Enter your Name",
            name: "name",
            classname: "w-full",
            value: contactUsInputs?.name,
        },
        {
            type: "number",
            placeholder: "Phone Number",
            name: "phone",
            classname: "w-full",
            value: contactUsInputs?.phone,
        },
        {
            type: "email",
            placeholder: "Email address",
            name: "email",
            classname: "w-full",
            value: contactUsInputs?.email,
        },
        {
            type: "text",
            placeholder: "Type of Query",
            name: "typeOfQuery",
            classname: "w-full",
            value: contactUsInputs?.typeOfQuery,
        },
    ];

    const disable = Object.values(contactUsInputs).every(
        (value) => value !== undefined && value !== null && value !== ""
    );

    const handleChange = useCallback(
        (e) => {
            const { name, value } = e.target;
            setContactUsInputs({
                ...contactUsInputs,
                [name]: value,
            });
        },
        [contactUsInputs]
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axiosClient.post(
                "/v2/contactCreation",
                contactUsInputs
            );
            if (response.status === "ok") {
                setSuccessPopUp(true);
                setTimeout(() => {
                    setSuccessPopUp(false);
                }, 3000);
                for (const key in contactUsInputs) {
                    contactUsInputs[key] = "";
                }
                return;
            }
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="overflow-x-hidden md:mt-0 relative px-[16px] md:px-[50px] pt-[33px]  md:pt-10 pb-10 w-full min-h-[calc(100vh-93px)] flex flex-col md:flex-row gap-[50px] md:gap-[50px] items-center">
            {/* <div className="md:w-[35%] h-[25%] blur-[120px] absolute top-0 -right-10 -z-10 bg-gradient-to-t from-[#1F51C6AD] via-[#108ED6] to-[#1F51C6]"></div> */}

            <div className="md:w-[35%] h-[25%] blur-[120px] absolute left-0 bottom-0 -z-10 bg-gradient-to-b from-[#1F51C6AD] via-[#108ED6] to-[#1F51C6]"></div>
            <div className="flex-1 p-4 md:p-[25px] border boder-c17 space-y-[30px] rounded-[7px]">
                <H6 content="Contact Information" />
                <div className="flex flex-col gap-5">
                    <div className="flex items-center gap-[5.71px]">
                        <div className="bg-c3 px-3 py-3 rounded-full">
                            <FaLocationDot size={14} color="#ffffff" />
                        </div>
                        <div className="">
                            <P3
                                content="CureO Healthcare Pvt Ltd."
                                className="text-[15px]"
                            />
                            <Span
                                content="2nd floor, Ginger Square Mall, Bus Stop, Jaripatka, Nagpur-440015"
                                className="w-[60%] text-[13px] text-[#706D6D]"
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
                        <Span
                            content="+91 95189 77267"
                            className="text-[#353535] text-[13px]"
                        />
                    </div>
                    <div className="flex items-center gap-[5.71px]">
                        <div className="bg-c3 w-[38.29px] h-[38.29px] flex justify-center items-center rounded-full">
                            <img
                                src="/Home/mail.png"
                                alt="img"
                                className="w-[21.67px] h-[17.34px]"
                            />
                        </div>
                        <Span
                            content="medideksocial@123.com"
                            className="text-[#108ED6]"
                        />
                    </div>
                </div>
                <div className="relative">
                    <img src="/Home/Homepage-map.png" alt="img" className="" />
                    <PrimaryButton
                    onclick={openInNewTab}
                        className={
                            "bg-c1 px-[11px] py-2 text-[10px] font-f3 absolute top-[15px] left-[15px]"
                        }
                        // h={"45px"}
                        bg={"c1"}
                        color={"white"}
                        radius={"44px"}
                        content={"Open in Maps"}
                    />
                </div>
            </div>
            <div className="flex-1 text-center md:text-start">
                <H4 content="How can we help you?" />
                <P2
                    content="Send us your query and we’ll get back to you within 24 hours."
                    className="text-c4 text-[15px] mt-2"
                />
                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 w-full gap-2.5 md:gap-x-[18.38px] md:gap-y-[25px] mt-[25px]"
                >
                    {/* <div className="grid gap-2 grid-cols-1 md:grid-cols-2 w-full"> */}
                    {inputs.map((input, i) => (
                        <Input1
                            key={i}
                            autofocus={i === 0 && pathname !== '/' ? true : false}
                            type={input?.type}
                            placeholder={input?.placeholder}
                            required={true}
                            name={input?.name}
                            classname="w-full"
                            value={input?.value}
                            onchange={handleChange}
                        />
                    ))}

                    <TextArea
                        classname="md:col-span-2"
                        placeholder="Enter your message here"
                        name="message"
                        value={contactUsInputs?.message}
                        onchange={handleChange}
                    />

                    <PrimaryButton
                        disabled={disable ? false : true}
                        className={`${
                            disable ? "bg-c1" : "bg-c23"
                        } -c1 px-[11px] text-[1.063rem] font-f3 font-w3 md:col-span-2`}
                        // h={"45px"}
                        bg={"c1"}
                        color={"white"}
                        radius={"44px"}
                        content={"Send Message"}
                        type="submit"
                        loading={loading}
                        h={"40px"}
                    />
                </form>
            </div>
            {successPopUp && (
                <ContactUsPopUp onclose={() => setSuccessPopUp(false)} />
            )}
        </main>
    );
};

export default memo(ContactUs);
