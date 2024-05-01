import React, { useState } from "react";
import { H7, Span } from "../../../Common/Components/Text/Textt";
import PrimaryButton from "../../../Common/Components/Buttons/PrimaryButton";
import { BsCheckLg } from "react-icons/bs";
import { axiosClient } from "../../../Utils/axiosClient";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const concernData = [
    {
        concernName: "Diabetes",
        imgUrl: "/HealthConcern/Diabetes.svg",
    },
    {
        concernName: "Blood Pressure",
        imgUrl: "/HealthConcern/blood Pressure.svg",
    },
    {
        concernName: "Psoriasis",
        imgUrl: "/HealthConcern/Psoriasis.svg",
    },
    {
        concernName: "Acne",
        imgUrl: "/HealthConcern/Acne.svg",
    },
    {
        concernName: "Cold",
        imgUrl: "/HealthConcern/Cold.svg",
    },
    {
        concernName: "Allergies",
        imgUrl: "/HealthConcern/allergies.svg",
    },
    {
        concernName: "Asthma",
        imgUrl: "/HealthConcern/Asthma.svg",
    },
    {
        concernName: "Heart Condition",
        imgUrl: "/HealthConcern/Heart Condition.svg",
    },
    {
        concernName: "Arthritis",
        imgUrl: "/HealthConcern/Arthritis.svg",
    },
    {
        concernName: "Infection",
        imgUrl: "/HealthConcern/Infection.svg",
    },
    {
        concernName: "Hairfall",
        imgUrl: "/HealthConcern/Hairfall.svg",
    },
    {
        concernName: "Vitamin Deficiency",
        imgUrl: "/HealthConcern/Vitamin Deficiency.svg",
    },
    {
        concernName: "Ear Infection",
        imgUrl: "/HealthConcern/Ear Infection.svg",
    },
];

const HealthConcern = ({ setCurrentStep }) => {
    const { user } = useSelector((state) => state.auth);
    const [isSelected, setIsSelected] = useState([...user?.Healthconcern]);
    const [loading, setloading] = useState(false);

    const handleSelect = (val) => {
        console.log(val);
        setIsSelected(
            isSelected.includes(val)
                ? isSelected.filter((item) => item !== val)
                : [...isSelected, val]
        );
    };

    const handleContinue = async () => {
        try {
            setloading(true);
            const response = await axiosClient.post("/v2/addHealthConcern", {
                id: user?._id,
                healthConcern: isSelected,
            });
            if (response.status == "ok") {
                toast.success("Success");
                setCurrentStep(2);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setloading(false);
        }
    };

    return (
        <>
            <p
                style={{
                    textShadow:
                        "1px 0 #0095EF, -1px 0 #0095EF, 0 1px #0095EF, 0 -1px #0095EF, 1px 1px #0095EF, -1px -1px #0095EF, -1px 1px #0095EF, 1px -1px #0095EF",
                }}
                className="absolute top-1 md:top-0 left-0 md:-left-10 font-f2 font-w3 text-[60px] md:text-[90px] bg-c2 text-white"
            >
                02
            </p>
            <H7 content="Health Concerns" className="ml-[60px]" />
            <Span content="Select all that applies" className="ml-[60px]" />
            <div className="mt-[27px] border border-[#D9D9D980] -mx-5 grid grid-cols-2 p-4 md:p-0">
                {concernData?.map((item, i) => (
                    <div
                        key={item?.concernName}
                        onClick={() => handleSelect(item?.concernName)}
                        className={`flex select-none items-center py-3 px-5 cursor-pointer gap-2.5 border-[1px] ${i == 0 ? "border-y" : "border-b border-r"}  border-[#D9D9D980]`}
                    >
                        <div className="relative ">
                            <img
                                src={item?.imgUrl}
                                alt="image"
                                className={`w-[45px] h-[45px] rounded-full ${isSelected.includes(item.concernName) ? "opacity-80" : null}`}
                            />
                            {isSelected.includes(item.concernName) && (
                                <BsCheckLg
                                    color="#ffffff"
                                    size={20}
                                    className="w-full absolute z-20 top-0 bottom-0 left-0 right-0 m-auto  h-full rounded-full "
                                />
                            )}
                        </div>
                        <h6>{item?.concernName}</h6>
                    </div>
                ))}
            </div>
            <PrimaryButton
                content={"Continue"}
                onclick={handleContinue}
                loading={loading}
                className={`mt-5 bg-c1 text-c2 font-f2 w-full mx-auto text-[13px]`}
                h={"40px"}
                bg={"c1"}
                radius={"44px"}
                disabled={isSelected.length == 0}
            />
        </>
    );
};

export default HealthConcern;
