import React from "react";
import Dialog from "../Dialogs/Dialog";

const ContactUsPopUp = ({ onclose }) => {
    return (
        <Dialog onclose={onclose}>
            <div className="flex flex-col justify-center items-center w-full gap-2">
                <img
                    src="/ContactUs/Message sent.svg"
                    alt="image"
                    className="w-[189px]"
                />
                <h2 className="leading-[26.66px] font-f1 font-w3 text-[24px]">
                    Message Sent!
                </h2>
                <p className="font-f3 font-w1 text-[15px] text-c4">
                    We’ll get back to you within 24 hours!
                </p>
            </div>
        </Dialog>
    );
};

export default ContactUsPopUp;
