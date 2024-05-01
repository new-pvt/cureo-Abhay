import React, { useEffect, useState } from "react";
import Avatar from "../../Common/Components/Avatar/Avatar";
import { H7, Span } from "../../Common/Components/Text/Textt";
import { HiArrowRight } from "react-icons/hi2";
import { axiosClient } from "../../Utils/axiosClient";
import { useDispatch, useSelector } from "react-redux";
import { selectedDoctorsData } from "../../Utils/Store/doctorDataSlice";
import { useNavigate } from "react-router-dom";

const SelectHospital = () => {
    const { user } = useSelector((state) => state.auth);
    const [hospitalList, setHospitalList] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const multipleloginprofile = async () => {
        try {
            const response = await axiosClient.get(
                `/v2/multipleloginprofile/${user?.doctorid}`
            );
            setHospitalList(response.result);
            return;
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        multipleloginprofile();
    }, []);

    console.log(user.imgurl)

    

    const selectHospital = (hospital) => {
        dispatch(selectedDoctorsData(hospital));
        navigate("/doctor/dashboard");
    };
    return (
        <main className="relative w-full px-4 h-screen flex justify-center items-center ">
            <div className="md:w-[40%] h-[50%] blur-[120px] fixed bottom-0 right-0 -z-20 bg-gradient-to-l from-[#1F51C626] via-[#108ED638] to-[#1F51C638]"></div>

            <div className="md:w-[40%] h-[50%] blur-[120px] fixed left-0 bottom-0 -z-20 bg-gradient-to-b from-[#1F51C638] via-[#108ED638] to-[#1F51C626]"></div>
            <div className="w-full md:w-[33.33%]">
                <div className="flex flex-col items-center justify-center">
                    <Avatar
                        src={
                            user?.imgurl
                                ? user?.imgurl
                                : "/EditProfile/Profile.png"
                        }
                        className={"w-[70px] h-[70px] md:w-[81px] md:h-[81px]"}
                    />
                    <H7
                        content={`Welcome, Dr. ${user?.nameOfTheDoctor}`}
                        className={"leading-[15px] mt-[10px]"}
                    />
                    <Span content="Please Select a Hospital" />
                </div>

                <div className="border border-[#D9D9D980] rounded-[5px] px-4 md:px-5 mt-5">
                    {hospitalList?.map((hospital, i) => (
                        <div
                            key={hospital?._id}
                            className={`flex justify-between items-center py-5 ${i !== 2 && "border-b border-dashed"}`}
                        >
                            <div className="flex items-center gap-2.5">
                                <Avatar
                                    src={
                                        hospital?.hospitalId === null
                                            ? hospital?.imgurl
                                            : hospital?.hospitalId?.imgurl
                                              ? hospital?.hospitalId?.imgurl
                                              : "/EditProfile/Profile.png"
                                    }
                                    className={
                                        "w-[50px] h-[50px] md:w-[58px] md:h-[58px]"
                                    }
                                />
                                <div>
                                    <H7
                                        content={
                                            hospital?.hospitalId === null
                                                ? hospital?.nameOfTheDoctor
                                                : hospital?.hospitalId
                                                      ?.nameOfhospitalOrClinic
                                        }
                                        className={"leading-[15px] "}
                                    />
                                    <Span
                                        content={
                                            hospital?.hospitalId === null
                                                ? hospital?.location
                                                : hospital?.hospitalId?.location
                                        }
                                    />
                                </div>
                            </div>

                            <button
                                onClick={() => selectHospital(hospital)}
                                className="font-f3 font-w2 flex items-center text-c1 gap-[5px]"
                            >
                                <span>Enter</span>{" "}
                                <HiArrowRight
                                    color="#1F51C6"
                                    className="mt-1"
                                />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default SelectHospital;
