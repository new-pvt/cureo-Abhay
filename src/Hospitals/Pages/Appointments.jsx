import React, { useEffect, useState } from "react";
import { Input2 } from "../../Common/Components/Inputs/Inputs";
import DoctorCard from "../Components/DoctorsCard/DoctorCard";
import { toast } from "react-hot-toast";
import { axiosClient } from "../../Utils/axiosClient";
import AppointmentTable from "../Components/Appointments/AppointmentTable";

const Appointments = ({ doctor }) => {
    const [doctorInfo, setDoctorInfo] = useState({});

    const getSingleDoctorDetails = async () => {
        if (!doctor) return;
        try {
            const response = await axiosClient.get(
                `/v2/singledoctor/${doctorId}`
            );
            if (response.status === "ok") {
                setDoctorInfo(response.result);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };
    useEffect(() => {
        getSingleDoctorDetails();
    }, []);
    return (
        <main className="overflow-x-hidden relative min-h-[calc(100vh-108px)] mt-[40px] px-4 md:px-[50px]">
            <div className="md:w-[40%] h-[50%] blur-[120px] fixed bottom-0 right-0 -z-20 bg-gradient-to-l from-[#1F51C626] via-[#108ED638] to-[#1F51C638]"></div>

            <div className="md:w-[40%] h-[50%] blur-[120px] fixed left-0 bottom-0 -z-20 bg-gradient-to-b from-[#1F51C638] via-[#108ED638] to-[#1F51C626]"></div>
            <Input2
                type="text"
                placeholder="Search Doctor"
                name="location"
                icon={"/Find Doctors/Search.svg"}
                divClasses="w-full md:w-[30.33%] rounded-[106px] md:mx-auto "
                inputClasses="rounded-[106px] text-[13px]"
                value={""}
                // onchange={(e) =>
                //     staff
                //         ? setSearchStaff(e.target.value)
                //         : setSearchDoctor(e.target.value)
                // }
            />
            {doctor && (
                <div className="mt-10">
                    <DoctorCard
                        doctorInfo={doctorInfo}
                        discreption={true}
                        clickble={false}
                        fullDiscreption={true}
                        hideInSm={true}
                        appointments
                        verified={true}
                        className="border border-solid border-c17 px-5 py-[17px]"
                    />
                </div>
            )}

            <AppointmentTable />
        </main>
    );
};

export default Appointments;
