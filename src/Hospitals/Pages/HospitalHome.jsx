import React, { memo, useContext, useEffect, useState } from "react";
import HospitalCard from "../Components/HospitalCard/HospitalCard";
import PrimaryButton from "../../Common/Components/Buttons/PrimaryButton";
import { FaPlus } from "react-icons/fa6";
import { axiosClient } from "../../Utils/axiosClient";
import { useSelector } from "react-redux";
import DoctorCard from "../Components/DoctorsCard/DoctorCard";
import { H4 } from "../../Common/Components/Text/Textt";
import Illistration from "../../Common/Components/Illustration/Illistration";
import EnterDuid from "../Components/Home/EnterDuid";
import AddDoctorForm from "../Components/Home/AddDoctorForm";
import AddDoctorContext from "../../Utils/Context/Hospital/AddDoctorContext";
import AddStaffForm from "../Components/Home/AddStaffForm";
import AddStaffContext from "../../Utils/Context/Hospital/AddStaffContext";
import StaffCard from "../Components/StaffCard/StaffCard";

const HospitalHome = () => {
    const {
        doctorsData,
        addDoctor,
        setAddDoctor,
        addDoctorForm,
        getDoctorsData,
    } = useContext(AddDoctorContext);

    const {
        staff,
        setStaff,
        staffsData,
        addStaffForm,
        setAddStaffForm,
        getStaffsData
    } = useContext(AddStaffContext);

    useEffect(() => {
        // getHospitalData();
        getDoctorsData();
        getStaffsData();
        // getStaffData();DoctorsData();
    }, []);
    return (
        <>
            <div className="overflow-x-hidden relative min-h-[calc(100vh-108px)] mt-[40px] px-4 md:px-[50px]">
                <div className="md:w-[40%] h-[50%] blur-[120px] fixed bottom-0 right-0 -z-20 bg-gradient-to-l from-[#1F51C626] via-[#108ED638] to-[#1F51C638]"></div>

                <div className="md:w-[40%] h-[50%] blur-[120px] fixed left-0 bottom-0 -z-20 bg-gradient-to-b from-[#1F51C638] via-[#108ED638] to-[#1F51C626]"></div>
                {addDoctorForm ? (
                    <AddDoctorForm getDoctorsData={getDoctorsData} />
                ) : addStaffForm ? (
                    <AddStaffForm />
                ) : (
                    <>
                        <HospitalCard />
                        <div className="mt-5 flex justify-between items-center ">
                            <div className="space-x-2.5">
                                <PrimaryButton
                                    onclick={() => setStaff(false)}
                                    className={`${staff ? "  text-[#5D5E61BD] border border-[#D9D9D9]" : "bg-c1 text-c2"} font-f2 font-w1 text-[13px] w-[95.01px] md:w-[129px] h-[31.94px] md:h-[40px] `}
                                    radius={"44px"}
                                    content={"Doctors"}
                                />
                                <PrimaryButton
                                    onclick={() => setStaff(true)}
                                    className={`${staff ? "bg-c1 text-c2" : " text-[#5D5E61BD] border border-[#D9D9D9]"} font-f2  w-[95.01px] md:w-[129px] text-[13px] h-[31.94px] md:h-[40px] `}
                                    radius={"44px"}
                                    content={"Staff"}
                                />
                            </div>
                            <button
                                onClick={() =>
                                    staff
                                        ? setAddStaffForm(true)
                                        : setAddDoctor(true)
                                }
                                className={
                                    "flex justify-center  whitespace-nowrap items-center h-[31.94px]  md:h-[40px] bg-c3 text-c2 font-f2  w-[123px] md:w-[139px] text-[13px] rounded-[44px]"
                                }
                            >
                                <FaPlus size={16} />
                                {staff ? "Add Staff" : "Add Doctors"}
                            </button>
                        </div>
                        {staff ? (
                            staffsData?.length > 0 ? (
                                <div className="mt-5">
                                    {
                                        staffsData?.map((staff, i)=>(
                                            <StaffCard key={staff?._id} staffInfo={staff} />  

                                        ))
                                    }
                                </div>
                            ) : (
                                <div className="flex justify-center items-center">
                                    <Illistration
                                        src={"/Hospital/Home/dontHaveStaff.png"}
                                        imgClassName="w-[97.87px] md:w-[127.68px] h-[151.72px] md:h-[197.93px]"
                                        errorTitle="Sorry! You don’t have any Staff"
                                        button={{
                                            content: "Add Staff",
                                            onclick: () =>
                                                setAddStaffForm(true),
                                        }}
                                    />
                                </div>
                            )
                        ) : doctorsData?.length > 0 ? (
                            <div className="mt-[25px]">
                                {doctorsData?.map((doctorInfo, i) => (
                                    // <Link key={doctorInfo?._id} to={`/doctor-details/${doctorInfo?._id}`} >
                                    <DoctorCard
                                        key={doctorInfo?._id}
                                        doctorInfo={doctorInfo}
                                        visible={true}
                                        clickble={true}
                                        discreption={false}
                                        className={`${i == 0 ? "border-y" : "border-b"}  border-dashed border-[#B8B8BA99] `}
                                    />
                                    // </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="flex justify-center items-center">
                                <Illistration
                                    src={"/Hospital/Home/dontHaveDoctors.png"}
                                    imgClassName="w-[156.49px] md:w-[194.48px] h-[173px] md:h-[215px]"
                                    errorTitle="Sorry! You don’t have any doctors"
                                    button={{ content: "Add Doctor" }}
                                />
                            </div>
                        )}
                    </>
                )}
            </div>
            {addDoctor && <EnterDuid />}
        </>
    );
};

export default memo(HospitalHome);
