import React, { useState } from "react";
import ContactUsContext from "./ContactUsContext";

const ContactUsContextProvider = ({ children }) => {
    const [contactUsInputs, setContactUsInputs] = useState({
        name: "",
        phone: "",
        email: "",
        typeOfQuery: "",
        message: "",
    });
    return (
        <ContactUsContext.Provider
            value={{ contactUsInputs, setContactUsInputs }}
        >
            {children}
        </ContactUsContext.Provider>
    );
};

export default ContactUsContextProvider;
