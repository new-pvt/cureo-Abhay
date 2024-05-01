import { useEffect, useRef, useState } from "react";

const OtpInput = ({ numberOfDigits, name, otp, setOtp }) => {
    const [otpError, setOtpError] = useState(null);
    const otpBoxReference = useRef([]);
    const handleChange = (value, index) => {
        if (isNaN(value)) return;
        let newArr = [...otp];
        newArr[index] = value;
        setOtp(newArr);

        if (value && index < numberOfDigits - 1) {
            otpBoxReference.current[index + 1].focus();
        }
    };

    const handleBackspaceAndEnter = (e, index) => {
        if (e.key === "Backspace" && !e.target.value && index > 0) {
            otpBoxReference.current[index - 1].focus();
        }
        if (e.key === "Enter" && e.target.value && index < numberOfDigits - 1) {
            otpBoxReference.current[index + 1].focus();
        }
    };
    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text/plain").trim();
        const pastedDigits = pastedData.slice(0, 5).split(""); // Slice first 5 digits
        if (isNaN(pastedData)) return;
        // Paste each digit into corresponding input field
        // if (isNaN(pastedDigits)) return;
        const newOtp = [...otp];
        pastedDigits.forEach((digit, index) => {
            if (index < numberOfDigits) {
                newOtp[index] = digit;
            }
        });
        setOtp(newOtp);

        // Focus on last input field after pasting
        otpBoxReference.current[pastedDigits.length - 1].focus();
    };
    123;
    return (
        <div className="flex items-center justify-center gap-3 md:gap-4">
            {otp.map((digit, index) => (
                <input
                    autoFocus={index === 0 ? true : false}
                    // type="number"
                    key={index}
                    name={name}
                    value={digit}
                    maxLength={1}
                    onChange={(e) => handleChange(e.target.value, index)}
                    onKeyDown={(e) => handleBackspaceAndEnter(e, index)}
                    onPaste={handlePaste} // Handle paste event
                    ref={(reference) =>
                        (otpBoxReference.current[index] = reference)
                    }
                    className={`w-[47.14px] md:w-[52px] h-[47.14px] md:h-[52px] text-center p-3 rounded-[5px] block focus:ring-0 focus:ring-offset-0 focus:outline-offset-0 focus:border border border-[#D9D9D9] focus:border-b-[4px] focus:border-b-c3 focus:outline-none appearance-none`}
                />
            ))}
            
        </div>
    );
};

export default OtpInput;
