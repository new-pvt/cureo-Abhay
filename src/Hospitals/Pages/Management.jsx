import React, { useContext, useEffect, useState } from "react";
import { Input2 } from "../../Common/Components/Inputs/Inputs";
import PrimaryButton from "../../Common/Components/Buttons/PrimaryButton";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import StaffsTable from "../Components/Management/StaffsTable";
import DoctorsTable from "../Components/Management/DoctorsTable";
import ManagementContext from "../../Utils/Context/Hospital/Management/MangementContext";


const Management = () => {
    const {
        staff,
        setStaff,
        getDoctorsData,
        getStaffsData,
        searchDoctor,
        setSearchDoctor,
        searchStaff,
        setSearchStaff,
        setDoctorsData,
        staffsData
    } = useContext(ManagementContext);

    useEffect(() => {
        getDoctorsData();
        // return ()=> setDoctorsData([]);
    }, [searchDoctor]);

    useEffect(() => {
        getStaffsData();
    }, [searchStaff]);

    return (
        <main className="overflow-x-hidden relative min-h-[calc(100vh-108px)] mt-[40px] px-4 md:px-[50px]">
            <div className="md:w-[40%] h-[50%] blur-[120px] fixed bottom-0 right-0 -z-20 bg-gradient-to-l from-[#1F51C626] via-[#108ED638] to-[#1F51C638]"></div>
            <div className="md:w-[40%] h-[50%] blur-[120px] fixed left-0 bottom-0 -z-20 bg-gradient-to-b from-[#1F51C638] via-[#108ED638] to-[#1F51C626]"></div>
            <Input2
                type="text"
                placeholder={staff ? "Search Staff" : "Search Doctor"}
                name="location"
                icon={"/Find Doctors/Search.svg"}
                divClasses="w-full md:w-[30.33%] rounded-[106px] md:mx-auto "
                inputClasses="rounded-[106px] text-[13px]"
                value={staff ? searchStaff : searchDoctor}
                onchange={(e) =>
                    staff
                        ? setSearchStaff(e.target.value)
                        : setSearchDoctor(e.target.value)
                }
            />
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

              
            </div>
            {staff ? <StaffsTable data={staffsData}/> : <DoctorsTable />}
        </main>
    );
};

export default Management;
