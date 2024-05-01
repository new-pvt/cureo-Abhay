import React, { useEffect, useState } from "react";
import { Input2 } from "../../Common/Components/Inputs/Inputs";
import { axiosClient } from "../../Utils/axiosClient";
import { useSelector } from "react-redux";
import DoctorCard from "../Components/DoctorsCard/DoctorCard";

const Doctors = () => {
    const { user } = useSelector((state) => state.auth);
    const [doctorsData, setDoctorsData] = useState([]);

    const getDoctorsData = async () => {
        const response = await axiosClient.get(`/v2/getAlldoctor/${user?._id}`);
        if (response.status === "ok") {
            return setDoctorsData(response.result);
        }
    };

    useEffect(() => {
        getDoctorsData();
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
                onchange={(e) =>
                    staff
                        ? setSearchStaff(e.target.value)
                        : setSearchDoctor(e.target.value)
                }
            />
            {doctorsData?.length > 0 ? (
                <div className="mt-[40px]">
                    {doctorsData?.map((doctorInfo, i) => (
                        // <Link key={doctorInfo?._id} to={`/doctor-details/${doctorInfo?._id}`} >
                        <DoctorCard
                            key={doctorInfo?._id}
                            doctorInfo={doctorInfo}
                            visible={true}
                            clickble={true}
                            discreption={false}
                            className={`${ i == 0 ? "border-y" : "border-b"} border-dashed border-[#B8B8BA99] `}
                        />
                        // </Link>
                    ))}
                </div>
            ) : (
                <h1>No Doctors Found</h1>
            )}
        </main>
    );
};

export default Doctors;
