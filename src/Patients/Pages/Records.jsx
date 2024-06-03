import React, { memo, useCallback, useEffect, useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import UploadRecord from "../Components/Records/UploadRecord";
import { axiosClient } from "../../Utils/axiosClient";
import { useSelector } from "react-redux";
import PatientLogIn from "../Components/Authentication/PatientLogIn";
import useBytesConvertor from "../../Utils/Hooks/useBytesConvertor";
import ViewRecord from "../Components/Records/ViewRecord";

const Records = () => {
    const { user, isLoggedIn } = useSelector((state) => state.auth);
    const array = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    const [medicalRecords, setMedicalRecords] = useState([]);
    const [uploadRecord, setUploadRecord] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const getMedicalRecord = async () => {
        try {
            const response = await axiosClient.get(
                `/v2/getRecordOfPatient/${user?._id}`
            );
            if (response.status === "ok") {
                return setMedicalRecords(response.result);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleShowRecord = (i) => {
        setShowPreview(true);
        setActiveIndex(i);
    };

    const handleNextPrev = useCallback(
        (newIndex) => {
            if (newIndex < 0) {
                newIndex = 0;
            } else if (newIndex >= medicalRecords.length) {
                newIndex = medicalRecords.length - 1;
            }
            setActiveIndex(newIndex);
        },
        [medicalRecords]
    );

    useEffect(() => {
        getMedicalRecord();
    }, []);
    return (
        <>
            {uploadRecord ? (
                <UploadRecord
                    setUploadRecord={setUploadRecord}
                    getMedicalRecord={getMedicalRecord}
                />
            ) : (
                <main className="overflow-x-hidden md:mt-0 relative px-[16px] md:px-[50px] pt-[33px] md:pt-[74px] w-full min-h-[calc(100vh-93px)] flex flex-wrap gap-2.5 ">
                    <div
                        onClick={() => setUploadRecord(true)}
                        className=" md:flex-grow-0 aspect-square h-[165px] md:h-[250px] bg-c3 flex flex-col justify-center items-center gap-2.5 rounded-[5px] cursor-pointer"
                    >
                        <img src="/Records/upload records.png" alt="" />
                        <span className="text-c2 font-f2 font-w1">
                            Upload Records
                        </span>
                    </div>
                    {medicalRecords?.map((record, i) => (
                        <div
                            key={i}
                            onClick={() => handleShowRecord(i)}
                            className={`md:flex-grow-0 aspect-square h-[165px] md:h-[250px] border border-[#D9D9D982] rounded-[5px]`}
                        >
                            <div className="w-[100%] h-[70%] overflow-hidden no-scrollbar">
                                {record?.imgtype == "application/pdf" ? (
                                    <iframe
                                        src={`${record?.imgurl}?#zoom=-50&scrollbar=0&toolbar=0&navpanes=0`}
                                        className="w-full h-full overflow-hidden no-scrollbar"
                                    />
                                ) : (
                                    <img
                                        src={record?.imgurl}
                                        alt="image"
                                        className="object-cover w-full"
                                    />
                                )}
                            </div>
                            <div className="flex justify-between items-center px-2.5 pt-2.5">
                                <span className="text-c16 font-f2 font-w1  text-[13px] leading-[15.89px] truncate ">
                                    {record?.imgname}
                                </span>
                                <HiOutlineDotsVertical color="#108ED6" />
                            </div>
                            <span className="text-c4 font-f2 font-w1 mx-2.5 text-[13px] leading-[15.89px] ">
                                {useBytesConvertor(record?.imgsize)}
                            </span>
                        </div>
                    ))}
                    {showPreview && (
                        <ViewRecord
                            data={medicalRecords}
                            index={activeIndex}
                            handleNextPrev={handleNextPrev}
                            onclose={setShowPreview}
                        />
                    )}
                </main>
            )}
        </>
    );
};

export default memo(Records);
